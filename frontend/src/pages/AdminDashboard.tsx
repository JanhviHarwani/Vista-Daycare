import { useEffect, useState } from "react";
import { dashboardStyles } from "../styles/styles";
import { AddEventForm, AddMealForm } from "../components/AddForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../lib/axiosInstance";
import {
  getErrorMessage,
  isAuthError,
  isNetworkError,
} from "../lib/errorHandling";
import { toast } from "react-toastify"; // You'll need to install this package
import { showError, showSuccess, authErrorMessages } from "../lib/toast";
import { Contact, ContactsApiResponse, Event, Meal } from "../types/common";
import { LogoutIcon, PlusIcon, TrashIcon } from "../components/SVGs";
// import { format } from "date-fns";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("contacts");
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const response = await axiosInstance.get<Event[]>("/events/all");
      setEvents(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      // handleAuthError(error, logout, () => navigate("/"));
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEvent = async (eventDate: string, eventName: string) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/event",
        data: {
          event_date: eventDate,
          event_name: eventName,
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
      setLoading(true);
      const response = await axiosInstance.get<ContactsApiResponse>("/contact");
      setContacts(response.data.contacts);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
      // handleAuthError(error, logout, () => navigate("/"));
    } finally {
      setLoading(false);
    }
  };
  const deleteContact = async (contactDate: string, contactName: string) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/contact",
        data: {
          date: contactDate,
          name: contactName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        fetchContacts();
        showSuccess("Contact deleted successfully");
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
  // Meal section
  useEffect(() => {
    if (activeTab === "contacts") {
      fetchContacts();
    }
  }, [activeTab]);
  // Add fetchMeals function
  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Meal[]>("/meals/all");
      setMeals(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
      // handleAuthError(error, logout, () => navigate("/"));
    } finally {
      setLoading(false);
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
  // const toggleHighlight = (eventId: number) => {
  //   setEvents(
  //     events.map((event) =>
  //       event.id === eventId
  //         ? { ...event, isHighlight: !event.isHighlight }
  //         : event
  //     )
  //   );
  // };

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
                {loading ? (
                  <div style={dashboardStyles.loadingSpinner}>
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot1,
                      }}
                    />
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot2,
                      }}
                    />
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot3,
                      }}
                    />
                  </div>
                ) : (
                  <table style={dashboardStyles.table}>
                    <thead>
                      <tr>
                        <th style={dashboardStyles.th}>Name</th>
                        <th style={dashboardStyles.th}>Phone</th>
                        <th style={dashboardStyles.th}>Email</th>
                        <th style={dashboardStyles.th}>Submission Date</th>
                        <th style={dashboardStyles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts?.length > 0 ? (
                        contacts.map((contact) => (
                          <tr key={contact.id}>
                            <td style={dashboardStyles.td}>{contact.name}</td>
                            <td style={dashboardStyles.td}>{contact.phone}</td>
                            <td style={dashboardStyles.td}>{contact.email}</td>
                            <td style={dashboardStyles.td}>{contact.date}</td>
                            <td style={dashboardStyles.td}>
                              <button
                                style={dashboardStyles.deleteButton}
                                onClick={() =>
                                  deleteContact(contact.date, contact.name)
                                }
                                aria-label={`Delete ${contact.name}`}
                              >
                                <TrashIcon />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            <div style={dashboardStyles.emptyState}>
                              No contacts available
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
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
                {loading ? (
                  <div style={dashboardStyles.loadingSpinner}>
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot1,
                      }}
                    />
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot2,
                      }}
                    />
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot3,
                      }}
                    />
                  </div>
                ) : (
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
                      {events?.length > 0 ? (
                        events.map((event) => (
                          <tr key={`${event.event_date}-${event.event_name}`}>
                            <td style={dashboardStyles.td}>
                              {event.event_name}
                            </td>
                            <td style={dashboardStyles.td}>
                              <input
                              key={`${event.event_date}-${event.event_name}`}
                                type="checkbox"
                                checked={event.isHighlight}
                                // onChange={() => toggleHighlight(event.id)}
                           
                                style={dashboardStyles.customCheckbox}
                                aria-label={`Mark ${event.event_name} as highlight of the day`}
                                disabled
                              />
                            </td>
                            <td style={dashboardStyles.td}>
                              {event.event_date}
                            </td>
                            <td style={dashboardStyles.td}>{event.end_time}</td>
                            <td style={dashboardStyles.td}>
                              <button
                                style={dashboardStyles.deleteButton}
                                onClick={() => deleteEvent(event.event_date, event.event_name)}
                                aria-label={`Delete ${event.event_name}`}
                              >
                                <TrashIcon />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>
                            <div style={dashboardStyles.emptyState}>
                              No events scheduled
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
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
                {loading ? (
                  <div style={dashboardStyles.loadingSpinner}>
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot1,
                      }}
                    />
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot2,
                      }}
                    />
                    <div
                      style={{
                        ...dashboardStyles.loadingDot,
                        ...dashboardStyles.loadingDot3,
                      }}
                    />
                  </div>
                ) : (
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
                      {meals?.length > 0 ? (
                        meals.map((meal) => (
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
                      ) : (
                        <tr>
                          <td colSpan={4}>
                            <div style={dashboardStyles.emptyState}>
                              No meals available
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
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
