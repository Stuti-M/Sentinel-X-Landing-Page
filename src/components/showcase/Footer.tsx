import { Link } from "@tanstack/react-router";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-display font-bold tracking-tight text-foreground uppercase mb-4 inline-block">
              Sentinel-X
            </Link>
            <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-6">
              Autonomous Environmental Intelligence
            </p>
            <div className="font-display font-bold text-sm tracking-widest text-secondary-foreground uppercase flex flex-wrap gap-4">
              <span>Detect.</span>
              <span>Verify.</span>
              <span>Reason.</span>
              <span>Respond.</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[9px] tracking-[0.2em] text-foreground uppercase mb-6 border-b border-border/50 pb-2">Navigation</h4>
            <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <li><a href="#overview" className="text-muted-foreground hover:text-signal transition-colors">Overview</a></li>
              <li><a href="#intelligence" className="text-muted-foreground hover:text-signal transition-colors">Intelligence</a></li>
              <li><a href="#system" className="text-muted-foreground hover:text-signal transition-colors">System</a></li>
              <li><a href="#technology" className="text-muted-foreground hover:text-signal transition-colors">Technology</a></li>
              <li><Link to="/command" className="text-signal hover:text-white transition-colors">Launch ↗</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[9px] tracking-[0.2em] text-foreground uppercase mb-6 border-b border-border/50 pb-2">Connect</h4>
            <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-interactive>GitHub ↗</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-interactive>LinkedIn ↗</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-interactive>Portfolio ↗</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} Sentinel-X. All rights reserved.
          </p>
          <div className="flex gap-4 font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
            <span>Demo Application</span>
            <span>Version 1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
