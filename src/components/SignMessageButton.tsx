import * as React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

export function SignMessageButton() {
  const { isConnected } = useAccount();

  const recoveredAddress = React.useRef<string>();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  return (
    <form
      onSubmit={(event) => {
        if (!isConnected) {
          return alert("지갑 연결을 먼저 진행해주세요.");
        }
        event.preventDefault();
        const formData = new FormData(event.target as any);
        const message = formData.get("message") as string | Uint8Array;
        signMessage({ message });
      }}
    >
      <textarea id="message" name="message" placeholder="message" />
      <button disabled={isLoading}>
        {isLoading ? "Check Wallet" : "Sign Message"}
      </button>

      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
