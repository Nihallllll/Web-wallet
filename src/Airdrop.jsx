import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { CoinsIcon } from 'lucide-react';
import { useState } from 'react';

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendAirdrop() {
    if (!amount || !wallet.publicKey) return;
    
    try {
      setLoading(true);
      await connection.requestAirdrop(wallet.publicKey, Number(amount) * 1000000000);
      setAmount('');
      alert('Airdrop successful!');
    } catch (error) {
      console.error('Airdrop failed:', error);
      alert('Airdrop failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <CoinsIcon className="w-6 h-6 text-purple-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Request Airdrop</h2>
      </div>
      <div className="flex gap-4">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount in SOL"
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendAirdrop}
          disabled={!wallet.publicKey || loading}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? 'Sending...' : 'Request'}
        </button>
      </div>
    </div>
  );
}