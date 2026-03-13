import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { DashboardPage } from './pages/DashboardPage';
import { AssetDetailPage } from './pages/AssetDetailPage';
import { UploadPage } from './pages/UploadPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import { SettingsPage } from './pages/SettingsPage';

function AppContent() {
  const { page, theme, isLoggedIn, isGuest } = useApp();

  const canEdit = isLoggedIn && !isGuest;

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="app-shell min-h-screen text-text-primary dark:text-text-primary-dark transition-colors duration-300">
        <div className="app-atmosphere">
          <div className="greenhouse-orb greenhouse-orb-left" />
          <div className="greenhouse-orb greenhouse-orb-right" />
          <div className="greenhouse-orb greenhouse-orb-bottom" />
          <div className="greenhouse-glass" />
          <div className="canopy-blur" />
          <div className="canopy-blur-right" />
        </div>

        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main>
            {page.type === 'home' && <HomePage />}
            {page.type === 'browse' && <BrowsePage />}
            {page.type === 'signin' && <SignInPage />}
            {page.type === 'dashboard' && (canEdit ? <DashboardPage /> : <SignInPage />)}
            {page.type === 'settings' && (canEdit ? <SettingsPage /> : <SignInPage />)}
            {page.type === 'asset' && <AssetDetailPage id={page.id} />}
            {page.type === 'upload' && (canEdit ? <UploadPage /> : <SignInPage />)}
            {page.type === 'profile' && <ProfilePage id={page.id} />}
          </main>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
