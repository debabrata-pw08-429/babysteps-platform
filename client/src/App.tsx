import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MilestoneForm } from './components/MilestoneForm';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { TipsModal } from './components/TipsModal';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { WeekSelector } from './components/WeekSelector';
import { api } from './services/api';
import type { Milestone } from './types';

function App() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMilestones();
    const savedWeek = localStorage.getItem('pregnancyWeek');
    if (savedWeek) {
      setCurrentWeek(parseInt(savedWeek));
    }
  }, []);

  const loadMilestones = async () => {
    try {
      const data = await api.getMilestones();
      setMilestones(data);
    } catch (error) {
      console.error('Error loading milestones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMilestoneAdded = (milestone: Milestone) => {
    setMilestones(prev => [...prev, milestone].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
  };

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setIsTipsModalOpen(true);
  };

  const handleWeekChange = (week: number) => {
    setCurrentWeek(week);
    localStorage.setItem('pregnancyWeek', week.toString());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <MilestoneForm onMilestoneAdded={handleMilestoneAdded} />
            <MilestoneTimeline 
              milestones={milestones} 
              onMilestoneClick={handleMilestoneClick}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WeekSelector currentWeek={currentWeek} onWeekChange={handleWeekChange} />
            <PersonalizedRecommendations currentWeek={currentWeek} />
          </div>
        </div>
      </main>

      <TipsModal
        milestone={selectedMilestone}
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
      />
    </div>
  );
}

export default App;