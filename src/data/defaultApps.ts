import { 
  FileText, Calculator, Settings, Terminal, Store,
  Cpu, FolderOpen, Table, Presentation
} from 'lucide-react';
import { AppInfo } from '../types/apps';
import { TextPad } from '../components/apps/TextPad';
import { Calculator as CalculatorApp } from '../components/apps/Calculator';
import { Settings as SettingsApp } from '../components/apps/Settings/Settings';
import { Terminal as TerminalApp } from '../components/apps/Terminal';
import { AppStore } from '../components/apps/AppStore/AppStore';
import { FileManager } from '../components/apps/FileManager/FileManager';
import { AIDevStudio } from '../components/apps/AIDevStudio/AIDevStudio';
import { DataGrid } from '../components/apps/DataGrid/DataGrid';
import { PrezManifest } from '../components/apps/Prez/manifest';

export const defaultApps: AppInfo[] = [
  PrezManifest,
  {
    id: 'datagrid',
    name: 'DataGrid',
    description: 'Advanced spreadsheet application with data visualization',
    icon: Table,
    component: DataGrid,
    category: 'productivity',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 1200,
    height: 800,
    canUninstall: true,
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    ],
    features: [
      'Advanced cell editing and formatting',
      'Data visualization with charts',
      'Excel/CSV import/export',
      'Formula support',
      'Collaborative editing'
    ],
    keywords: ['spreadsheet', 'excel', 'data', 'charts'],
    requirements: {
      'Storage': '50MB',
      'Memory': '256MB'
    }
  },
  {
    id: 'aidevstudio',
    name: 'AI Dev Studio',
    description: 'AI-powered development environment for building React applications',
    icon: Cpu,
    component: AIDevStudio,
    category: 'development',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 1200,
    height: 800,
    canUninstall: true,
    screenshots: [
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
    ],
    features: [
      'AI-powered code generation',
      'Advanced code editor with TypeScript support',
      'Live preview with hot reload',
      'Project management and version control',
      'One-click deployment'
    ],
    keywords: ['ai', 'development', 'code-editor', 'react'],
    requirements: {
      'Storage': '100MB',
      'Memory': '512MB'
    }
  },
  {
    id: 'textpad',
    name: 'TextPad',
    description: 'Simple text editor for quick notes and coding',
    icon: FileText,
    component: TextPad,
    category: 'productivity',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 600,
    height: 400,
    canUninstall: true
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Basic calculator with standard operations',
    icon: Calculator,
    component: CalculatorApp,
    category: 'utilities',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 320,
    height: 480,
    canUninstall: true
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Command line interface for system operations',
    icon: Terminal,
    component: TerminalApp,
    category: 'development',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 600,
    height: 400,
    canUninstall: true
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'System settings and configuration',
    icon: Settings,
    component: SettingsApp,
    category: 'system',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 800,
    height: 600,
    canUninstall: false
  },
  {
    id: 'appstore',
    name: 'App Store',
    description: 'Browse and install applications',
    icon: Store,
    component: AppStore,
    category: 'system',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 900,
    height: 600,
    canUninstall: false
  },
  {
    id: 'files',
    name: 'Files',
    description: 'File system manager',
    icon: FolderOpen,
    component: FileManager,
    category: 'system',
    version: '1.0.0',
    author: 'StackBlitz',
    width: 800,
    height: 600,
    canUninstall: false
  }
];