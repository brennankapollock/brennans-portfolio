import React from 'react';

export default function About() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="space-y-6 text-lg">
        <p>
          Hello! I'm a multidisciplinary creator working at the intersection of technology and art.
          I write code, compose poetry, create music, and pen essays.
        </p>
        <p>
          My work explores the relationship between digital and analog forms of expression,
          finding beauty in both structured logic and creative chaos.
        </p>
        <div className="border-2 border-black p-4 mt-8">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Programming</h3>
              <ul className="list-disc list-inside">
                <li>JavaScript/TypeScript</li>
                <li>React</li>
                <li>Node.js</li>
                {/* Add more skills */}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Creative</h3>
              <ul className="list-disc list-inside">
                <li>Poetry</li>
                <li>Songwriting</li>
                <li>Essay Writing</li>
                {/* Add more skills */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}