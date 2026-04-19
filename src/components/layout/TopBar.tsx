import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { SearchModal } from '../shared/SearchModal';
import { curriculumMap } from '../../data/curriculum-map';
import { getTopicBySlug } from '../../data';
import { Tooltip } from '../shared/Tooltip';

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const streak = useAppStore((s) => s.streak);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const theme = useAppStore((s) => s.theme);

  // Generate breadcrumbs based on route
  const pathParts = location.pathname.split('/').filter(Boolean);
  let breadcrumbs = [{ label: 'Home', path: '/' }];

  if (pathParts[0] === 'unit' && pathParts[1]) {
    const unit = curriculumMap.find((u) => u.slug === pathParts[1]);
    if (unit) {
      breadcrumbs.push({ label: `Unit ${unit.number}`, path: `/unit/${unit.slug}` });
      if (pathParts[2]) {
        const topic = getTopicBySlug(unit.slug, pathParts[2]);
        if (topic) {
          breadcrumbs.push({ label: topic.title, path: `/unit/${unit.slug}/${topic.slug}` });
        }
      }
    }
  } else if (pathParts[0] === 'labs') {
    breadcrumbs.push({ label: 'Labs', path: '/labs' });
    if (pathParts[1]) {
      breadcrumbs.push({ label: pathParts[1], path: `/labs/${pathParts[1]}` });
    }
  } else if (pathParts[0]) {
    // Capitalize first letter for other routes
    const title = pathParts[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    breadcrumbs.push({ label: title, path: `/${pathParts[0]}` });
  }

  return (
    <>
      <header className="h-14 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
        
        {/* Breadcrumbs (hidden on small mobile) */}
        <nav className="hidden sm:flex items-center text-sm">
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.path} className="flex items-center">
              {i > 0 && (
                <svg className="w-4 h-4 mx-2 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-medium text-[var(--color-text-primary)] truncate max-w-[200px] lg:max-w-[300px]">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors truncate max-w-[150px]">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Title (visible only when breadcrumbs are hidden) */}
        <div className="sm:hidden font-semibold text-[var(--color-text-primary)] truncate">
          {breadcrumbs[breadcrumbs.length - 1].label}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search trigger */}
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)] transition-colors text-sm text-[var(--color-text-muted)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="hidden md:inline">Search...</span>
            <span className="hidden md:inline text-[10px] bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded border border-[var(--color-border-primary)] ml-2">Cmd+K</span>
          </button>

          {/* Streak Indicator */}
          {streak.current > 0 && (
            <Tooltip content={`${streak.current} day learning streak!`}>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] text-sm font-semibold border border-[var(--color-warning)]/20 cursor-default">
                <span>🔥</span>
                <span>{streak.current}</span>
              </div>
            </Tooltip>
          )}

          {/* Theme Toggle */}
          <Tooltip content="Toggle Theme">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </Tooltip>

        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
