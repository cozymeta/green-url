export interface Author {
  id: string;
  name: string;
  avatarGradient: string;
  avatarUrl?: string;
  bio: string;
  joinedDate: string;
}

export interface Account {
  id: string;
  username: string;
  password: string;
  bio: string;
  avatarGradient: string;
  avatarUrl?: string;
  joinedDate: string;
  lastUsernameChange: number;
  isGuest: boolean;
}

export interface FileItem {
  name: string;
  size: string;
  type: string;
}

export interface Asset {
  id: string;
  title: string;
  description: string;
  authorId: string;
  screenshots: string[];
  thumbnailGradient: string;
  files: FileItem[];
  tags: string[];
  category: 'model' | 'library' | 'texture' | 'animation' | 'tool';
  rating: number;
  userVote: 0 | 1 | -1;
  views: number;
  downloads: number;
  createdAt: string;
  githubUrl?: string;
  externalUrl?: string;
}

export type Page =
  | { type: 'home' }
  | { type: 'browse'; search?: string; category?: string }
  | { type: 'signin' }
  | { type: 'dashboard' }
  | { type: 'settings' }
  | { type: 'asset'; id: string }
  | { type: 'upload' }
  | { type: 'profile'; id: string };

export type Theme = 'light' | 'dark';

export const CATEGORIES = ['model', 'library', 'texture', 'animation', 'tool'] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  model: '3D Models',
  library: 'Libraries',
  texture: 'Textures',
  animation: 'Animations',
  tool: 'Tools',
};

export const POPULAR_TAGS = [
  'low-poly', 'high-poly', 'pbr', 'fantasy', 'sci-fi', 'medieval',
  'modern', 'weapons', 'characters', 'environment', 'vehicles', 'props',
  'unity', 'unreal', 'godot', 'blender', 'three.js', 'react',
  'modular', 'animated', 'rigged', 'game-ready', 'stylized', 'realistic',
  'open-source', 'skyrim', 'minecraft', 'cyberpunk', 'horror', 'rpg',
];
