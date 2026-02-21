import { useState } from "react";

const PASSWORD = "relva2026";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("authed") === "1");
  const [input, setInput] = useState("");

  if (authed) return <>{children}</>;

  return (
    <div
      style={{
        backgroundImage: "url('/images/hero3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="absolute inset-0 bg-black/50" />
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input === PASSWORD) {
            sessionStorage.setItem("authed", "1");
            setAuthed(true);
          }
        }}
        placeholder="Password"
        className="relative z-10 px-5 py-2.5 rounded text-lg outline-none"
        autoFocus
      />
    </div>
  );
}
