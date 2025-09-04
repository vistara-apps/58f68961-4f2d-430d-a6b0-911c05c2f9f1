'use client';

import { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { AdVariation } from '../types';

interface GeneratedAdCardProps {
  variation: AdVariation;
  selected: boolean;
  onToggle: () => void;
  variant?: 'default' | 'compact';
}

export function GeneratedAdCard({ 
  variation, 
  selected, 
  onToggle, 
  variant = 'default' 
}: GeneratedAdCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`
        bg-surface rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${selected 
          ? 'border-primary bg-primary/5 shadow-card' 
          : 'border-gray-200 hover:border-gray-300'
        }
        ${isCompact ? 'p-4' : 'p-6'}
      `}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {selected ? (
            <CheckCircle className="w-5 h-5 text-primary" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${variation.platform === 'tiktok' 
                  ? 'bg-pink-100 text-pink-700' 
                  : variation.platform === 'instagram'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
                }
              `}>
                {variation.platform === 'both' ? 'Multi-Platform' : variation.platform.toUpperCase()}
              </span>
            </div>
            
            <h3 className={`font-semibold text-gray-900 ${isCompact ? 'text-sm' : 'text-base'}`}>
              {variation.headline}
            </h3>
            
            <p className={`text-gray-600 leading-relaxed ${isCompact ? 'text-sm' : 'text-base'}`}>
              {variation.description}
            </p>
            
            <div className={`
              inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent font-medium
              ${isCompact ? 'text-xs' : 'text-sm'}
            `}>
              {variation.callToAction}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
