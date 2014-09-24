from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime

db = SQLAlchemy()

class Scheme(db.Model):
    id = Column(Integer, primary_key=True)
    scheme_name = Column(String(255), unique=True)
    creation_date = Column(DateTime)
    deleted = Column(Boolean)

    def __init__(self, scheme_name):
        self.scheme_name = scheme_name
        self.datetime = datetime.utcnow()

    def __repr__(self):
        return '<Scheme %r>' % (self.scheme_name)


class User(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    password = Column(String(255))
    admin = Column(Boolean)

    def __init__(self, name, password):
        self.name = name
        self.password = password

    def __repr__(self):
        return '<User %r Password %r>'