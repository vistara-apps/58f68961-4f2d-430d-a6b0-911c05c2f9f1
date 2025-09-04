'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { v4 as uuidv4 } from 'uuid';

import { AppShell } from './components/AppShell';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedAdCard } from './components/GeneratedAdCard';
import { PlatformSelector } from './components/PlatformSelector';
import { PostButton } from './components/PostButton';
import { CreditCounter } from './components/CreditCounter';
import { LoadingState } from './components/LoadingState';

import { generateAdCopy, analyzeImage } from './lib/ai';
import { getUser, createUser, updateUserCredits, saveCreation } from './lib/storage';
import { AdVariation, User } from './types';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  
  const [user, setUser] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<('tiktok' | 'instagram')[]>(['tiktok', 'instagram']);
  const [generatedAds, setGeneratedAds] = useState<AdVariation[]>([]);
  const [selectedAds, setSelectedAds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load user data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      loadUser(address);
    } else {
      setUser(null);
    }
  }, [isConnected, address]);

  const loadUser = async (walletAddress: string) => {
    try {
      let userData = await getUser(walletAddress);
      if (!userData) {
        userData = await createUser(walletAddress);
      }
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setGeneratedAds([]);
    setSelectedAds([]);
    setShowSuccess(false);
  };

  const handlePlatformToggle = (platform: 'tiktok' | 'instagram') => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      }
      return [...prev, platform];
    });
  };

  const handleAdToggle = (adId: string) => {
    setSelectedAds(prev => {
      if (prev.includes(adId)) {
        return prev.filter(id => id !== adId);
      }
      return [...prev, adId];
    });
  };

  const generateAds = async () => {
    if (!selectedFile || selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    try {
      // Analyze the uploaded image
      const imageDescription = await analyzeImage(selectedFile);
      
      // Generate ads for each platform
      const allAds: AdVariation[] = [];
      
      for (const platform of selectedPlatforms) {
        const adCopies = await generateAdCopy(imageDescription, platform);
        
        for (const copy of adCopies) {
          allAds.push({
            id: uuidv4(),
            headline: copy.headline,
            description: copy.description,
            callToAction: copy.callToAction,
            platform,
          });
        }
      }

      setGeneratedAds(allAds);
      setSelectedAds(allAds.map(ad => ad.id)); // Auto-select all ads
    } catch (error) {
      console.error('Error generating ads:', error);
      alert('Failed to generate ads. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const postAds = async () => {
    if (!user || !selectedFile || selectedAds.length === 0) return;

    const cost = selectedAds.length * 0.5; // $0.50 per ad
    if (user.credits < cost) {
      alert(`Insufficient credits. You need ${cost} credits to post ${selectedAds.length} ads.`);
      return;
    }

    setIsPosting(true);
    try {
      // Simulate posting to social media platforms
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save creation record
      const creation = {
        creationId: uuidv4(),
        userId: user.userId,
        originalImageURL: URL.createObjectURL(selectedFile),
        generatedVariations: generatedAds.filter(ad => selectedAds.includes(ad.id)),
        platform: selectedPlatforms.join(','),
        postStatus: 'posted',
        createdAt: new Date().toISOString(),
      };
      
      await saveCreation(creation);

      // Deduct credits
      const newCredits = user.credits - cost;
      await updateUserCredits(user.userId, newCredits);
      setUser(prev => prev ? { ...prev, credits: newCredits } : null);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setSelectedFile(null);
        setGeneratedAds([]);
        setSelectedAds([]);
      }, 3000);

    } catch (error) {
      console.error('Error posting ads:', error);
      alert('Failed to post ads. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const buyCredits = () => {
    // Simulate buying credits
    alert('Credit purchasing feature coming soon! Contact support for now.');
  };

  if (!isConnected) {
    return (
      <AppShell>
        <div className="max-w-md mx-auto text-center space-y-6 py-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to RemixAI
            </h2>
            <p className="text-gray-600">
              Connect your wallet to start generating AI-powered social media ads
            </p>
          </div>
          
          <div className="bg-surface p-6 rounded-lg shadow-card">
            <ConnectWallet />
          </div>
          
          <div className="space-y-3 text-sm text-gray-500">
            <p>✨ Generate 3-5 ad variations per image</p>
            <p>🎯 Optimized for TikTok & Instagram</p>
            <p>🚀 Auto-post to your social accounts</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (showSuccess) {
    return (
      <AppShell>
        <div className="max-w-md mx-auto text-center space-y-6 py-12 animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              Ads Posted Successfully! 🎉
            </h3>
            <p className="text-gray-600">
              Your {selectedAds.length} ad{selectedAds.length !== 1 ? 's' : ''} have been posted to your social media accounts.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        {user && <CreditCounter credits={user.credits} onBuyCredits={buyCredits} />}
        
        <div className="bg-surface p-6 rounded-lg shadow-card">
          <ImageUploader 
            onImageSelect={handleImageSelect} 
            disabled={isGenerating || isPosting}
          />
        </div>

        {selectedFile && (
          <div className="bg-surface p-6 rounded-lg shadow-card space-y-6">
            <PlatformSelector
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={handlePlatformToggle}
            />
            
            <button
              onClick={generateAds}
              disabled={isGenerating || selectedPlatforms.length === 0}
              className="w-full py-3 px-6 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Generate AI Ads'}
            </button>
          </div>
        )}

        {isGenerating && (
          <div className="bg-surface p-6 rounded-lg shadow-card">
            <LoadingState />
          </div>
        )}

        {generatedAds.length > 0 && !isGenerating && (
          <div className="space-y-6">
            <div className="bg-surface p-6 rounded-lg shadow-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Generated Ad Variations ({generatedAds.length})
              </h3>
              
              <div className="space-y-4">
                {generatedAds.map(ad => (
                  <GeneratedAdCard
                    key={ad.id}
                    variation={ad}
                    selected={selectedAds.includes(ad.id)}
                    onToggle={() => handleAdToggle(ad.id)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-card">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    Selected: {selectedAds.length} ads
                  </span>
                  <span className="font-medium text-gray-900">
                    Cost: ${(selectedAds.length * 0.5).toFixed(2)}
                  </span>
                </div>
                
                <PostButton
                  onPost={postAds}
                  disabled={!user || user.credits < selectedAds.length * 0.5}
                  selectedCount={selectedAds.length}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
