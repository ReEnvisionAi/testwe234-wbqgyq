import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ThemeSettings } from './ThemeSettings';
import { AccountSettings } from './AccountSettings';
import { WallpaperSettings } from './WallpaperSettings';
import { DesktopSettings } from './DesktopSettings';

export function Settings() {
  const { settings, updateSetting } = useApp();
  const [activeTab, setActiveTab] = useState('appearance');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const tabs = [
    { id: 'appearance', label: 'Appearance' },
    { id: 'desktop', label: 'Desktop' },
    { id: 'account', label: 'Account' }
  ];

  const handleThemeChange = (theme) => {
    updateSetting('theme', theme);
    setSuccess('Theme updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleWallpaperChange = (wallpaper) => {
    updateSetting('wallpaper', wallpaper);
    setSuccess('Wallpaper updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUsernameChange = (username) => {
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    updateSetting('username', username.trim());
    setSuccess('Username updated successfully');
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="flex h-full text-white">
      <div className="w-48 bg-gray-800/50 p-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              w-full text-left p-2 rounded-lg mb-1
              transition-colors
              ${activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 text-green-200 rounded-lg">
            {success}
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-8">
            <ThemeSettings 
              currentTheme={settings.theme}
              onThemeChange={handleThemeChange}
            />
            <WallpaperSettings 
              currentWallpaper={settings.wallpaper}
              onWallpaperChange={handleWallpaperChange}
            />
          </div>
        )}

        {activeTab === 'desktop' && (
          <DesktopSettings />
        )}

        {activeTab === 'account' && (
          <AccountSettings 
            username={settings.username}
            onUsernameChange={handleUsernameChange}
          />
        )}
      </div>
    </div>
  );
}