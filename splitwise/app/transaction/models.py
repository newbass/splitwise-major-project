from flask_sqlalchemy import *
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime as d
from sqlalchemy import *

class Transaction(db.Model):
	__tablename__='transaction'
	tid=db.Column(db.Integer,primary_key=True)
	pay_for=db.Column(db.String,nullable=False)
	pay_by=db.Column(db.String,nullable=False)
	description=db.Column(db.String,nullable=False)
	bill_amount=db.Column(db.Float,nullable=False)
	creator=db.Column(db.String,nullable=False)
	date=db.Column(db.String)
	
	def __init__(self, pay_by, pay_for, description, creator, bill_amount, date):
		self.pay_by=pay_by
		self.pay_for=pay_for	
		self.description=description
		self.bill_amount=bill_amount
		self.creator=creator
		self.date=date

	def __repr__(self):
#		return "%d" %tid
		return "%s %s" %(self.date, self.creator)
