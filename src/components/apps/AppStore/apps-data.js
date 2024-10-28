import { 
  FileText, Calculator, Terminal, Settings, FolderOpen,
  Globe, Database, Package, Wand2, Table, Cpu, Presentation
} from 'lucide-react';
import { TextPad } from '../TextPad';
import { Calculator as CalculatorApp } from '../Calculator';
import { Terminal as TerminalApp } from '../Terminal';
import { DataGrid } from '../DataGrid/DataGrid';
import { AIDevStudio } from '../AIDevStudio/AIDevStudio';
import { Prez } from '../Prez/Prez';
import { PrezManifest } from '../Prez/manifest';

export const AVAILABLE_APPS = [
  PrezManifest,
  {
    id: 'aidevstudio',
    name: 'AI Dev Studio',
    icon: Cpu,
    component: AIDevStudio,
    description: 'AI-powered development environment for building React applications',
    features: [
      'AI-powered code generation',
      'Advanced code editor with TypeScript support',
      'Live preview with hot reload',
      'Project management and version control',
      'One-click deployment'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80'
    ],
    category: 'development',
    version: '1.0.0',
    author: 'StackBlitz',
    keywords: ['ai', 'development', 'code-editor', 'react'],
    requirements: {
      'Storage': '100MB',
      'Memory': '512MB'
    }
  },
  {
    id: 'datagrid',
    name: 'DataGrid',
    icon: Table,
    component: DataGrid,
    description: 'Advanced spreadsheet application with data visualization capabilities.',
    features: [
      'Advanced cell editing and formatting',
      'Data visualization with charts',
      'Excel/CSV import/export',
      'Formula support',
      'Collaborative editing'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    ],
    category: 'productivity',
    version: '1.0.0',
    author: 'StackBlitz',
    keywords: ['spreadsheet', 'excel', 'data', 'charts'],
    requirements: {
      'Storage': '50MB',
      'Memory': '256MB'
    }
  },
  {
    id: 'textpad',
    name: 'TextPad',
    icon: FileText,
    component: TextPad,
    description: 'A simple text editor for quick notes and coding.',
    category: 'productivity',
    screenshots: ['https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80']
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: Calculator,
    component: CalculatorApp,
    description: 'Basic calculator with standard operations.',
    category: 'utilities',
    screenshots: ['https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&q=80']
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: Terminal,
    component: TerminalApp,
    description: 'Command line interface for system operations.',
    category: 'development',
    screenshots: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&q=80']
  }
];