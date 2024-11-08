from core.events_service import get_events_for_date
from core.utils import extract_date

def get_event_info(message):
    date = extract_date(message)
    events = get_events_for_date(date)
    if events:
        event_list = "\n".join([f"{event['event_name']} ({event['start_time']} - {event['end_time']})" for event in events])
        return f"Here are the events for {date}:\n{event_list}"
    else:
        return f"Sorry, no events found for {date}."
