import CustomButton from "@/components/CustomButton";
import RNSendButton from "@/components/RNSendButton";
import { SignMessageButton } from "@/components/SignMessageButton";

export default function Home() {
  return (
    <>
      <div className="container">
        <CustomButton />

        <SignMessageButton />

        <RNSendButton />
      </div>
    </>
  );
}
