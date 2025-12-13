import { useEffect, useState } from 'react'
import { useAccount, useBalance, useDisconnect, useConnect } from 'wagmi'
import { useToast } from './use-toast'
import { readContract } from '@wagmi/core'
import TrustedIssuersABI from '../../contracts-abi-files/TrustedIssuersABI.json'
import { ADMIN_ADDRESS, CONTRACT_ADDRESSES } from '../lib/config'

const Admin = ADMIN_ADDRESS as `0x${string}`
const TrustedIssuersRegistryAddress =
  CONTRACT_ADDRESSES.TRUST_ISSUER_REGISTRY_ADDRESS

export function useWalletConnection() {
  const { toast } = useToast()
  const [walletAddress, setWalletAddress] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTrustedIssuer, setIsTrustedIssuer] = useState(false)

  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()
  const { data: balance } = useBalance({ address })

  // Check if user is admin
  useEffect(() => {
    setIsAdmin(walletAddress === Admin)
  }, [walletAddress])

  // Check if user is a trusted issuer
  useEffect(() => {
    const checkIssuerStatus = async () => {
      if (!walletAddress) {
        setIsTrustedIssuer(false)
        return
      }

      try {
        const result = await readContract({
          address: TrustedIssuersRegistryAddress as `0x${string}`,
          abi: TrustedIssuersABI,
          functionName: 'isTrustedIssuer',
          args: [walletAddress],
        })
        setIsTrustedIssuer(result as boolean)
      } catch (error) {
        console.error('Error checking issuer status:', error)
        setIsTrustedIssuer(false)
      }
    }

    checkIssuerStatus()
  }, [walletAddress])

  // Handle wallet connection - sync address from wagmi
  useEffect(() => {
    if (isConnected && address) {
      const formattedAddress = address as string
      if (walletAddress !== formattedAddress) {
        setWalletAddress(formattedAddress)
        // Show toast only when address changes (new connection)
        if (!walletAddress) {
          toast({
            title: 'Wallet Connected',
            description: 'Successfully connected to wallet',
          })
        }
      }
    } else if (!isConnected) {
      if (walletAddress) {
        setWalletAddress('')
        setIsAdmin(false)
        setIsTrustedIssuer(false)
      }
    }
  }, [isConnected, address, walletAddress, toast])

  const connectWallet = async () => {
    try {
      if (isConnected) {
        await disconnect()
        // State will be cleared by the useEffect hooks
        toast({
          title: 'Wallet Disconnected',
          description: 'Successfully disconnected from wallet',
        })
      } else {
        // Connect using injected wallet (MetaMask, Coinbase Wallet, Rabby, etc.)
        const injectedConnector = connectors.find(
          (c) => c.id === 'injected' || c.type === 'injected'
        )
        if (injectedConnector) {
          connect({ connector: injectedConnector })
        } else {
          throw new Error('No injected wallet found. Please install MetaMask or another wallet extension.')
        }
      }
    } catch (error) {
      console.error('Error managing wallet connection:', error)
      toast({
        title: 'Operation Failed',
        description: isConnected
          ? 'Failed to disconnect wallet. Please try again.'
          : 'Failed to connect wallet. Please install MetaMask or another injected wallet extension.',
        variant: 'destructive',
      })
    }
  }

  // Return address from wagmi if available, otherwise use state
  const displayAddress = address || walletAddress

  return {
    walletAddress: displayAddress,
    isConnected,
    isAdmin,
    isTrustedIssuer,
    balance,
    connectWallet,
  }
}
