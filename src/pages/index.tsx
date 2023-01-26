import CustomButton from "@/components/CustomButton";
import { SignMessageButton } from "@/components/SignMessageButton";

export default function Home() {
  return (
    <>
      <div className="container">
        <CustomButton />

        <SignMessageButton />
      </div>
    </>
  );
}
