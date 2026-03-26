import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Heart, Users, Trophy, TrendingUp, Settings, BarChart3,
  Play, CheckCircle2, XCircle, LogOut, Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mockCharities, mockDraw, statsData } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

type Tab = 'overview' | 'users' | 'draws' | 'charities' | 'winners';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('overview');
  const [drawMode, setDrawMode] = useState<'random' | 'algorithmic'>('random');
  const navigate = useNavigate();
  const { toast } = useToast();

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'draws', label: 'Draws', icon: Trophy },
    { id: 'charities', label: 'Charities', icon: Heart },
    { id: 'winners', label: 'Winners', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <div className="w-7 h-7 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            CharityDraw <span className="text-xs font-normal text-muted-foreground ml-1">Admin</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Users, label: 'Total Users', value: statsData.totalUsers.toLocaleString(), change: '+12%' },
                { icon: Users, label: 'Active Subs', value: statsData.activeSubs.toLocaleString(), change: '+8%' },
                { icon: Trophy, label: 'Prize Pool', value: `£${statsData.totalPrizePool.toLocaleString()}`, change: '+15%' },
                { icon: Heart, label: 'Charity Total', value: `£${statsData.totalCharityContributions.toLocaleString()}`, change: '+22%' },
              ].map(stat => (
                <div key={stat.label} className="bg-card rounded-xl p-5 shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {['New user: Sarah Williams', 'Draw March 2024 published', 'Winner verified: Alex Johnson', 'Charity updated: Green Future Foundation'].map((act, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => setTab('draws')} className="justify-start"><Play className="w-4 h-4 mr-2" /> Run Draw</Button>
                  <Button variant="outline" onClick={() => setTab('users')} className="justify-start"><Users className="w-4 h-4 mr-2" /> Manage Users</Button>
                  <Button variant="outline" onClick={() => setTab('charities')} className="justify-start"><Heart className="w-4 h-4 mr-2" /> Add Charity</Button>
                  <Button variant="outline" onClick={() => setTab('winners')} className="justify-start"><CheckCircle2 className="w-4 h-4 mr-2" /> Verify Winners</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-foreground">User Management</h3>
                <div className="relative w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-9" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Plan</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Actions</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { name: 'Alex Johnson', email: 'alex@example.com', plan: 'Monthly', status: 'Active' },
                      { name: 'Sarah Williams', email: 'sarah@example.com', plan: 'Yearly', status: 'Active' },
                      { name: 'Mike Chen', email: 'mike@example.com', plan: 'Monthly', status: 'Inactive' },
                    ].map(u => (
                      <tr key={u.email} className="border-b border-border last:border-0">
                        <td className="py-3 px-2 font-medium text-foreground">{u.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                        <td className="py-3 px-2">{u.plan}</td>
                        <td className="py-3 px-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{u.status}</span>
                        </td>
                        <td className="py-3 px-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Draws Tab */}
        {tab === 'draws' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Draw Configuration</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label>Draw Mode</Label>
                  <div className="flex gap-2 mt-2">
                    {(['random', 'algorithmic'] as const).map(mode => (
                      <button key={mode} onClick={() => setDrawMode(mode)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${drawMode === mode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Prize Pool</Label>
                  <Input type="number" defaultValue={5000} className="mt-2" />
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-foreground mb-2">Prize Distribution</p>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="bg-card rounded-lg p-3"><p className="font-bold text-gold">5-Match</p><p className="text-muted-foreground">40% • Jackpot</p></div>
                  <div className="bg-card rounded-lg p-3"><p className="font-bold text-primary">4-Match</p><p className="text-muted-foreground">35%</p></div>
                  <div className="bg-card rounded-lg p-3"><p className="font-bold text-primary">3-Match</p><p className="text-muted-foreground">25%</p></div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => toast({ title: 'Simulation Complete', description: 'Draw simulated successfully. Review results below.' })}>
                  <Play className="w-4 h-4 mr-2" /> Simulate
                </Button>
                <Button variant="hero" onClick={() => toast({ title: 'Draw Published!', description: 'Results are now visible to all users.' })}>
                  Publish Draw
                </Button>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Past Draws</h3>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">{mockDraw.month}</p>
                  <p className="text-sm text-muted-foreground">Pool: £{mockDraw.prizePool.toLocaleString()} • {mockDraw.mode}</p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{mockDraw.status}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Charities Tab */}
        {tab === 'charities' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-foreground">Manage Charities</h3>
                <Button variant="hero" size="sm" onClick={() => toast({ title: 'Coming soon', description: 'Charity creation will be available with backend integration.' })}>
                  Add Charity
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCharities.map(charity => (
                  <div key={charity.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{charity.name}</p>
                        <p className="text-xs text-muted-foreground">{charity.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{charity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">£{charity.totalRaised.toLocaleString()}</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Winners Tab */}
        {tab === 'winners' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Winner Verification</h3>
              <div className="space-y-4">
                {mockDraw.results?.map(r => (
                  <div key={r.userId} className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                    <div>
                      <p className="font-medium text-foreground">{r.userName}</p>
                      <p className="text-sm text-muted-foreground">{r.matchType}-match • £{r.prize.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.verified ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>
                        {r.verified ? 'Verified' : 'Pending'}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.paymentStatus === 'paid' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {r.paymentStatus}
                      </span>
                      {!r.verified && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Approved', description: `${r.userName} verified.` })}>
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: 'Rejected', description: `${r.userName} rejected.`, variant: 'destructive' })}>
                            <XCircle className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
