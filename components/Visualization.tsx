
import React from 'react';
import type { Point } from '../types';

interface VisualizationProps {
  points: Point[];
}

const PointDot: React.FC<{point: Point}> = ({point}) => {
    // This component isolates the point rendering and its animation logic.
    // By using a key on this component, React creates a new instance for each new point,
    // allowing the animation to run on mount.
    const colorClass = point.isInside ? 'fill-green-400' : 'fill-red-500';

    return (
        <circle
            cx={point.x}
            cy={point.y}
            r="0.015"
            className={`${colorClass} opacity-80 animate-fade-in-scale`}
        />
    )
}

const Visualization: React.FC<VisualizationProps> = ({ points }) => {
  return (
    <svg 
        viewBox="-1.1 -1.1 2.2 2.2" 
        className="w-full h-full"
        style={{
            // Add custom animation to global scope for use in components
            animation: `fadeInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
        }}
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
                .animate-fade-in-scale {
                    animation: fadeInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
        {points.map((point) => (
          <PointDot key={point.id} point={point} />
        ))}
      </g>
    </svg>
  );
};

export default Visualization;
