import React, { FC } from 'react'
import { getPhantomWallet } from '@solana/wallet-adapter-wallets'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'

const Connection: FC = ({ children }) => {
  const wallets = [getPhantomWallet()]

  return (
    <ConnectionProvider endpoint='http://127.0.0.1:8899'>
      <WalletProvider wallets={wallets}>{children}</WalletProvider>
    </ConnectionProvider>
  )
}

export default Connection
