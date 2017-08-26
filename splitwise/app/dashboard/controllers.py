from flask import *
from sqlalchemy.exc import IntegrityError
from app import db
from .models import *
from app.user.models import *
from app.transaction.models import *
from app.dashboard.models import *
from .maths import *
from ast import literal_eval as json
from datetime import datetime as dera

mod_dashboard = Blueprint('dashboard', __name__)

@mod_dashboard.route('/split',methods=['POST'])
def split():
	user=User.query.filter(session['user_name']==User.username).first()
	contri=request.form['contributors']
	expend=request.form['expenditors']
	state=request.form['state']
	description=request.form['description']
	creator=session['user_name']
	bill_amount=request.form['bill_amount']
	payers,d = contri.split(",")[:-1],{}		
	for i in payers:
		x=i.split(':')		
		d[x[0]]=x[1]
		
	stringd = str(d)
	payees,e = expend.split(",")[:-1],{}		
	for i in payees:
		x=i.split(':')		
		e[x[0]]=x[1]
		
	stringe = str(e)

	date = dera.now().strftime("%d-%m-%Y-%H-%M-%S")
	trans_id = Transaction(stringd,stringe,description,creator,bill_amount,date)
#	print(trans_id.tid)
	db.session.add(trans_id)
	db.session.commit()
#	values = trans_id.split(" ")
	a = Transaction.query.filter(and_(Transaction.date==date,Transaction.creator==creator)).first()
	print("hello"+str(a.tid))

	ans=flow(str(contri),str(expend),str(state))
#	print(ans)
	for i in ans:
		abcd=Pay(i['paid_to'],i['paid_by'],i['amount'],trans_id.tid)
		db.session.add(abcd)
		db.session.commit()

	
	data,curr={},{}
	data[user.username],curr[user.username]=json(user.nettransaction),{}
	userfriend=user.friends.split(',')[1:]
	lis=[]
#	print(userfriend)
	for i in userfriend:
#		print(i)
		ab = User.query.filter(i==User.username).first()
		data[i],curr[i]=json(ab.nettransaction),{}
	for x in ans:
#		print(x)
		i,j,k=x['paid_by'],x['paid_to'],x['amount']
		if i not in lis:lis+=[i]
		if j not in lis:lis+=[j]
		if j in data[i]:
#			print(i ,j)
#			print(data[i],data[j])
			data[i][j]=float('%.2f'%data[i][j])+k
			data[j][i]=float('%.2f'%data[j][i])-k
#			data[i][j]+=k
#			data[j][i]-=k
		else:
			data[i][j],data[j][i]=float('%.2f'%k),float('%.2f'%-k)
		curr[i][j],curr[j][i]=k,-k
	for x in lis:
		name=User.query.filter(User.username==x).first()
		curr[x]['date']=date
		curr[x]['creator']=session['user_name']
		name.history+=','+str(curr[x])
		print(x, data[x], curr[x])
		name.nettransaction=str(data[x])
		db.session.commit()
	print(ans)
	db.session.commit()
	return str(ans)

@mod_dashboard.route('/checknet',methods=['GET'])
def net():
	x = User.query.all()
	for i in x:
		print(i.nettransaction)
	return "done"


#@mod_dashboard.route('/findpays/<tid>',methods=['GET'])
def finding(tid):
	data = Pay.query.filter(Pay.t_id==tid).all()
	x = []
	for i in data:
		a={}
		a['t_id']=i.t_id
		a['pay_by']=i.pay_by
		a['pay_to']=i.pay_to
		a['amount']=i.amount
		a['status']=i.status
		x.append(a)
	return x

@mod_dashboard.route('/getusertranszero',methods=['GET'])
def usertranszero():
	y=[]
	x=[]
	data = Pay.query.filter(and_(or_(Pay.pay_to==session['user_name'],Pay.pay_by==session['user_name'])),Pay.status==0).all()
	for i in data:
		x.append(i.t_id)

	x = list(set(x))
	
	for i in x:
		y.append(finding(i))
	
	print(y)
	return jsonify(y)

@mod_dashboard.route('/getusertrans',methods=['GET'])
def usertrans():
	y=[]
	x=[]
	data = Pay.query.filter(or_(Pay.pay_to==session['user_name'],Pay.pay_by==session['user_name'])).all()
	for i in data:
		x.append(i.t_id)

	x = list(set(x))
	
	for i in x:
		y.append(finding(i))
	
	print(y)
	return jsonify(y)

