import { useState } from 'react';
import { usePublishStore } from './stores/publishStore';
import { Code2, Package, Tags, User, FileText } from 'lucide-react';
import { AppCategory } from '../../types/apps';

export function PublishDialog({ onClose }: { onClose: () => void }) {
  const { publishApp, isPublishing, error } = usePublishStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'development' as AppCategory,
    version: '1.0.0',
    author: '',
    keywords: '',
    features: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await publishApp({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      version: formData.version,
      author: formData.author,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
      icon: Code2
    });

    if (!error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-white mb-4">Publish to App Store</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              App Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as AppCategory }))}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="development">Development</option>
                <option value="productivity">Productivity</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Version
              </label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                pattern="\d+\.\d+\.\d+"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="react, typescript, web app"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Features (one per line)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32"
              placeholder="Responsive design&#10;Dark mode support&#10;Real-time updates"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPublishing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}