import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-primary">
              Aarika Boutique
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium ethnic wear for the modern woman. Handcrafted with love,
              designed for elegance.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/shop"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shop All
              </Link>
              <Link
                to="/custom-stitch"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Custom Stitch
              </Link>
              <Link
                to="/shop?category=sarees"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sarees
              </Link>
              <Link
                to="/shop?category=lehenga"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Lehenga
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">
              Help
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                My Account
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Track Order
              </Link>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Returns & Exchanges
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Size Guide
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" /> Mukandpur, Punjab, India
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> hello@aarika.coms
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 Aarika Boutique. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