@mod_dashboard.route('/settle',methods=['GET'])
def settled():
	x = []
	data = Pay.query.filter(and_(or_(Pay.pay_to==session['user_name'],Pay.pay_by==session['user_name'])),Pay.status==0).all()
	for i in data:
		x.append(i.t_id)

	x = list(set(x))

	y=[]
	for i in x:
		h = Transaction.query.filter(Transaction.tid==i).first()
		a={}
		a['tid']=h.tid
		a['bill_amount']=h.bill_amount
		a['date']=h.date
		a['creator']=h.creator
		a['description']=h.description
		y.append(a)
	return jsonify(y)



@mod_dashboard.route('/history',methods=['GET'])
def history():
	x=[]
	data = Pay.query.filter(or_(Pay.pay_to==session['user_name'],Pay.pay_by==session['user_name'])).all()
	for i in data:
		x.append(i.t_id)

	x = list(set(x))

	y=[]
	for i in x:
		h = Transaction.query.filter(Transaction.tid==i).first()
		a={}
		a['tid']=h.tid
		a['bill_amount']=h.bill_amount
		a['date']=h.date
		a['creator']=h.creator
		a['description']=h.description
		y.append(a)
	return jsonify(y)
		

@mod_dashboard.route('/settleup',methods=['POST'])
def tosettle():
	t_id=request.form['tid']
	pay_by=request.form['pay_by']
	pay_to=request.form['pay_to']
	data = Pay.query.filter(and_(and_(Pay.pay_to==pay_to,Pay.t_id==t_id)),Pay.pay_by==pay_by).first()
	data.status = 1
	byuser = User.query.filter(User.username==pay_by).first()
	touser = User.query.filter(User.username==pay_to).first()
	jsonby = json(byuser.nettransaction)
	jsonto = json(touser.nettransaction)
	jsonto[str(pay_by)]+=float(data.amount)
	jsonby[str(pay_to)]-=float(data.amount)
	byuser.nettransaction = str(jsonby)
	touser.nettransaction = str(jsonto)
#	data.amount=0
	db.session.commit()
	return "Done"

@mod_dashboard.route('/deleteup',methods=['POST'])
def todelete():
	tid = request.form['tid']
	data = Pay.query.filter(Pay.t_id==tid).all()
	for i in data:
		byuser = User.query.filter(User.username==i.pay_by).first()
		touser = User.query.filter(User.username==i.pay_to).first()
		jsonby = json(byuser.nettransaction)
		jsonto = json(touser.nettransaction)
		if i.status == 0:
			jsonto[str(i.pay_by)]+=float(i.amount)
			jsonby[str(i.pay_to)]-=float(i.amount)
			byuser.nettransaction = str(jsonby)
			touser.nettransaction = str(jsonto)
		db.session.delete(i)
		db.session.commit()
	data = Transaction.query.filter(Transaction.tid==tid).first()
	print(data)
	db.session.delete(data)
	db.session.commit()
	print("Done Delete")
	return "Done"

'''
@mod_dashboard.route('/delete',methods=['GET'])
def deletepay():
	x = Pay.query.all()
	for i in x:
		db.session.delete(i)
		db.session.commit()

	x = Pay.query.all()
	return jsonify(x)
'''
@mod_dashboard.route('/dashing',methods=['GET'])
def dashing():
	user=User.query.filter(User.username==session['user_name']).first()
	recent=user.nettransaction
	recent=json(recent)
	return jsonify(recent)





    
'''@mod_dashboard.route('/seepay',methods=['POST'])
def see_dashboard():
	username=request.form["username"]
	user=Pay.query.filter(or_(Pay.pay_to==username,Pay.pay_for==username))
	a,b=[],{}
	for i in user:
		c={}
		c['']
	return jsonify(a)


'''
'''@mod_dashboard.route('/login', methods=['POST'])
def login():
#    try:
#       email = request.form['email']
#       password = request.form['password']
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 400

    dashboard = User.query.filter(User.email == email).first()
    if dashboard is None or not dashboard.check_password(password):
        return jsonify(success=False, message="Invalid Credentials"), 400

    session['dashboard_id'] = dashboard.id

    return jsonify(success=True, dashboard=dashboard.to_dict())

@mod_dashboard.route('/logout', methods=['POST'])
def logout():
    session.pop('dashboard_id')
    return jsonify(success=True)

@mod_dashboard.route('/register', methods=['POST'])
def create_dashboard():
    try:
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 400

    if '@' not in email:
        return jsonify(success=False, message="Please enter a valid email"), 400

    u = User(name, email, password)
    db.session.add(u)
    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(success=False, message="This email already exists"), 400

    return jsonify(success=True)'''
