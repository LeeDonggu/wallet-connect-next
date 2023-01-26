import React, { useState } from "react";

export default function RNSendButton() {
  const [input, setInput] = useState("");

  const handleChange = ({ target: { value } }: any) => {
    setInput(value);
  };

  const handleSubmit = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(input));
    }
  };
  return (
    <div>
      <h1>Input Message</h1>
      <input value={input} onChange={handleChange} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
