import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { subscriptionPlans } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground max-w-md mx-auto">Choose your plan. Every subscription includes draw entries and charity contributions.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {subscriptionPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all ${
                  plan.interval === 'yearly' ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.interval === 'yearly' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-hero-gradient text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Best Value
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-foreground">£{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval === 'monthly' ? 'mo' : 'yr'}</span>
                  {plan.interval === 'yearly' && (
                    <p className="text-sm text-primary mt-1 font-medium">Save 25% vs monthly</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button variant={plan.interval === 'yearly' ? 'hero' : 'outline'} className="w-full">
                    Get Started <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
