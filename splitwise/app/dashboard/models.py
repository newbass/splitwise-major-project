from flask_sqlalchemy import *
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime as d
from sqlalchemy import *
from app.transaction.models import *

class Pay(db.Model):
	__tablename__='dashboard'
	main_id=db.Column(db.Integer,primary_key=True)
	t_id=db.Column(db.Integer,db.ForeignKey('transaction.tid'))
	pay_to=db.Column(db.String,nullable=False)
	pay_by=db.Column(db.String,nullable=False)
	amount=db.Column(db.Float,nullable=False)
	status=db.Column(db.Integer)

	transaction = db.relationship(Transaction)
	
	def __init__(self, pay_to, pay_by, amount, trans_id):
		self.pay_to=pay_to
		self.pay_by=pay_by	
		self.amount=amount
		self.status=0
		self.t_id=trans_id

	def __repr__(self):
		return "%s %s %s %s %d" %(self.amount, self.pay_to, self.pay_by, self.status, self.t_id)
