import Login from "@/components/Login";

export default function Home() {
  console.log("userAgent = ", navigator.userAgent);
  return (
    <>
      <div className="container">
        <Login />
      </div>
    </>
  );
}
