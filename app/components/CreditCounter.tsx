'use client';

import { Coins, Plus } from 'lucide-react';

interface CreditCounterProps {
  credits: number;
  onBuyCredits?: () => void;
}

export function CreditCounter({ credits, onBuyCredits }: CreditCounterProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <Coins className="w-5 h-5 text-accent" />
        <span className="font-medium text-gray-900">Credits</span>
        <span className={`
          px-2 py-1 rounded-full text-sm font-bold
          ${credits > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
        `}>
          {credits}
        </span>
      </div>
      
      {onBuyCredits && (
        <button
          onClick={onBuyCredits}
          className="flex items-center gap-1 px-3 py-1 bg-accent text-white rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buy More
        </button>
      )}
    </div>
  );
}
