export const dashboardStyles = {
  headerContent: {
    display: 'flex',
    justifyContent: "space-evenly",
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '0 1rem'
  },
  
  // Optional: Add hover state for logout button
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgb(162, 132, 94)',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#b91c1c'
    },},
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f2ef',
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      padding: '1rem',
      marginBottom: '2rem'
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    tabList: {
      display: 'flex',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '4px',
      marginBottom: '1.5rem'
    },
    tab: {
      flex: 1,
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#6b7280',
      transition: 'all 0.2s'
    },
    activeTab: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#333'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginTop: '1rem'
    },
    th: {
      textAlign: 'left' as const,
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      color: '#374151',
      fontWeight: '600'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      color: '#4b5563'
    },
    deleteButton: {
      padding: '0.5rem',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#dc2626',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.2s'
    }
  };

export const modalStyles = {
    wrapper: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2.5rem',
      width: '90%',
      maxWidth: '550px',
      position: 'relative' as const,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '2rem',
      textAlign: 'center' as const
    }
  };
  
export const formStyles = {
    group: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    error: {
      color: "#dc2626",
      fontSize: "0.875rem",
      marginTop: "0.25rem",
    },
    input: {
    width: '30rem',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s',
      color:'#908787'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
      marginTop: '2rem'
    },
    cancelBtn: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#f3f4f6',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#4b5563',
      cursor: 'pointer'
    },
    submitBtn: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer'
    }
  };