import { create } from 'zustand';
import { useProjectStore } from './projectStore';
import { AppInfo } from '../../../types/apps';
import { generateScreenshot } from '../utils/screenshot';

interface PublishState {
  isPublishing: boolean;
  error: string | null;
  publishApp: (manifest: Partial<AppInfo>) => Promise<void>;
}

export const usePublishStore = create<PublishState>((set) => ({
  isPublishing: false,
  error: null,

  publishApp: async (manifest) => {
    set({ isPublishing: true, error: null });

    try {
      const { files } = useProjectStore.getState();
      
      // Generate screenshot of the app
      const screenshot = await generateScreenshot();
      
      // Create app manifest
      const appManifest: AppInfo = {
        ...manifest,
        id: manifest.name?.toLowerCase().replace(/\s+/g, '-') || '',
        component: null!, // Will be loaded from files
        icon: manifest.icon || null!,
        category: manifest.category || 'development',
        version: manifest.version || '1.0.0',
        author: manifest.author || 'Anonymous',
        canUninstall: true,
        width: 1200,
        height: 800,
        screenshots: screenshot ? [screenshot] : [],
        files: files
      };

      // Save to localStorage (in a real app, this would be a server API call)
      const publishedApps = JSON.parse(localStorage.getItem('published_apps') || '[]');
      publishedApps.push(appManifest);
      localStorage.setItem('published_apps', JSON.stringify(publishedApps));

    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isPublishing: false });
    }
  }
}));