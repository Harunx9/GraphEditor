from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from datetime import datetime

db = SQLAlchemy()


class Scheme(db.Model):
    id = Column(Integer, primary_key=True)
    scheme_name = Column(String(255), unique=True)
    scheme_body = Column(Text)
    creation_date = Column(DateTime)
    deleted = Column(Boolean)

    def __init__(self, scheme_name=''):
        self.scheme_name = scheme_name
        self.datetime = datetime.utcnow()

    def __repr__(self):
        return '<Scheme %r>' % (self.scheme_name)


class User(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    password = Column(String(255))
    admin = Column(Boolean)

    def __init__(self, name='', password=''):
        self.name = name
        self.password = password

    def __repr__(self):
        return '<User %r Password %r>' % (self.name, self.password)


class ChangeLog(db.Model):
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    changes = Column(Text)

    def __init__(self, changes=''):
        self.date = datetime.utcnow()
        self.changes = changes

    def __repr__(self):
        return '<ChangeLog %r Date %r>' % (self.changes, self.date)
