import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Asset, CATEGORIES, CATEGORY_LABELS, POPULAR_TAGS } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Image,
  FileText,
  Tag,
  Eye,
  X,
  Plus,
  Link as LinkIcon,
  Github,
  Sprout,
  Leaf
} from 'lucide-react';

const STEPS = ['Basic Info', 'Screenshots', 'Files & Links', 'Tags', 'Review'];

const randomGradients = [
  'linear-gradient(135deg, #1c4128, #2f6a42, #78b58f)',
  'linear-gradient(135deg, #214a31, #4A7C59, #9aceaa)',
  'linear-gradient(135deg, #274835, #568768, #bfdcbe)',
  'linear-gradient(135deg, #183d2a, #3d7153, #8fc1a0)',
  'linear-gradient(135deg, #305543, #5f8c73, #d4ead8)',
  'linear-gradient(135deg, #1f3b28, #52785d, #a9cdb4)',
  'linear-gradient(135deg, #234a38, #4f8a67, #86c7a0)',
  'linear-gradient(135deg, #2b5542, #679879, #d7efe1)',
];

export function UploadPage() {
  const { navigate, addAsset, currentUserId, isGuest } = useApp();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('model');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [files, setFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [published, setPublished] = useState(false);

  const canProceed = () => {
    switch (step) {
      case 0:
        return title.trim().length >= 3 && description.trim().length >= 10;
      case 1:
        return screenshots.length > 0;
      case 2:
        return files.length > 0 || githubUrl.trim() !== '';
      case 3:
        return selectedTags.length >= 1;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const addScreenshot = () => {
    const gradient = randomGradients[screenshots.length % randomGradients.length];
    setScreenshots((prev) => [...prev, gradient]);
  };

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const addFile = () => {
    if (fileName.trim() && fileSize.trim()) {
      const ext = fileName.split('.').pop() || 'file';
      setFiles((prev) => [...prev, { name: fileName.trim(), size: fileSize.trim(), type: ext }]);
      setFileName('');
      setFileSize('');
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const addCustomTag = () => {
    const tag = customTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setCustomTag('');
  };

  const handlePublish = () => {
    if (isGuest) return;
    const newAsset: Asset = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      authorId: currentUserId || 'guest',
      thumbnailGradient: screenshots[0] || randomGradients[0],
      screenshots,
      files,
      tags: selectedTags,
      category: category as Asset['category'],
      rating: 0,
      userVote: 0,
      views: 0,
      downloads: 0,
      createdAt: new Date().toISOString().split('T')[0],
      ...(githubUrl ? { githubUrl } : {}),
      ...(externalUrl ? { externalUrl } : {}),
    };
    addAsset(newAsset);
    setPublished(true);
  };

  if (published) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 p-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-basil-500 flex items-center justify-center border-2 border-basil-700 shadow-[6px_6px_0_0_rgba(74,124,89,0.18)] dark:shadow-[6px_6px_0_0_rgba(0,0,0,0.24)]">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-3">Published to AssetShelf</h1>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed">
            Your asset <span className="text-basil-700 dark:text-basil-300 font-bold">{title}</span> is now part of the greenhouse collection.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate({ type: 'dashboard' })}
              className="btn-fresh px-7 py-3 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate({ type: 'browse' })}
              className="btn-fresh px-7 py-3 text-basil-700 dark:text-basil-300 border-basil-500 hover:bg-basil-50 dark:hover:bg-basil-950/20"
            >
              Browse Assets
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isGuest) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 p-10">
          <h1 className="font-serif text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-3">Guest mode is view-only</h1>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-7">Sign in with a profile account to upload projects.</p>
          <button onClick={() => navigate({ type: 'signin' })} className="btn-fresh px-7 py-3 text-white bg-basil-500 border-basil-700">
            Open Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in greenhouse-grid min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate({ type: 'dashboard' })}
          className="p-2 text-stem/70 dark:text-leaf-light/70 hover:text-basil-700 dark:hover:text-basil-300 border-2 border-stem/15 dark:border-leaf-light/10 hover:border-basil-500 transition-all glass-panel"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sprout className="w-4 h-4 text-basil-600 dark:text-basil-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-basil-700 dark:text-basil-300">
              publish a new asset
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-text-primary dark:text-text-primary-dark">
            Add to AssetShelf
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center shrink-0">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.12em] transition-colors border-2 ${
                i === step
                  ? 'bg-basil-500 text-white border-basil-700'
                  : i < step
                    ? 'bg-basil-100 dark:bg-basil-900/50 text-basil-700 dark:text-basil-300 border-basil-300 dark:border-basil-700 cursor-pointer'
                    : 'glass-panel text-text-muted dark:text-text-muted-dark border-stem/15 dark:border-leaf-light/10'
              } ${i > 0 ? '-ml-[2px]' : ''}`}
            >
              <span className="w-5 h-5 flex items-center justify-center text-[10px] border border-current">
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="glass-panel border-2 border-stem/15 dark:border-leaf-light/10 p-6 sm:p-7 min-h-[420px]">
        {step === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-basil-600 dark:text-basil-400" />
              <h2 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark">Basic Information</h2>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted dark:text-text-muted-dark mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Medieval Castle Kit"
                className="w-full px-4 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-sm font-serif"
              />
              <p className="text-[10px] font-mono text-text-muted/70 dark:text-text-muted-dark/70 mt-1 tracking-[0.12em] uppercase">minimum 3 characters</p>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted dark:text-text-muted-dark mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your asset, library, or tool and what it's useful for..."
                rows={7}
                className="w-full px-4 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-sm resize-y"
              />
              <p className="text-[10px] font-mono text-text-muted/70 dark:text-text-muted-dark/70 mt-1 tracking-[0.12em] uppercase">minimum 10 characters</p>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted dark:text-text-muted-dark mb-2">
                Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-0">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-3 text-[10px] font-mono font-bold uppercase tracking-[0.12em] transition-colors border-2 ${
                      category === cat
                        ? 'border-basil-500 bg-basil-50/70 dark:bg-basil-950/20 text-basil-700 dark:text-basil-300'
                        : 'border-stem/15 dark:border-leaf-light/10 text-stem dark:text-leaf-light hover:border-basil-500 bg-white/35 dark:bg-white/0'
                    } ${i > 0 ? '-ml-[2px]' : ''}`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Image className="w-5 h-5 text-basil-600 dark:text-basil-400" />
              <h2 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark">Screenshots</h2>
            </div>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              Add screenshots of your work. The first one becomes the cover image on the shelf.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {screenshots.map((gradient, i) => (
                <div key={i} className="relative aspect-video overflow-hidden group border-2 border-stem/15 dark:border-leaf-light/10">
                  <div className="absolute inset-0" style={{ background: gradient }} />
                  <div className="absolute inset-0 greenhouse-grid opacity-40" />
                  <div className="absolute inset-0 bg-stem/15 dark:bg-leaf-light/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeScreenshot(i)}
                      className="p-2 bg-error text-white hover:bg-red-700 transition-colors border border-red-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {i === 0 && (
                    <div className="absolute top-0 left-0 px-2 py-0.5 bg-basil-500 text-white text-[9px] font-mono font-bold uppercase tracking-[0.14em] border-r border-b border-basil-700">
                      cover
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addScreenshot}
                className="aspect-video border-2 border-dashed border-stem/25 dark:border-leaf-light/15 hover:border-basil-500 flex flex-col items-center justify-center gap-2 text-stem/60 dark:text-leaf-light/60 hover:text-basil-700 dark:hover:text-basil-300 transition-colors bg-white/30 dark:bg-white/0"
              >
                <Upload className="w-6 h-6" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em]">Add Image</span>
              </button>
            </div>
            <p className="text-[10px] font-mono text-text-muted/70 dark:text-text-muted-dark/70 tracking-[0.14em] uppercase">
              demo mode uses styled placeholders instead of real uploads
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-basil-600 dark:text-basil-400" />
              <h2 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark">Files & Links</h2>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted dark:text-text-muted-dark mb-3">
                Asset Files
              </label>
              {files.length > 0 && (
                <div className="space-y-0 mb-4">
                  {files.map((file, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-4 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/35 dark:bg-white/0 ${i > 0 ? '-mt-[2px]' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-basil-600 dark:text-basil-400" />
                        <div>
                          <div className="text-sm font-mono font-bold text-text-primary dark:text-text-primary-dark">{file.name}</div>
                          <div className="text-[10px] font-mono text-text-muted dark:text-text-muted-dark uppercase tracking-[0.14em]">{file.size}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(i)}
                        className="p-1 text-stem/60 dark:text-leaf-light/60 hover:text-error transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2 flex-col sm:flex-row">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Filename (e.g., model.fbx)"
                  className="flex-1 px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono"
                />
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="Size (e.g., 50 MB)"
                  className="sm:w-36 px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono"
                />
                <button
                  onClick={addFile}
                  disabled={!fileName.trim() || !fileSize.trim()}
                  className="px-4 py-3 bg-basil-500 hover:bg-basil-600 disabled:bg-stem/30 dark:disabled:bg-leaf-light/20 text-white border-2 border-basil-700 disabled:border-stem/20 dark:disabled:border-leaf-light/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-stem/10 dark:border-leaf-light/10">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted dark:text-text-muted-dark mb-3">
                External Links
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-stem/60 dark:text-leaf-light/60 shrink-0" />
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="GitHub repository URL"
                    className="flex-1 px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-5 h-5 text-stem/60 dark:text-leaf-light/60 shrink-0" />
                  <input
                    type="url"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="External website or download URL"
                    className="flex-1 px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-basil-600 dark:text-basil-400" />
              <h2 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark">Tags</h2>
            </div>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              Use tags to describe genre, engine, game, style, or workflow so other people can find your upload faster.
            </p>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 border-2 border-basil-300 dark:border-basil-700 bg-basil-50/60 dark:bg-basil-950/18">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1.5 bg-basil-500 text-white text-[10px] font-mono font-bold uppercase tracking-[0.14em] border border-basil-700"
                  >
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="hover:text-basil-100 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
                placeholder="Type a custom tag and press Enter..."
                className="flex-1 px-4 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/45 dark:bg-white/0 text-text-primary dark:text-text-primary-dark text-xs font-mono"
              />
              <button
                onClick={addCustomTag}
                disabled={!customTag.trim()}
                className="px-5 py-3 bg-basil-500 hover:bg-basil-600 disabled:bg-stem/30 dark:disabled:bg-leaf-light/20 text-white text-[10px] font-mono font-bold uppercase tracking-[0.14em] border-2 border-basil-700 disabled:border-stem/20 dark:disabled:border-leaf-light/10 transition-colors"
              >
                Add
              </button>
            </div>

            <div>
              <h3 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-3">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
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
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-basil-600 dark:text-basil-400" />
              <h2 className="font-serif text-lg font-bold text-text-primary dark:text-text-primary-dark">Review & Publish</h2>
            </div>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              Confirm the details below before publishing this asset to the collection.
            </p>

            <div className="space-y-4">
              <div className="border-2 border-stem/15 dark:border-leaf-light/10 overflow-hidden">
                {screenshots.length > 0 && <div className="h-52" style={{ background: screenshots[0] }} />}
                <div className="p-5 bg-white/35 dark:bg-white/0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag-stamp text-basil-700 dark:text-basil-300 border-basil-500">{category}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-text-primary dark:text-text-primary-dark mb-2">{title}</h3>
                  <p className="text-sm text-text-muted dark:text-text-muted-dark whitespace-pre-line line-clamp-4">
                    {description}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-0">
                <div className="p-4 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/25 dark:bg-white/0">
                  <h4 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-2">Screenshots</h4>
                  <p className="text-sm font-mono text-text-primary dark:text-text-primary-dark">{screenshots.length} image{screenshots.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="p-4 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/25 dark:bg-white/0 -ml-[2px]">
                  <h4 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-2">Files</h4>
                  <p className="text-sm font-mono text-text-primary dark:text-text-primary-dark">{files.length} file{files.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="p-4 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/25 dark:bg-white/0">
                <h4 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase tracking-[0.14em] border border-stem/15 dark:border-leaf-light/10 text-stem dark:text-leaf-light">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {(githubUrl || externalUrl) && (
                <div className="p-4 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/25 dark:bg-white/0">
                  <h4 className="text-[10px] font-mono font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-[0.2em] mb-2">Links</h4>
                  {githubUrl && <p className="text-xs font-mono text-basil-700 dark:text-basil-300 truncate">{githubUrl}</p>}
                  {externalUrl && <p className="text-xs font-mono text-basil-700 dark:text-basil-300 truncate">{externalUrl}</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t-2 border-stem/10 dark:border-leaf-light/10">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : navigate({ type: 'dashboard' }))}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-stem dark:text-leaf-light hover:text-basil-700 dark:hover:text-basil-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 0 ? 'Previous' : 'Cancel'}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="btn-fresh flex items-center gap-2 px-7 py-2.5 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white disabled:bg-stem/30 dark:disabled:bg-leaf-light/20 disabled:border-stem/20 dark:disabled:border-leaf-light/10 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="btn-fresh flex items-center gap-2 px-7 py-2.5 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white"
          >
            <Leaf className="w-4 h-4" />
            Publish Asset
          </button>
        )}
      </div>
    </div>
  );
}
