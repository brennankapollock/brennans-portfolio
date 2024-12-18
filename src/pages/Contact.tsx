import { Github, Mail, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <div className="space-y-6">
          <p className="text-lg">
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out through any of the following channels:
          </p>

          <div className="space-y-4">
            <a
              href="mailto:mail@brennankapollock.com"
              className="flex items-center gap-3 text-lg hover:underline"
            >
              <Mail className="w-6 h-6" />
              mail@brennankapollock.com
            </a>

            <a
              href="https://github.com/brennankapollock"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:underline"
            >
              <Github className="w-6 h-6" />
              @brennankapollock
            </a>

            <a
              href="https://instagram.com/brennankeithpollock"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:underline"
            >
              <Twitter className="w-6 h-6" />
              @brennankeithpollock
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
