import React from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <div className="space-y-8">
        <p className="text-lg">
          I'm always interested in new opportunities and collaborations.
          Feel free to reach out through any of the following channels:
        </p>
        
        <div className="space-y-4">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <Mail className="w-6 h-6" />
            your.email@example.com
          </a>
          
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <Github className="w-6 h-6" />
            @yourusername
          </a>
          
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <Twitter className="w-6 h-6" />
            @yourusername
          </a>
        </div>

        <div className="border-2 border-black p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Quick Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 hover:bg-white hover:text-black border-2 border-black transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}