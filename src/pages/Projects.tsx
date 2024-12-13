import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { client } from '../config/sanity';
import { Project } from '../types/content';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(featured desc, publishedAt desc) {
          _id,
          title,
          description,
          publishedAt,
          githubUrl,
          liveUrl,
          thumbnail,
          technologies,
          featured
        }`;

        const result = await client.fetch(query);
        setProjects(result);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="border-2 border-gray-200 p-4 space-y-4">
              <div className="animate-pulse h-48 bg-gray-200 rounded mb-4"></div>
              <div className="animate-pulse h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="animate-pulse h-4 w-full bg-gray-200 rounded"></div>
              <div className="animate-pulse h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse h-6 w-16 bg-gray-200 rounded"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      {featuredProjects.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </>
      )}

      {otherProjects.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </>
      )}

      {projects.length === 0 && (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </div>
  );
}
