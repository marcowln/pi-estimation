import React from 'react';

interface HistoryEntry {
  points: number;
  estimate: number;
}

interface HistoryChartProps {
  data: HistoryEntry[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const padding = { top: 10, right: 30, bottom: 30, left: 45 };
  const width = 800;
  const height = 250;

  if (data.length === 0) {
    return null;
  }

  const maxX = Math.max(...data.map(d => d.points));
  const estimates = data.map(d => d.estimate);
  const minEstimate = Math.min(...estimates);
  const maxEstimate = Math.max(...estimates);
  
  // Dynamic Y-axis range based on data, but keep it stable around Math.PI
  const yDomainMin = Math.min(2.5, minEstimate);
  const yDomainMax = Math.max(4, maxEstimate);

  const xScale = (x: number) => padding.left + (x / maxX) * (width - padding.left - padding.right);
  const yScale = (y: number) => height - padding.bottom - ((y - yDomainMin) / (yDomainMax - yDomainMin)) * (height - padding.top - padding.bottom);

  const pathData = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.points)} ${yScale(d.estimate)}`)
    .join(' ');

  const piY = yScale(Math.PI);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-3 mt-4 animate-fade-in">
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        
        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }
        .path-draw {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease-in-out forwards;
        }
        .dot-pop-in {
            animation: dot-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            transform-origin: center;
            opacity: 0;
        }
        @keyframes dot-pop {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
       `}</style>
      <h2 className="text-base font-bold text-white mb-2 text-center">Estimation History</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Y Axis Grid Lines */}
        {[3, 3.25, 3.5, 3.75].map(y => (
          <g key={y}>
            <line x1={padding.left} x2={width - padding.right} y1={yScale(y)} y2={yScale(y)} stroke="#374151" strokeWidth="1" />
            <text x={padding.left - 8} y={yScale(y)} dy="0.32em" fill="#6b7280" fontSize="11" textAnchor="end">{y}</text>
          </g>
        ))}

        {/* X Axis labels */}
        <text x={padding.left} y={height-10} fill="#6b7280" fontSize="11" textAnchor="start">0</text>
        <text x={width - padding.right} y={height-10} fill="#6b7280" fontSize="11" textAnchor="end">{maxX.toLocaleString()} points</text>

        {/* Actual Pi Line */}
        <g>
          <line
            x1={padding.left}
            x2={width - padding.right}
            y1={piY}
            y2={piY}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4"
          />
          <text x={width - padding.right} y={piY - 6} fill="#f59e0b" fontSize="11" textAnchor="end">Actual π</text>
        </g>

        {/* Estimate Path */}
        <path d={pathData} fill="none" stroke="#06b6d4" strokeWidth="2.5" className="path-draw" />

        {/* Data Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d.points)}
            cy={yScale(d.estimate)}
            r="3"
            fill="#06b6d4"
            stroke="#111827"
            strokeWidth="1.5"
            className="dot-pop-in"
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default HistoryChart;