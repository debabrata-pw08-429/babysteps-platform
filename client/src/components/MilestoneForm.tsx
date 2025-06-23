import React, { useState } from 'react';
import { Plus, Calendar, FileText, Tag } from 'lucide-react';
import { api } from '../services/api';
import type { Milestone } from '../types';

interface MilestoneFormProps {
  onMilestoneAdded: (milestone: Milestone) => void;
}

export const MilestoneForm: React.FC<MilestoneFormProps> = ({ onMilestoneAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    category: 'health',
    week: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'health', label: 'Health & Wellness', color: 'bg-green-100 text-green-800' },
    { value: 'medical', label: 'Medical Appointments', color: 'bg-blue-100 text-blue-800' },
    { value: 'emotional', label: 'Emotional Journey', color: 'bg-purple-100 text-purple-800' },
    { value: 'planning', label: 'Planning & Preparation', color: 'bg-orange-100 text-orange-800' },
    { value: 'milestone', label: 'Baby Milestones', color: 'bg-pink-100 text-pink-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const milestone = await api.addMilestone({
        ...formData,
        week: parseInt(formData.week) || 0
      });
      onMilestoneAdded(milestone);
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        category: 'health',
        week: ''
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding milestone:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Add new milestone"
      >
        <Plus className="h-5 w-5" />
        <span className="font-semibold">Add New Milestone</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Add New Milestone</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Milestone Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="e.g., First ultrasound"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="week" className="block text-sm font-medium text-gray-700 mb-2">
              Pregnancy Week
            </label>
            <input
              type="number"
              id="week"
              value={formData.week}
              onChange={(e) => setFormData({ ...formData, week: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="e.g., 12"
              min="0"
              max="42"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="inline h-4 w-4 mr-1" />
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline h-4 w-4 mr-1" />
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
            placeholder="Add any additional details or memories..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.title.trim()}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Adding...' : 'Add Milestone'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};