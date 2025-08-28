import React from 'react';
import MonteCarloPi from './components/MonteCarloPi';

const App: React.FC = () => {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-tight">
            Estimating π with Monte Carlo
          </h1>
          <p className="text-gray-400 mt-1 text-sm">An Interactive Visualization</p>
        </header>
        <MonteCarloPi />
      </div>
       <footer className="text-center mt-4 text-gray-500 text-xs">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </main>
  );
};

export default App;