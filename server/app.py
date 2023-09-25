#!/usr/bin/env python3
from flask import request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User
from datetime import datetime
from sqlalchemy.exc import IntegrityError


app.secret_key = 'Ivan-743089723098475r2prwfhlsdnflsdf'

class Signup(Resource):


    def post(self):
        # Get the JSON payload from the request
        json = request.get_json()

        # Check if all necessary fields are provided in the JSON payload
        required_fields = ["first_name", "last_name", "email", "password"]
        missing_fields = [field for field in required_fields if field not in json]
        if missing_fields:
            return {"Message": f"Missing fields: {', '.join(missing_fields)}"}, 422
        
        birth_date_str = json.get('birth_date')
        birth_date = datetime.strptime(birth_date_str, '%Y-%m-%d').date() if birth_date_str else None

        # Check if user with the provided email already exists
        existing_user = User.query.filter_by(email=json['email']).first()
        if existing_user:
            return {"Message": "Email already registered"}, 400

        # Create a new user with the provided details
        user = User(
            first_name=json['first_name'],
            last_name=json['last_name'],
            email=json['email'],
            photo_url=json.get('photo_url', None),
            birth_date=birth_date,
            privacy_settings=json.get('privacy_settings', None)
        )
        user.password = json['password']

        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return {"Message": "Email already registered"}, 400

        # Set the user ID in the session to indicate the user is logged in
        session['user_id'] = user.id

        # Return the newly created user's details with a 201 Created status
        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "photo_url": user.photo_url,
            "birth_date": str(user.birth_date) if user.birth_date else None,
            "privacy_settings": user.privacy_settings
        }, 201

# Adding the resource to the API
api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
