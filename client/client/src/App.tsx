
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MobileNavbar from './components/MobileNavbar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <MobileNavbar />
      <HeroSection />
    </div>
  );
}

export default App;
