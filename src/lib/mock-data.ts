import { User, Score, Charity, Draw, SubscriptionPlan } from './types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    interval: 'monthly',
    features: [
      'Enter monthly draws',
      'Track your scores',
      'Choose your charity',
      'Win amazing prizes',
      'Community access',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 89.99,
    interval: 'yearly',
    features: [
      'Everything in Monthly',
      'Save 25% annually',
      'Priority support',
      'Exclusive yearly draws',
      'Early access to features',
    ],
  },
];

export const mockCharities: Charity[] = [
  { id: '1', name: 'Green Future Foundation', description: 'Planting trees and restoring ecosystems worldwide to combat climate change.', image: '', category: 'Environment', featured: true, totalRaised: 45200 },
  { id: '2', name: 'Youth Sports Initiative', description: 'Providing sports equipment and coaching to underprivileged communities.', image: '', category: 'Youth', featured: true, totalRaised: 32100 },
  { id: '3', name: 'Mental Health Alliance', description: 'Breaking the stigma and providing accessible mental health resources.', image: '', category: 'Health', featured: false, totalRaised: 28750 },
  { id: '4', name: 'Ocean Cleanup Project', description: 'Removing plastics and pollutants from our oceans and waterways.', image: '', category: 'Environment', featured: true, totalRaised: 51300 },
  { id: '5', name: 'Education For All', description: 'Building schools and providing scholarships in developing nations.', image: '', category: 'Education', featured: false, totalRaised: 67800 },
  { id: '6', name: 'Animal Rescue Network', description: 'Rescuing and rehabilitating animals in need across the country.', image: '', category: 'Animals', featured: false, totalRaised: 19400 },
];

export const mockScores: Score[] = [
  { id: '1', userId: '1', value: 34, date: '2024-03-15', createdAt: '2024-03-15' },
  { id: '2', userId: '1', value: 28, date: '2024-03-08', createdAt: '2024-03-08' },
  { id: '3', userId: '1', value: 37, date: '2024-03-01', createdAt: '2024-03-01' },
  { id: '4', userId: '1', value: 31, date: '2024-02-22', createdAt: '2024-02-22' },
  { id: '5', userId: '1', value: 42, date: '2024-02-15', createdAt: '2024-02-15' },
];

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'user',
  subscriptionStatus: 'active',
  subscriptionPlan: 'monthly',
  charityId: '1',
  contributionPercent: 15,
  createdAt: '2024-01-01',
};

export const mockDraw: Draw = {
  id: '1',
  month: 'March 2024',
  status: 'published',
  mode: 'random',
  prizePool: 5000,
  executedAt: '2024-03-31',
  results: [
    { matchType: 5, userId: '1', userName: 'Alex Johnson', prize: 2000, verified: true, paymentStatus: 'paid' },
    { matchType: 4, userId: '2', userName: 'Sarah Williams', prize: 1750, verified: true, paymentStatus: 'pending' },
    { matchType: 3, userId: '3', userName: 'Mike Chen', prize: 1250, verified: false, paymentStatus: 'pending' },
  ],
};

export const statsData = {
  totalUsers: 1247,
  totalPrizePool: 52300,
  totalCharityContributions: 18900,
  activeSubs: 1183,
};
