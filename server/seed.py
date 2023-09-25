#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User, db

fake = Faker()

def create_random_user():
    """Generate a random user using Faker."""
    u = User()
    u.first_name = fake.first_name()
    u.last_name = fake.last_name()
    u.email = fake.email()
    u._password_hash = fake.sha256()  # this is a simple fake hash for demonstration, replace with actual hashing method
    u.photo_url = fake.image_url()
    u.birth_date = fake.date_of_birth(minimum_age=18, maximum_age=80)
    u.join_date = fake.date_this_decade()
    u.last_login = fake.date_this_month()
    u.privacy_settings = rc(['public', 'private', 'friends_only'])
    
    return u

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        
        # Create 100 random users
        for _ in range(100):
            user = create_random_user()
            db.session.add(user)
        
        # Commit the changes to the database
        db.session.commit()
        
        print("Seeding completed!")

