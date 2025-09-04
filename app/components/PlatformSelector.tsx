'use client';

import { useState } from 'react';

interface PlatformSelectorProps {
  selectedPlatforms: ('tiktok' | 'instagram')[];
  onPlatformToggle: (platform: 'tiktok' | 'instagram') => void;
  variant?: 'checkbox' | 'segmented';
}

export function PlatformSelector({ 
  selectedPlatforms, 
  onPlatformToggle, 
  variant = 'checkbox' 
}: PlatformSelectorProps) {
  const platforms = [
    { id: 'tiktok' as const, name: 'TikTok', color: 'pink' },
    { id: 'instagram' as const, name: 'Instagram', color: 'purple' },
  ];

  if (variant === 'segmented') {
    return (
      <div className="bg-gray-100 p-1 rounded-lg flex">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => onPlatformToggle(platform.id)}
              className={`
                flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all duration-200
                ${isSelected
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {platform.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-900 mb-3">
        Select Target Platforms
      </div>
      <div className="space-y-2">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <label
              key={platform.id}
              className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onPlatformToggle(platform.id)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${isSelected 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300'
                }
              `}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="font-medium text-gray-900">{platform.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
