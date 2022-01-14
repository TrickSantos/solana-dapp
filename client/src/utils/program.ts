import { Program, Provider, Idl } from '@project-serum/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import contract from 'contract/idl.json'
import { programID } from './constants'

export async function getProvider() {
  const wallet = useWallet()
  const network = 'http://127.0.0.1:8899'
  const connection = new Connection(network, 'processed')

  if (
    wallet.publicKey &&
    wallet.signTransaction &&
    wallet.signAllTransactions
  ) {
    const provider = new Provider(
      connection,
      {
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
        publicKey: wallet.publicKey,
      },
      {
        preflightCommitment: 'processed',
      }
    )
    return provider
  }
}

export async function getProgram() {
  const provider = await getProvider()
  return new Program(contract as Idl, programID, provider)
}
