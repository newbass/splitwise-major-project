from flask import *
from sqlalchemy.exc import *
from app import db
from app.user.models import *
from sqlalchemy import *
from ast import literal_eval as json

mod_friend = Blueprint('friend', __name__)

@mod_friend.route('/addFriend',methods=['POST'])
def add_friend():
	friend=request.form['friend']
	user=User.query.filter(User.username==session['user_name']).first()
	frnd=User.query.filter(or_(User.username==friend,User.email==friend)).first()
	if user is not None and frnd is not None and user!=frnd:
		user.friends+=','+frnd.username
		frnd.friends+=','+user.username
		x = json(user.nettransaction)
		y = json(frnd.nettransaction)
		if frnd.username not in x:
			x[frnd.username] = 0
		if user.username not in y:
			y[user.username] = 0
		user.nettransaction = str(x)	
		frnd.nettransaction = str(y)	
		db.session.commit()
		return "Friend added successfully"
	else:
		return "Unsuccessful"

@mod_friend.route('/friends',methods=['GET'])
def friend():
	user=User.query.filter(User.username==session['user_name']).first()
	print(user.friends)
	a=[]
	p=user.friends[1:].split(',')
	print(p)
	return jsonify(p)
	for i in p:
		b={}
		b['friend']=p
		a.append(b)
	return jsonify(a)

		
		
