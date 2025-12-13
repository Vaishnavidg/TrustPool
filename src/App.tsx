import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from 'wagmi/providers/public'
import { MonadTestnet } from './custom-chains/MonadTestnet'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import { TooltipProvider } from './components/ui/tooltip'
import { Toaster } from './components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { ErrorBoundary } from './components/ErrorBoundary'

const queryClient = new QueryClient()

const chains = [MonadTestnet]

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  publicProvider(),
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

const App = () => (
  <ErrorBoundary>
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
        </WagmiConfig>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
