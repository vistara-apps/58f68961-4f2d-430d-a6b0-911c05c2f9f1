'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface PostButtonProps {
  onPost: () => Promise<void>;
  disabled?: boolean;
  variant?: 'default' | 'disabled';
  selectedCount?: number;
}

export function PostButton({ 
  onPost, 
  disabled, 
  variant = 'default', 
  selectedCount = 0 
}: PostButtonProps) {
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (disabled || isPosting) return;
    
    setIsPosting(true);
    try {
      await onPost();
    } finally {
      setIsPosting(false);
    }
  };

  const isDisabled = disabled || isPosting || selectedCount === 0;

  return (
    <button
      onClick={handlePost}
      disabled={isDisabled}
      className={`
        w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium
        transition-all duration-200 transform
        ${isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.98] shadow-card hover:shadow-lg'
        }
      `}
    >
      {isPosting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Posting Ads...</span>
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          <span>
            Post {selectedCount > 0 ? `${selectedCount} ` : ''}Ad{selectedCount !== 1 ? 's' : ''} to Social
          </span>
        </>
      )}
    </button>
  );
}
