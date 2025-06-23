import React from 'react';
import { Calendar } from 'lucide-react';

interface WeekSelectorProps {
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek, onWeekChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Calendar className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Current Week</h3>
          <p className="text-sm text-gray-600">Set your pregnancy week for personalized content</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="week-selector" className="text-sm font-medium text-gray-700">
          Pregnancy Week:
        </label>
        <select
          id="week-selector"
          value={currentWeek}
          onChange={(e) => onWeekChange(parseInt(e.target.value))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        >
          <option value={0}>Not specified</option>
          {Array.from({ length: 42 }, (_, i) => i + 1).map(week => (
            <option key={week} value={week}>
              Week {week}
            </option>
          ))}
        </select>
      </div>

      {currentWeek > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800">
            <span className="font-medium">Week {currentWeek}:</span> {
              currentWeek <= 12 ? 'First Trimester' :
              currentWeek <= 28 ? 'Second Trimester' : 'Third Trimester'
            }
          </p>
        </div>
      )}
    </div>
  );
};