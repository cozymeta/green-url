import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Eye,
  Download,
  FileText,
  Tag,
  ExternalLink,
  Github,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Leaf
} from 'lucide-react';
import { CATEGORY_LABELS } from '../types';

interface AssetDetailPageProps {
  id: string;
}

export function AssetDetailPage({ id }: AssetDetailPageProps) {
  const { getAsset, getAuthor, navigate, vote, incrementViews, incrementDownloads, isLoggedIn, isGuest } = useApp();
  const asset = getAsset(id);
  const author = asset ? getAuthor(asset.authorId) : undefined;
  const authorAvatarStyle = author?.avatarUrl
    ? { backgroundImage: `url(${author.avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: author?.avatarGradient };
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [hasCountedView, setHasCountedView] = useState(false);

  useEffect(() => {
    if (asset && !hasCountedView) {
      incrementViews(asset.id);
      setHasCountedView(true);
    }
  }, [asset, hasCountedView, incrementViews]);

  if (!asset) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-serif text-xl font-bold text-text-primary dark:text-text-primary-dark mb-4">Asset not found</h2>
        <button
          onClick={() => navigate({ type: 'browse' })}
          className="text-basil-700 dark:text-basil-300 hover:text-basil-800 dark:hover:text-basil-200 font-mono text-xs uppercase tracking-[0.16em]"
        >
          ← Back to Browse
        </button>
      </div>
    );
  }

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % asset.screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + asset.screenshots.length) % asset.screenshots.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in greenhouse-grid min-h-screen">
      <button
        onClick={() => navigate({ type: 'browse' })}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-stem/70 dark:text-leaf-light/70 hover:text-basil-700 dark:hover:text-basil-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Collection
      </button>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 overflow-hidden">
            <div className="relative aspect-video">
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ background: asset.screenshots[currentScreenshot] || asset.thumbnailGradient }}
              />
              <div className="absolute inset-0 greenhouse-grid opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white bg-black/20 border border-white/10 backdrop-blur-sm">
                <Sprout className="w-3.5 h-3.5" />
                greenhouse preview
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white bg-black/20 border border-white/10">
                {currentScreenshot + 1} / {asset.screenshots.length}
              </div>

              {asset.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevScreenshot}
                    className="absolute left-0 top-0 bottom-0 w-12 bg-black/15 text-white hover:bg-black/28 backdrop-blur-sm transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextScreenshot}
                    className="absolute right-0 top-0 bottom-0 w-12 bg-black/15 text-white hover:bg-black/28 backdrop-blur-sm transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {asset.screenshots.length > 1 && (
              <div className="flex gap-0 border-t-2 border-stem/10 dark:border-leaf-light/10 bg-white/20 dark:bg-white/0 overflow-x-auto">
                {asset.screenshots.map((gradient, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentScreenshot(i)}
                    className={`w-18 h-12 shrink-0 transition-all border-r border-stem/10 dark:border-leaf-light/10 last:border-r-0 ${
                      i === currentScreenshot ? 'ring-inset ring-2 ring-basil-500 brightness-100' : 'opacity-50 hover:opacity-80'
                    }`}
                    style={{ background: gradient }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel p-6 border-2 border-stem/15 dark:border-leaf-light/10">
            <h2 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-4">
              ── description ──
            </h2>
            <div className="text-text-secondary dark:text-text-secondary-dark text-sm leading-relaxed whitespace-pre-line">
              {asset.description}
            </div>
          </div>

          <div className="glass-panel p-6 border-2 border-stem/15 dark:border-leaf-light/10">
            <h2 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-4">
              ── files & downloads ──
            </h2>
            <div className="space-y-0">
              {asset.files.map((file, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 border-2 border-stem/10 dark:border-leaf-light/10 hover:border-basil-500 transition-colors bg-white/20 dark:bg-white/0 ${
                    i > 0 ? '-mt-[2px]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-5 h-5 text-basil-600 dark:text-basil-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark truncate">{file.name}</div>
                      <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">{file.size} · {file.type.toUpperCase()}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => incrementDownloads(asset.id)}
                    className="btn-fresh flex items-center justify-center gap-1.5 px-4 py-2.5 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              ))}
            </div>

            {(asset.githubUrl || asset.externalUrl) && (
              <div className="mt-5 pt-5 border-t-2 border-stem/10 dark:border-leaf-light/10 space-y-3">
                {asset.githubUrl && (
                  <a
                    href={asset.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-basil-700 dark:text-basil-300 hover:text-basil-800 dark:hover:text-basil-200 transition-colors uppercase tracking-[0.16em]"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {asset.externalUrl && (
                  <a
                    href={asset.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-basil-700 dark:text-basil-300 hover:text-basil-800 dark:hover:text-basil-200 transition-colors uppercase tracking-[0.16em]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    External Source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-panel p-6 border-2 border-stem/15 dark:border-leaf-light/10">
            <span className="tag-stamp inline-block px-2.5 py-1 text-basil-700 dark:text-basil-300 border-basil-500 mb-3">
              {CATEGORY_LABELS[asset.category]}
            </span>
            <h1 className="font-serif text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-3">{asset.title}</h1>

            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted dark:text-text-muted-dark mb-5 uppercase tracking-[0.16em]">
              <Calendar className="w-3.5 h-3.5" />
              Published {asset.createdAt}
            </div>

            <div className="flex items-center gap-4 p-4 border-2 border-stem/10 dark:border-leaf-light/10 bg-white/20 dark:bg-white/0 mb-4">
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => isLoggedIn && !isGuest && vote(asset.id, 1)}
                  className={`vote-btn p-1.5 transition-colors border ${
                    asset.userVote === 1
                      ? 'bg-basil-500 text-white border-basil-700'
                      : 'text-stem/70 dark:text-leaf-light/70 hover:text-basil-700 dark:hover:text-basil-300 hover:border-basil-500 border-stem/15 dark:border-leaf-light/10'
                  }`}
                  disabled={!isLoggedIn || isGuest}
                  title={isGuest ? 'Guest mode cannot rate assets' : undefined}
                >
                  <ChevronUp className="w-5 h-5" strokeWidth={3} />
                </button>
                <span
                  className={`text-2xl font-mono font-bold ${
                    asset.userVote === 1
                      ? 'text-basil-700 dark:text-basil-300'
                      : asset.userVote === -1
                        ? 'text-error'
                        : 'text-text-primary dark:text-text-primary-dark'
                  }`}
                >
                  {asset.rating}
                </span>
                <button
                  onClick={() => isLoggedIn && !isGuest && vote(asset.id, -1)}
                  className={`vote-btn p-1.5 transition-colors border ${
                    asset.userVote === -1
                      ? 'bg-error text-white border-red-800'
                      : 'text-stem/70 dark:text-leaf-light/70 hover:text-error hover:border-error border-stem/15 dark:border-leaf-light/10'
                  }`}
                  disabled={!isLoggedIn || isGuest}
                  title={isGuest ? 'Guest mode cannot rate assets' : undefined}
                >
                  <ChevronDown className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
                    <Eye className="w-3.5 h-3.5" /> Views
                  </span>
                  <span className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark">{asset.views.toLocaleString()}</span>
                </div>
                <div className="fresh-line" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
                    <Download className="w-3.5 h-3.5" /> Downloads
                  </span>
                  <span className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark">{asset.downloads.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {(!isLoggedIn || isGuest) && (
              <p className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark text-center uppercase tracking-[0.16em]">
                {isGuest ? 'Guest mode is view-only. Sign in with a profile to vote.' : 'Sign in to vote on this asset'}
              </p>
            )}
          </div>

          <button
            onClick={() => navigate({ type: 'profile', id: asset.authorId })}
            className="w-full glass-panel p-6 border-2 border-stem/15 dark:border-leaf-light/10 hover:border-basil-500 transition-all text-left group"
          >
            <h3 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-3">
              ── author ──
            </h3>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 avatar-circle border-2 border-basil-500 shrink-0"
                style={authorAvatarStyle}
              />
              <div>
                <div className="font-serif font-bold text-text-primary dark:text-text-primary-dark group-hover:text-basil-700 dark:group-hover:text-basil-300 transition-colors">
                  {author?.name}
                </div>
                <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
                  Since {author?.joinedDate}
                </div>
              </div>
            </div>
          </button>

          <div className="glass-panel p-6 border-2 border-stem/15 dark:border-leaf-light/10">
            <h3 className="flex items-center gap-2 text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-3">
              <Tag className="w-3 h-3" />
              tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {asset.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate({ type: 'browse', search: tag })}
                  className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.14em] font-bold border border-stem/15 dark:border-leaf-light/10 text-stem dark:text-leaf-light hover:border-basil-500 hover:text-basil-700 dark:hover:text-basil-300 transition-colors bg-white/30 dark:bg-white/0"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 border-2 border-stem/15 dark:border-leaf-light/10">
            <div className="flex items-center gap-2 mb-2 text-basil-700 dark:text-basil-300">
              <Leaf className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]">community note</span>
            </div>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              This page combines screenshots, files, votes, views, downloads, and creator info so each asset feels complete and easy to trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
