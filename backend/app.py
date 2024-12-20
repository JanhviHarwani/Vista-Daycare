import os
import sys
import jwt
import datetime
from flask import Flask, jsonify, request
from functools import wraps
from core.meal_service import (
    get_meals_for_date,
    get_all_meals,
    insert_meal,
    delete_meal,
    update_meal,
)
from core.events_service import (
    get_events_for_date,
    get_all_events,
    get_upcoming_events,
    insert_event,
    delete_event,
    update_event,
)
from core.user_service import (
    authenticate_user,
    create_user,
    create_superuser,
    create_token,
)
from core.contact_service import (
    add_new_contact,
    get_all_contacts,
    delete_existing_contact,
)
from core.metrics_service import (
    log_visit,
    get_visits_for_day,
)
from core.utils import (
    is_valid_date,
    is_valid_time,
    get_current_date,
)
from chatbot.entity_identifier import handle_new_message
from config import Config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = Config.JWT_SECRET_KEY


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return jsonify({"error": "Token is missing!"}), 403
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = data["username"]
            role = data["role"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token!"}), 403
        return f(current_user, role, *args, **kwargs)

    return decorated_function


@app.route("/login", methods=["POST"])
def login():
    """Admin login to get a JWT token."""
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Missing username or password"}), 400

    username = data["username"]
    password = data["password"]

    user = authenticate_user(username, password)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_token(username, user)

    return jsonify({"token": token}), 200


@app.route("/register", methods=["POST"])
@token_required
def register(current_user, role):
    """Register a new admin user (only superuser can create new users)."""
    if role != "superuser":
        return jsonify({"error": "Unauthorized to create new users"}), 403

    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Missing username or password"}), 400

    username = data["username"]
    password = data["password"]

    result, status_code = create_user(username, password)
    return jsonify(result), status_code


@app.route("/meal/<meal_date>", methods=["GET"])
def meals_for_date(meal_date):
    """Fetch meals for a specific date."""
    meals = get_meals_for_date(meal_date)
    return jsonify(meals), 200


@app.route("/meals/all", methods=["GET"])
def get_all_meals_endpoint():
    """Fetch all meals sorted by meal date."""
    meals = get_all_meals()
    return jsonify(meals), 200


@app.route("/meals", methods=["POST"])
@token_required
def insert_meal_endpoint(current_user, role):
    """Insert one or more meals into the database."""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    if not data or "meal_date" not in data or "meal_name" not in data:
        return jsonify({"error": "Missing meal date or name"}), 400

    meal_date = data["meal_date"]
    meals = data["meal_name"]
    quantity = data.get("quantity", "1pc")

    if not is_valid_date(meal_date):
        return jsonify({"error": "Please enter date in the format yyyy-mm-dd"}), 400

    result, status_code = insert_meal(meal_date, meals, quantity)
    return jsonify(result), status_code


@app.route("/meals", methods=["DELETE"])
@token_required
def delete_meal_endpoint(current_user, role):
    """Delete meals from the database."""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    if not data or "meal_date" not in data or "meal_name" not in data:
        return jsonify({"error": "Missing meal date or name"}), 400

    meal_date = data["meal_date"]
    meals = data["meal_name"]
    if not is_valid_date(meal_date):
        return jsonify({"error": "Please enter date in the format yyyy-mm-dd"}), 400
    result, status_code = delete_meal(meal_date, meals)
    return jsonify(result), status_code


@app.route("/events/all", methods=["GET"])
def get_all_events_endpoint():
    """Gets all events from the database."""
    events = get_all_events()
    return jsonify(events), 200


@app.route("/event/<event_date>", methods=["GET"])
def get_events(event_date):
    """Gets events for the particular date from the database."""
    events = get_events_for_date(event_date)
    return jsonify(events), 200


@app.route("/events/upcoming", methods=["GET"])
def upcoming_events():
    """Gets events from database that occur after today database."""
    events = get_upcoming_events()
    return jsonify(events), 200


@app.route("/event", methods=["POST"])
@token_required
def create_event(current_user, role):
    """Insert one or more events into the database."""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403
    data = request.get_json()
    if (
        not data
        or "event_date" not in data
        or "event_name" not in data
        or "start_time" not in data
        or "end_time" not in data
    ):
        return jsonify({"error": "Missing required fields"}), 400

    event_date = data["event_date"]
    event_name = data["event_name"]
    start_time = data["start_time"]
    end_time = data["end_time"]
    is_highlight = data.get("isHighlight", False)

    if not is_valid_date(event_date):
        return jsonify({"error": "Please enter date in format yyyy-mm-dd"}), 400
    if not is_valid_time(start_time):
        return jsonify({"error": "Please enter start_time in HH:MM format"}), 400
    if not is_valid_time(end_time):
        return jsonify({"error": "Please enter end_time in HH:MM format"}), 400

    result = insert_event(event_date, event_name, start_time, end_time, is_highlight)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500


@app.route("/event", methods=["DELETE"])
@token_required
def delete_event_endpoint(current_user, role):
    """Deletes events from the database."""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    if not data or "event_date" not in data or "event_name" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    event_date = data["event_date"]
    event_name = data["event_name"]

    if not is_valid_date(event_date):
        return jsonify({"error": "Please enter date in format yyyy-mm-dd"}), 400

    result = delete_event(event_date, event_name)
    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500


@app.route("/event", methods=["PUT"])
@token_required
def update_event_endpoint(current_user, role):
    """Updates events database."""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403
    data = request.get_json()

    if (
        not data
        or "event_date" not in data
        or "event_name" not in data
        or "start_time" not in data
        or "end_time" not in data
    ):
        return jsonify({"error": "Missing required fields"}), 400
    event_date = data["event_date"]
    event_name = data["event_name"]
    start_time = data["start_time"]
    end_time = data["end_time"]
    is_highlight = data.get("isHighlight", False)

    if not is_valid_date(event_date):
        return jsonify({"error": "please enter date of format yyyy-mm-dd"}), 400
    if not is_valid_time(start_time):
        return jsonify({"error": "please enter time of HH:MM"}), 400
    if not is_valid_time(end_time):
        return jsonify({"error": "please enter time of HH:MM"}), 400
    result = update_event(event_date, event_name, start_time, end_time, is_highlight)
    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500


@app.route("/contact", methods=["POST"])
def add_contact():
    """Adds contact into the database."""
    data = request.get_json()
    current_date = get_current_date()
    if "name" not in data or "phone" not in data or "email" not in data:
        return jsonify({"error": "Missing required fields"}), 400
    result = add_new_contact(current_date, data["name"], data["phone"], data["email"])
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 201


@app.route("/contact", methods=["GET"])
@token_required
def get_contacts(current_user, role):
    """Gets all contacts from the database"""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403
    result = get_all_contacts()
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 200


@app.route("/contact", methods=["DELETE"])
@token_required
def delete_contact(current_user, role):
    """Deletes contacts from the database"""
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Unauthorized"}), 403
    data = request.get_json()
    if "date" not in data or "name" not in data:
        return jsonify({"error": "Missing required fields: date and/or name"}), 400
    if not is_valid_date(data["date"]):
        return jsonify({"error": "please enter date of format yyyy-mm-dd"}), 400
    result = delete_existing_contact(data["date"], data["name"])
    if "error" in result:
        return jsonify(result), 500
    return jsonify(result), 200


@app.route('/log_visit', methods=['POST'])
def log_visit_route():
    """API route to log a visit to a page."""
    data = request.get_json()
    page_name = data.get("page_name")
    if not page_name:
        return jsonify({"error": "Page name is required"}), 400

    try:
        visit_id, message = log_visit(page_name)
        return jsonify({"visit_id": visit_id, "message": message}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_visits', methods=['GET'])
@token_required
def get_visits_route(current_user, role):
    """API route to get all visits for a given date."""
    target_date = request.args.get("date")
    if not date and not is_valid_date(target_date):
        return jsonify({"error": "Date is required (format: YYYY-MM-DD)"}), 400
    try:
        visits = get_visits_for_day(target_date)
        return jsonify({"date": target_date, "visits": visits}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/chat", methods=["POST"])
def chat():
    """Handles user chatbot"""
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"response": "Please provide a valid message."}), 400

    response_message = handle_new_message(user_message)
    return jsonify({"response": response_message}), 201


if __name__ == "__main__":
    create_superuser()
    app.run(debug=True, host="0.0.0.0", port=5001)
