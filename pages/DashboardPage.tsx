import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AssetCard } from '../components/AssetCard';
import {
  Plus,
  Eye,
  Download,
  TrendingUp,
  Package,
  BarChart3,
  Sprout,
  Leaf
} from 'lucide-react';

export function DashboardPage() {
  const { navigate, getUserAssets, getAuthor, currentUserId } = useApp();
  const userAssets = getUserAssets();
  const author = currentUserId ? getAuthor(currentUserId) : null;
  const avatarStyle = author?.avatarUrl
    ? { backgroundImage: `url(${author.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: author?.avatarGradient };

  const stats = useMemo(() => {
    const totalViews = userAssets.reduce((s, a) => s + a.views, 0);
    const totalDownloads = userAssets.reduce((s, a) => s + a.downloads, 0);
    const totalRating = userAssets.reduce((s, a) => s + a.rating, 0);
    const avgRating = userAssets.length > 0 ? Math.round(totalRating / userAssets.length) : 0;
    return { totalViews, totalDownloads, totalRating, avgRating, assetCount: userAssets.length };
  }, [userAssets]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in greenhouse-grid min-h-screen">
      <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 p-6 sm:p-7 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 sunlight-overlay opacity-60" />
        <div className="absolute right-0 top-0 w-48 h-48 bg-basil-200/25 dark:bg-basil-500/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 avatar-circle border-2 border-basil-500 shadow-[6px_6px_0_0_rgba(74,124,89,0.16)] dark:shadow-[6px_6px_0_0_rgba(0,0,0,0.24)]"
              style={avatarStyle}
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-4 h-4 text-basil-600 dark:text-basil-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
                  your greenhouse bay
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
                Welcome back, <span className="text-basil-600 dark:text-basil-400">{author?.name}</span>
              </h1>
              <p className="text-sm text-text-muted dark:text-text-muted-dark mt-2 max-w-2xl">
                Track the reach of your uploads, check their ratings, and add more community-ready projects to your shelf.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate({ type: 'upload' })}
            className="btn-fresh flex items-center gap-2 px-6 py-3 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-0 mb-10 glass-panel border-2 border-stem/15 dark:border-leaf-light/10 overflow-hidden">
        {[
          { icon: <Package className="w-5 h-5" />, value: stats.assetCount, label: 'Projects', color: 'text-basil-700 dark:text-basil-300', borderColor: 'border-basil-500' },
          { icon: <Eye className="w-5 h-5" />, value: stats.totalViews.toLocaleString(), label: 'Views', color: 'text-leaf-medium dark:text-leaf-light', borderColor: 'border-leaf-medium' },
          { icon: <Download className="w-5 h-5" />, value: stats.totalDownloads.toLocaleString(), label: 'Downloads', color: 'text-leaf-dark dark:text-leaf-medium', borderColor: 'border-leaf-dark' },
          { icon: <TrendingUp className="w-5 h-5" />, value: stats.totalRating, label: 'Rating', color: 'text-basil-700 dark:text-basil-300', borderColor: 'border-basil-500' },
          { icon: <BarChart3 className="w-5 h-5" />, value: stats.avgRating, label: 'Avg. Score', color: 'text-stem dark:text-leaf-light', borderColor: 'border-stem' },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-5 bg-white/20 dark:bg-white/0 ${i > 0 ? 'border-l-2 border-stem/15 dark:border-leaf-light/10' : ''} border-t-4 ${stat.borderColor}`}
          >
            <div className={`${stat.color} mb-2`}>{stat.icon}</div>
            <div className="text-2xl font-mono font-bold text-text-primary dark:text-text-primary-dark">{stat.value}</div>
            <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.15em] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-4 h-4 text-basil-600 dark:text-basil-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
              published collection
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark">
            Your Uploaded Projects
          </h2>
        </div>
        <span className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
          {stats.assetCount} item{stats.assetCount !== 1 ? 's' : ''}
        </span>
      </div>

      {userAssets.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-stem/20 dark:border-leaf-light/12 glass-panel">
          <Package className="w-12 h-12 mx-auto text-stem/30 dark:text-leaf-light/30 mb-4" />
          <h3 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark mb-2">Your shelf is ready</h3>
          <p className="text-xs font-mono text-text-muted dark:text-text-muted-dark mb-6 max-w-md mx-auto uppercase tracking-[0.16em]">
            Start your first upload and let the community discover what you’ve built.
          </p>
          <button
            onClick={() => navigate({ type: 'upload' })}
            className="btn-fresh inline-flex items-center gap-2 px-7 py-3 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
          >
            <Plus className="w-4 h-4" />
            Create First Project
          </button>
        </div>
      ) : (
        <>
          <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 overflow-hidden mb-8">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] border-b-2 border-stem/15 dark:border-leaf-light/10 bg-white/25 dark:bg-white/0">
              <div className="col-span-5">Asset</div>
              <div className="col-span-2 text-center">Rating</div>
              <div className="col-span-2 text-center">Views</div>
              <div className="col-span-2 text-center">Downloads</div>
              <div className="col-span-1 text-center">Files</div>
            </div>
            {userAssets.map((asset, i) => (
              <button
                key={asset.id}
                onClick={() => navigate({ type: 'asset', id: asset.id })}
                className={`w-full grid grid-cols-1 sm:grid-cols-12 gap-4 px-4 py-4 items-center text-left hover:bg-basil-50/40 dark:hover:bg-basil-950/12 transition-colors ${
                  i < userAssets.length - 1 ? 'border-b border-stem/10 dark:border-leaf-light/8' : ''
                }`}
              >
                <div className="sm:col-span-5 flex items-center gap-3 min-w-0">
                  <div
                    className="w-12 h-10 shrink-0 border border-stem/15 dark:border-leaf-light/10"
                    style={{ background: asset.thumbnailGradient }}
                  />
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-sm text-text-primary dark:text-text-primary-dark truncate">{asset.title}</div>
                    <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.14em]">{asset.category}</div>
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-basil-600 dark:text-basil-400" />
                  <span className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark">{asset.rating}</span>
                </div>
                <div className="sm:col-span-2 flex items-center justify-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-leaf-medium dark:text-leaf-light" />
                  <span className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark">{asset.views.toLocaleString()}</span>
                </div>
                <div className="sm:col-span-2 flex items-center justify-center gap-1">
                  <Download className="w-3.5 h-3.5 text-leaf-dark dark:text-leaf-medium" />
                  <span className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark">{asset.downloads.toLocaleString()}</span>
                </div>
                <div className="sm:col-span-1 text-center text-xs font-mono text-text-muted dark:text-text-muted-dark">
                  {asset.files.length}
                </div>
              </button>
            ))}
          </div>

          <h3 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-5">
            ── card view ──
          </h3>
          <div className="plant-shelf pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
              <button
                onClick={() => navigate({ type: 'upload' })}
                className="glass-panel flex flex-col items-center justify-center gap-4 min-h-[292px] border-2 border-dashed border-stem/25 dark:border-leaf-light/15 hover:border-basil-500 text-stem/60 dark:text-leaf-light/60 hover:text-basil-700 dark:hover:text-basil-300 transition-all group"
              >
                <div className="w-14 h-14 border-2 border-current flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                  <Plus className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Add New Project</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
