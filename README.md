# TrustPool

A comprehensive ERC-3643 compliant token management platform built on the Monad Testnet. TrustPool enables regulated token transfers through identity verification, claims management, and compliance enforcement.

## ERC3643 FLOW Diagram
<img width="1532" height="810" alt="Screenshot from 2025-12-13 17-57-03" src="https://github.com/user-attachments/assets/86e82783-ee1c-4c4b-a288-336e54beffed" />


## 🎯 Overview

TrustPool is a decentralized application (DApp) that implements the ERC-3643 standard for compliant security tokens. It provides a complete framework for:

- **Identity Management**: On-chain identity contracts for users
- **Claims System**: Verifiable claims from trusted issuers (KYC, AML, etc.)
- **Compliance Enforcement**: Automatic validation of transfers based on identity and claims
- **Token Management**: ERC-3643 compliant token minting, burning, and transfers
- **Multi-Role Dashboard**: Separate interfaces for Admins, Issuers, and Users

The platform ensures that only verified entities with valid claims can hold and transfer regulated tokens, making it ideal for:
- Security token offerings (STOs)
- Supply chain transparency
- Regulatory compliance
- Enterprise tokenization

## ✨ Features

### For Administrators
- **Claim Topics Management**: Register and manage claim topics (KYC, AML, etc.)
- **Trusted Issuers Registry**: Add and authorize trusted issuers
- **Token Management**: Mint, burn, and manage ERC-3643 tokens
- **Compliance Configuration**: Set transfer limits and compliance rules

### For Trusted Issuers
- **Claim Requests Review**: View and process user claim requests
- **Claim Issuance**: Issue verified claims to users
- **User Verification**: Review user data before issuing claims

### For Users
- **Identity Creation**: Deploy personal identity contracts
- **Identity Registration**: Register identity with the Identity Registry
- **Claim Requests**: Request claims from trusted issuers
- **Claim Management**: View and manage issued claims
- **Token Transfers**: Transfer tokens with automatic compliance checks

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Router** - Routing
- **Wagmi** - Ethereum React hooks
- **Viem** - Ethereum library
- **TanStack Query** - Data fetching and caching

### Blockchain
- **Solidity 0.8.20** - Smart contract language
- **Monad Testnet** - Blockchain network
- **OpenZeppelin** - Security-tested contracts

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🏗 Architecture

TrustPool follows a modular architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Admin   │  │  Issuer  │  │   User   │             │
│  │ Dashboard│  │ Dashboard│  │ Dashboard│             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Smart Contract Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Identity   │  │   Identity   │  │   Claim      │ │
│  │   Registry   │  │  Contracts   │  │   Topics     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Trusted    │  │  Compliance  │  │  ERC3643    │ │
│  │   Issuers    │  │              │  │   Token     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  Monad Testnet  │
              └─────────────────┘
```

## 📜 Smart Contracts

### Core Contracts

1. **Identity.sol**
   - User identity contracts storing claims
   - Manages claim requests and issuances
   - Validates claim topics

2. **IdentityRegistry.sol**
   - Registry mapping wallet addresses to identity contracts
   - Manages user registration and verification status

3. **ClaimTopicRegistry.sol**
   - Registry of valid claim topics
   - Admin-managed topic definitions

4. **TrustedIssuersRegistry.sol**
   - Registry of authorized claim issuers
   - Maps issuers to their authorized topics

5. **Compliance.sol**
   - Validates transfers based on identity and claims
   - Enforces transfer limits and rules

6. **ERC3643Token.sol**
   - ERC-3643 compliant token implementation
   - Integrates with Compliance contract

7. **TokenFactory.sol**
   - Factory for deploying identity contracts

### Contract Addresses (Monad Testnet)

Update these in `src/lib/config.ts`:

```typescript
CONTRACT_ADDRESSES = {
  CLAIM_TOPIC_REGISTRY_ADDRESS: '0x4B5f49efF0e0Fa117E321B88Cd8B035d3F019064',
  TRUST_ISSUER_REGISTRY_ADDRESS: '0x9d77BCCb09F5753EeAE5C869587Cdc6Ae7434CEE',
  IDENTITY_ADDRESS: '0x070C331cDa54c0cB38682F8800254f53D8456CeF',
  IDENTITY_REGISTRY_ADDRESS: '0xB8EaC58c9880aBD89DA91567E8243EEe82f623A8',
  COMPLIANCE_CONTRACT_ADDRESS: '0x6d3347ab86DFF20616f5E117FB510675868416B1',
  ERC3643_CONTRACT_ADDRESS: '0xfe8034f175b00a1d1506d5b7a1845a072ed2b972',
}
```

## 📁 Project Structure

```
TrustPool/
├── contracts/                    # Smart contracts
│   ├── ClaimTopicRegistry.sol
│   ├── Compliance.sol
│   ├── ERC3643Token.sol
│   ├── Identity.sol
│   ├── IdentityRegistry.sol
│   ├── TokenFactory.sol
│   └── TrustedIssuersRegistry.sol
├── contracts-abi-files/          # Contract ABIs and bytecode
│   ├── ClaimTopicsABI.json
│   ├── ComplianceABI.json
│   ├── ERC3643TokenABI.json
│   ├── IdentityABI.json
│   ├── IdentityRegistryABI.json
│   ├── Identity_Bytecode.js
│   ├── TokenFactoryABI.json
│   └── TrustedIssuersABI.json
├── src/
│   ├── components/               # React components
│   │   ├── claim-request/        # Claim request components
│   │   ├── custom-components/    # Custom components
│   │   ├── ui/                   # shadcn/ui components
│   │   └── ErrorBoundary.tsx
│   ├── custom-chains/            # Chain configurations
│   │   └── MonadTestnet.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── use-wallet-connection.ts
│   ├── lib/                      # Utilities and config
│   │   ├── config.ts             # App configuration
│   │   └── utils.ts
│   ├── pages/                    # Page components
│   │   ├── admin-dashboard/      # Admin interface
│   │   ├── issuer-dashboard/     # Issuer interface
│   │   ├── user-dashboard/       # User interface
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── Overview.tsx
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 18+ and npm
- **MetaMask** or compatible Web3 wallet
- **Monad Testnet** configured in your wallet

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrustPool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory (if needed):
   ```env
   VITE_RPC_URL=https://testnet-rpc.monad.xyz/
   ```

