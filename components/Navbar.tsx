import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun, Moon, LogIn, LogOut, User,
  LayoutDashboard, Compass, Menu, X, Sprout, Settings
} from 'lucide-react';

export function Navbar() {
  const { page, isLoggedIn, isGuest, theme, navigate, login, logout, toggleTheme, getAuthor, currentUserId } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const author = currentUserId ? getAuthor(currentUserId) : null;
  const avatarStyle = author?.avatarUrl
    ? { backgroundImage: `url(${author.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: author?.avatarGradient };

  const navLink = (label: string, pageType: string, onClick: () => void, icon: React.ReactNode) => {
    const isActive = page.type === pageType;
    return (
      <button
        onClick={() => {
          onClick();
          setMobileMenuOpen(false);
        }}
        className={`relative flex items-center gap-2 px-4 py-3 text-[11px] font-mono uppercase tracking-[0.18em] transition-all border-b-2 ${
          isActive
            ? 'text-basil-700 dark:text-basil-300 border-basil-600 dark:border-basil-400'
            : 'text-text-muted dark:text-text-muted-dark border-transparent hover:text-basil-700 dark:hover:text-basil-300 hover:border-basil-400/60'
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-stem/20 dark:border-leaf-light/10 glass-panel">
      <div className="absolute inset-0 greenhouse-grid opacity-40" />
      <div className="absolute inset-0 sunlight-overlay opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 min-h-[72px]">
          <button
            onClick={() => navigate(isLoggedIn ? { type: 'dashboard' } : { type: 'home' })}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-basil-600 dark:text-basil-400" fill="currentColor">
                {/* Wobbly outer frame */}
                <path d="M12,12 C25,10 75,10 88,12 C90,25 90,75 88,88 C75,90 25,90 12,88 C10,75 10,25 12,12 Z M16,16 C15,25 15,75 16,84 C25,85 75,85 84,84 C85,75 85,25 84,16 C75,15 25,15 16,16 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
                
                {/* Book 1 */}
                <path d="M22,28 L34,28 L35,76 L21,76 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M22,38 L34,38 M21,50 L35,50 M21,62 L34,62" stroke="currentColor" strokeWidth="1.5" />
                <path d="M24,30 L32,30 L31,36 L25,36 Z M23,40 L33,40 L33,48 L23,48 Z M23,52 L33,52 L33,60 L24,60 Z M23,64 L33,64 L33,74 L23,74 Z" fill="currentColor" opacity="0.7"/>
                
                {/* Book 2 (tallest) */}
                <path d="M38,20 L50,18 L51,78 L37,78 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M38,32 L51,32 M37,68 L51,68" stroke="currentColor" strokeWidth="1.5" />
                <path d="M40,22 L48,21 L49,30 L39,30 Z M39,34 L49,34 L50,66 L39,66 Z M39,70 L49,70 L49,76 L39,76 Z" fill="currentColor" opacity="0.8"/>
                
                {/* Book 3 */}
                <path d="M54,26 L66,27 L66,75 L53,75 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M54,36 L66,36 M53,52 L66,52 M53,64 L66,64" stroke="currentColor" strokeWidth="1.5" />
                <path d="M56,28 L64,29 L64,34 L55,34 Z M55,38 L64,38 L64,50 L55,50 Z M55,54 L64,54 L64,62 L55,62 Z M54,66 L64,66 L64,73 L55,73 Z" fill="currentColor" opacity="0.7"/>
                
                {/* Book 4 */}
                <path d="M70,26 L81,26 L80,74 L69,74 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M70,36 L81,36 M69,48 L80,48 M69,62 L80,62" stroke="currentColor" strokeWidth="1.5" />
                <path d="M72,28 L79,28 L79,34 L71,34 Z M71,38 L79,38 L78,46 L70,46 Z M70,50 L78,50 L78,60 L70,60 Z M70,64 L78,64 L78,72 L70,72 Z" fill="currentColor" opacity="0.7"/>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.24em] text-text-primary dark:text-text-primary-dark leading-none">
                Asset<span className="text-basil-600 dark:text-basil-400">Shelf</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-text-muted dark:text-text-muted-dark mt-1">
                greenhouse exchange
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLink('Home', 'home', () => navigate({ type: 'home' }), <Sprout className="w-3.5 h-3.5" />)}
            {navLink('Browse', 'browse', () => navigate({ type: 'browse' }), <Compass className="w-3.5 h-3.5" />)}
            {isLoggedIn && !isGuest && navLink('Dashboard', 'dashboard', () => navigate({ type: 'dashboard' }), <LayoutDashboard className="w-3.5 h-3.5" />)}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 border-2 border-stem/20 dark:border-leaf-light/20 text-text-secondary dark:text-text-secondary-dark hover:text-basil-700 dark:hover:text-basil-300 hover:border-basil-500 bg-white/35 dark:bg-white/0 transition-all"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]">
                {theme === 'dark' ? 'Day' : 'Night'}
              </span>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate({ type: 'profile', id: currentUserId! })}
                  className="flex items-center gap-3 px-3 py-2 border-2 border-stem/20 dark:border-leaf-light/20 bg-white/35 dark:bg-white/0 hover:border-basil-500 transition-all"
                >
                  <div
                    className="w-7 h-7 avatar-circle border-2 border-basil-500"
                    style={avatarStyle}
                  />
                  <div className="text-left">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-text-primary dark:text-text-primary-dark">
                      {author?.name}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-text-muted dark:text-text-muted-dark">
                      {isGuest ? 'guest view only' : 'member account'}
                    </div>
                  </div>
                </button>
                {!isGuest && (
                  <button
                    onClick={() => navigate({ type: 'settings' })}
                    className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] border-2 border-stem/20 dark:border-leaf-light/20 text-text-muted dark:text-text-muted-dark hover:text-basil-700 dark:hover:text-basil-300 hover:border-basil-500 transition-all"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </button>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] border-2 border-stem/20 dark:border-leaf-light/20 text-text-muted dark:text-text-muted-dark hover:text-error hover:border-error transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="btn-fresh flex items-center gap-2 px-5 py-2.5 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-2 border-stem/20 dark:border-leaf-light/20 text-text-secondary dark:text-text-secondary-dark"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden relative pb-4 pt-3 border-t-2 border-stem/20 dark:border-leaf-light/10 animate-fade-in">
            <div className="space-y-1">
              <button
                onClick={() => { navigate({ type: 'home' }); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary dark:text-text-secondary-dark border-l-2 border-transparent hover:border-basil-500 hover:bg-basil-50/60 dark:hover:bg-basil-950/20"
              >
                <Sprout className="w-4 h-4" /> Home
              </button>
              <button
                onClick={() => { navigate({ type: 'browse' }); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary dark:text-text-secondary-dark border-l-2 border-transparent hover:border-basil-500 hover:bg-basil-50/60 dark:hover:bg-basil-950/20"
              >
                <Compass className="w-4 h-4" /> Browse
              </button>
              {isLoggedIn && (
                !isGuest && (
                  <button
                    onClick={() => { navigate({ type: 'dashboard' }); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary dark:text-text-secondary-dark border-l-2 border-transparent hover:border-basil-500 hover:bg-basil-50/60 dark:hover:bg-basil-950/20"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                )
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-stem/20 dark:border-leaf-light/10 space-y-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary dark:text-text-secondary-dark"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Day Mode' : 'Night Mode'}
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => { navigate({ type: 'profile', id: currentUserId! }); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary dark:text-text-secondary-dark"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  {!isGuest && (
                    <button
                      onClick={() => { navigate({ type: 'settings' }); setMobileMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-text-secondary dark:text-text-secondary-dark"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                  )}
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-error"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { login(); setMobileMenuOpen(false); }}
                  className="btn-fresh flex items-center gap-2 w-full px-4 py-3 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
