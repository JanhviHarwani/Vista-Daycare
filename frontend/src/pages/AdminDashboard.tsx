import { useEffect, useState } from "react";
import { dashboardStyles } from "../styles/styles";
import { AddEventForm, AddMealForm } from "../components/AddForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../lib/axiosInstance";
import {
  getErrorMessage,
  handleAuthError,
  isAuthError,
  isNetworkError,
} from "../lib/errorHandling";
import { toast } from "react-toastify"; // You'll need to install this package
import { showError, showSuccess, authErrorMessages } from "../lib/toast";
import { Contact, Event, Meal } from "../types/common";
import { LogoutIcon, PlusIcon, TrashIcon } from "../components/SVGs";
// import { format } from "date-fns";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("contacts");
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if (activeTab === "events") {
      fetchEvents();
    }
  }, [activeTab]);

  // Fetch events from backend using Axios
  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get<Event[]>("/events/all");
      setEvents(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      handleAuthError(error, logout, () => navigate("/"));
    }
  };

  // Delete event
  const deleteEvent = async (eventId: number) => {
    try {
      const eventToDelete = events.find((e) => e.id === eventId);
      if (!eventToDelete) {
        showError("Event not found");
        return;
      }
      const response = await axiosInstance({
        method: "DELETE",
        url: "/event",
        data: {
          // This is the correct way to send data with DELETE
          event_date: eventToDelete.event_date,
          event_name: eventToDelete.event_name,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        fetchEvents();
        showSuccess("Event deleted successfully");
      }
    } catch (error) {
      if (isAuthError(error)) {
        showError(authErrorMessages.sessionExpired);
        // logout();
        // navigate("/login");
      } else if (isNetworkError(error)) {
        showError(authErrorMessages.networkError);
      } else {
        showError(getErrorMessage(error));
      }
    }
  };
// contact section
// Add fetchContacts function
const fetchContacts = async () => {
  try {
    const response = await axiosInstance.get<Contact[]>("/contact");
    setContacts(response.data);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    showError(errorMessage);
    handleAuthError(error, logout, () => navigate("/"));
  }
};
  // Meal section
  useEffect(() => {
    if (activeTab === "contacts") {
      fetchContacts();
    }
  }, [activeTab]);
  // Add fetchMeals function
  const fetchMeals = async () => {
    try {
      const response = await axiosInstance.get<Meal[]>("/meals/all");
      setMeals(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
      handleAuthError(error, logout, () => navigate("/"));
    }
  };

  // Add useEffect for meals
  useEffect(() => {
    if (activeTab === "meals") {
      fetchMeals();
    }
  }, [activeTab]);

  // Update deleteMeal function
  const deleteMeal = async (mealDate: string, mealName: string) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/meals",
        data: {
          meal_date: mealDate,
          meal_name: [mealName],
        },
      });

      if (response.status === 200) {
        fetchMeals();
        showSuccess("Meal deleted successfully");
      }
    } catch (error) {
      if (isAuthError(error)) {
        showError(authErrorMessages.sessionExpired);
      } else if (isNetworkError(error)) {
        showError(authErrorMessages.networkError);
      } else {
        showError(getErrorMessage(error));
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Function to toggle highlight status
  const toggleHighlight = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, isHighlight: !event.isHighlight }
          : event
      )
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={dashboardStyles.container}>
      <header style={dashboardStyles.header}>
        <div style={dashboardStyles.headerContent}>
          <h1 style={dashboardStyles.headerTitle}>
            Vista Day Care Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            style={dashboardStyles.logoutButton}
            aria-label="Logout"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </header>

      <main style={dashboardStyles.mainContent}>
        <div style={dashboardStyles.tabList}>
          {["contacts", "events", "meals"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...dashboardStyles.tab,
                ...(activeTab === tab ? dashboardStyles.activeTab : {}),
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={dashboardStyles.card}>
          {activeTab === "contacts" && (
            <>
              <div style={dashboardStyles.cardHeader}>
                <h2 style={dashboardStyles.cardTitle}>
                  Contact Form Submissions
                </h2>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th style={dashboardStyles.th}>Name</th>
                      <th style={dashboardStyles.th}>Phone</th>
                      <th style={dashboardStyles.th}>Email</th>
                      <th style={dashboardStyles.th}>Submission Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length ? contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td style={dashboardStyles.td}>{contact.name}</td>
                        <td style={dashboardStyles.td}>{contact.phone}</td>
                        <td style={dashboardStyles.td}>{contact.email}</td>
                        <td style={dashboardStyles.td}>{contact.date}</td>
                      </tr>
                    ))
                    :
                    <tr style={{textAlign:"center", width:"100%"}}>No Contacts</tr>
                  }
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "events" && (
            <>
              <div style={dashboardStyles.cardHeader}>
                <h2 style={dashboardStyles.cardTitle}>Events Management</h2>
                <button
                  style={dashboardStyles.button}
                  onClick={() => setShowEventForm(true)}
                  aria-label="Add new event"
                >
                  <PlusIcon />
                  Add Event
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th style={dashboardStyles.th}>Event Name</th>
                      <th style={dashboardStyles.th}>Highlight of Day</th>
                      <th style={dashboardStyles.th}>Date</th>
                      <th style={dashboardStyles.th}>Time</th>
                      <th style={dashboardStyles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length ? events.map((event) => (
                      <tr key={event.id}>
                        <td style={dashboardStyles.td}>{event.event_name}</td>
                        <td style={dashboardStyles.td}>
                          <input
                            type="checkbox"
                            checked={event.isHighlight}
                            onChange={() => toggleHighlight(event.id)}
                            style={{ cursor: "pointer" }}
                            aria-label={`Mark ${event.event_name} as highlight of the day`}
                          />
                        </td>
                        <td style={dashboardStyles.td}>{event.event_date}</td>
                        <td style={dashboardStyles.td}>{event.end_time}</td>
                        <td style={dashboardStyles.td}>
                          <button
                            style={dashboardStyles.deleteButton}
                            onClick={() => deleteEvent(event.id)}
                            aria-label={`Delete ${event.event_name}`}
                          >
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                    :
                    <tr>No Events</tr>
                  }
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "meals" && (
            <>
              <div style={dashboardStyles.cardHeader}>
                <h2 style={dashboardStyles.cardTitle}>Meals Management</h2>
                <button
                  style={dashboardStyles.button}
                  onClick={() => setShowMealForm(true)}
                  aria-label="Add new meal"
                >
                  <PlusIcon />
                  Add Meal
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th style={dashboardStyles.th}>Menu</th>
                      <th style={dashboardStyles.th}>Servings</th>
                      <th style={dashboardStyles.th}>Date</th>
                      <th style={dashboardStyles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals.length? meals.map((meal) => (
                      <tr key={`${meal.meal_date}-${meal.meal_name}`}>
                        <td style={dashboardStyles.td}>{meal.meal_name}</td>
                        <td style={dashboardStyles.td}>{meal.quantity}</td>
                        <td style={dashboardStyles.td}>{meal.meal_date}</td>
                        <td style={dashboardStyles.td}>
                          <button
                            style={dashboardStyles.deleteButton}
                            onClick={() =>
                              deleteMeal(meal.meal_date, meal.meal_name)
                            }
                            aria-label={`Delete ${meal.meal_name}`}
                          >
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                    :
                    <tr>No meals</tr>
                  }
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Modal Forms */}
        <AddEventForm
          isOpen={showEventForm}
          onClose={() => setShowEventForm(false)}
          onSubmit={fetchEvents} // Call fetchEvents after adding a new event
        />
        <AddMealForm
          isOpen={showMealForm}
          onClose={() => setShowMealForm(false)}
          onSubmit={fetchMeals}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
