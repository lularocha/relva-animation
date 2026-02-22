import { useState } from "react";
import { HatGlasses } from "lucide-react";

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
      <div className="relative z-10 flex flex-col items-center -translate-y-[100px] sm:-translate-y-[50px]">
        <HatGlasses size={32} className="text-white mb-8" />
        <div className="flex">
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
          placeholder="password"
          style={{ borderRadius: "0.25rem 0 0 0.25rem" }}
          className="px-5 py-2.5 text-lg outline-none"
          autoFocus
        />
        <button
          onClick={() => {
            if (input === PASSWORD) {
              sessionStorage.setItem("authed", "1");
              setAuthed(true);
            }
          }}
          style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
          className="px-4 py-2.5 bg-gray-200 text-black text-lg font-normal hover:bg-[#4fa33c] hover:text-white active:bg-[#4fa33c] active:text-white"
        >
          enter
        </button>
        </div>
      </div>
    </div>
  );
}
