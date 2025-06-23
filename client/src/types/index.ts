export interface Milestone {
  id: string;
  title: string;
  date: string;
  notes: string;
  category: string;
  week: number;
}

export interface Tip {
  id: string;
  milestoneType: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  createdAt: string;
}

export interface Recommendation {
  week: number;
  recommendations: string[];
}