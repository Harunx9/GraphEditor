# coding: utf-8
from flask import Flask, render_template
from flask.ext.restless import APIManager
from flask.ext.admin import Admin
from flask.ext.admin.contrib.sqla import ModelView
from models.models import db,  User, Scheme, ChangeLog

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
admin.add_view(ModelView(ChangeLog, db.session))


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/userlogin', methods=['POST'])
def login():
    pass

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Scheme, methods=['GET', 'POST'])
manager.create_api(User, methods=['PUT', 'GET','POST'])
manager.create_api(ChangeLog, methods=['GET'])


if __name__ == '__main__':
    app.debug = True
    app.run()