4. **Update contract addresses**
   Edit `src/lib/config.ts` with your deployed contract addresses.

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:5173`

### Configure MetaMask for Monad Testnet

1. Open MetaMask and go to Settings → Networks → Add Network
2. Add the following details:
   - **Network Name**: Monad Testnet
   - **RPC URL**: `https://testnet-rpc.monad.xyz/`
   - **Chain ID**: `10143`
   - **Currency Symbol**: `MON`
   - **Block Explorer**: `https://testnet.monadexplorer.com/`

## ⚙️ Configuration

### Admin Address

Set the admin address in `src/lib/config.ts`:

```typescript
export const ADMIN_ADDRESS = '0x35C6e706EE23CD898b2C15fEB20f0fE726E734D2'
```

### Claim Topics

Predefined claim topics in `src/lib/config.ts`:

```typescript
export const CLAIM_TOPICS = {
  KYC: 1,
  AML: 2,
  PRODUCT_AUTHENTICITY: 100,
  COUNTRY_VERIFICATION: 101,
  ACCREDITED_INVESTOR: 102,
  PROFESSIONAL_INVESTOR: 103,
}
```

## 📖 Usage

### For Administrators

1. **Connect Wallet** with admin address
2. **Claim Topics Tab**: Add new claim topics (e.g., KYC, AML)
3. **Trusted Issuers Tab**: 
   - Add trusted issuers
   - Assign claim topics to issuers
   - Authorize issuers in the Identity contract
4. **Token Manager Tab**: 
   - Mint tokens to addresses
   - Burn tokens
   - View token balance

### For Trusted Issuers

1. **Connect Wallet** with issuer address
2. **Requests Tab**: View pending claim requests from users
3. **Issue Claims Tab**: 
   - Review user data
   - Issue verified claims to users
   - View issued claims

### For Users

1. **Connect Wallet**
2. **Create Identity Tab**: 
   - Deploy your identity contract
   - Register identity with country code
3. **Claim Requests Tab**: 
   - Request claims from trusted issuers
   - View request status
4. **My Claims Tab**: View all issued claims
5. **Transfer Tab**: 
   - Transfer tokens to other users
   - View transfer history

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Style

The project uses:
- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** for type checking

### Smart Contract Development

To compile and deploy contracts:

1. Install Hardhat or Foundry
2. Configure network settings
3. Deploy contracts in order:
   - ClaimTopicRegistry
   - TrustedIssuersRegistry
   - IdentityRegistry
   - Compliance
   - ERC3643Token
4. Update addresses in `src/lib/config.ts`

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Hosting

You can deploy the `dist/` folder to any static hosting service:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **IPFS**

### Environment-Specific Builds

Update contract addresses in `src/lib/config.ts` for different environments (testnet, mainnet, etc.).

## 🔐 Security Considerations

- **Admin Access**: Protect admin private keys
- **Contract Upgrades**: Consider upgradeable contracts for production
- **Access Control**: Review all `onlyAdmin` and `onlyOwner` modifiers
- **Input Validation**: Validate all user inputs
- **Gas Optimization**: Review gas costs for production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **ERC-3643 Standard** - Token for Compliant Securities
- **OpenZeppelin** - Secure smart contract libraries
- **Monad** - High-performance blockchain
- **shadcn/ui** - Beautiful UI components

Video-> https://drive.google.com/file/d/1y1DPAtTM--rRMRLeFwHHsjYHlYlWLv20/view?usp=sharing


**Built with ❤️ for compliant tokenization on Monad Testnet**
