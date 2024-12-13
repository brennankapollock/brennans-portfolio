import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Brennan Pollock
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          howdy, i'm a software engineer and creative based in Venice Beach. I
          build things, write poetry, make music, and explore the intersection
          of technology and art.
        </p>
        <div className="pt-4">
          <Link
            to="/projects"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors hover:scale-105 transform duration-200"
          >
            View My Projects →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
