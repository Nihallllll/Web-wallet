import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletIcon } from 'lucide-react';
import { useState } from 'react';

function ShowBal() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getBalance() {
    if (!wallet.publicKey) return;
    
    try {
      setLoading(true);
      const balanceAmount = await connection.getBalance(wallet.publicKey);
      setBalance(balanceAmount / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      alert('Failed to fetch balance. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <WalletIcon className="w-6 h-6 text-purple-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Wallet Balance</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20">
          <p className="text-white/70 text-sm mb-1">Current Balance</p>
          <p className="text-2xl font-bold text-white">
            {balance === null ? '--' : `${balance.toFixed(4)} SOL`}
          </p>
        </div>
        <button
          onClick={getBalance}
          disabled={!wallet.publicKey || loading}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}

export default ShowBal;