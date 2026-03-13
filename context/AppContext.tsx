import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { Asset, Author, Page, Theme, Account } from '../types';
import { initialAssets, initialAuthors } from '../data';

interface AppContextType {
  page: Page;
  isLoggedIn: boolean;
  isGuest: boolean;
  currentUserId: string | null;
  currentUsername: string | null;
  usernameCooldownDaysLeft: number;
  theme: Theme;
  assets: Asset[];
  authors: Author[];
  navigate: (page: Page) => void;
  login: () => void;
  loginAsGuest: () => void;
  signIn: (username: string, password: string) => { ok: boolean; message?: string };
  register: (username: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
  isUsernameAvailable: (username: string) => boolean;
  getAvailableUsernames: () => string[];
  updateCurrentProfile: (input: { username: string; bio: string; avatarUrl?: string }) => { ok: boolean; message?: string };
  toggleTheme: () => void;
  vote: (assetId: string, direction: 1 | -1) => void;
  addAsset: (asset: Asset) => void;
  incrementViews: (assetId: string) => void;
  incrementDownloads: (assetId: string) => void;
  getAuthor: (authorId: string) => Author | undefined;
  getAsset: (assetId: string) => Asset | undefined;
  getUserAssets: () => Asset[];
  getTopAssets: (count?: number) => Asset[];
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>({ type: 'home' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [authors, setAuthors] = useState<Author[]>([
    ...initialAuthors,
    {
      id: 'account-1',
      name: 'IvyArchitect',
      avatarGradient: 'linear-gradient(135deg, #4A7C59, #82b892)',
      bio: 'I build modular worlds for game communities.',
      joinedDate: '2024-02-14',
    },
    {
      id: 'guest-viewer',
      name: 'GuestViewer',
      avatarGradient: 'linear-gradient(135deg, #6a8572, #9db8a5)',
      bio: 'Guest mode: browse the greenhouse without editing.',
      joinedDate: '2024-01-01',
    },
  ]);
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 'account-1',
      username: 'IvyArchitect',
      password: 'demo123',
      bio: 'I build modular worlds for game communities.',
      avatarGradient: 'linear-gradient(135deg, #4A7C59, #82b892)',
      joinedDate: '2024-02-14',
      lastUsernameChange: Date.now() - 31 * 24 * 60 * 60 * 1000,
      isGuest: false,
    },
    {
      id: 'guest-viewer',
      username: 'GuestViewer',
      password: '',
      bio: 'Guest mode: view only.',
      avatarGradient: 'linear-gradient(135deg, #6a8572, #9db8a5)',
      joinedDate: '2024-01-01',
      lastUsernameChange: 0,
      isGuest: true,
    },
  ]);

  const usernamePool = [
    'MossKeeper',
    'FernSmith',
    'LilyForge',
    'JuniperCore',
    'PineGrid',
    'CloverRender',
    'SageAssets',
    'WillowKit',
    'BirchNode',
    'OakToolkit',
    'PetalPilot',
    'MeadowMesh',
  ];

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const login = useCallback(() => {
    setPage({ type: 'signin' });
  }, []);

  const loginAsGuest = useCallback(() => {
    setIsLoggedIn(true);
    setIsGuest(true);
    setCurrentUserId('guest-viewer');
    setPage({ type: 'home' });
  }, []);

  const isUsernameAvailable = useCallback((username: string) => {
    const normalized = username.trim().toLowerCase();
    if (!normalized) return false;
    return !accounts.some((acc) => acc.username.toLowerCase() === normalized);
  }, [accounts]);

  const getAvailableUsernames = useCallback(() => {
    return usernamePool.filter((name) => isUsernameAvailable(name));
  }, [isUsernameAvailable]);

  const signIn = useCallback((username: string, password: string) => {
    const normalized = username.trim().toLowerCase();
    const account = accounts.find((acc) => acc.username.toLowerCase() === normalized && !acc.isGuest);
    if (!account) return { ok: false, message: 'Name not found in the agenda.' };
    if (account.password !== password) return { ok: false, message: 'Password does not match this name.' };

    setIsLoggedIn(true);
    setIsGuest(false);
    setCurrentUserId(account.id);
    setPage({ type: 'dashboard' });
    return { ok: true };
  }, [accounts]);

