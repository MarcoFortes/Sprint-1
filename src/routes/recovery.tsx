import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/recovery")({
  component: RecoveryPage,
});

function genCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [restored, setRestored] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setError(null);
    setSentCode(genCode());
  };

  const verify = () => {
    if (inputCode === sentCode) {
      setRestored(true);
      setError(null);
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl p-8 border">
        <div className="text-center mb-6">
          <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-md font-bold mb-2">
            SDVBO Transcor
          </div>
          <h1 className="text-2xl font-bold text-secondary">Account Recovery</h1>
        </div>

        {!restored ? (
          <div className="space-y-5">
            <div>
              <label className="block text-base font-semibold text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={sentCode !== null}
                className="w-full h-14 px-4 text-lg border-2 rounded-lg focus:outline-none focus:border-primary disabled:bg-muted"
                placeholder="user@email.com"
              />
            </div>

            {sentCode === null ? (
              <button
                onClick={sendCode}
                className="w-full h-14 text-lg font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90"
              >
                Send Code
              </button>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary">
                  <div className="text-sm font-semibold text-secondary mb-1">
                    🔔 Notification_Service
                  </div>
                  <div className="text-base text-secondary">
                    Code sent to <strong>{email}</strong>. Your verification
                    code is:
                  </div>
                  <div className="mt-2 text-3xl font-mono font-bold text-primary tracking-widest text-center">
                    {sentCode}
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-secondary mb-2">
                    Enter the code
                  </label>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    maxLength={6}
                    className="w-full h-14 px-4 text-2xl tracking-widest text-center border-2 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  onClick={verify}
                  className="w-full h-14 text-lg font-bold rounded-lg bg-secondary text-secondary-foreground hover:opacity-90"
                >
                  Verify Code
                </button>
              </>
            )}

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
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="text-6xl">✅</div>
            <div className="text-xl font-bold text-primary p-4 bg-primary/10 rounded-lg border-2 border-primary">
              Balance successfully recovered!
            </div>
            <p className="text-secondary">
              Your account has been successfully restored.
            </p>
            <Link
              to="/login"
              className="inline-block w-full h-14 leading-[3.5rem] text-lg font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90"
            >
              Go to login
            </Link>
          </div>
        )}

        {!restored && (
          <div className="mt-6 text-center">
            <Link to="/login" className="text-secondary hover:underline">
              ← Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}