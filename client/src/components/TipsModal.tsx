import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Plus, ThumbsUp, User } from 'lucide-react';
import { api } from '../services/api';
import type { Milestone, Tip } from '../types';

interface TipsModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({ milestone, isOpen, onClose }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [showAddTip, setShowAddTip] = useState(false);
  const [newTip, setNewTip] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (milestone && isOpen) {
      loadTips();
    }
  }, [milestone, isOpen]);

  const loadTips = async () => {
    if (!milestone) return;
    setIsLoading(true);
    try {
      const fetchedTips = await api.getTips(milestone.category);
      setTips(fetchedTips);
    } catch (error) {
      console.error('Error loading tips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestone || !newTip.title.trim() || !newTip.content.trim()) return;

    try {
      const tip = await api.addTip({
        milestoneType: milestone.category,
        title: newTip.title,
        content: newTip.content,
        author: newTip.author || 'Anonymous'
      });
      setTips([...tips, tip]);
      setNewTip({ title: '', content: '', author: '' });
      setShowAddTip(false);
    } catch (error) {
      console.error('Error adding tip:', error);
    }
  };

  if (!isOpen || !milestone) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Community Tips</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tips for: <span className="font-medium text-purple-600">{milestone.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Close tips modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              {/* Add Tip Button */}
              {!showAddTip && (
                <button
                  onClick={() => setShowAddTip(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-lg mb-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <Plus className="h-4 w-4" />
                  <span>Share Your Tip</span>
                </button>
              )}

              {/* Add Tip Form */}
              {showAddTip && (
                <form onSubmit={handleAddTip} className="bg-gray-50 rounded-lg p-4 mb-6 space-y-4">
                  <div>
                    <input
                      type="text"
                      value={newTip.title}
                      onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                      placeholder="Tip title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      value={newTip.content}
                      onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                      placeholder="Share your advice or experience..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newTip.author}
                      onChange={(e) => setNewTip({ ...newTip, author: e.target.value })}
                      placeholder="Your name (optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Share Tip
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddTip(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Tips List */}
              <div className="space-y-4">
                {tips.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tips yet</h3>
                    <p className="text-gray-600">Be the first to share your experience!</p>
                  </div>
                ) : (
                  tips.map((tip) => (
                    <div key={tip.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                      <p className="text-gray-700 mb-3">{tip.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{tip.author}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{tip.createdAt}</span>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{tip.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};