import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, UserRound, Image, FileText, Save } from 'lucide-react';

export function SettingsPage() {
  const { currentUserId, getAuthor, navigate, updateCurrentProfile, usernameCooldownDaysLeft, isGuest } = useApp();
  const author = currentUserId ? getAuthor(currentUserId) : null;

  const [username, setUsername] = useState(author?.name ?? '');
  const [bio, setBio] = useState(author?.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState(author?.avatarUrl ?? '');
  const [feedback, setFeedback] = useState<string | null>(null);

  const avatarStyle = useMemo(() => {
    if (avatarUrl.trim()) {
      return { backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { background: author?.avatarGradient };
  }, [avatarUrl, author?.avatarGradient]);

  if (!author || isGuest) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-panel border-2 border-stem/20 dark:border-leaf-light/10 p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-3">Settings unavailable</h1>
          <p className="text-sm text-text-muted dark:text-text-muted-dark mb-6">Guest mode cannot edit a profile.</p>
          <button onClick={() => navigate({ type: 'home' })} className="btn-fresh px-5 py-2 text-white bg-basil-500 border-basil-700">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const onSave = () => {
    const result = updateCurrentProfile({ username, bio, avatarUrl });
    if (result.ok) {
      setFeedback('Profile updated.');
    } else {
      setFeedback(result.message ?? 'Unable to update profile.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in greenhouse-grid min-h-screen">
      <button
        onClick={() => navigate({ type: 'dashboard' })}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-stem/70 dark:text-leaf-light/70 hover:text-basil-700 dark:hover:text-basil-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="glass-panel border-2 border-stem/20 dark:border-leaf-light/10 p-6 sm:p-8">
        <h1 className="font-serif text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">Profile Settings</h1>
        <p className="text-sm text-text-muted dark:text-text-muted-dark mb-8">Update your identity card in the AssetShelf registry.</p>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <div>
            <div className="w-40 h-40 avatar-circle border-2 border-basil-500" style={avatarStyle} />
            <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted dark:text-text-muted-dark mt-3">Live preview</p>
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted dark:text-text-muted-dark flex items-center gap-2"><UserRound className="w-3.5 h-3.5" /> Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/40 dark:bg-white/0 text-sm"
              />
              {usernameCooldownDaysLeft > 0 && (
                <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.14em] text-warning">Username can change again in {usernameCooldownDaysLeft} day(s).</p>
              )}
            </label>

            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted dark:text-text-muted-dark flex items-center gap-2"><Image className="w-3.5 h-3.5" /> Profile picture URL</span>
              <input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="mt-2 w-full px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/40 dark:bg-white/0 text-sm"
              />
            </label>

            <label className="block">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted dark:text-text-muted-dark flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> About you</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                className="mt-2 w-full px-3 py-3 border-2 border-stem/15 dark:border-leaf-light/10 bg-white/40 dark:bg-white/0 text-sm"
              />
            </label>

            <button onClick={onSave} className="btn-fresh flex items-center gap-2 px-6 py-3 text-white bg-basil-500 border-basil-700 hover:bg-basil-600 hover:text-white">
              <Save className="w-4 h-4" />
              Save Changes
            </button>

            {feedback && <p className="text-sm text-basil-700 dark:text-basil-300">{feedback}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
