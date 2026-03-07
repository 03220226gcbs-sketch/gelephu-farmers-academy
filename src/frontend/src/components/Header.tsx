import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Globe, Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import type { PageView } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLanguage } from "../hooks/useLanguage";

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const navItems: { label: string; labelDz: string; page: PageView }[] = [
  { label: "Home", labelDz: "གཙོ་ངོས།", page: "home" },
  { label: "Training", labelDz: "སློབ་གསོ།", page: "training" },
  { label: "Techniques", labelDz: "ལག་རྩལ།", page: "techniques" },
  { label: "Projects", labelDz: "ལས་གཞི།", page: "projects" },
  { label: "SOPs", labelDz: "ལམ་སྟོན།", page: "sops" },
  { label: "GDP", labelDz: "དཔལ་འབྱོར།", page: "gdp" },
  { label: "Store", labelDz: "ཚོང་ར།", page: "store" },
  { label: "Testimonials", labelDz: "གཏམ་བཤད།", page: "testimonials" },
  { label: "News", labelDz: "གསར་འགྱུར།", page: "news" },
  { label: "FAQ", labelDz: "དྲི་བ།", page: "faq" },
  { label: "Contact", labelDz: "འབྲེལ་ལམ།", page: "contact" },
];

const authNavItems: { label: string; labelDz: string; page: PageView }[] = [
  { label: "Dashboard", labelDz: "སྡེ་ཚན།", page: "dashboard" },
  { label: "My Progress", labelDz: "ངའི་འཕེལ་རིམ།", page: "myProgress" },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { language, toggleLanguage } = useLanguage();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message === "User is already authenticated"
        ) {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleNavigate = (page: PageView) => {
    onNavigate(page);
    setMobileOpen(false);
    setMoreOpen(false);
  };

  const primaryNav = navItems.slice(0, 6);
  const secondaryNav = navItems.slice(6);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 min-h-[44px] min-w-[44px] -ml-1 px-1"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm sm:text-base leading-tight hidden xs:block">
              <span className="text-primary">Gelephu</span> Farmers
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((item) => (
              <button
                type="button"
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[36px] ${
                  currentPage === item.page
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {language === "en" ? item.label : item.labelDz}
              </button>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[36px]"
              >
                More
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-1 w-44 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                  {secondaryNav.map((item) => (
                    <button
                      type="button"
                      key={item.page}
                      onClick={() => handleNavigate(item.page)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        currentPage === item.page
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {language === "en" ? item.label : item.labelDz}
                    </button>
                  ))}
                  {isAuthenticated &&
                    authNavItems.map((item) => (
                      <button
                        type="button"
                        key={item.page}
                        onClick={() => handleNavigate(item.page)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          currentPage === item.page
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {language === "en" ? item.label : item.labelDz}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px]"
              title="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {language === "en" ? "EN" : "དཀ"}
              </span>
            </button>

            {/* Auth Button */}
            <Button
              size="sm"
              variant={isAuthenticated ? "outline" : "default"}
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="hidden sm:flex min-h-[44px] text-xs sm:text-sm"
            >
              {isLoggingIn
                ? "Logging in..."
                : isAuthenticated
                  ? "Logout"
                  : "Login"}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* All nav items */}
            {navItems.map((item) => (
              <button
                type="button"
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[48px] flex items-center ${
                  currentPage === item.page
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {language === "en" ? item.label : item.labelDz}
              </button>
            ))}

            {/* Auth-only items */}
            {isAuthenticated && (
              <>
                <div className="border-t border-border my-2" />
                {authNavItems.map((item) => (
                  <button
                    type="button"
                    key={item.page}
                    onClick={() => handleNavigate(item.page)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[48px] flex items-center ${
                      currentPage === item.page
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {language === "en" ? item.label : item.labelDz}
                  </button>
                ))}
              </>
            )}

            {/* Mobile Auth + Language */}
            <div className="border-t border-border pt-3 mt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[48px]"
              >
                <Globe className="w-4 h-4" />
                {language === "en"
                  ? "Switch to Dzongkha (དཀ)"
                  : "Switch to English (EN)"}
              </button>
              <Button
                variant={isAuthenticated ? "outline" : "default"}
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="w-full min-h-[48px]"
              >
                {isLoggingIn
                  ? "Logging in..."
                  : isAuthenticated
                    ? "Logout"
                    : "Login"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for more dropdown */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40"
          role="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setMoreOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMoreOpen(false);
          }}
        />
      )}
    </header>
  );
}
