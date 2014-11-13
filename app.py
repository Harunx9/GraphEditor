# coding: utf-8
from flask import Flask, render_template, jsonify, request, abort
from flask.ext.restless import APIManager
from flask.ext.admin import Admin
from flask.ext.admin.contrib.sqla import ModelView
from models.models import db,  User, Scheme, Log

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['UPLOAD_FOLDER'] = '/uploads'
app.secret_key='223322343242'
db.init_app(app)
db.app = app
db.create_all()
admin = Admin(app)
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Scheme, db.session))
admin.add_view(ModelView(Log, db.session))


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/userlogin', methods=['POST'])
def login():
    user_name = request.json['name']
    user_password = request.json['password']
    user = User.query.filter_by(name=user_name, password=user_password).first()
    if user is not None:
        if user.name == user_name and user.password == user_password:
            return jsonify(user_name = user_name, isLogged=True)
    else:
        return abort(404)


manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Scheme, methods=['GET', 'POST', 'PUT', 'DELETE'], exclude_columns=['user'])
manager.create_api(User, methods=['POST'], exclude_columns=['schemes'])
manager.create_api(Log, methods=['GET'])


if __name__ == '__main__':
    app.debug = True
    app.run()
