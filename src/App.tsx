import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Code, BookText, Music, Mail, User, FileText, Home as HomeIcon, Menu, X, BarChart } from 'lucide-react';
import NowPlaying from './components/NowPlaying';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Poems from './pages/Poems';
import Songs from './pages/Songs';
import Essays from './pages/Essays';
import About from './pages/About';
import Contact from './pages/Contact';
import LastFm from './pages/LastFm';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-mono">
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 md:hidden bg-black text-white p-2 rounded-full"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation sidebar - hidden on mobile unless menu is open */}
        <nav className={`fixed top-0 left-0 h-screen w-64 md:w-16 bg-black text-white transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-200 ease-in-out flex flex-col items-center py-8 gap-8 z-40`}>
          <Link to="/" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <HomeIcon className="w-6 h-6" />
            <span className="md:hidden">Home</span>
          </Link>
          <Link to="/projects" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <Code className="w-6 h-6" />
            <span className="md:hidden">Projects</span>
          </Link>
          <Link to="/poems" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <BookText className="w-6 h-6" />
            <span className="md:hidden">Poems</span>
          </Link>
          <Link to="/songs" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <Music className="w-6 h-6" />
            <span className="md:hidden">Songs</span>
          </Link>
          <Link to="/essays" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <FileText className="w-6 h-6" />
            <span className="md:hidden">Essays</span>
          </Link>
          <Link to="/about" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <User className="w-6 h-6" />
            <span className="md:hidden">About</span>
          </Link>
          <Link to="/contact" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
            <Mail className="w-6 h-6" />
            <span className="md:hidden">Contact</span>
          </Link>
          <Link to="/lastfm" className="hover:scale-110 transition-transform flex items-center gap-3 md:gap-0">
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

        <main className="ml-0 md:ml-16 p-4 md:p-8">
          <div className="mb-16">
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

        {/* NowPlaying component */}
        <div className="fixed top-0 right-0 z-50">
          <NowPlaying />
        </div>
      </div>
    </Router>
  );
}

export default App;