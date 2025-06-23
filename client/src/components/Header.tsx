import React from "react";
import { Heart, Baby } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">BabySteps</h1>
              <p className="text-sm text-purple-100">Milestone Tracker</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-200" />
            <span className="text-sm font-medium">Your Journey</span>
          </div>
        </div>
      </div>
    </header>
  );
};
