from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Column, Integer, String, Boolean, DateTime, Text
from datetime import datetime

db = SQLAlchemy()


class Scheme(db.Model):
    id = Column(Integer, primary_key=True)
    scheme_name = Column(String(255), unique=True)
    scheme_body = Column(Text)
    user_name = Column(String(255), ForeignKey('user.name'))
    user = db.relationship('User', backref= db.backref('schemes', lazy='dynamic'))
    creation_date = Column(DateTime)
    deleted = Column(Boolean)

    def __init__(self, scheme_name='', scheme_body=''\
                , creation_date='', deleted='', user_name=''):
        self.scheme_name = scheme_name
        self.scheme_body = scheme_body
        self.creation_date = datetime.utcnow()
        self.deleted = deleted
        self.user_name = user_name;

    def __repr__(self):
        return ' %s ' % (self.scheme_name)


class User(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    password = Column(String(255))
    admin = Column(Boolean)

    def __init__(self, name='', password=''):
        self.name = name
        self.password = password

    def __repr__(self):
        return ' %s ' % (self.name)


class ChangeLog(db.Model):
    id = Column(Integer, primary_key=True)
    date = Column(DateTime)
    changes = Column(Text)

    def __init__(self, changes=''):
        self.date = datetime.utcnow()
        self.changes = changes

    def __repr__(self):
        return ' %s %s ' % (self.changes, self.date)
