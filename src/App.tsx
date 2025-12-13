import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { Web3Modal } from '@web3modal/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { MonadTestnet } from './custom-chains/MonadTestnet'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { TooltipProvider } from './components/ui/tooltip'
import { Toaster } from './components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'

const queryClient = new QueryClient()

const chains = [MonadTestnet]

const projectId = 'ba4cc022b35796cfeb12b9d3a3f550c4'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
