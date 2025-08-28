import React, { useState } from 'react';
import { InfoIcon } from './icons/InfoIcon';

const Explanation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-3 flex items-start space-x-2">
      <div className="flex-shrink-0 text-cyan-400 mt-0.5">
        <InfoIcon className="w-5 h-5" />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-white">How It Works</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold focus:outline-none"
            aria-expanded={isExpanded}
            aria-controls="explanation-text"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
        <div
          id="explanation-text"
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-300 text-xs leading-relaxed">
            This visualization uses the <strong>Monte Carlo method</strong> to estimate π. We randomly place dots in a square enclosing a circle. The ratio of the circle's area to the square's area is π/4. By counting dots inside the circle versus the total, we can approximate this ratio and calculate π.
          </p>
        </div>
        <p className="text-center font-mono text-cyan-300 bg-gray-900/70 rounded-md p-1.5 mt-2 text-xs">
          π ≈ 4 × (dots inside / total dots)
        </p>
      </div>
    </div>
  );
};

export default Explanation;