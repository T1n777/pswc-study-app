import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Practice', path: '/theory-practice', icon: '📝' },
    { label: 'Labs', path: '/labs', icon: '🧪' },
    { label: 'Progress', path: '/progress', icon: '📈' },
    { label: 'Bookmarks', path: '/bookmarks', icon: '🔖' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-bg-card)] border-t border-[var(--color-border-primary)] z-40 flex items-center justify-around px-2 pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors',
              isActive ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
