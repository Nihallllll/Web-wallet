import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Wallet } from 'lucide-react';
import Airdrop from './Airdrop';
import ShowBal from './ShowBal';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Wallet className="w-12 h-12 text-white mr-4" />
          <h1 className="text-4xl font-bold text-white">Solana Wallet</h1>
        </div>
        
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]}>
            <WalletModalProvider>
              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                <div className="flex justify-center mb-8">
                  <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition-colors" />
                </div>
                <div className="space-y-8">
                  <Airdrop />
                  <ShowBal />
                </div>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  );
}

export default App;