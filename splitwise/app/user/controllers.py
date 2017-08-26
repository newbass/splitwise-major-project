from flask import *
from sqlalchemy.exc import IntegrityError
from app import db
from app.user.models import User
import random,string
from random import randint
from .math import *

mod_user = Blueprint('user', __name__)

@mod_user.route('/addUser',methods=['POST'])
def add_user():
	print('started')
	first_name = request.form["first_name"]
	token = request.form["token"]
	last_name = request.form["last_name"]
	password = request.form["password"]
	username = request.form["username"]
	gender = request.form["gender"]
	country = request.form["country"]
	mobile= request.form["mobile"]
	email = request.form["email"]
	date = request.form["date"]
	month = request.form["month"]
	year = request.form["year"]
	print(session['csrf_token'], token)
	if str(session['csrf_token'])!=str(token):
		return redirect('/home')
	print(username, first_name, last_name, email, mobile, month, date, year, country, gender, password)
	user=User(username,first_name,last_name,email,mobile,month,date,year,country,gender,password)
	print('reached')
	db.session.add(user)
	db.session.commit()
	return "You have signed in successfully"

@mod_user.route('/deleteuser', methods=['GET'])
def deluser():
	data = User.query.all()
	for i in data:
		i.nettransaction = '{}'
		i.history = ''
		i.friends = ''
		db.session.commit()
	return "chodu"
	

@mod_user.route('/usercheck', methods=['GET'])
def userche():
	x = User.query.all()
	print(x)
	for i in x:
		print(i.mobile)
	return "done"


@mod_user.route('/', methods=['GET'])
def home():
	if 'user_name' in session:
		return redirect ('/dash')
	
	return render_template('home.html')

@mod_user.route('/home', methods=['GET'])
def h():
	if 'user_name' in session:
		return redirect ('/dash')
	
	return redirect('/homepage')

@mod_user.route('/homepage', methods=['GET'])
def homepage():
	if 'csrf_token' not in session:
		session['csrf_token']=gene()
		
	if not session['csrf_token']:
		session['csrf_token']=gene()
	else: 
		session.pop('csrf_token')
		session['csrf_token']=gene()
	if 'user_name' in session:
		return redirect ('/dash')
	
	return render_template('homepage.html',token=session['csrf_token'])

@mod_user.route('/dash', methods=['GET'])
def dash():
	if 'user_name' not in session:
		return redirect('/home')
	return redirect('/dashboard')

@mod_user.route('/dashboard', methods=['GET'])
def dashboard():
	session['csrf_token']=gene()
	if 'user_name' not in session:
		return redirect('/home')
	user = User.query.filter(User.username==session['user_name']).first()
	return render_template('dashboard.html',user=user)

@mod_user.route('/reset', methods=['GET'])
def reset():
	return render_template('reset.html')

@mod_user.route('/reset', methods=['POST'])
def re():
	username=request.form['username']
	newp=request.form['password']
	user=User.query.filter(User.username==username).first()
	user.password=newp
	db.session.commit()
	return redirect('/')

@mod_user.route('/user', methods=['POST'])
def get_users():
	print('in user')
	user=request.form['user']
	u=User.query.filter(User.username==user).first()
	if u:
		return "False"
	else:
		return "True"

@mod_user.route('/users', methods=['GET'])
def get():
	u=User.query.all()
	a=[]
	for i in u:
		a.append(i.username)
	return jsonify(a)

@mod_user.route('/user', methods=['GET'])
def get_user():
	return jsonify(session['user_name'])

'''@mod_user.route('/login', methods=['POST'])
def login():
    try:
        email = request.form['email']
        password = request.form['password']
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 400

    user = User.query.filter(User.email == email).first()
    if user is None or not user.check_password(password):
        return jsonify(success=False, message="Invalid Credentials"), 400

    session['user_id'] = user.id

    return jsonify(success=True, user=user.to_dict())

@mod_user.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id')
    return jsonify(success=True)

@mod_user.route('/register', methods=['POST'])
def create_user():
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
