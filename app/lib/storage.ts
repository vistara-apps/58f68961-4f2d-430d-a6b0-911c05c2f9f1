// Simple in-memory storage for demo
// In production, use a database like Upstash Redis

interface StoredUser {
  userId: string;
  credits: number;
  connectedSocialAccounts: {
    tiktok?: boolean;
    instagram?: boolean;
  };
  createdAt: string;
}

interface StoredCreation {
  creationId: string;
  userId: string;
  originalImageURL: string;
  generatedVariations: any[];
  platform: string;
  postStatus: string;
  createdAt: string;
}

const users = new Map<string, StoredUser>();
const creations = new Map<string, StoredCreation>();

export async function getUser(userId: string): Promise<StoredUser | null> {
  return users.get(userId) || null;
}

export async function createUser(userId: string): Promise<StoredUser> {
  const user: StoredUser = {
    userId,
    credits: 3, // Free credits for new users
    connectedSocialAccounts: {},
    createdAt: new Date().toISOString(),
  };
  
  users.set(userId, user);
  return user;
}

export async function updateUserCredits(userId: string, credits: number): Promise<void> {
  const user = users.get(userId);
  if (user) {
    user.credits = credits;
    users.set(userId, user);
  }
}

export async function saveCreation(creation: StoredCreation): Promise<void> {
  creations.set(creation.creationId, creation);
}

export async function getUserCreations(userId: string): Promise<StoredCreation[]> {
  return Array.from(creations.values()).filter(c => c.userId === userId);
}
