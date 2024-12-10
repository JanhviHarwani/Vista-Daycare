import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  token: string;
  error?: string;
}

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Axios automatically throws an error for non-2xx responses
      // so if we get here, we know the request was successful
      localStorage.setItem('token', response.data.token);
      navigate('/authorized-access');
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   // Handle Axios specific errors
      //   if (error.response) {
      //     // Server responded with non-2xx status
      //     setError(error.response.data.error || 'Authentication failed');
      //   } else if (error.request) {
      //     // Request was made but no response received
      //     setError('No response from server. Please try again.');
      //   } else {
      //     // Error in request configuration
      //     setError('Failed to make the request. Please try again.');
      //   }
      // } else {
        // Handle non-Axios errors
        setError('An unexpected error occurred');
      // }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
       <header className={styles.header}>
        <h1 className={styles.headerTitle}>Vista Day Care Admin Login</h1>
      </header>

      {/* Login Form */}
      <main className={styles.mainContent}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Admin Login</h1>
            <p className={styles.cardDescription}>
              Enter your credentials to access the dashboard
            </p>
          </div>
          
          <div className={styles.cardContent}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.formLabel}>
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={styles.formInput}
                />
              </div>
              
              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                className={`${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.loadingText}>Signing in...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};