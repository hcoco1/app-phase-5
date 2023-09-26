#!/usr/bin/env python3

# Import necessary modules and packages
from flask import request, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User
from datetime import datetime
from sqlalchemy.exc import IntegrityError

# Secret key for Flask application (note: in a real-world application, this should be stored securely)
app.secret_key = 'Ivan-743089723098475r2prwfhlsdnflsdf'

class Signup(Resource):
    def post(self):
        """
        Endpoint to register a new user
        """

        # Get the JSON payload from the request
        json = request.get_json()

        # Check if all necessary fields are provided in the JSON payload
        required_fields = ["first_name", "last_name", "email", "password"]
        missing_fields = [field for field in required_fields if field not in json]
        if missing_fields:
            return {"Message": f"Missing fields: {', '.join(missing_fields)}"}, 422
        
        # Convert birth_date from string to datetime object if provided
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

        # Try saving the new user in the database
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

class SignIn(Resource):
    def post(self):
        """
        Endpoint to sign in a user
        """

        json = request.get_json()

        # Check if email and password are provided
        if not json.get('email') or not json.get('password'):
            return {"Message": "Email and password are required."}, 400

        # Fetch the user from the database by email
        user = User.query.filter_by(email=json['email']).first()

        # If user doesn't exist or password is wrong
        if not user or not user.verify_password(json['password']):
            return {"Message": "Invalid email or password."}, 401

        # If user exists and password is correct, set session and return user details
        session['user_id'] = user.id
        return {
            "Message": "Logged in successfully.",
            "id": user.id,
            "email": user.email
        }, 200

# Define a resource to check the session for the logged-in user's details
class CheckSession(Resource):
    def get(self):
        """
        Endpoint to check if the user is currently logged in
        """

        # Get the user from the database using the user ID in the session
        user = User.query.filter(User.id == session.get('user_id')).first()
        
        if user:
            # If user is found, return the user's details with a 200 OK status
            return {
                "id" : user.id,
                "first_name" : user.first_name,
                "photo_url" : user.photo_url,
                "privacy_settings" : user.privacy_settings
            }, 200
        else:
            # If no user is found, return an unauthorized message with a 401 status
            return {"Message": "Unauthorized"}, 401 

class SignOut(Resource):
    def delete(self):
        """
        Endpoint to sign out a user
        """

        # Check if a user is logged in and then log them out
        if session.get("user_id"):
            session['user_id'] = None
            return {}, 204

        # If no user is logged in, return an unauthorized message with a 401 status
        return {"message": "unauthorized"}, 401
    
class UserList(Resource):
    def get(self):
        """
        Endpoint to get all users
        """

        # Get all users from the database
        users = User.query.all()

        # Return the users as a list of dictionaries
        return [{
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "photo_url": user.photo_url,
            "birth_date": str(user.birth_date) if user.birth_date else None,
            "privacy_settings": user.privacy_settings
        } for user in users], 200

        


# Adding the resources to the API
api.add_resource(UserList, '/users')
api.add_resource(CheckSession, '/check_session')
api.add_resource(SignOut, '/sign_out')
api.add_resource(SignIn, '/signin', endpoint='signin')
api.add_resource(Signup, '/signup', endpoint='signup')

# Start the Flask application
if __name__ == '__main__':
    app.run(port=5000, debug=True)
