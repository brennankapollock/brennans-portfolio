import { PortableText } from '@portabletext/react';
import { useEffect, useState, memo, Suspense } from 'react';
import { client } from '../config/sanity';
import { Poem } from '../types/content';

const PoemContent = memo(({ poem }: { poem: Poem }) => (
  <div className="max-w-2xl mx-auto animate-fade-in">
    <h1 className="text-2xl md:text-3xl font-bold mb-6">{poem.title}</h1>
    <div className="prose prose-sm md:prose-lg">
      <PortableText value={poem.content} />
    </div>
    {poem.publishedAt && (
      <p className="mt-6 text-gray-500 text-sm md:text-base">
        Published on{' '}
        {new Date(poem.publishedAt).toLocaleDateString()}
      </p>
    )}
  </div>
));

const Poems = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const query = `*[_type == "poem"] | order(publishedAt desc) {
          _id,
          title,
          content,
          publishedAt
        }`;

        const result = await client.fetch(query);
        setPoems(result);
        if (result.length > 0) setSelectedPoem(result[0]);
      } catch (error) {
        console.error('Error fetching poems:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoems();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Mobile poem selector button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-20 bg-black text-white px-4 py-2 rounded-full shadow-lg"
      >
        Select Poem
      </button>

      {/* Sidebar with poem list */}
      <div
        className={`${
          isSidebarOpen ? 'fixed inset-0 z-10 md:relative md:z-0' : 'hidden md:block'
        } w-full md:w-64 bg-white md:border-r border-gray-200 overflow-y-auto p-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Poems</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-500"
          >
            Close
          </button>
        </div>
        <div className="space-y-2">
          {poems.map((poem) => (
            <button
              key={poem._id}
              onClick={() => {
                setSelectedPoem(poem);
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded transition-colors duration-200 ${
                selectedPoem?._id === poem._id
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {poem.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {isLoading ? (
            <div className="text-center">
              <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
              <div className="animate-pulse h-4 w-full max-w-2xl bg-gray-200 rounded mb-2 mx-auto"></div>
              <div className="animate-pulse h-4 w-full max-w-2xl bg-gray-200 rounded mb-2 mx-auto"></div>
              <div className="animate-pulse h-4 w-3/4 max-w-2xl bg-gray-200 rounded mx-auto"></div>
            </div>
          ) : selectedPoem ? (
            <PoemContent poem={selectedPoem} />
          ) : (
            <div className="text-center text-gray-500">Select a poem to read</div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Poems;
