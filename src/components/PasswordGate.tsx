import { useState } from "react";

const PASSWORD = "relva2026";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("authed") === "1");
  const [input, setInput] = useState("");

  if (authed) return <>{children}</>;

  return (
    <div
      style={{ backgroundColor: "#1da348" }}
      className="min-h-screen flex items-center justify-center"
    >
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
        className="px-5 py-2.5 rounded text-lg outline-none"
        autoFocus
      />
    </div>
  );
}
