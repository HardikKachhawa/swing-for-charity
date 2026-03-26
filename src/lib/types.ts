export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionPlan?: 'monthly' | 'yearly';
  charityId?: string;
  contributionPercent: number;
  createdAt: string;
}

export interface Score {
  id: string;
  userId: string;
  value: number; // 1-45 Stableford
  date: string;
  createdAt: string;
}

export interface Charity {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  totalRaised: number;
}

export interface Draw {
  id: string;
  month: string;
  status: 'pending' | 'simulated' | 'published';
  mode: 'random' | 'algorithmic';
  prizePool: number;
  results?: DrawResult[];
  executedAt?: string;
}

export interface DrawResult {
  matchType: 5 | 4 | 3;
  userId: string;
  userName: string;
  prize: number;
  verified: boolean;
  proofUrl?: string;
  paymentStatus: 'pending' | 'paid';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
}
