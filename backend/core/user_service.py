# user_service.py
import bcrypt
from botocore.exceptions import ClientError
from config import Config
import jwt
import datetime

user_table = Config.init_user_table()


def check_superuser_exists():
    """Check if a superuser exists, create one if not."""
    try:
        response = user_table.get_item(
            Key={'username': Config.SUPERUSER_USERNAME})

        if 'Item' not in response:
            # Superuser doesn't exist, create one
            create_user(Config.SUPERUSER_USERNAME,
                        Config.SUPERUSER_PASSWORD, role='superuser')
    except ClientError as e:
        print(f"Error checking for superuser: {e}")
        return False


def create_superuser():
    """Create a superuser if one doesn't already exist."""
    check_superuser_exists()


def create_user(username, password, role='admin'):
    """Create a new user with the given username, password, and role."""
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    try:
        user_table.put_item(
            Item={
                'username': username,
                'password': hashed_password.decode('utf-8'),
                'role': role
            }
        )
        return {"message": "User created successfully"}, 201
    except ClientError as e:
        print(f"Error creating user: {e}")
        return {"error": "Failed to create user"}, 500


def authenticate_user(username, password):
    """Authenticate user by username and password."""
    try:
        response = user_table.get_item(Key={'username': username})
        if 'Item' in response:
            stored_password = response['Item']['password']
            if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                return response['Item']
        return None
    except ClientError as e:
        print(f"Error authenticating user: {e}")
        return None


def create_token(username, user):
    token = jwt.encode({
        'username': username,
        'role': user['role'],
        # Token expires in 1 hour
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, Config.JWT_SECRET_KEY, algorithm="HS256")
    return token
