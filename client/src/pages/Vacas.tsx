import React, { useState } from 'react'
import { Idl, Program, Provider } from '@project-serum/anchor'
import { Connection, SystemProgram } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { baseAccount, programID } from 'utils/constants'
import contract from 'contract/idl.json'

export const Vacas = () => {
  const [value, setValue] = useState<null | string>(null)
  const [dataList, setDataList] = useState<String[]>([] as String[])
  const [input, setInput] = useState('')
  const wallet = useWallet()

  const getProvider = async () => {
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

  const init = async () => {
    try {
      const provider = await getProvider()
      const program = new Program(contract as Idl, programID, provider)
      if (provider) {
        await program.rpc.initialize('Hello', {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        })
        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        )
        console.log('account: ', account)
        setValue(account.data.toString())
        setDataList(account.dataList)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const update = async () => {
    try {
      const provider = await getProvider()
      const program = new Program(contract as Idl, programID, provider)
      if (provider) {
        await program.rpc.update(input, {
          accounts: {
            baseAccount: baseAccount.publicKey,
          },
        })
        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        )
        console.log('account: ', account)
        setValue(account.data.toString())
        setDataList(account.dataList)
        setInput('')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div>
      <div>
        {!value && <button onClick={init}>Aprove</button>}

        {value ? (
          <div>
            <h2>Current value: {value}</h2>
            <input
              placeholder='Add new data'
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button onClick={update}>Add data</button>
          </div>
        ) : (
          <h3>Please Inialize.</h3>
        )}
        {dataList.map((d, i) => (
          <h4 key={i}>{d}</h4>
        ))}
      </div>
    </div>
  )
}
