import { useState } from "react";

const PASSWORD = "riosvoadores";

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
      <div className="relative z-10 flex">
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
          className="px-5 py-2.5 rounded-l text-lg outline-none"
          autoFocus
        />
        <button
          onClick={() => {
            if (input === PASSWORD) {
              sessionStorage.setItem("authed", "1");
              setAuthed(true);
            }
          }}
          className="px-4 py-2.5 bg-white text-black text-lg font-medium rounded-r hover:bg-gray-100 active:bg-gray-200"
        >
          enter
        </button>
      </div>
    </div>
  );
}
