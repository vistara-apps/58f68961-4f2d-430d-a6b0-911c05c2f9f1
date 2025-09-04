'use client';

import { Loader2, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export function LoadingState({ 
  message = 'Generating your ads', 
  submessage = 'Our AI is creating amazing variations for you' 
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in">
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <Loader2 className="absolute -top-1 -right-1 w-6 h-6 text-accent animate-spin" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 loading-dots">
          {message}
        </h3>
        <p className="text-sm text-gray-600 max-w-md">
          {submessage}
        </p>
      </div>
      
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}
