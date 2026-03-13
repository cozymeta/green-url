import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AssetCard } from '../components/AssetCard';
import { ArrowLeft, Calendar, Package, Eye, Download, TrendingUp, Sprout, Leaf } from 'lucide-react';

interface ProfilePageProps {
  id: string;
}

export function ProfilePage({ id }: ProfilePageProps) {
  const { getAuthor, assets, navigate } = useApp();
  const author = getAuthor(id);
  const authorAssets = useMemo(
    () => assets.filter((a) => a.authorId === id).sort((a, b) => b.rating - a.rating),
    [assets, id]
  );
  const avatarStyle = author?.avatarUrl
    ? { backgroundImage: `url(${author.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: author?.avatarGradient };

  const stats = useMemo(
    () => ({
      totalAssets: authorAssets.length,
      totalViews: authorAssets.reduce((s, a) => s + a.views, 0),
      totalDownloads: authorAssets.reduce((s, a) => s + a.downloads, 0),
      totalRating: authorAssets.reduce((s, a) => s + a.rating, 0),
    }),
    [authorAssets]
  );

  if (!author) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-serif text-xl font-bold text-text-primary dark:text-text-primary-dark mb-4">Author not found</h2>
        <button
          onClick={() => navigate({ type: 'browse' })}
          className="text-basil-700 dark:text-basil-300 hover:text-basil-800 dark:hover:text-basil-200 font-mono text-xs uppercase tracking-[0.16em]"
        >
          ← Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in greenhouse-grid min-h-screen">
      <button
        onClick={() => navigate({ type: 'browse' })}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-stem/70 dark:text-leaf-light/70 hover:text-basil-700 dark:hover:text-basil-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Collection
      </button>

      <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 overflow-hidden mb-8">
        <div className="h-32 sm:h-40 relative" style={{ background: author.avatarGradient, opacity: 0.28 }}>
          <div className="absolute inset-0 greenhouse-grid opacity-50" />
          <div className="absolute inset-0 sunlight-overlay" />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 sm:-mt-12">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 avatar-circle border-4 border-bg-primary dark:border-bg-primary-dark shadow-[8px_8px_0_0_rgba(74,124,89,0.16)] dark:shadow-[8px_8px_0_0_rgba(0,0,0,0.26)] shrink-0 ring-2 ring-basil-500"
              style={avatarStyle}
            />
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Sprout className="w-4 h-4 text-basil-600 dark:text-basil-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
                  creator profile
                </span>
              </div>
              <h1 className="font-serif text-2xl font-bold text-text-primary dark:text-text-primary-dark">{author.name}</h1>
              <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted dark:text-text-muted-dark mt-2 uppercase tracking-[0.16em]">
                <Calendar className="w-3.5 h-3.5" />
                Member since {author.joinedDate}
              </div>
            </div>
          </div>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-4 max-w-2xl leading-relaxed">
            {author.bio}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-10 glass-panel border-2 border-stem/15 dark:border-leaf-light/10 overflow-hidden">
        {[
          { icon: <Package className="w-5 h-5" />, value: stats.totalAssets, label: 'Assets', color: 'text-basil-700 dark:text-basil-300', borderColor: 'border-basil-500' },
          { icon: <Eye className="w-5 h-5" />, value: stats.totalViews.toLocaleString(), label: 'Views', color: 'text-leaf-medium dark:text-leaf-light', borderColor: 'border-leaf-medium' },
          { icon: <Download className="w-5 h-5" />, value: stats.totalDownloads.toLocaleString(), label: 'Downloads', color: 'text-leaf-dark dark:text-leaf-medium', borderColor: 'border-leaf-dark' },
          { icon: <TrendingUp className="w-5 h-5" />, value: stats.totalRating, label: 'Rating', color: 'text-basil-700 dark:text-basil-300', borderColor: 'border-basil-500' },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-5 text-center bg-white/20 dark:bg-white/0 ${i > 0 ? 'border-l-2 border-stem/15 dark:border-leaf-light/10' : ''} border-t-4 ${stat.borderColor}`}
          >
            <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
            <div className="text-xl font-mono font-bold text-text-primary dark:text-text-primary-dark">{stat.value}</div>
            <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.15em]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-4 h-4 text-basil-600 dark:text-basil-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
              public collection
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark">
            Published Assets
          </h2>
        </div>
        <span className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
          {authorAssets.length} item{authorAssets.length !== 1 ? 's' : ''}
        </span>
      </div>

      {authorAssets.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-stem/20 dark:border-leaf-light/12 glass-panel">
          <Package className="w-12 h-12 mx-auto text-stem/30 dark:text-leaf-light/30 mb-4" />
          <h3 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark mb-2">No listed assets yet</h3>
          <p className="text-xs font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
            This creator has not published anything yet.
          </p>
        </div>
      ) : (
        <div className="plant-shelf pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorAssets.map((asset, i) => (
              <div key={asset.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                <AssetCard asset={asset} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
