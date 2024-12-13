import React from 'react';

interface ContentCardProps {
  title: string;
  content: string;
  date: string;
}

export default function ContentCard({ title, content, date }: ContentCardProps) {
  return (
    <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-colors">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 whitespace-pre-line">{content}</p>
      <time className="text-sm">{date}</time>
    </div>
  );
}