import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function CustomButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  return (
    <button onClick={onOpen} disabled={loading}>
      {loading ? "Loading..." : address ? address : "CustomButton"}
    </button>
  );
}
