import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="content-container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="default" size="sm" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="content-container flex flex-col gap-4 py-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium transition-colors hover:text-foreground ${
                  location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="default" className="w-full mt-2" asChild>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Get in Touch</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
