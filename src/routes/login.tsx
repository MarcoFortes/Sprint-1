import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { findUser } from "@/lib/auth-store";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const blocked = attempts >= 3;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (blocked) return;
    const user = findUser(email.trim(), password);
    if (user) {
      setError(null);
      setAttempts(0);
      navigate({ to: "/panel", search: { name: user.name } });
    } else {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 3) {
        setError("Access blocked after 3 failed attempts.");
      } else {
        setError(`Invalid credentials. Attempts: ${next}/3`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl p-8 border">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-2xl mb-2">
            SDVBO Transcor
          </div>
          <h1 className="text-2xl font-bold text-secondary mt-4">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-base font-semibold text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={blocked}
              className="w-full h-14 px-4 text-lg border-2 rounded-lg focus:outline-none focus:border-primary disabled:bg-muted"
              placeholder="user@email.com"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={blocked}
              className="w-full h-14 px-4 text-lg border-2 rounded-lg focus:outline-none focus:border-primary disabled:bg-muted"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              className="text-base font-semibold p-3 rounded-lg border-2"
              style={{
                color: "#ee2424",
                borderColor: "#ee2424",
                backgroundColor: "rgba(238,36,36,0.08)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={blocked}
            className={`w-full h-14 text-lg font-bold rounded-lg transition-colors ${
              blocked
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {blocked ? "Blocked" : "Login"}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-center text-base">
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create new account
          </Link>
          <Link to="/recovery" className="text-secondary hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}