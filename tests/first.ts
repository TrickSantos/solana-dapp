import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { First } from "../target/types/first";
import assert from "assert";
const { SystemProgram } = anchor.web3;

describe("first", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.First as Program<First>;
  let _baseAccount: anchor.web3.Keypair = anchor.web3.Keypair.generate();

  it("Create a counter", async () => {
    // Add your test here.
    const baseAcc = anchor.web3.Keypair.generate();
    await program.rpc.create({
      accounts: {
        baseAccount: baseAcc.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAcc],
    });

    const acc = await program.account.baseAccount.fetch(baseAcc.publicKey);
    console.log("Count 0:", acc.count.toString());
    assert.ok(acc.count.toString() === "0");
    _baseAccount = baseAcc;
  });

  it("Increment the couner", async () => {
    const baseAcc = _baseAccount;
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAcc.publicKey,
      },
    });
    const acc = await program.account.baseAccount.fetch(baseAcc.publicKey);
    console.log("Count 1: ", acc.count.toString());
    assert.ok(acc.count.toString() === "1");
  });
});
