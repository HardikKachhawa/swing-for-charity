import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Trophy, Target, Users, ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockCharities, statsData } from '@/lib/mock-data';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background" />
        <div className="container mx-auto px-4 relative">
          <motion.div className="max-w-3xl mx-auto text-center" {...fadeUp}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6"
            >
              <Heart className="w-3.5 h-3.5" />
              Golf Meets Giving
            </motion.div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Play Golf.{' '}
              <span className="text-gradient-primary">Win Prizes.</span>
              <br />
              Change Lives.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Subscribe, track your Stableford scores, and enter monthly draws — with a portion of every subscription going to the charity you choose.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing">
                <Button variant="hero" size="lg" className="text-base px-8 py-6">
                  Start Your Impact <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="text-base px-8 py-6">
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, label: 'Active Members', value: statsData.totalUsers.toLocaleString() },
              { icon: Trophy, label: 'Prize Pool', value: `£${statsData.totalPrizePool.toLocaleString()}` },
              { icon: Heart, label: 'Charity Raised', value: `£${statsData.totalCharityContributions.toLocaleString()}` },
              { icon: Star, label: 'Monthly Draws', value: '12+' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="bg-card rounded-xl p-5 shadow-card text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-14" {...fadeUp} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Four simple steps to start making a difference while playing the game you love.</p>
          </motion.div>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Subscribe', desc: 'Choose a monthly or yearly plan that fits you.' },
              { icon: Target, title: 'Track Scores', desc: 'Enter your last 5 Stableford scores.' },
              { icon: Trophy, title: 'Enter Draws', desc: 'Your scores become your draw entries each month.' },
              { icon: Heart, title: 'Give Back', desc: 'A portion goes directly to your chosen charity.' },
            ].map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="relative bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="absolute top-4 right-4 text-4xl font-bold text-muted/60 font-display">{i + 1}</span>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-14" {...fadeUp} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Charities</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Choose where your contribution goes. Every penny makes a difference.</p>
          </motion.div>
          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockCharities.filter(c => c.featured).map((charity) => (
              <motion.div key={charity.id} variants={fadeUp} className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group">
                <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">{charity.category}</span>
                <h3 className="font-semibold text-foreground mt-3 mb-2">{charity.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{charity.description}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold text-foreground">£{charity.totalRaised.toLocaleString()}</span>
                  <span className="text-muted-foreground">raised</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/charities">
              <Button variant="outline">View All Charities <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeUp}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-hero-gradient rounded-2xl p-10 md:p-14 text-center text-primary-foreground shadow-hero"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
              Join thousands of golfers who play with purpose. Your next round could change someone's life.
            </p>
            <Link to="/pricing">
              <Button variant="gold" size="lg" className="text-base px-8 py-6">
                Subscribe Now <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
