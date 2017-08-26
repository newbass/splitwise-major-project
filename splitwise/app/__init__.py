# Import flask and template operators
from flask import *

# Import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from functools import wraps

# Define the WSGI application object
app = Flask(__name__)
cors = CORS(app)
# Configurations
app.config.from_object('config')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Sample HTTP error handling
#@app.errorhandler(404)
#def not_found(error):
#   return render_template('index.html'), 200

#@app.before_request
#def csrf_protect():
#	if request.method == "POST":
#		token = session.pop('_csrf_token', None)
#		if not token or token != request.form.get('_csrf_token'):
#	abort(403)

#def generate_csrf_token():
#	if '_csrf_token' not in session:
#		session['_csrf_token'] = some_random_string()
#	return session['_csrf_token']

#app.jinja_env.globals['csrf_token'] = generate_csrf_token

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify(message="Unauthorized", success=False), 401
        return f(*args, **kwargs)
    return decorated

# Import a module / component using its blueprint handler variable (mod_auth)
from app.user.controllers import mod_user
from app.login.controllers import mod_login
from app.friends.controllers import mod_friend
from app.dashboard.controllers import mod_dashboard

# Register blueprint(s)
app.register_blueprint(mod_user)
app.register_blueprint(mod_login)
app.register_blueprint(mod_friend)
app.register_blueprint(mod_dashboard)

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()
