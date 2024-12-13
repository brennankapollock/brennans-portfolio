import { PortableText } from '@portabletext/react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types/content';
import { urlFor } from '../config/sanity';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, githubUrl, liveUrl, technologies, thumbnail } = project;

  return (
    <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-colors group">
      {thumbnail && (
        <div className="mb-4 aspect-video relative overflow-hidden">
          <img
            src={urlFor(thumbnail).width(600).height(400).url()}
            alt={title}
            className="object-cover w-full h-full rounded transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="prose prose-sm dark:prose-invert mb-4">
        <PortableText value={description} />
      </div>
      <div className="flex gap-4 mb-4">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:underline"
          >
            <Github className="w-4 h-4" /> Code
          </a>
        )}
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:underline"
          >
            <ExternalLink className="w-4 h-4" /> Live
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span 
            key={tech} 
            className="bg-gray-200 text-black px-2 py-1 text-sm rounded transition-colors group-hover:bg-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}