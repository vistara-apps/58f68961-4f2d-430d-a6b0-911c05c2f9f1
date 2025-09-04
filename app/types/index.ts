export interface User {
  userId: string;
  connectedSocialAccounts: {
    tiktok?: boolean;
    instagram?: boolean;
  };
  credits: number;
  createdAt: string;
}

export interface AdVariation {
  id: string;
  imageUrl?: string;
  headline: string;
  description: string;
  platform: 'tiktok' | 'instagram' | 'both';
  callToAction: string;
}

export interface Creation {
  creationId: string;
  userId: string;
  originalImageURL: string;
  generatedVariations: AdVariation[];
  platform: string;
  postStatus: 'pending' | 'posted' | 'failed';
  createdAt: string;
}

export interface GenerationRequest {
  imageFile: File;
  productName?: string;
  targetAudience?: string;
  platforms: ('tiktok' | 'instagram')[];
}
