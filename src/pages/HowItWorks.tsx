import { motion } from 'framer-motion';
import { Shield, Target, Trophy, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const steps = [
  { icon: Shield, title: 'Subscribe', desc: 'Pick a monthly (£9.99) or yearly (£89.99) plan. Your subscription funds the prize pool and charity contributions.', detail: 'Cancel anytime. No lock-in contracts.' },
  { icon: Target, title: 'Enter Your Scores', desc: 'Track your last 5 Stableford scores (1–45 points). New scores automatically replace the oldest.', detail: 'Scores are used for draw entry and algorithmic matching.' },
  { icon: Trophy, title: 'Monthly Draws', desc: 'Each month, a draw matches your scores. 5-match wins the jackpot (40%), 4-match gets 35%, 3-match gets 25%.', detail: 'Draws can be random or algorithmic. Jackpots roll over!' },
  { icon: Heart, title: 'Support Charity', desc: 'Choose your charity and set your contribution (min 10%). Your giving grows with every subscription cycle.', detail: 'Browse real charities and see your impact over time.' },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">How CharityDraw Works</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">A simple system that turns your golf game into prizes and charitable impact.</p>
          </motion.div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-6 items-start bg-card rounded-xl p-6 shadow-card"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-primary bg-accent px-2 py-0.5 rounded-full">Step {i + 1}</span>
                    <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-2">{step.desc}</p>
                  <p className="text-sm text-muted-foreground/70 italic">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
            <Link to="/pricing">
              <Button variant="hero" size="lg" className="text-base px-8 py-6">
                Get Started Today <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
