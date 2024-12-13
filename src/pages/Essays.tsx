import React from 'react';
import ContentCard from '../components/ContentCard';

export default function Essays() {
  const essays = [
    {
      title: "Essay Title",
      content: "This is a preview or excerpt of your essay. Click to read more...",
      date: "2024-03-15"
    },
    // Add more essays here
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Essays</h1>
      <div className="grid grid-cols-1 gap-6">
        {essays.map((essay) => (
          <ContentCard key={essay.title} {...essay} />
        ))}
      </div>
    </div>
  );
}