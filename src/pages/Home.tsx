import NowPlaying from '../components/NowPlaying';

const Home = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Brennan Pollock
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          howdy, i'm a software engineer and creative based in Venice Beach. I
          build things, write poetry, make music, and explore the intersection
          of technology and art.
        </p>
        <div className="flex flex-col items-center gap-4">
          <NowPlaying />
        </div>
      </div>
    </div>
  );
};

export default Home;
