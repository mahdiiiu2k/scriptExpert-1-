import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950 dark:to-cyan-950">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Script Expert
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Generate viral Instagram Reel scripts with AI
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Server is running successfully!
        </div>
      </div>
    </div>
  );
}