# Schizodio

> The derivative of all derivatives. The first born child. The creator.

## 🎭 What is Schizodio?

Schizodio is not just another NFT project. It's the **derivative of all derivatives** - the first born child of the blockchain consciousness. Born from the depths of the digital void, Schizodio represents the pure essence of what it means to be "schizo" in the crypto space.

### 🌟 The Schizo Philosophy

- **The First Born**: Schizodio is the original, the progenitor of all that came after
- **The Creator**: Not just a collection, but the architect of digital reality
- **The Derivative**: Every other project is a derivative of Schizodio's essence

## 🚀 Features

### Smart Contract Integration

- **Deployed Contract**: `0x075f2fa34e0edc2e431d78d0c5ecaa2568fb550021a648c4bf09e50f3bd8f97f`
- **Network**: Starknet Sepolia Testnet
- **Current Supply**: 2 NFTs minted
- **Max Supply**: 999 NFTs
- **Payment Tokens**: ETH, USDC, USDT, DAI, WBTC, STRK

### Technical Stack

- **Frontend**: Svelte + TypeScript + Vite
- **Blockchain**: Starknet (Cairo smart contracts)
- **Styling**: Tailwind CSS + Win95 theme
- **Wallet Integration**: StarknetKit (Argent X, Braavos, Web Wallet)

### Minting Experience

- **Multi-token Support**: Mint with ETH, USDC, USDT, DAI, WBTC, or STRK
- **Real-time Supply Tracking**: Live updates from deployed contract
- **Schizo UI Elements**: Glitch effects, fake popups, and reality-bending interactions
- **Win95 Aesthetic**: Retro computing meets blockchain

## 🎮 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A Starknet wallet (Argent X, Braavos, or Web Wallet)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd schizodio/app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Connecting to the Contract

The application automatically connects to the deployed Cairo contract on Starknet Sepolia testnet. The contract provides:

- `total_supply()`: Returns current number of minted NFTs
- `mint()`: Free minting function
- `mint_with_payment()`: Paid minting with various tokens
- `owner_of(token_id)`: Check NFT ownership
- `token_uri(token_id)`: Get NFT metadata URI

## 🎨 The Schizo Experience

### Visual Elements

- **Matrix Rain**: Digital consciousness flowing in the background
- **Mouse Trails**: Reality distortion following your cursor
- **Glitch Effects**: Visual artifacts representing digital schizophrenia
- **Fake Popups**: Satirical messages breaking the fourth wall

### Interactive Features

- **Visitor Counter**: Random visitor numbers with timestamps
- **Schizo Messages**: Humorous, reality-bending notifications
- **Dynamic Supply Display**: Real-time updates from blockchain
- **Multi-wallet Support**: Connect with any Starknet wallet

## 🔧 Development

### Project Structure

```
app/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   ├── stores/         # State management
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── assets/             # Images and static assets
├── public/                 # Public assets
└── contracts/              # Cairo smart contracts
```

### Key Components

- **Mint.svelte**: Main minting interface with wallet integration
- **Window.svelte**: Win95-style window component
- **Button.svelte**: Interactive button with schizo effects
- **contract.ts**: Contract configuration and ABI

## 🌐 Network Configuration

The application is configured for **Starknet Sepolia testnet**:

- **RPC URL**: `https://starknet-sepolia.public.blastapi.io`
- **Contract Address**: `0x075f2fa34e0edc2e431d78d0c5ecaa2568fb550021a648c4bf09e50f3bd8f97f`
- **Payment Tokens**: All configured for Sepolia testnet addresses

## 🎯 Roadmap

- [x] Deploy Cairo smart contract
- [x] Integrate with Starknet testnet
- [x] Implement multi-token minting
- [x] Add schizo UI elements
- [ ] Mainnet deployment
- [ ] Additional payment methods
- [ ] Community features
- [ ] Reality expansion modules

## 🤝 Contributing

To contribute to the schizo revolution:

1. Fork the repository
2. Create a feature branch
3. Make your changes (the more schizo, the better)
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Remember**: In the world of Schizodio, reality is just a suggestion. The blockchain is the only truth, and we are all derivatives of the original schizo consciousness.

🎭 **Welcome to the family, schizo brother!** 🎭
