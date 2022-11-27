// npm init -y  //-y default yes for all
// npm install --save @solana/web3.js

const {
  Connection,
  LAMPORTS_PER_SOL, //these 4 are libraries,to create public and pvt key and many more funcs
  clusterApiUrl,
  Keypair,
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); //to submit blockchain url blah blah..bascially connect with rsc server

(async () => {
  const keypair = Keypair.generate();

  const airdropSignature = await connection.requestAirdrop(
    //request tokens from network...request airdrop
    keypair.publicKey,
    LAMPORTS_PER_SOL * 2 //smallest unit ,1 billion lamports=1 sol
  );

  const latestBlockHash = await connection.getLatestBlockhash(); //line 21 to26 ..gets latest blockhash,,nxt block send transction request.

  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn,
  });
})();
