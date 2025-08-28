
import React from 'react';
import type { Point } from '../types';

interface VisualizationProps {
  points: Point[];
  animationDuration?: string;
  animationTimingFunction?: string;
}

const Visualization: React.FC<VisualizationProps> = ({ 
  points, 
  animationDuration = '0.4s', 
  animationTimingFunction = 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
}) => {
  return (
    <svg 
        viewBox="-1.1 -1.1 2.2 2.2" 
        className="w-full h-full"
    >
      <defs>
        <style>
            {`
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0);
                    }
                    to {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                }
                .point-dot-animation {
                    animation-name: fadeInScale;
                    animation-fill-mode: forwards;
                    transform-origin: center;
                }
            `}
        </style>
      </defs>
      
      {/* Background and Grid */}
      <rect x="-1.1" y="-1.1" width="2.2" height="2.2" fill="#1f2937" />
      <path d="M -1 0 L 1 0 M 0 -1 L 0 1" stroke="#374151" strokeWidth="0.01" />
      
      {/* The Square */}
      <rect x="-1" y="-1" width="2" height="2" fill="none" stroke="#4b5563" strokeWidth="0.01" />

      {/* The Circle */}
      <circle cx="0" cy="0" r="1" fill="rgba(34, 211, 238, 0.1)" stroke="#06b6d4" strokeWidth="0.01" />

      {/* Render Points */}
      <g>
        {points.map((point) => {
            const colorClass = point.isInside ? 'fill-green-400' : 'fill-red-500';
            return (
                <circle
                    key={point.id}
                    cx={point.x}
                    cy={point.y}
                    r="0.015"
                    className={`${colorClass} opacity-80 point-dot-animation`}
                    style={{
                      animationDuration,
                      animationTimingFunction
                    }}
                />
            );
        })}
      </g>
    </svg>
  );
};

export default Visualization;