  const register = useCallback((username: string, password: string) => {
    const trimmed = username.trim();
    if (trimmed.length < 3) return { ok: false, message: 'Username must be at least 3 characters.' };
    if (password.length < 6) return { ok: false, message: 'Password must be at least 6 characters.' };
    if (!isUsernameAvailable(trimmed)) return { ok: false, message: 'That username is already used.' };

    const id = `account-${Date.now()}`;
    const newAccount: Account = {
      id,
      username: trimmed,
      password,
      bio: 'Tell the community about your work.',
      avatarGradient: 'linear-gradient(135deg, #4A7C59, #82b892)',
      joinedDate: new Date().toISOString().split('T')[0],
      lastUsernameChange: Date.now(),
      isGuest: false,
    };

    setAccounts((prev) => [...prev, newAccount]);
    setAuthors((prev) => [
      ...prev,
      {
        id,
        name: trimmed,
        bio: newAccount.bio,
        avatarGradient: newAccount.avatarGradient,
        joinedDate: newAccount.joinedDate,
      },
    ]);

    setIsLoggedIn(true);
    setIsGuest(false);
    setCurrentUserId(id);
    setPage({ type: 'dashboard' });
    return { ok: true };
  }, [isUsernameAvailable]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsGuest(false);
    setCurrentUserId(null);
    setPage({ type: 'home' });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const vote = useCallback((assetId: string, direction: 1 | -1) => {
    if (!isLoggedIn || isGuest) return;
    setAssets(prev => prev.map(a => {
      if (a.id !== assetId) return a;
      let newVote: 0 | 1 | -1;
      let ratingDelta: number;
      if (a.userVote === direction) {
        newVote = 0;
        ratingDelta = -direction;
      } else {
        newVote = direction;
        ratingDelta = direction - a.userVote;
      }
      return { ...a, userVote: newVote, rating: a.rating + ratingDelta };
    }));
  }, [isLoggedIn, isGuest]);

  const addAsset = useCallback((asset: Asset) => {
    if (!isLoggedIn || isGuest) return;
    setAssets(prev => [asset, ...prev]);
  }, [isLoggedIn, isGuest]);

  const incrementViews = useCallback((assetId: string) => {
    setAssets(prev => prev.map(a =>
      a.id === assetId ? { ...a, views: a.views + 1 } : a
    ));
  }, []);

  const incrementDownloads = useCallback((assetId: string) => {
    setAssets(prev => prev.map(a =>
      a.id === assetId ? { ...a, downloads: a.downloads + 1 } : a
    ));
  }, []);

  const getAuthor = useCallback((authorId: string) => authors.find(a => a.id === authorId), [authors]);

  const getAsset = useCallback((assetId: string) => {
    return assets.find(a => a.id === assetId);
  }, [assets]);

  const getUserAssets = useCallback(() => {
    if (!currentUserId) return [];
    return assets.filter(a => a.authorId === currentUserId);
  }, [assets, currentUserId]);

  const getTopAssets = useCallback((count = 6) => {
    return [...assets]
      .sort((a, b) => (b.rating + b.views * 0.01) - (a.rating + a.views * 0.01))
      .slice(0, count);
  }, [assets]);

  const currentAccount = useMemo(
    () => (currentUserId ? accounts.find((acc) => acc.id === currentUserId) ?? null : null),
    [accounts, currentUserId]
  );

  const usernameCooldownDaysLeft = useMemo(() => {
    if (!currentAccount || currentAccount.isGuest) return 0;
    const msIn30Days = 30 * 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - currentAccount.lastUsernameChange;
    if (elapsed >= msIn30Days) return 0;
    return Math.ceil((msIn30Days - elapsed) / (24 * 60 * 60 * 1000));
  }, [currentAccount]);

  const updateCurrentProfile = useCallback((input: { username: string; bio: string; avatarUrl?: string }) => {
    if (!currentAccount || currentAccount.isGuest) {
      return { ok: false, message: 'Guest profiles cannot be edited.' };
    }

    const nextUsername = input.username.trim();
    if (nextUsername.length < 3) return { ok: false, message: 'Username must be at least 3 characters.' };

    const usernameChanged = nextUsername.toLowerCase() !== currentAccount.username.toLowerCase();
    if (usernameChanged) {
      if (usernameCooldownDaysLeft > 0) {
        return { ok: false, message: `Name can be changed again in ${usernameCooldownDaysLeft} day(s).` };
      }
      if (!isUsernameAvailable(nextUsername)) {
        return { ok: false, message: 'That username is already used.' };
      }
    }

    setAccounts((prev) => prev.map((acc) => {
      if (acc.id !== currentAccount.id) return acc;
      return {
        ...acc,
        username: nextUsername,
        bio: input.bio.trim(),
        avatarUrl: input.avatarUrl?.trim() || undefined,
        lastUsernameChange: usernameChanged ? Date.now() : acc.lastUsernameChange,
      };
    }));

    setAuthors((prev) => prev.map((author) => {
      if (author.id !== currentAccount.id) return author;
      return {
        ...author,
        name: nextUsername,
        bio: input.bio.trim(),
        avatarUrl: input.avatarUrl?.trim() || undefined,
      };
    }));

    return { ok: true };
  }, [currentAccount, isUsernameAvailable, usernameCooldownDaysLeft]);

  return (
    <AppContext.Provider value={{
      page,
      isLoggedIn,
      isGuest,
      currentUserId,
      currentUsername: currentAccount?.username ?? null,
      usernameCooldownDaysLeft,
      theme,
      assets,
      authors,
      navigate,
      login,
      loginAsGuest,
      signIn,
      register,
      logout,
      isUsernameAvailable,
      getAvailableUsernames,
      updateCurrentProfile,
      toggleTheme,
      vote,
      addAsset,
      incrementViews, incrementDownloads, getAuthor, getAsset,
      getUserAssets, getTopAssets,
    }}>
      {children}
    </AppContext.Provider>
  );
}
