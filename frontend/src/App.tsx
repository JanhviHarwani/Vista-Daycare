import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Services from './pages/Services'
import Activities from './pages/Activities'
import Gallery from './pages/Gallery'
import Eligibility from './pages/Eligibility'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'
import './index.css'
import AdminDashboard from './pages/AdminDashboard'
import { LoginPage } from './pages/LoginPage'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './providers/AuthProviders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';  
import './components/toast.css';  
// import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { Helmet } from 'react-helmet';
function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Helmet>
          <title>Vista Adult Day Care</title>
          <meta name="description" content="Vista Daycare offers high-quality adult day care services tailored to support your growth and development." />
          <meta property="og:title" content="Vista Adult Day Care" />
          <meta property="og:type" content="website" />
          {/* Will update this data after deployment */}
          {/* <meta property="og:url" content="https://vista.com" />
          <meta property="og:image" content="https://vista/logo.png" /> */}
    </Helmet>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/eligibility" element={<Eligibility />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Admin Route */}
        <Route 
          path="/authorized-access" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* Catch all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* for error notifications */}
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '14px',
            padding: '16px',
            minHeight: '64px',
            border: '1px solid #e5e7eb'
          }}
        />
  </BrowserRouter>
  </AuthProvider>

  )
}

export default App
