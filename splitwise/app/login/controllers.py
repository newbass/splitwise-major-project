from flask import *
from app import *
from app.user.models import *
from flask_sqlalchemy import *
from sqlalchemy import *

mod_login = Blueprint('login', __name__)

@mod_login.route('/login', methods=['POST'])
def signin():
	print('inside login')
	try:
		info=request.form['email']
		token=request.form['token']
		p=request.form['password']
		print(session['csrf_token'])
		print(token)
		if str(session['csrf_token']) != str(token):
			print('failed login')
			return redirect('/home')
	except KeyError as e:
		return "Missing Credentials"
	user=User.query.filter(or_(or_(User.username==info,User.email==info),User.mobile==info)).first()
	if user is None or not user.check_password(p):
		return "Invalid Credentials"
	session['user_name'] = user.username
	print(user)
	return ""
#	return render_template('dashboard.html',user=user)

@mod_login.route('/logout', methods=['GET'])
def signout():
	print('in logout')
	session.pop('user_name')
	return ""

@mod_login.route('/login', methods=['GET'])
def check_login():
	if 'user_name' in session:
		return jsonify(success=True)
	return jsonify(success=False), 401

@mod_login.route('/login/<id>', methods=['GET'])
@requires_auth
def get_login(id):
    user_id = session['user_id']
    login = Todo.query.filter(Todo.id == id, Todo.user_id == user_id).first()
    if login is None:
        return jsonify(success=False), 404
    else:
        return jsonify(success=True, login=login.to_dict())

@mod_login.route('/login/<id>', methods=['POST'])
@requires_auth
def edit_login(id):
    user_id = session['user_id']
    login = Todo.query.filter(Todo.id == id, Todo.user_id == user_id).first()
    if login is None:
        return jsonify(success=False), 404
    else:
        login.title = request.form['title']
        login.text = request.form['text']
        login.color = request.form['color']
        db.session.commit()
        return jsonify(success=True)

@mod_login.route('/login/<id>/done', methods=['POST'])
@requires_auth
def mark_done(id):
    user_id = session['user_id']
    login = Todo.query.filter(Todo.id == id, Todo.user_id == user_id).first()
    if login is None:
        return jsonify(success=False), 404
    else:
        login.done = True
        db.session.commit()
        return jsonify(success=True)


@mod_login.route('/login/<id>/delete', methods=['POST'])
@requires_auth
def delete_login(id):
    user_id = session['user_id']
    login = Todo.query.filter(Todo.id == id, Todo.user_id == user_id).first()
    if login is None:
        return jsonify(success=False), 404
    else:
        db.session.delete(login)
        db.session.commit()
        return jsonify(success=True)
