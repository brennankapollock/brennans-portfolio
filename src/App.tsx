import {
  BarChart,
  BookText,
  Code,
  FileText,
  Home as HomeIcon,
  Mail,
  Menu,
  Music,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import * as VercelAnalytics from '@vercel/analytics/react';

// Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Essays from './pages/Essays';
import Home from './pages/Home';
import LastFm from './pages/LastFm';
import Poems from './pages/Poems';
import Projects from './pages/Projects';
import Songs from './pages/Songs';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Only allow scrolling on specific routes
  const isScrollable =
    location.pathname.includes('/poems/') ||
    location.pathname === '/projects' ||
    location.pathname === '/songs' ||
    location.pathname === '/lastfm';

  return (
    <div
      className={`min-h-screen bg-white font-mono ${
        !isScrollable ? 'overflow-hidden' : ''
      }`}
    >
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 md:hidden bg-black text-white p-2 rounded-full"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation sidebar - hidden on mobile unless menu is open */}
      <nav
        className={`fixed top-0 left-0 h-screen w-64 md:w-16 bg-black text-white transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-200 ease-in-out flex flex-col items-center py-8 gap-8 z-40`}
      >
        <Link
          to="/"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <HomeIcon className="w-6 h-6" />
          <span className="md:hidden">Home</span>
        </Link>
        <Link
          to="/projects"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <Code className="w-6 h-6" />
          <span className="md:hidden">Projects</span>
        </Link>
        <Link
          to="/poems"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <BookText className="w-6 h-6" />
          <span className="md:hidden">Poems</span>
        </Link>
        <Link
          to="/songs"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <Music className="w-6 h-6" />
          <span className="md:hidden">Songs</span>
        </Link>
        <Link
          to="/essays"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <FileText className="w-6 h-6" />
          <span className="md:hidden">Essays</span>
        </Link>
        <Link
          to="/about"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <User className="w-6 h-6" />
          <span className="md:hidden">About</span>
        </Link>
        <Link
          to="/contact"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <Mail className="w-6 h-6" />
          <span className="md:hidden">Contact</span>
        </Link>
        <Link
          to="/lastfm"
          className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0"
        >
          <BarChart className="w-6 h-6" />
          <span className="md:hidden">Last.fm Stats</span>
        </Link>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}

      <main
        className={`ml-0 md:ml-16 p-4 md:p-8 ${
          !isScrollable ? 'h-screen overflow-hidden' : ''
        }`}
      >
        <div className={`${!isScrollable ? 'h-full' : 'mb-16'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/poems" element={<Poems />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/essays" element={<Essays />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lastfm" element={<LastFm />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <VercelAnalytics.Analytics />
    </Router>
  );
}

export default App;
