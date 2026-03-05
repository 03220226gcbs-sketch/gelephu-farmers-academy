import { PageView } from '../App';
import { Leaf, Heart, Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  setPage: (page: PageView) => void;
}

const quickLinks: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Training', page: 'training' },
  { label: 'Techniques', page: 'techniques' },
  { label: 'Projects', page: 'projects' },
  { label: 'GDP Dashboard', page: 'gdp' },
  { label: 'Store', page: 'store' },
  { label: 'Testimonials', page: 'testimonials' },
  { label: 'News', page: 'news' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Contact', page: 'contact' },
];

export default function Footer({ setPage }: FooterProps) {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'gelephu-farmers-academy');

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">
                <span className="text-primary">Gelephu</span> Farmers Academy
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Bhutanese farmers with modern agricultural techniques to achieve sustainable livelihoods and contribute to national GDP growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setPage(link.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 min-h-[36px] flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">More</h3>
            <ul className="space-y-1">
              {quickLinks.slice(5).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setPage(link.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 min-h-[36px] flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:+97577421966"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                +975 77421966
              </a>
              <a
                href="https://wa.me/97577421966"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0 text-primary" />
                WhatsApp Us
              </a>
              <p className="text-sm text-muted-foreground">
                Gelephu, Sarpang District<br />
                Bhutan
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 sm:mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Gelephu Farmers Academy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary fill-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
