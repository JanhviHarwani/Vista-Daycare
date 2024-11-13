import ApplicationStructure from '../components/ApplicationStructure'
import ChatBot from '../components/Chatbot'
import MapView from '../components/MapView'
import MissionStatement from '../components/MissionStatement'
import Testimonials from '../components/Testimonials'
import UpcomingEvents from '../components/UpcomingEvents'
import VideoCarousel from '../components/VideoCarousel'

function LandingPage() {
  return (
    <ApplicationStructure>
      <VideoCarousel />
      <MissionStatement />
      <UpcomingEvents />
      <Testimonials />
      <MapView />
      <ChatBot /> 
    </ApplicationStructure>
  )
}

export default LandingPage