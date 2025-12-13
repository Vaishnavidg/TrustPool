// ERC-3643 DApp Configuration

// Hardcoded admin address
export const ADMIN_ADDRESS = '0x35C6e706EE23CD898b2C15fEB20f0fE726E734D2'

// Contract addresses
export const CONTRACT_ADDRESSES = {
  CLAIM_TOPIC_REGISTRY_ADDRESS: '0x4B5f49efF0e0Fa117E321B88Cd8B035d3F019064',
  TRUST_ISSUER_REGISTRY_ADDRESS: '0x9d77BCCb09F5753EeAE5C869587Cdc6Ae7434CEE',
  IDENTITY_ADDRESS: '0x070C331cDa54c0cB38682F8800254f53D8456CeF',
  IDENTITY_REGISTRY_ADDRESS: '0xB8EaC58c9880aBD89DA91567E8243EEe82f623A8',
  COMPLIANCE_CONTRACT_ADDRESS: '0x6d3347ab86DFF20616f5E117FB510675868416B1',
  ERC3643_CONTRACT_ADDRESS: '0xfe8034f175b00a1d1506d5b7a1845a072ed2b972',
}

// Common claim topics for ERC-3643
export const CLAIM_TOPICS = {
  KYC: 1,
  AML: 2,
  PRODUCT_AUTHENTICITY: 100,
  COUNTRY_VERIFICATION: 101,
  ACCREDITED_INVESTOR: 102,
  PROFESSIONAL_INVESTOR: 103,
}

// Country codes for compliance
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'CH', name: 'Switzerland' },
]

// Educational messages for different actions
export const EDUCATIONAL_MESSAGES = {
  IDENTITY_REQUIRED:
    'You need a verified identity to interact with regulated tokens. This ensures compliance with KYC/AML requirements.',
  CLAIMS_REQUIRED:
    'Valid claims from trusted issuers are required to receive and transfer tokens. Claims verify your eligibility.',
  TRANSFER_BLOCKED:
    'Transfer blocked due to compliance rules. Both sender and receiver must have valid identities and claims.',
  ADMIN_ONLY:
    'This action is restricted to administrators who can manage the compliance framework.',
  COMPLIANCE_CHECK:
    'ERC-3643 automatically validates identity, claims, and compliance rules before allowing transfers.',
}

// Mock data for development/demo
export const MOCK_DATA = {
  claimTopics: [
    {
      id: 1,
      name: 'KYC Verification',
      description: 'Know Your Customer verification',
    },
    {
      id: 2,
      name: 'AML Check',
      description: 'Anti-Money Laundering verification',
    },
    {
      id: 100,
      name: 'Product Authenticity',
      description: 'Verifies product authenticity for DPP',
    },
  ],
  trustedIssuers: [
    {
      address: '0x1111111111111111111111111111111111111111',
      name: 'KYC Provider Inc',
      topics: [1, 2],
    },
  ],
}
