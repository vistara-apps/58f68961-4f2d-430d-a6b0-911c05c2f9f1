'use client';

import { ReactNode } from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow-card border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-primary">RemixAI</h1>
              <Zap className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-1">
            Spin & Post Ads Like Magic, Faster.
          </p>
        </div>
      </header>
      
      <main className="container py-6">
        {children}
      </main>
      
      <footer className="bg-surface border-t border-gray-200 mt-12">
        <div className="container py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 RemixAI - AI-Powered Ad Generation
          </p>
        </div>
      </footer>
    </div>
  );
}
