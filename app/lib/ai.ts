import OpenAI from 'openai';

function getOpenAIClient() {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not found. AI features will use fallback responses.');
    return null;
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
}

export async function generateAdCopy(
  imageDescription: string,
  platform: 'tiktok' | 'instagram',
  productName?: string,
  targetAudience?: string
) {
  const platformGuidelines = {
    tiktok: {
      tone: 'casual, trendy, authentic',
      format: 'short, punchy, with emojis',
      cta: 'strong call-to-action for engagement',
    },
    instagram: {
      tone: 'aspirational, lifestyle-focused',
      format: 'visually descriptive, hashtag-friendly',
      cta: 'compelling but not pushy',
    },
  };

  const guidelines = platformGuidelines[platform];
  
  const prompt = `Create an engaging ${platform} ad copy for a product based on this image description: ${imageDescription}

Product name: ${productName || 'featured product'}
Target audience: ${targetAudience || 'general consumers'}

Guidelines for ${platform}:
- Tone: ${guidelines.tone}
- Format: ${guidelines.format}  
- Call-to-action: ${guidelines.cta}

Generate 3 different variations, each with:
1. Headline (max 60 chars)
2. Description (${platform === 'tiktok' ? '150' : '200'} chars max)
3. Call-to-action (short phrase)

Return as JSON array with format:
[{
  "headline": "string",
  "description": "string", 
  "callToAction": "string"
}]`;

  const openai = getOpenAIClient();
  
  if (!openai) {
    // Return fallback ad copy when API key is not available
    return [{
      headline: `Amazing ${productName || 'Product'} Alert! 🔥`,
      description: `Don't miss out on this incredible ${productName || 'product'}! Perfect for ${targetAudience || 'everyone'}.`,
      callToAction: 'Shop Now'
    }];
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    return JSON.parse(content);
  } catch (error) {
    console.error('Ad copy generation error:', error);
    // Fallback ad copy
    return [{
      headline: `Amazing ${productName || 'Product'} Alert! 🔥`,
      description: `Don't miss out on this incredible ${productName || 'product'}! Perfect for ${targetAudience || 'everyone'}.`,
      callToAction: 'Shop Now'
    }];
  }
}

export async function analyzeImage(imageFile: File): Promise<string> {
  const openai = getOpenAIClient();
  
  if (!openai) {
    return 'Product image uploaded - AI analysis not available';
  }

  try {
    // Convert file to base64
    const base64 = await fileToBase64(imageFile);
    
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this product image and describe what you see. Focus on the product, its features, colors, style, and any text visible. Keep description concise but detailed for ad generation.'
            },
            {
              type: 'image_url',
              image_url: {
                url: base64
              }
            }
          ]
        }
      ],
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || 'Product image uploaded';
  } catch (error) {
    console.error('Image analysis error:', error);
    return 'Product image uploaded';
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
