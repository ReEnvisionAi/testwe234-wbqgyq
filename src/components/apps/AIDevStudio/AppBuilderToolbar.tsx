import { useState } from 'react';
import { Save, Upload, Play, Settings, Package } from 'lucide-react';
import { useProjectStore } from './stores/projectStore';
import { PublishDialog } from './PublishDialog';

export function AppBuilderToolbar() {
  const { saveProject } = useProjectStore();
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 p-2 bg-gray-800 border-b border-gray-700">
        <button
          onClick={saveProject}
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors flex items-center gap-2"
          title="Save project"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>

        <button
          onClick={() => setShowPublishDialog(true)}
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors flex items-center gap-2"
          title="Publish to App Store"
        >
          <Package className="w-4 h-4" />
          <span>Publish</span>
        </button>

        <div className="flex-1" />

        <button
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {showPublishDialog && (
        <PublishDialog onClose={() => setShowPublishDialog(false)} />
      )}
    </>
  );
}