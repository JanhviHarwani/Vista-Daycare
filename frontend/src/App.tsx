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
// import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import { LoginPage } from './pages/LoginPage'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './providers/AuthProviders'
function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
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
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* Catch all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  </BrowserRouter>
  </AuthProvider>

  )
}

export default App
