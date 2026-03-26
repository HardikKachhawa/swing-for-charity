import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockCharities } from '@/lib/mock-data';

export default function Charities() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(mockCharities.map(c => c.category))];
  const filtered = mockCharities.filter(c =>
    (category === 'All' || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Charities</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Browse and discover the charities you can support through your subscription.</p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search charities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      category === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.map((charity, i) => (
                <motion.div
                  key={charity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">{charity.category}</span>
                  {charity.featured && <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full ml-2">Featured</span>}
                  <h3 className="font-semibold text-foreground mt-3 mb-2">{charity.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{charity.description}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="font-semibold text-foreground">£{charity.totalRaised.toLocaleString()}</span>
                    <span className="text-muted-foreground">raised</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
