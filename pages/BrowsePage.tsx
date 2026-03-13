import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AssetCard } from '../components/AssetCard';
import { Search, SlidersHorizontal, X, Sprout, Leaf } from 'lucide-react';
import { CATEGORIES, CATEGORY_LABELS, POPULAR_TAGS } from '../types';

type SortBy = 'rating' | 'views' | 'downloads' | 'newest';

export function BrowsePage() {
  const { assets, page } = useApp();
  const initialCategory = (page.type === 'browse' && page.category) || '';
  const initialSearch = (page.type === 'browse' && page.search) || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAssets = useMemo(() => {
    let result = [...assets];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter((a) => selectedTags.every((tag) => a.tags.includes(tag)));
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'views':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'downloads':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [assets, search, selectedCategory, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    assets.forEach((a) => a.tags.forEach((t) => tagSet.add(t)));
    return POPULAR_TAGS.filter((t) => tagSet.has(t));
  }, [assets]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in greenhouse-grid min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sprout className="w-4 h-4 text-basil-600 dark:text-basil-400" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
            open collection
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-2">
          Browse the Greenhouse
        </h1>
        <p className="text-sm text-text-muted dark:text-text-muted-dark max-w-2xl leading-relaxed">
          Search community shelves of libraries, tools, and 3D assets. Use tags and sorting to move through the collection like curated rows of living work.
        </p>
      </div>

      <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 p-4 sm:p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stem/60 dark:text-leaf-light/60" />
            <input
              type="text"
              placeholder="Search assets, tags, or descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono placeholder:text-text-muted/60"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stem/60 dark:text-leaf-light/60 hover:text-stem dark:hover:text-leaf-light"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono uppercase tracking-[0.12em]"
            >
              <option value="rating">Top Rated</option>
              <option value="views">Most Viewed</option>
              <option value="downloads">Most Downloaded</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border-2 text-xs font-mono uppercase tracking-[0.14em] font-bold transition-colors ${
                showFilters || selectedTags.length > 0
                  ? 'border-basil-500 bg-basil-50/70 dark:bg-basil-950/20 text-basil-700 dark:text-basil-300'
                  : 'border-stem/15 dark:border-leaf-light/10 text-stem dark:text-leaf-light hover:border-basil-500 bg-white/45 dark:bg-white/0'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {selectedTags.length > 0 && (
                <span className="w-5 h-5 bg-basil-500 text-white text-[10px] flex items-center justify-center font-mono">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-0 overflow-x-auto pb-2 mb-6">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] whitespace-nowrap transition-colors border-2 ${
            !selectedCategory
              ? 'bg-basil-500 text-white border-basil-700'
              : 'border-stem/15 dark:border-leaf-light/10 text-stem dark:text-leaf-light hover:border-basil-500 bg-white/45 dark:bg-white/0'
          }`}
        >
          All Shelves
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
            className={`px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] whitespace-nowrap transition-colors border-2 -ml-[2px] ${
              selectedCategory === cat
                ? 'bg-basil-500 text-white border-basil-700'
                : 'border-stem/15 dark:border-leaf-light/10 text-stem dark:text-leaf-light hover:border-basil-500 bg-white/45 dark:bg-white/0'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="mb-6 p-5 border-2 border-stem/15 dark:border-leaf-light/10 glass-panel animate-fade-in">
          <div className="flex items-center justify-between mb-4 gap-4">
            <div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-text-primary dark:text-text-primary-dark">
                Filter by Tags
              </h3>
              <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                Narrow the collection by style, engine, game, or workflow.
              </p>
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-[10px] font-mono uppercase tracking-[0.14em] text-basil-700 dark:text-basil-300 hover:text-basil-800 dark:hover:text-basil-200"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.14em] font-bold transition-colors border-2 ${
                  selectedTags.includes(tag)
                    ? 'bg-basil-500 text-white border-basil-700'
                    : 'bg-white/45 dark:bg-white/0 text-stem dark:text-leaf-light border-stem/15 dark:border-leaf-light/10 hover:border-basil-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredAssets.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-stem/20 dark:border-leaf-light/12 glass-panel">
          <div className="text-stem/30 dark:text-leaf-light/30 mb-4">
            <Leaf className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-serif font-bold text-text-primary dark:text-text-primary-dark mb-2">Nothing is growing here yet</h3>
          <p className="text-xs font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.16em]">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark mb-5 uppercase tracking-[0.2em]">
            Showing {filteredAssets.length} item{filteredAssets.length !== 1 ? 's' : ''} in the collection
          </div>
          <div className="plant-shelf pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets.map((asset, i) => (
                <div key={asset.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}>
                  <AssetCard asset={asset} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
