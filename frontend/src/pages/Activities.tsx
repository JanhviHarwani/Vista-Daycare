import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import ApplicationStructure from "../components/ApplicationStructure";
import styles from "./Activities.module.css";
import { getSignedMediaUrl } from "../lib/aws-config";
import { Events, eventsData } from "../types/common";
import CustomSpinner from "../components/Spinner";

interface Event {
  start_time: string;
  end_time: string;
  event_name: string;
  isHighlight?: boolean;
}

interface Meal {
  meal_name: string;
  quantity: string;
}

interface GroupedEvents {
  [date: string]: Event[];
}


const Activities: React.FC = () => {
  const [images, setImages] = useState<(Events & { imageUrl?: string })[]>([]);
  const [events, setEvents] = useState<GroupedEvents>({});
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);
  const [meals, setMeals] = useState<{ [date: string]: Meal[] }>({});
  const [error, setError] = useState<string | null>(null);
  const [eventsCurrentIndex, setEventsCurrentIndex] = useState(0);
  const [mealsCurrentIndex, setMealsCurrentIndex] = useState(0);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
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
    const loadImages = async () => {
      try {
        setLoadingImages(true);
        const imageWithUrls = await Promise.all(
          eventsData.map(async (eData) => ({
            ...eData,
            imageUrl: await getSignedMediaUrl(eData.imageKey),
          }))
        );
        setImages(imageWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading images:", error);
        setError("Error loading images");
      } finally {
        setLoadingImages(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);


  if (error) return <p>{error}</p>;

  const groupedDates = Object.keys(events);

  const handleEventsNext = () => {
    if (eventsCurrentIndex + 4 < groupedDates.length) {
      setEventsCurrentIndex(eventsCurrentIndex + 4);
    }
  };

  const handleEventsPrev = () => {
    if (eventsCurrentIndex - 4 >= 0) {
      setEventsCurrentIndex(eventsCurrentIndex - 4);
    }
  };

  const handleMealsNext = () => {
    if (mealsCurrentIndex + 4 < groupedDates.length) {
      setMealsCurrentIndex(mealsCurrentIndex + 4);
    }
  };

  const handleMealsPrev = () => {
    if (mealsCurrentIndex - 4 >= 0) {
      setMealsCurrentIndex(mealsCurrentIndex - 4);
    }
  };

  const getNoEventsImage = () => {
    const noEventsImage = images.find((image) => image.title === "No Events");
    return noEventsImage ? noEventsImage.imageUrl : "";
  };

  const getNoMealImage = () => {
    const noEventsImage = images.find(
      (image) => image.title === "No Meal Plan"
    );
    return noEventsImage ? noEventsImage.imageUrl : "";
  };

  return (
    <ApplicationStructure>
    {loadingEvents || loadingImages ? (
      <div className={styles.loadingContainer}>
        <CustomSpinner size={60} color="#3498db" />
      </div>
    ) : (
      <div className={styles.carouselsWrapper}>
        <div className={styles.carouselContainer}>
          {groupedDates.length > 4 && (
            <button onClick={handleEventsPrev} className={styles.carouselButtonPrev}>
              ←
            </button>
          )}

          <div className={styles.carousel}>
            {groupedDates
              .slice(eventsCurrentIndex, eventsCurrentIndex + 4)
              .map((date) => (
                <div key={date} className={styles.eventCard}>
                  <h2>{formatDateDisplay(date)}</h2>
                  {events[date] && events[date].length > 0 ? (
                    events[date].map((event, index) => (
                      <div
                        key={index}
                        className={`${styles.eventItem} ${
                          event.isHighlight ? styles.highlightEvent : ""
                        }`}
                      >
                        <strong>{event.event_name}</strong>
                        <div>
                          {event.start_time} - {event.end_time}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noEvents}>
                      <p>No events planned</p>
                      <img src={getNoEventsImage()} alt="No events" />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {groupedDates.length > 4 && (
            <button onClick={handleEventsNext} className={styles.carouselButtonNext}>
              →
            </button>
          )}
        </div>

        <div className={styles.carouselContainer}>
          {groupedDates.length > 4 && (
            <button onClick={handleMealsPrev} className={styles.carouselButtonPrev}>
              ←
            </button>
          )}

          <div className={styles.carousel}>
            {groupedDates
              .slice(mealsCurrentIndex, mealsCurrentIndex + 4)
              .map((date) => (
                <div key={date} className={styles.eventCard}>
                  <h2>{formatDateDisplay(date)}</h2>
                  {meals[date] && meals[date].length > 0 ? (
                    meals[date].map((meal, index) => (
                      <div key={index} className={styles.mealItem}>
                        <strong>{meal.meal_name}</strong>
                        <div>Quantity: {meal.quantity}</div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noEvents}>
                      <p>No meals planned</p>
                      <img src={getNoMealImage()} alt="No meals" />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {groupedDates.length > 4 && (
            <button onClick={handleMealsNext} className={styles.carouselButtonNext}>
              →
            </button>
          )}
        </div>
      </div>
    )}
  </ApplicationStructure>
  );
};

export default Activities;