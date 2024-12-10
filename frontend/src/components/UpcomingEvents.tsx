// UpcomingEvents.tsx
import React, { useState, useEffect } from "react";
import css from "./upcomingEvents.module.css";
import axiosInstance from "../lib/axiosInstance";
import { Event } from "../types/common";
import { getErrorMessage } from "../lib/errorHandling";
import { showError } from "../lib/toast";

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const formatDate = (dateString: string, timeString: string) => {
    const date = new Date(dateString + "T00:00:00Z");
    const month = new Date(date.toISOString())
      .toLocaleString("default", {
        month: "short",
        timeZone: "UTC",
      })
      .toUpperCase();

    const day = new Date(date.toISOString()).getUTCDate();
    // Format time
    const [hours, minutes] = timeString.split(":");
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    const hour12 = parseInt(hours) % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;

    return {
      month,
      day,
      fullDate: `${month} ${day}, ${formattedTime}`,
    };
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Event[]>("/events/upcoming");
      setEvents(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!initialized) {
      loadEvents();
      setInitialized(true);
    }
  }, [initialized]);

  // Function to get emoji for events
  const getEventEmoji = (index: number) => {
    const emojis = ["🎨", "🌿", "🎮", "🎵", "🎪", "🎯"];
    return emojis[index % emojis.length];
  };

  return (
    <section className={css.events_section}>
      <div className={css.content_wrapper}>
        <h2 className={css.title}>
          Upcoming Events
          <div className={css.title_underline}></div>
        </h2>

        {loading ? (
          <div className={css.loading_container}>Loading events...</div>
        ) : (
          <div className={css.events_container}>
            {events.length > 0 ? (
              events.map((event, index) => {
                return (
                  <div
                    key={`${event.event_name}-${event.event_date}-${event.start_time}`}
                    className={css.event_card}
                  >
                    <div className={css.date_circle}>
                      <div className={css.circle_backdrop}></div>
                      <div className={css.date_content}>
                        <span className={css.month}>
                          {formatDate(event.event_date, event.end_time).month}
                        </span>
                        <span className={css.day}>
                          {formatDate(event.event_date, event.end_time).day}
                        </span>
                      </div>
                    </div>

                    <div className={css.event_info}>
                      <h3 className={css.event_title}>{event.event_name}</h3>
                      <p className={css.event_time}>
                        {formatDate(event.event_date, event.end_time).fullDate}
                      </p>
                    </div>

                    <div className={css.icon}>{getEventEmoji(index)}</div>
                    <div className={css.hover_effect}></div>
                  </div>
                );
              })
            ) : (
              <div className={css.no_events_container}>
                <p className={css.no_events_text}>No upcoming events</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
