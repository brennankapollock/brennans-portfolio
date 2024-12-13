import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownContent {
  slug: string;
  title: string;
  date: string;
  content: string;
  [key: string]: any;
}

export const getMarkdownFiles = (directory: string): MarkdownContent[] => {
  try {
    const files = fs.readdirSync(directory);
    
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(directory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // If there's no frontmatter, use filename as title
        const title = data.title || file.replace('.md', '')
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          slug: file.replace('.md', ''),
          title,
          date: data.date || fs.statSync(filePath).mtime.toISOString(),
          content,
          ...data
        };
      })
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });
  } catch (error) {
    console.error(`Error reading markdown files from ${directory}:`, error);
    return [];
  }
};
