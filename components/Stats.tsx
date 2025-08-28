import React from 'react';
import { TargetIcon } from './icons/TargetIcon';

interface StatsProps {
  totalPoints: number;
  pointsInside: number;
  piEstimate: number;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-gray-800 p-2 rounded-lg flex items-center space-x-2 border border-gray-700">
    <div className="text-cyan-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 whitespace-nowrap">{title}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  </div>
);

const Stats: React.FC<StatsProps> = ({ totalPoints, pointsInside, piEstimate }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-3">
      <h2 className="text-base font-bold text-white mb-2 text-center">Simulation Statistics</h2>
      <div className="grid grid-cols-2 gap-3 items-stretch">
        <div className="flex flex-col space-y-2 justify-between">
          <StatCard 
            title="Total Points" 
            value={totalPoints.toLocaleString()} 
            icon={<TargetIcon className="w-6 h-6"/>} 
          />
          <StatCard 
            title="Points Inside Circle" 
            value={pointsInside.toLocaleString()} 
            icon={<TargetIcon className="w-6 h-6 text-green-400"/>} 
          />
        </div>
        <div className="bg-gray-900 p-2 rounded-lg text-center border-2 border-cyan-500 shadow-lg flex flex-col justify-center">
          <div className="flex items-center justify-center">
            <p className="text-xs text-cyan-300">Current π Estimate</p>
          </div>
          <div className="flex items-center justify-center my-1">
              <p className="text-2xl font-bold text-cyan-400 tracking-wider">
                  {piEstimate.toFixed(6)}
              </p>
          </div>
          <div className="h-1 bg-cyan-500/50 rounded-full mt-1.5 mx-2">
              <div 
                  className="h-1 bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (piEstimate / Math.PI) * 100)}%` }}
              ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1.5">Actual π: {Math.PI.toFixed(6)}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;