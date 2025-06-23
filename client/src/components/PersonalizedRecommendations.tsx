import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import type { Recommendation } from '../types';

interface PersonalizedRecommendationsProps {
  currentWeek: number;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ 
  currentWeek 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWeek > 0) {
      loadRecommendations();
    }
  }, [currentWeek]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getRecommendations(currentWeek);
      setRecommendations(data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentWeek === 0 || !recommendations) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Personalized for Week {currentWeek}
          </h3>
          <p className="text-sm text-gray-600">Recommendations just for you</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white/60 rounded-lg p-3 hover:bg-white/80 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-purple-500 flex-shrink-0" />
              <span className="text-gray-800">{rec}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};