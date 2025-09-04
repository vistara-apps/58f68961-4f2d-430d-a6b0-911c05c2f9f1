# RemixAI - AI-Powered Social Media Ad Generator

Spin & Post Ads Like Magic, Faster.

## Overview

RemixAI is a Base Mini App that generates social media ad variations from a single product image and auto-posts them to TikTok and Instagram for creators and small businesses.

## Features

- **AI Ad Creative Generation**: Upload a product image and get 3-5 distinct ad variations
- **Platform-Specific Optimization**: Tailored copy for TikTok and Instagram
- **Automated Social Media Posting**: Direct posting to connected accounts
- **AI Growth Hacking Agent**: Basic performance suggestions
- **Micro-transaction Model**: Pay-per-post pricing ($0.50 per ad)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your API keys
4. Run development server: `npm run dev`

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key
- `OPENROUTER_API_KEY`: OpenRouter API key for AI generation

## Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **AI**: OpenRouter API with Gemini 2.0 Flash for text/image generation
- **Wallet**: OnchainKit + wagmi for Base integration
- **Storage**: In-memory for demo (Upstash Redis for production)

## User Flow

1. Connect Farcaster wallet
2. Upload product image
3. Select target platforms (TikTok/Instagram)
4. AI generates ad variations
5. Review and select preferred ads
6. Post to connected social accounts

## Business Model

Pay-per-post: $0.50 per ad set posted, with bundled credits available.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- OnchainKit
- OpenRouter AI
- wagmi/viem
- Lucide React Icons

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
