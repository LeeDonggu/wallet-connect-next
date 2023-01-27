import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useChainId, useDisconnect, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

export default function Login() {
  // FIXME 서버에서 전달받은 타임스탬프로 변경해야합니다.
  const timeStamp: string | Uint8Array = "1674733509";
  const recoveredAddress = useRef<string>();

  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  useLayoutEffect(() => {
    if (!isConnected) return;
    disconnect();
  }, []);

  /**
   * WalletConnect 연동을 위한 Web3Modal을 연다.
   */
  async function onOpen() {
    try {
      setLoading(true);
      await open();
      setLoading(false);
    } catch (e) {
      alert(`지갑 연동에 실패했습니다.\n${e}`);
    }
  }

  /**
   * WalletConnect 연동이 완료되면 시그니처 인증을 진행한다.
   */
  useEffect(() => {
    if (!isConnected) return;
    signMessage({ message: timeStamp });
  }, [isConnected, signMessage]);

  /**
   * 시그니처 인증에 실패했다면 기존에 연결된 지갑의 연결을 제거한다.
   */
  useEffect(() => {
    if (!error) return;
    alert(`시그니처 인증에 실패했습니다.\n${error.message}`);
    disconnect();
  }, [disconnect, error]);

  /**
   * 시그니처 인증에 성공했다면 RN 프로젝트에 지갑 주소, 타임스탬프, 시그니처 인증 주소를 전달한다.
   */
  useEffect(() => {
    if (!data || !address) return;
    const isMobile = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    if (isMobile && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify(data, address as any, timeStamp)
      );
    }
  }, [data, address, timeStamp]);

  function submitUserAgentToRN() {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify(`userAgent =  ${navigator.userAgent}`)
      );
    }
  }

  console.log("data = ", data);
  console.log("connector = ", connector?.chains);
  console.log("connector = ", connector?.getChainId());

  return (
    <div>
      <button onClick={!loading ? onOpen : () => {}} disabled={loading}>
        {loading ? "Loading..." : "로그인 프로세스 시작"}
      </button>
      <button onClick={isConnected ? () => disconnect() : () => {}}>
        {isConnected ? "연결 끊기" : "연결이 되어있지 않습니다."}
      </button>
      <button onClick={submitUserAgentToRN}>
        {"유저 에이전트 확인하기"}
      </button>
      <p>연결 여부 : {String(isConnected)}</p>
      <p>지갑 주소 : {address}</p>
      <p>체인 정보 : {chainId}</p>
    </div>
  );
}
