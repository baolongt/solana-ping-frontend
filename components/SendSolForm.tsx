import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`;
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`;

export const SendSolForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState(
    "3caZyGZLLveCt1if6GUV2n3TTotfFQhAEVkn31rGSouC"
  );

  const onClick = async () => {
    let sendAmount = Number(amount);
    if (isNaN(sendAmount)) {
      alert("Amount must be a number");
      return;
    }
    if (!connection || !publicKey || !address || sendAmount <= 0) {
      return;
    }

    const transaction = new web3.Transaction();
    const destination = new web3.PublicKey(address);
    const lamports = web3.LAMPORTS_PER_SOL * sendAmount;

    const instruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: destination,
      lamports,
    });

    transaction.add(instruction);
    await sendTransaction(transaction, connection).then((sig) => {
      console.log(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    });
  };

  return (
    <div className={styles.buttonContainer}>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in SOL"
        style={{
          fontSize: "20px",
          height: "40px",
          width: "200px",
          marginBottom: "10px",
        }}
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Destination Address"
        style={{
          fontSize: "20px",
          height: "40px",
          width: "400px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={onClick}
        style={{ fontSize: "20px", padding: "10px 20px" }}
      >
        Send
      </button>
    </div>
  );
};
