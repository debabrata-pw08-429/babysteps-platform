import React from 'react';
import { Calendar, FileText, Heart, Stethoscope, Brain, Package, Baby } from 'lucide-react';
import type { Milestone } from '../types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onMilestoneClick: (milestone: Milestone) => void;
}

const categoryIcons = {
  health: Heart,
  medical: Stethoscope,
  emotional: Brain,
  planning: Package,
  milestone: Baby
};

const categoryColors = {
  health: 'bg-green-100 text-green-800 border-green-200',
  medical: 'bg-blue-100 text-blue-800 border-blue-200',
  emotional: 'bg-purple-100 text-purple-800 border-purple-200',
  planning: 'bg-orange-100 text-orange-800 border-orange-200',
  milestone: 'bg-pink-100 text-pink-800 border-pink-200'
};

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ 
  milestones, 
  onMilestoneClick 
}) => {
  if (milestones.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <Baby className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h3>
        <p className="text-gray-600">Start documenting your journey by adding your first milestone above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Journey Timeline</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-pink-200"></div>
        
        {milestones.map((milestone, index) => {
          const IconComponent = categoryIcons[milestone.category as keyof typeof categoryIcons] || Heart;
          const colorClass = categoryColors[milestone.category as keyof typeof categoryColors];
          
          return (
            <div key={milestone.id} className="relative pb-8 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-white border-2 border-purple-400 rounded-full shadow-sm z-10"></div>
              
              {/* Content */}
              <div className="ml-16">
                <button
                  onClick={() => onMilestoneClick(milestone)}
                  className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-200 p-6 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colorClass} border`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {milestone.title}
                        </h3>
                        {milestone.week > 0 && (
                          <span className="text-sm text-purple-600 font-medium">
                            Week {milestone.week}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  {milestone.notes && (
                    <div className="flex items-start space-x-2 text-gray-600">
                      <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p className="text-sm line-clamp-2">{milestone.notes}</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};