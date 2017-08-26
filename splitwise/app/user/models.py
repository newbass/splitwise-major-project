from flask_sqlalchemy import SQLAlchemy
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
	__tablename__='login'
	name=db.Column(db.String(80),nullable=False)
	password=db.Column(db.String,nullable=False)
	email=db.Column(db.String,nullable=False,unique=True)
	username=db.Column(db.String,unique=True,primary_key=True)
	country=db.Column(db.String(120),nullable=False)
	dob=db.Column(db.String(120),nullable=False)
	gender=db.Column(db.String(120),nullable=True)
	mobile=db.Column(db.Integer,nullable=False)
	friends=db.Column(db.String)
	history=db.Column(db.String)
	nettransaction=db.Column(db.String)
	
	def __init__(self, username, first_name, last_name, email, mobile, month, date, year, country, gender,password):
		self.name=first_name+" "+last_name
		self.email=email
		self.username=username
		self.mobile=mobile
		self.friends=''
		self.gender=gender
		self.country=country
		self.dob=date+'-'+month+'-'+year
		self.password = generate_password_hash(password)
		self.nettransaction = '{}'
		self.history = ''
        
	def check_password(self, password):
		return check_password_hash(self.password, password)
    
	def __repr__(self):
		return "<User %s %s>" % (self.username, self.email)
