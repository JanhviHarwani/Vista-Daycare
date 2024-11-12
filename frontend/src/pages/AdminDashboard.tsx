
import  { useState } from 'react';
import { dashboardStyles } from '../styles/styles';
import { AddEventForm, AddMealForm } from '../components/AddForm';

// SVG Icons
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);

  const contacts = [
    { id: 1, name: 'John Smith', phone: '(310) 555-0123', email: 'john@example.com', date: '2024-11-01' },
    { id: 2, name: 'Maria Garcia', phone: '(323) 555-0456', email: 'maria@example.com', date: '2024-11-02' },
  ];

  const events = [
    { id: 1, name: 'Bingo', date: '2024-07-17', time: '10:00 AM' },
    { id: 2, name: 'Group Exercises', date: '2024-07-20', time: '2:00 PM' },
    { id: 3, name: 'Morning Orientation', date: '2024-07-25', time: '1:00 PM' },
  ];

  const meals = [
    { id: 1, name: 'Breakfast', menu: 'Oatmeal with fresh fruits', date: '2024-11-15' },
    { id: 2, name: 'Lunch', menu: 'Grilled chicken with vegetables', date: '2024-11-15' },
  ];

  return (
    <div style={dashboardStyles.container}>
      <header style={dashboardStyles.header}>
        <h1 style={dashboardStyles.headerTitle}>Vista Day Care Admin Panel</h1>
      </header>

      <main style={dashboardStyles.mainContent}>
        <div style={dashboardStyles.tabList}>
          {['contacts', 'events', 'meals'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...dashboardStyles.tab,
                ...(activeTab === tab ? dashboardStyles.activeTab : {})
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={dashboardStyles.card}>
          {activeTab === 'contacts' && (
            <>
              <div style={dashboardStyles.cardHeader}>
                <h2 style={dashboardStyles.cardTitle}>Contact Form Submissions</h2>
              </div>
              <div style={{ overflowX: 'auto' }}>
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
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td style={dashboardStyles.td}>{contact.name}</td>
                        <td style={dashboardStyles.td}>{contact.phone}</td>
                        <td style={dashboardStyles.td}>{contact.email}</td>
                        <td style={dashboardStyles.td}>{contact.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'events' && (
            <>
              <div style={dashboardStyles.cardHeader}>
                <h2 style={dashboardStyles.cardTitle}>Events Management</h2>
                <button style={dashboardStyles.button} onClick={() => setShowEventForm(true)}>
                  <PlusIcon />
                  Add Event
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th style={dashboardStyles.th}>Event Name</th>
                      <th style={dashboardStyles.th}>Date</th>
                      <th style={dashboardStyles.th}>Time</th>
                      <th style={dashboardStyles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td style={dashboardStyles.td}>{event.name}</td>
                        <td style={dashboardStyles.td}>{event.date}</td>
                        <td style={dashboardStyles.td}>{event.time}</td>
                        <td style={dashboardStyles.td}>
                          <button style={dashboardStyles.deleteButton}>
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'meals' && (
            <>
              <div style={dashboardStyles.cardHeader}>
                <h2 style={dashboardStyles.cardTitle}>Meals Management</h2>
                <button style={dashboardStyles.button} onClick={() => setShowMealForm(true)}>
                  <PlusIcon />
                  Add Meal
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={dashboardStyles.table}>
                  <thead>
                    <tr>
                      <th style={dashboardStyles.th}>Meal Type</th>
                      <th style={dashboardStyles.th}>Menu</th>
                      <th style={dashboardStyles.th}>Date</th>
                      <th style={dashboardStyles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals.map((meal) => (
                      <tr key={meal.id}>
                        <td style={dashboardStyles.td}>{meal.name}</td>
                        <td style={dashboardStyles.td}>{meal.menu}</td>
                        <td style={dashboardStyles.td}>{meal.date}</td>
                        <td style={dashboardStyles.td}>
                          <button style={dashboardStyles.deleteButton}>
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Modal Forms */}
        <AddEventForm isOpen={showEventForm} onClose={() => setShowEventForm(false)} />
        <AddMealForm isOpen={showMealForm} onClose={() => setShowMealForm(false)} />
      </main>
    </div>
  );
};

export default AdminDashboard;