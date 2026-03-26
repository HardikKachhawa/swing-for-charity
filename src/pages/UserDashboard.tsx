import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Trophy, Target, Star, Plus, Trash2, LogOut, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mockUser, mockScores, mockCharities, mockDraw } from '@/lib/mock-data';
import { addScore, getAverageScore, getHighestScore, validateScore } from '@/lib/score-logic';
import { Score } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function UserDashboard() {
  const [scores, setScores] = useState<Score[]>(mockScores);
  const [newScore, setNewScore] = useState('');
  const [newDate, setNewDate] = useState('');
  const [selectedCharity, setSelectedCharity] = useState(mockUser.charityId || '1');
  const [contribution, setContribution] = useState(mockUser.contributionPercent);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddScore = () => {
    const val = parseInt(newScore);
    if (!validateScore(val)) {
      toast({ title: 'Invalid score', description: 'Score must be between 1 and 45.', variant: 'destructive' });
      return;
    }
    if (!newDate) {
      toast({ title: 'Date required', description: 'Please select a date.', variant: 'destructive' });
      return;
    }
    setScores(addScore(scores, { userId: mockUser.id, value: val, date: newDate }));
    setNewScore('');
    setNewDate('');
    toast({ title: 'Score added!', description: `Score of ${val} recorded.` });
  };

  const userCharity = mockCharities.find(c => c.id === selectedCharity);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <div className="w-7 h-7 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            CharityDraw
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{mockUser.name}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-bold text-foreground mb-8">
          Your Dashboard
        </motion.h1>

        {/* Status Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Star, label: 'Subscription', value: mockUser.subscriptionPlan === 'monthly' ? 'Monthly' : 'Yearly', sub: mockUser.subscriptionStatus === 'active' ? 'Active' : 'Inactive', color: 'text-primary' },
            { icon: Target, label: 'Avg Score', value: getAverageScore(scores).toString(), sub: `${scores.length}/5 scores`, color: 'text-primary' },
            { icon: Trophy, label: 'Best Score', value: getHighestScore(scores).toString(), sub: 'Stableford pts', color: 'text-gold' },
            { icon: Heart, label: 'Charity', value: `${contribution}%`, sub: userCharity?.name || 'Not selected', color: 'text-primary' },
          ].map(card => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-5 shadow-card">
              <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scores */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Scores</h2>
            <p className="text-sm text-muted-foreground mb-4">Last 5 Stableford scores. New scores replace the oldest.</p>
            <div className="flex gap-2 mb-4">
              <Input type="number" min={1} max={45} placeholder="Score (1-45)" value={newScore} onChange={e => setNewScore(e.target.value)} className="flex-1" />
              <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="flex-1" />
              <Button variant="hero" size="icon" onClick={handleAddScore}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-2">
              {scores.map((score, i) => (
                <div key={score.id} className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3">
                  <div>
                    <span className="font-bold text-foreground text-lg">{score.value}</span>
                    <span className="text-muted-foreground text-sm ml-2">pts</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date(score.date).toLocaleDateString()}</span>
                </div>
              ))}
              {scores.length === 0 && <p className="text-center text-muted-foreground py-6">No scores yet. Add your first score above!</p>}
            </div>
          </motion.div>

          {/* Charity & Contribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Charity</h2>
              <div className="space-y-3">
                {mockCharities.slice(0, 4).map(charity => (
                  <button
                    key={charity.id}
                    onClick={() => setSelectedCharity(charity.id)}
                    className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                      selectedCharity === charity.id ? 'bg-accent ring-2 ring-primary' : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{charity.name}</p>
                      <p className="text-xs text-muted-foreground">{charity.category}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <Label>Contribution: {contribution}%</Label>
                <input
                  type="range" min={10} max={50} value={contribution}
                  onChange={e => setContribution(parseInt(e.target.value))}
                  className="w-full mt-2 accent-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Minimum 10%. You're contributing {contribution}% of your subscription.</p>
              </div>
            </div>

            {/* Draw Status */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Latest Draw</h2>
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-semibold text-foreground">{mockDraw.month}</p>
                  <p className="text-sm text-muted-foreground">Prize Pool: £{mockDraw.prizePool.toLocaleString()}</p>
                </div>
                <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                  mockDraw.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'
                }`}>
                  {mockDraw.status}
                </span>
              </div>
              {mockDraw.results?.map(r => (
                <div key={r.userId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.userName}</p>
                    <p className="text-xs text-muted-foreground">{r.matchType}-match</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">£{r.prize.toLocaleString()}</p>
                    <p className={`text-xs ${r.paymentStatus === 'paid' ? 'text-primary' : 'text-gold'}`}>{r.paymentStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
