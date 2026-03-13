import { useApp } from '../context/AppContext';
import { Asset } from '../types';
import {
  ChevronUp,
  ChevronDown,
  Eye,
  Download,
  Package,
  BookMarked,
  Paintbrush,
  Clapperboard,
  Wrench,
  Leaf
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  model: <Package className="w-3 h-3" />,
  library: <BookMarked className="w-3 h-3" />,
  texture: <Paintbrush className="w-3 h-3" />,
  animation: <Clapperboard className="w-3 h-3" />,
  tool: <Wrench className="w-3 h-3" />,
};

const stemColors: Record<string, string> = {
  model: '#4A7C59',
  library: '#6ea47f',
  texture: '#9aceaa',
  animation: '#5f7f68',
  tool: '#31513a',
};

interface AssetCardProps {
  asset: Asset;
  compact?: boolean;
}

export function AssetCard({ asset, compact = false }: AssetCardProps) {
  const { navigate, vote, getAuthor, isLoggedIn, isGuest } = useApp();
  const author = getAuthor(asset.authorId);
  const authorAvatarStyle = author?.avatarUrl
    ? { backgroundImage: `url(${author.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: author?.avatarGradient };

  return (
    <div
      className="asset-card dew-drops relative border-2 border-stem/20 dark:border-leaf-light/12 cursor-pointer group"
      onClick={() => navigate({ type: 'asset', id: asset.id })}
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-[4px] z-10"
        style={{ background: stemColors[asset.category] || '#4A7C59' }}
      />

      <div className="relative overflow-hidden border-b-2 border-stem/10 dark:border-leaf-light/10" style={{ height: compact ? '132px' : '176px' }}>
        <div
          className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.04]"
          style={{ background: asset.thumbnailGradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
        <div className="absolute inset-0 greenhouse-grid opacity-40" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-white bg-black/20 border border-white/15 backdrop-blur-sm">
          <Leaf className="w-3 h-3" />
          growing now
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-bg-primary/85 dark:bg-bg-primary-dark/85 text-text-secondary dark:text-text-secondary-dark text-[10px] font-mono uppercase tracking-[0.16em] border border-stem/15 dark:border-leaf-light/15">
          {categoryIcons[asset.category]}
          <span>{asset.category}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-serif font-bold text-text-primary dark:text-text-primary-dark text-base leading-tight line-clamp-2 mb-2 group-hover:text-basil-700 dark:group-hover:text-basil-300 transition-colors">
          {asset.title}
        </h3>

        {!compact && (
          <p className="text-[12px] text-text-muted dark:text-text-muted-dark line-clamp-2 mb-3 leading-relaxed">
            {asset.description.split('\n')[0]}
          </p>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate({ type: 'profile', id: asset.authorId });
          }}
          className="flex items-center gap-2.5 mb-3 group/author"
        >
          <div
            className="w-5 h-5 avatar-circle shrink-0 border border-stem/20 dark:border-leaf-light/20"
            style={authorAvatarStyle}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted dark:text-text-muted-dark group-hover/author:text-basil-700 dark:group-hover/author:text-basil-300 transition-colors truncate">
            {author?.name}
          </span>
        </button>

        {!compact && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {asset.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[9px] font-mono uppercase tracking-[0.14em] border border-stem/15 dark:border-leaf-light/15 text-text-muted dark:text-text-muted-dark bg-white/40 dark:bg-white/0"
              >
                {tag}
              </span>
            ))}
            {asset.tags.length > 3 && (
              <span className="text-[9px] text-text-muted dark:text-text-muted-dark self-center font-mono uppercase tracking-[0.14em]">
                +{asset.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t-2 border-stem/10 dark:border-leaf-light/10">
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isLoggedIn && !isGuest) vote(asset.id, 1);
              }}
              className={`vote-btn p-0.5 ${
                asset.userVote === 1
                  ? 'text-basil-700 dark:text-basil-300'
                  : 'text-stem/50 dark:text-leaf-light/50 hover:text-basil-700 dark:hover:text-basil-300'
              }`}
              disabled={!isLoggedIn || isGuest}
              title={isGuest ? 'Guest mode cannot rate assets' : undefined}
            >
              <ChevronUp className="w-4 h-4" strokeWidth={3} />
            </button>
            <span
              className={`text-xs font-mono font-bold min-w-[28px] text-center ${
                asset.userVote === 1
                  ? 'text-basil-700 dark:text-basil-300'
                  : asset.userVote === -1
                    ? 'text-error'
                    : 'text-text-secondary dark:text-text-secondary-dark'
              }`}
            >
              {asset.rating}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isLoggedIn && !isGuest) vote(asset.id, -1);
              }}
              className={`vote-btn p-0.5 ${
                asset.userVote === -1
                  ? 'text-error'
                  : 'text-stem/50 dark:text-leaf-light/50 hover:text-error'
              }`}
              disabled={!isLoggedIn || isGuest}
              title={isGuest ? 'Guest mode cannot rate assets' : undefined}
            >
              <ChevronDown className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.14em]">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {asset.views >= 1000 ? `${(asset.views / 1000).toFixed(1)}k` : asset.views}
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {asset.downloads >= 1000 ? `${(asset.downloads / 1000).toFixed(1)}k` : asset.downloads}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
