from wtforms import Form, StringField, PasswordField, DateField, validators

class UserForm(Form):
    first_name = StringField('First Name', [validators.Length(max=50)])
    last_name = StringField('Last Name', [validators.Length(max=50)])
    email = StringField('Email', [validators.Length(max=100), validators.Email()])
    password = PasswordField('Password', [validators.Length(min=8)])
    photo_url = StringField('Photo URL', [validators.URL(), validators.Length(max=512)])
    birth_date = DateField('Birth Date', format='%Y-%m-%d')
    privacy_settings = StringField('Privacy Settings', [validators.Length(max=100)])
