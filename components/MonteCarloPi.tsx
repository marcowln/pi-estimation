import React, { useState, useMemo, useCallback } from 'react';
import type { Point } from '../types';
import Explanation from './Explanation';
import Visualization from './Visualization';
import Stats from './Stats';
import HistoryChart from './HistoryChart';
import { PlusIcon } from './icons/PlusIcon';

interface HistoryEntry {
  points: number;
  estimate: number;
}

const MonteCarloPi: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const validPoints = useMemo(() => points.filter((p): p is Point => !!p), [points]);

  const pointsInsideCount = useMemo(() => validPoints.filter(p => p.isInside).length, [validPoints]);
  const totalPoints = validPoints.length;
  const piEstimate = totalPoints > 0 ? 4 * (pointsInsideCount / totalPoints) : 0;

  const handleAddPoints = useCallback((count: number) => {
    if (isAdding) return;
    setIsAdding(true);

    const pointsToAdd: Point[] = Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const isInside = x * x + y * y <= 1;
      return { x, y, isInside, id: `point-${Date.now()}-${i}` };
    });
    
    const addPointSequentially = (index: number) => {
      if (index >= pointsToAdd.length) {
        setIsAdding(false);
        // All points for this batch are added to state queue, now calculate final result and update history
        const finalPoints = [...validPoints, ...pointsToAdd];
        const finalInsideCount = finalPoints.filter(p => p.isInside).length;
        const finalTotalPoints = finalPoints.length;
        const finalPiEstimate = finalTotalPoints > 0 ? 4 * (finalInsideCount / finalTotalPoints) : 0;
        
        setHistory(prev => [...prev, { points: finalTotalPoints, estimate: finalPiEstimate }]);
        return;
      }
      
      setPoints(prev => [...prev, pointsToAdd[index]]);
      
      const delay = Math.max(5, 500 / count); // Faster animation for more points
      setTimeout(() => addPointSequentially(index + 1), delay);
    };

    addPointSequentially(0);

  }, [isAdding, validPoints]);

  const handleReset = useCallback(() => {
    if (isAdding) return;
    setPoints([]);
    setHistory([]);
  }, [isAdding]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        {/* Visualization on the left */}
        <div className="md:col-span-3 w-full aspect-square bg-gray-800 rounded-2xl shadow-2xl p-2 border border-gray-700">
          <Visualization points={validPoints} />
        </div>

        {/* Info and controls on the right */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <Stats
            totalPoints={totalPoints}
            pointsInside={pointsInsideCount}
            piEstimate={piEstimate}
          />
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddPoints(10)}
                disabled={isAdding}
                className="flex items-center justify-center w-full px-4 py-2 text-sm bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add 10 Points
              </button>
              <button
                onClick={() => handleAddPoints(100)}
                disabled={isAdding}
                className="flex items-center justify-center w-full px-4 py-2 text-sm bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-600 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add 100 Points
              </button>
            </div>
            <button
              onClick={handleReset}
              disabled={isAdding || totalPoints === 0}
              className="w-full px-4 py-2 text-sm bg-red-600/80 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Reset Simulation
            </button>
          </div>
          <Explanation />
        </div>
      </div>
      {history.length > 0 && <HistoryChart data={history} />}
    </div>
  );
};

export default MonteCarloPi;