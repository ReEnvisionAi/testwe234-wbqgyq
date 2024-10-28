import { useState, useEffect } from 'react';
import { Grid, Maximize2 } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const ICON_SIZES = {
  small: { size: 64, label: 'Compact' },
  medium: { size: 80, label: 'Standard' },
  large: { size: 96, label: 'Large' }
};

const SPACING_PRESETS = {
  compact: 20,
  comfortable: 30,
  spacious: 40
};

export function DesktopSettings() {
  const { settings, updateSetting } = useApp();
  const [tempSettings, setTempSettings] = useState({
    gridEnabled: settings.gridEnabled ?? true,
    gridSpacing: settings.gridSpacing || SPACING_PRESETS.comfortable,
    iconSize: settings.iconSize || 'medium'
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = 
      tempSettings.gridEnabled !== settings.gridEnabled ||
      tempSettings.gridSpacing !== settings.gridSpacing ||
      tempSettings.iconSize !== settings.iconSize;
    setHasChanges(changed);
  }, [tempSettings, settings]);

  const handleApplyChanges = () => {
    updateSetting('gridEnabled', tempSettings.gridEnabled);
    updateSetting('gridSpacing', tempSettings.gridSpacing);
    updateSetting('iconSize', tempSettings.iconSize);
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Desktop Layout</h2>
          <p className="text-gray-400 text-sm">
            Customize how icons are arranged on your desktop
          </p>
        </div>
        <button
          onClick={handleApplyChanges}
          disabled={!hasChanges}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${hasChanges
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}
        >
          Apply Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-white mb-4">
            <Grid className="w-5 h-5" />
            <span className="font-medium">Grid Alignment</span>
            <div className="flex-1" />
            <button
              onClick={() => setTempSettings(prev => ({ ...prev, gridEnabled: !prev.gridEnabled }))}
              className={`
                px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${tempSettings.gridEnabled
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-gray-700/50 text-gray-400'}
              `}
            >
              {tempSettings.gridEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries(SPACING_PRESETS).map(([preset, value]) => (
              <button
                key={preset}
                onClick={() => setTempSettings(prev => ({ ...prev, gridSpacing: value }))}
                className={`
                  p-3 rounded-lg border-2 transition-colors capitalize
                  ${tempSettings.gridSpacing === value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'}
                `}
              >
                <span className="text-white">{preset}</span>
                <span className="block text-xs text-gray-400 mt-1">
                  {value}px spacing
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-white mb-4">
            <Maximize2 className="w-5 h-5" />
            <span className="font-medium">Icon Size</span>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ICON_SIZES).map(([size, { size: px, label }]) => (
              <button
                key={size}
                onClick={() => setTempSettings(prev => ({ ...prev, iconSize: size }))}
                className={`
                  p-3 rounded-lg border-2 transition-colors
                  ${tempSettings.iconSize === size
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'}
                `}
              >
                <span className="text-white">{label}</span>
                <span className="block text-xs text-gray-400 mt-1">
                  {px}px
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}