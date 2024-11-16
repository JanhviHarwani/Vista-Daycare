from core.events_service import get_events_for_date
from core.utils import extract_date
from datetime import datetime


def get_event_info(message):
    """
    Identifies the date in the message and gets the events for the particular date
    """
    date = extract_date(message)
    events = get_events_for_date(date)
    today = datetime.today().strftime("%Y-%m-%d")
    if events:
        event_list = "\n".join(
            [
                f"{event['event_name']} ({event['start_time']} - {event['end_time']})"
                for event in events
            ]
        )
        if date == today:
            return f"Here are the events for today: {event_list}"
        else:
            return f"Here are the events for the given date: {event_list}"
    else:
        return f"Sorry, no events found for {date}."
