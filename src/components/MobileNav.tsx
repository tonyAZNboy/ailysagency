import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, MapPin, BarChart3, Settings, ChevronDown, ChevronRight, MessageCircle, FileText, Building, Calendar, BarChart, Palette, Zap, Shield, Globe, Puzzle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/providers/AuthProvider";
import { TenantSwitcher } from "./TenantSwitcher";
import { ThemeToggle } from "./ThemeToggle";
const navigation = [{
  title: "Dashboard",
  url: "/dashboard",
  icon: Home
}, {
  title: "Locations",
  url: "/locations",
  icon: MapPin
}, {
  title: "Campaigns",
  url: "/campaigns",
  icon: Trophy
}, {
  title: "Domain Enhancer",
  url: "/domain-enhancer",
  icon: Globe
}, {
  title: "Add-Ons",
  url: "/add-ons",
  icon: Puzzle
}];
const socialMediaNavigation = [{
  title: "Calendar",
  url: "/calendar",
  icon: Calendar
}, {
  title: "Analytics",
  url: "/analytics",
  icon: BarChart
}, {
  title: "Create",
  url: "/create",
  icon: Palette
}];
const settingsNavigation = [{
  title: "Business DNA",
  url: "/settings/business-dna",
  icon: Building
}, {
  title: "Reviews",
  url: "/settings/reviews",
  icon: MessageCircle
}, {
  title: "Billing",
  url: "/settings/billing",
  icon: BarChart3
}];
interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export function MobileNav({
  isOpen,
  onOpenChange
}: MobileNavProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [socialMediaOpen, setSocialMediaOpen] = useState(false);
  const location = useLocation();
  const {
    signOut
  } = useAuth();
  const currentPath = location.pathname;
  const openAgent = () => {
    // Trigger the same action as the blue robot button
    const event = new CustomEvent('openAIAgent');
    window.dispatchEvent(event);
    onOpenChange(false); // Close mobile nav
  };
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };
  const isSettingsActive = settingsNavigation.some(item => isActive(item.url));
  const isSocialMediaActive = socialMediaNavigation.some(item => isActive(item.url));

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const activeNavItem = navigation.find(item => isActive(item.url));
    if (activeNavItem) return activeNavItem.title;
    const activeSocialMediaItem = socialMediaNavigation.find(item => isActive(item.url));
    if (activeSocialMediaItem) return activeSocialMediaItem.title;
    const activeSettingsItem = settingsNavigation.find(item => isActive(item.url));
    if (activeSettingsItem) return activeSettingsItem.title;
    if (currentPath.startsWith("/settings")) return "Settings";
    return "Dashboard";
  };
  return <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-[25px] w-[25px] px-0" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-80 p-0"
          style={{
            background: 'var(--bg-glass)',
            backdropFilter: 'var(--glass-blur-heavy)',
            WebkitBackdropFilter: 'var(--glass-blur-heavy)',
            boxShadow: 'var(--glass-specular-sovran)',
            border: 'none',
            borderRight: '1px solid var(--border-glass)',
          }}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Navigation</h2>
              </div>
              <TenantSwitcher />
            </div>
            
            <nav className="flex-1 p-6 overflow-y-auto">
              <ul className="space-y-2">
                {navigation.map(item => <li key={item.title}>
                    <NavLink to={item.url} onClick={() => onOpenChange(false)} end={item.url === "/dashboard"} className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all ${isActive(item.url) ? "liquid-glass-pill bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]" : "text-foreground hover:text-primary hover:bg-primary/10 rounded-full"}`}>
                      <item.icon className="h-5 w-5" />
                      <span className="relative z-[2]">{item.title}</span>
                    </NavLink>
                  </li>)}
                
                {/* Social Media Manager Collapsible Menu */}
                <li>
                  <Collapsible open={socialMediaOpen || isSocialMediaActive} onOpenChange={setSocialMediaOpen}>
                    <CollapsibleTrigger className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all ${isSocialMediaActive ? "liquid-glass-pill bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]" : "text-foreground hover:text-primary hover:bg-primary/10"}`}>
                      <div className="flex items-center gap-3 relative z-[2]">
                        <Calendar className="h-5 w-5" />
                        Social Media Manager
                      </div>
                      <span className="relative z-[2]">{socialMediaOpen || isSocialMediaActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 mt-2 space-y-1">
                    {socialMediaNavigation.map(item => (
                      <NavLink key={item.title} to={item.url} onClick={() => onOpenChange(false)} className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all ${isActive(item.url) ? "liquid-glass-pill bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]" : "text-foreground hover:text-primary hover:bg-primary/10"}`}>
                        <item.icon className="h-4 w-4" />
                        <span className="relative z-[2]">{item.title}</span>
                      </NavLink>
                    ))}
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                
                {/* Settings Collapsible Menu */}
                <li>
                  <Collapsible open={settingsOpen || isSettingsActive} onOpenChange={setSettingsOpen}>
                    <CollapsibleTrigger className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all ${isSettingsActive ? "liquid-glass-pill bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]" : "text-foreground hover:text-primary hover:bg-primary/10"}`}>
                      <div className="flex items-center gap-3 relative z-[2]">
                        <Settings className="h-5 w-5" />
                        Settings
                      </div>
                      <span className="relative z-[2]">{settingsOpen || isSettingsActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 mt-2 space-y-1">
                      {settingsNavigation.map(item => <NavLink key={item.title} to={item.url} onClick={() => onOpenChange(false)} className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all ${isActive(item.url) ? "liquid-glass-pill bg-primary/10 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]" : "text-foreground hover:text-primary hover:bg-primary/10"}`}>
                          <item.icon className="h-4 w-4" />
                          <span className="relative z-[2]">{item.title}</span>
                        </NavLink>)}
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              </ul>
            </nav>

            <div className="p-6 border-t flex-shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
              <Button variant="outline" onClick={signOut} className="w-full btn-press bg-white/50 hover:bg-white/70 border-white/30 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 dark:border-white/20">
                Sign out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>;
}