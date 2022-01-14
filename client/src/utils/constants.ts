import { Keypair, PublicKey } from '@solana/web3.js'
import contract from 'contract/idl.json'

export const programID = new PublicKey(contract.metadata.address)
export const baseAccount = Keypair.generate()
