import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import styles from "./Calendar.module.css";
import {
  Meal,
  Event,
  CalendarViewProps,
  monthNames,
  weekDays,
} from "../types/common";
interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events?: Event[];
  meals?: Meal[];
}
type ViewType = "events" | "meals";
const CalendarView: React.FC<CalendarViewProps> = ({ events, meals }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<ViewType>("events");

  useEffect(() => {
    generateCalendarDays();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, events, meals]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const prevMonthDays = firstDay.getDay();

    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month, -i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split("T")[0];

      days.push({
        date,
        isCurrentMonth: true,
        events: events[dateStr] || [],
        meals: meals[dateStr] || [],
      });
    }

    setCalendarDays(days);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Calendar className={styles.icon} />
          <h2 className={styles.title}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        <div className={styles.controls}>
          <button onClick={goToToday} className={styles.todayButton}>
            Today
          </button>
          <button onClick={goToPrevMonth} className={styles.navButton}>
            ←
          </button>
          <button onClick={goToNextMonth} className={styles.navButton}>
            →
          </button>
        </div>
      </div>

      <div className={styles.toggleContainer}>
        <button
          className={`${styles.toggleButton} ${
            viewType === "events" ? styles.active : ""
          }`}
          onClick={() => setViewType("events")}
        >
          Events
        </button>
        <button
          className={`${styles.toggleButton} ${
            viewType === "meals" ? styles.active : ""
          }`}
          onClick={() => setViewType("meals")}
        >
          Meals
        </button>
        <div
          className={`${styles.slider} ${
            viewType === "meals" ? styles.sliderRight : ""
          }`}
        />
      </div>

      <div className={styles.grid}>
        {weekDays.map((day) => (
          <div key={day} className={styles.weekdayHeader}>
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dayClasses = [
            styles.day,
            !day.isCurrentMonth ? styles.otherMonth : "",
            day.date.toDateString() === new Date().toDateString()
              ? styles.today
              : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={index} className={dayClasses}>
              <div className={styles.dayNumber}>{day.date.getDate()}</div>

              <div className={styles.eventsContainer}>
                {viewType === "events" &&
                  day.events?.map((event, i) => (
                    <div key={i} className={styles.eventItem}>
                      <div className={styles.eventTime}>
                        {event.start_time}-{event.end_time}
                      </div>
                      <div className={styles.eventName}>{event.event_name}</div>
                    </div>
                  ))}

                {viewType === "meals" &&
                  day.meals?.map((meal, i) => (
                    <div key={i} className={styles.mealItem}>
                      <div>{meal.meal_name} </div>
                      <div>- {meal.quantity}</div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
