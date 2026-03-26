import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <div className="w-7 h-7 rounded-lg bg-hero-gradient flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              CharityDraw
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Play golf, win prizes, change lives. Every subscription supports the charities you care about.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Platform</h4>
            <div className="space-y-2">
              <Link to="/how-it-works" className="block text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
              <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/charities" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Charities</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">FAQ</span>
              <span className="block text-sm text-muted-foreground">Contact</span>
              <span className="block text-sm text-muted-foreground">Terms</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">Privacy Policy</span>
              <span className="block text-sm text-muted-foreground">Terms of Service</span>
              <span className="block text-sm text-muted-foreground">Cookie Policy</span>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2024 CharityDraw. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with <Heart className="inline w-3 h-3 text-primary" /> for charity</p>
        </div>
      </div>
    </footer>
  );
}
