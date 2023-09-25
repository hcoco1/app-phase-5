from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db, bcrypt   






class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
      
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(200), nullable=False)
    photo_url = db.Column(db.String(512))
    birth_date = db.Column(db.Date)
    join_date = db.Column(db.Date, default=datetime.utcnow)
    last_login = db.Column(db.Date)
    privacy_settings = db.Column(db.String(100))

    def __repr__(self):
        return f'User {self.email}, ID {self.user_id}'

    @hybrid_property
    def password(self):
        raise AttributeError("Password is not a readable attribute.")

    @password.setter
    def password(self, plain_password):
        self._password_hash = bcrypt.generate_password_hash(plain_password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

