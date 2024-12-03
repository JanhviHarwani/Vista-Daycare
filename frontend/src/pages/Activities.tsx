import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import ApplicationStructure from "../components/ApplicationStructure";
import styles from "./Activities.module.css";
import { GroupedEvents, Meal, Event } from "../types/common";
import CustomSpinner from "../components/Spinner";
import CalendarView from "../components/Calendar";

const Activities: React.FC = () => {
  const [events, setEvents] = useState<GroupedEvents>({});
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [meals, setMeals] = useState<{ [date: string]: Meal[] }>({});
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateDateRange = (): string[] => {
    const today = new Date();
    const dates = [];
    for (let i = -5; i <= 5; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      dates.push(formatDate(newDate));
    }
    return dates;
  };

  const fetchEvents = async () => {
    setLoadingEvents(true);
    setError(null);

    try {
      const dateRange = generateDateRange();
      const groupedEvents: GroupedEvents = {};
      const groupedMeals: { [date: string]: Meal[] } = {};

      for (const date of dateRange) {
        try {
          const response = await axiosInstance.get<Event[]>(`/event/${date}`);
          const mealData = await axiosInstance.get<Meal[]>(`/meal/${date}`);
          const sortedEvents = response.data.sort((a, b) =>
            a.start_time.localeCompare(b.start_time)
          );
          groupedEvents[date] = sortedEvents;
          groupedMeals[date] = mealData.data;
        } catch (err) {
          console.error(`Error fetching events for ${date}`, err);
        }
      }

      setEvents(groupedEvents);
      setMeals(groupedMeals);
    } catch (err) {
      console.error("Error fetching events", err);
      setError("Failed to fetch events");
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <ApplicationStructure>
      {loadingEvents ? (
        <div className={styles.loadingContainer}>
          <CustomSpinner size={60} color="#3498db" />
        </div>
      ) : (
        <div className={styles.activitiesPage}>
          <CalendarView events={events} meals={meals} />
        </div>
      )}
    </ApplicationStructure>
  );
};

export default Activities;
