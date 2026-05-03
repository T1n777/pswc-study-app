import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { ScrollToTop } from '../shared/ScrollToTop';
import { useAppStore } from '../../store';
import { useEffect } from 'react';

export function MainLayout() {
  const theme = useAppStore((s) => s.theme);
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const mobileSidebarOpen = useAppStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);
  const location = useLocation();

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname, setMobileSidebarOpen]);

  // Handle Cmd+K globally to open search
  // The actual modal state is in TopBar, but we can trigger it via event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // A bit of a hack to click the search button since state is in TopBar
        // In a real app, searchOpen state would probably live in the Zustand store
        const searchBtn = document.querySelector('button[aria-label="Search"]') as HTMLButtonElement;
        if (searchBtn) searchBtn.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)]/30 overflow-x-hidden">
      {/* Desktop Sidebar — always visible on md+ */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <>
          {/* Dark overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 md:hidden animate-slide-in-left">
            <Sidebar forceMobileExpanded />
          </div>
        </>
      )}

      {/* Main Content — offset by sidebar width on desktop only */}
      <div
        className="flex flex-col min-h-screen transition-[margin-left] duration-300 ease-in-out"
        style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? (sidebarCollapsed ? '64px' : '256px') : '0px' }}
      >
        {/* Use CSS instead of JS for margin to avoid SSR issues */}
        <style>{`
          @media (min-width: 768px) {
            .main-content-area { margin-left: ${sidebarCollapsed ? '64px' : '256px'} !important; }
          }
          @media (max-width: 767px) {
            .main-content-area { margin-left: 0 !important; }
          }
        `}</style>
        <TopBar />

        <main className="flex-1 overflow-y-auto scroll-smooth pb-20 md:pb-0">
          <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10 w-full animate-fade-in">
            <Outlet />
          </div>
        </main>

        <ScrollToTop />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
