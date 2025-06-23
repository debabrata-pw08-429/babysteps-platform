const API_BASE = "http://localhost:3001/api";

export const api = {
  async getMilestones() {
    const response = await fetch(`${API_BASE}/milestones`);
    return response.json();
  },

  async addMilestone(milestone: {
    title: string;
    date: string;
    notes: string;
    category: string;
    week: number;
  }) {
    const response = await fetch(`${API_BASE}/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(milestone),
    });
    return response.json();
  },

  async getTips(category: string) {
    const response = await fetch(`${API_BASE}/tips/${category}`);
    return response.json();
  },

  async addTip(tip: {
    milestoneType: string;
    title: string;
    content: string;
    author: string;
  }) {
    const response = await fetch(`${API_BASE}/tips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tip),
    });
    return response.json();
  },

  async getRecommendations(week: number) {
    const response = await fetch(
      `${API_BASE}/milestones/recommendations/${week}`
    );
    return response.json();
  },
};
