import { useApp } from '../context/AppContext';
import {
  Compass,
  LogIn,
  Package,
  BookMarked,
  Users,
  TrendingUp,
  ArrowRight,
  Layers,
  Sprout,
  Leaf,
  SunMoon,
  Flower2
} from 'lucide-react';
import { CATEGORY_LABELS } from '../types';

export function HomePage() {
  const { navigate, login, assets, authors, isLoggedIn, isGuest, currentUserId, getAuthor } = useApp();
  const currentUser = currentUserId ? getAuthor(currentUserId) : null;
  const totalDownloads = assets.reduce((s, a) => s + a.downloads, 0);
  const rainDrops = Array.from({ length: 28 }, (_, i) => ({
    left: `${4 + ((i * 17) % 92)}%`,
    delay: `${(i * 0.23) % 2.7}s`,
    duration: `${1.35 + (i % 6) * 0.22}s`,
    height: `${44 + (i % 7) * 18}px`,
    opacity: 0.18 + (i % 5) * 0.08,
  }));
  const cloudGroups = [
    { className: 'window-cloud cloud-large left-[8%] top-[12%]' },
    { className: 'window-cloud cloud-medium left-[52%] top-[18%]' },
    { className: 'window-cloud cloud-small left-[28%] top-[28%]' },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden border-b-2 border-stem/20 dark:border-leaf-light/10">
        <div className="absolute inset-0 greenhouse-grid" />
        <div className="absolute inset-0 leaf-pattern" />
        <div className="absolute inset-0 sunlight-overlay" />
        <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-basil-200/35 to-transparent dark:from-basil-950/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-basil-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.32em] text-basil-700 dark:text-basil-300">
                  fresh air for game assets
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-text-primary dark:text-text-primary-dark leading-[1.06] mb-6">
                {isLoggedIn && currentUser ? (
                  <>Welcome back, <span className="text-basil-600 dark:text-basil-400">{currentUser.name}</span>.</>
                ) : (
                  <>Welcome to <span className="text-basil-600 dark:text-basil-400">AssetShelf</span>.</>
                )}
              </h1>

              <p className="text-base sm:text-lg text-text-muted dark:text-text-muted-dark leading-relaxed mb-10 max-w-2xl">
                Browse community-made models, libraries, textures, and tools like rows of living collections. In daylight, the shelves feel bright and breathable. At night, the greenhouse becomes calm, cool, and softly lit for focused discovery.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => navigate({ type: 'browse' })}
                  className="btn-fresh flex items-center gap-2 px-7 py-3 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
                >
                  <Compass className="w-4 h-4" />
                  Browse Collection
                </button>
                {isLoggedIn && !isGuest ? (
                  <button
                    onClick={() => navigate({ type: 'dashboard' })}
                    className="btn-fresh flex items-center gap-2 px-7 py-3 text-basil-700 dark:text-basil-300 border-basil-500 hover:bg-basil-50 dark:hover:bg-basil-900/30"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Go to Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => login()}
                    className="btn-fresh flex items-center gap-2 px-7 py-3 text-basil-700 dark:text-basil-300 border-basil-500 hover:bg-basil-50 dark:hover:bg-basil-950/20"
                  >
                    <LogIn className="w-4 h-4" />
                    {isGuest ? 'Sign In to Publish' : 'Sign In'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-stem/15 dark:border-leaf-light/10 glass-panel">
                {[
                  {
                    icon: <Leaf className="w-5 h-5" />,
                    title: 'Fresh Discoveries',
                    text: 'Find high-quality assets for mods, prototypes, and shipped games.',
                  },
                  {
                    icon: <Flower2 className="w-5 h-5" />,
                    title: 'Creator Profiles',
                    text: 'Every project shows its author, library details, files, and screenshots.',
                  },
                  {
                    icon: <SunMoon className="w-5 h-5" />,
                    title: 'Day / Night Mood',
                    text: 'Swap between bright greenhouse daylight and calm moonlit glasshouse mode.',
                  },
                ].map((item, i) => (
                  <div key={item.title} className={`p-5 ${i > 0 ? 'border-l-2 border-stem/15 dark:border-leaf-light/10' : ''}`}>
                    <div className="text-basil-600 dark:text-basil-400 mb-3">{item.icon}</div>
                    <h3 className="font-serif font-bold text-text-primary dark:text-text-primary-dark mb-2">{item.title}</h3>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 p-5 shadow-[10px_10px_0_0_rgba(74,124,89,0.12)] dark:shadow-[10px_10px_0_0_rgba(0,0,0,0.24)]">
                <div className="window-frame aspect-[4/5] relative overflow-hidden border-2 border-stem/15 dark:border-leaf-light/10 bg-gradient-to-b from-[#cfeec6] via-[#e8f6bf] to-[#dbe7c7] dark:from-[#0e1722] dark:via-[#13273c] dark:to-[#0b1220]">
                  <div className="absolute inset-0 greenhouse-grid opacity-15" />
                  <div className="window-atmosphere absolute inset-0" />

                  <div className="window-sun absolute right-10 top-10 hidden dark:hidden sm:block" />
                  <div className="window-moon-glow absolute right-8 top-10 hidden dark:block" />

                  {cloudGroups.map((cloud, index) => (
                    <div key={index} className={cloud.className} />
                  ))}

                  <div className="window-hills absolute inset-x-0 bottom-[28%] h-[30%] dark:opacity-90" />
                  <div className="window-tree-line absolute inset-x-0 bottom-[18%] h-[24%] dark:opacity-95" />
                  <div className="window-field absolute inset-x-0 bottom-0 h-[26%]" />
                  <div className="window-path absolute bottom-0 left-1/2 -translate-x-1/2 w-[34%] h-[23%]" />
                  <div className="window-grass absolute inset-x-0 bottom-0 h-[18%]" />
                  <div className="window-silhouette-house absolute bottom-[16%] left-[14%] hidden dark:block" />
                  <div className="window-silhouette-tree absolute bottom-[16%] right-[14%] hidden dark:block" />
                  <div className="window-bush left-[10%] bottom-[14%]" />
                  <div className="window-bush right-[12%] bottom-[13%]" />
                  <div className="window-bush small left-[74%] bottom-[12%]" />

                  <div className="hidden dark:block absolute inset-0 overflow-hidden pointer-events-none">
                    {rainDrops.map((drop, index) => (
                      <span
                        key={index}
                        className="rain-drop"
                        style={{
                          left: drop.left,
                          animationDelay: drop.delay,
                          animationDuration: drop.duration,
                          height: drop.height,
                          opacity: drop.opacity,
                        }}
                      />
                    ))}
                    <div className="window-rain-haze absolute inset-x-0 bottom-0 h-1/3" />
                  </div>

                  <div className="window-glass-reflection absolute inset-0 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/12 dark:bg-white/8" />
                  <div className="absolute left-6 bottom-6 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] bg-white/55 dark:bg-black/45 border border-white/25 text-text-secondary dark:text-text-secondary-dark backdrop-blur-sm">
                    outside view
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-stem/20 dark:border-leaf-light/10 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {[
              { icon: <Package className="w-5 h-5" />, value: assets.length, label: 'Assets' },
              { icon: <Users className="w-5 h-5" />, value: authors.length, label: 'Creators' },
              { icon: <TrendingUp className="w-5 h-5" />, value: `${(totalDownloads / 1000).toFixed(1)}k`, label: 'Downloads' },
              { icon: <Layers className="w-5 h-5" />, value: Object.keys(CATEGORY_LABELS).length, label: 'Categories' },
            ].map((stat, i) => (
              <div key={i} className={`text-center px-4 py-2 ${i > 0 ? 'border-l-2 border-stem/15 dark:border-leaf-light/10' : ''}`}>
                <div className="flex justify-center mb-2 text-basil-600 dark:text-basil-400">{stat.icon}</div>
                <div className="text-2xl font-mono font-bold text-text-primary dark:text-text-primary-dark">{stat.value}</div>
                <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 greenhouse-grid">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-4 h-4 text-basil-600 dark:text-basil-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
                greenhouse preview
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
              Community Canopy
            </h2>
            <p className="text-xs font-mono text-text-muted dark:text-text-muted-dark mt-1 uppercase tracking-[0.16em]">
              popular projects growing tall based on rating and views
            </p>
          </div>
          <button
            onClick={() => navigate({ type: 'browse' })}
            className="flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-[0.16em] text-basil-700 dark:text-basil-300 hover:text-basil-800 dark:hover:text-basil-200 transition-colors border-b-2 border-basil-600 dark:border-basil-400 pb-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative w-full h-[400px] sm:h-[450px] mt-8 border-b-[6px] border-stem/80 dark:border-stem bg-gradient-to-t from-basil-500/10 dark:from-basil-900/20 to-transparent flex items-end justify-around px-2 sm:px-10 overflow-visible">
          {(() => {
            const sortedAssets = [...assets].sort((a, b) => (b.rating * b.views) - (a.rating * a.views)).slice(0, 6);
            if (sortedAssets.length === 0) return null;
            
            const pops = sortedAssets.map(a => a.rating * a.views);
            const maxPop = Math.max(...pops);
            const minPop = Math.min(...pops);
            
            return sortedAssets.map((asset, i) => {
              const pop = asset.rating * asset.views;
              const heightStr = maxPop === minPop ? '250px' : `${160 + ((pop - minPop) / (maxPop - minPop)) * 240}px`;
              
              return (
                <div 
                  key={asset.id} 
                  className="relative group cursor-pointer flex flex-col items-center justify-end w-12 sm:w-20 md:w-28 transition-transform hover:scale-105 duration-300 z-10 hover:z-50 animate-slide-up"
                  style={{ height: heightStr, animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
                  onClick={() => navigate({ type: 'asset', id: asset.id })}
                >
                  <div className="absolute bottom-[calc(100%+15px)] opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-basil-950 border-2 border-basil-600 p-3 shadow-xl w-48 sm:w-56 pointer-events-none z-50">
                    <p className="font-serif font-bold text-text-primary dark:text-text-primary-dark truncate text-sm mb-1">{asset.title}</p>
                    <p className="font-mono text-[10px] text-text-muted dark:text-text-muted-dark uppercase tracking-[0.1em] truncate mb-2">By {authors.find(a => a.id === asset.authorId)?.name || 'Unknown'}</p>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-basil-600 dark:text-basil-400 font-bold">↑ {asset.rating}</span>
                      <span className="text-text-secondary dark:text-text-secondary-dark">👁 {asset.views}</span>
                    </div>
                  </div>

                  <div className="w-full flex-1 flex flex-col items-center justify-end drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] relative z-10 group-hover:drop-shadow-[0_12px_24px_rgba(74,124,89,0.4)] transition-all">
                    {/* Top Tier (Sharp Triangle) */}
                    <div className="w-[50%] h-[30%] bg-basil-400 dark:bg-basil-500 -mb-3 sm:-mb-6 relative z-40 transition-colors group-hover:bg-basil-300 dark:group-hover:bg-basil-400" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/30" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 50% 100%)' }}></div>
                    </div>
                    
                    {/* Middle Tier 1 */}
                    <div className="w-[65%] h-[30%] bg-basil-500 dark:bg-basil-600 -mb-3 sm:-mb-6 relative z-30 transition-colors group-hover:bg-basil-400 dark:group-hover:bg-basil-500" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/30" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 50% 100%)' }}></div>
                    </div>

                    {/* Middle Tier 2 */}
                    <div className="w-[85%] h-[30%] bg-basil-600 dark:bg-basil-700 -mb-3 sm:-mb-6 relative z-20 transition-colors group-hover:bg-basil-500 dark:group-hover:bg-basil-600" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/30" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 50% 100%)' }}></div>
                    </div>
                    
                    {/* Bottom Tier */}
                    <div className="w-[100%] h-[35%] bg-basil-700 dark:bg-basil-800 relative z-10 transition-colors group-hover:bg-basil-600 dark:group-hover:bg-basil-700" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
                      <div className="absolute inset-0 bg-black/15 dark:bg-black/40" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 50% 100%)' }}></div>
                    </div>
                  </div>

                  {/* Trunk */}
                  <div className="w-[20%] sm:w-[15%] bg-stem dark:bg-stem-900 h-[15%] relative z-0 shadow-inner">
                    <div className="absolute inset-0 bg-black/20 w-1/2"></div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </section>

      <section className="border-y-2 border-stem/20 dark:border-leaf-light/10 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-[2px] bg-basil-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
              browse by type
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
            Find What Your Project Needs
          </h2>
          <p className="text-xs font-mono text-text-muted dark:text-text-muted-dark mb-10 uppercase tracking-[0.16em]">
            every category arranged for modders and developers
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
            {Object.entries(CATEGORY_LABELS).map(([key, label], idx) => {
              const count = assets.filter((a) => a.category === key).length;
              const icons: Record<string, React.ReactNode> = {
                model: <Package className="w-6 h-6" />,
                library: <BookMarked className="w-6 h-6" />,
                texture: <Leaf className="w-6 h-6" />,
                animation: <Flower2 className="w-6 h-6" />,
                tool: <Layers className="w-6 h-6" />,
              };
              return (
                <button
                  key={key}
                  onClick={() => navigate({ type: 'browse', category: key })}
                  className={`group flex flex-col items-center gap-3 p-8 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/35 dark:bg-white/0 hover:border-basil-500 transition-all ${idx > 0 ? '-ml-[2px]' : ''}`}
                >
                  <div className="text-stem/60 dark:text-leaf-light/60 group-hover:text-basil-700 dark:group-hover:text-basil-300 transition-colors">
                    {icons[key]}
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-text-primary dark:text-text-primary-dark">{label}</div>
                    <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark tracking-[0.14em] uppercase">{count} items</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 greenhouse-grid">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <div className="w-6 h-[2px] bg-basil-500" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
            how it works
          </span>
          <div className="w-6 h-[2px] bg-basil-500" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2 text-center">
          Plant, Share, Grow
        </h2>
        <p className="text-xs font-mono text-text-muted dark:text-text-muted-dark mb-12 text-center uppercase tracking-[0.16em]">
          a simple path from upload to discovery
        </p>

        <div className="grid sm:grid-cols-3 gap-0 glass-panel border-2 border-stem/15 dark:border-leaf-light/10">
          {[
            { step: '01', title: 'Enter the Greenhouse', desc: 'Click sign in and you land in your dashboard with a guest showcase account.' },
            { step: '02', title: 'Add Your Project', desc: 'Upload screenshots, files, library links, and tags in an easy guided flow.' },
            { step: '03', title: 'Let It Grow', desc: 'The community can browse, vote, download, and surface your work to the top.' },
          ].map((item, i) => (
            <div key={i} className={`text-center p-8 ${i > 0 ? 'border-l-2 border-stem/15 dark:border-leaf-light/10' : ''}`}>
              <div className="w-14 h-14 mx-auto mb-4 border-2 border-basil-500 flex items-center justify-center bg-white/35 dark:bg-white/0">
                <span className="text-basil-700 dark:text-basil-300 font-mono font-bold text-lg">{item.step}</span>
              </div>
              <h3 className="font-serif font-bold text-text-primary dark:text-text-primary-dark mb-2 text-lg">{item.title}</h3>
              <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden p-8 sm:p-12 border-2 border-basil-800 dark:border-basil-600 bg-[linear-gradient(180deg,rgba(74,124,89,0.94),rgba(49,81,58,0.98))]">
          <div className="absolute inset-0 greenhouse-grid opacity-20" />
          <div className="absolute inset-0 sunlight-overlay opacity-20" />
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/12 pointer-events-none" />
          <div className="relative text-center">
            <div className="flex items-center gap-2 mb-4 justify-center text-basil-100">
              <Sprout className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to add your own collection?
            </h2>
            <p className="text-basil-100/90 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Join AssetShelf and publish models, tools, or libraries for the communities that build worlds, mods, and new experiences.
            </p>
            <button
              onClick={() => (isLoggedIn && !isGuest ? navigate({ type: 'upload' }) : login())}
              className="btn-fresh px-10 py-3 bg-white text-basil-700 border-white hover:bg-basil-50 hover:text-basil-800"
            >
              {isLoggedIn && !isGuest ? 'Open Upload Flow' : 'Start Publishing'}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-stem/20 dark:border-leaf-light/10 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.16em] text-text-muted dark:text-text-muted-dark">
              <div className="w-7 h-7 bg-basil-500 flex items-center justify-center border border-basil-700">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <span>AssetShelf — greenhouse for 3D assets</span>
            </div>
            <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em]">
              built for modding communities and game developers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
