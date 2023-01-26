import { Inter } from "@next/font/google";
import { Web3Button, Web3Modal, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "@/components/CustomButton";
import ThemeControls from "@/components/ThemeControls";
import { ethereumClient, projectId } from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h2>Buttons</h2>
      <div className="container">
        {/* Use predefined button  */}
        <Web3Button icon="show" label="Connect Wallet" balance="show" />

        {/* Use custom button */}
        <CustomButton />

        <Web3NetworkSwitch />
      </div>

      {/* <ThemeControls /> */}

      {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </>
  );
}
