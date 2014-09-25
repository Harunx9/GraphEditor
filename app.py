# coding: utf-8
from flask import Flask, render_template
from flask.ext.restless import APIManager
from models.models import db,  User, Scheme

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['UPLOAD_FOLDER'] = '/uploads'
db.init_app(app)
db.app = app
db.create_all()


@app.route('/')
def home():
    return render_template('index.html')

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Scheme, methods=['GET', 'POST'])
manager.create_api(User, methods=['PUT', 'GET'])


if __name__ == '__main__':
    app.debug = True
    app.run()
