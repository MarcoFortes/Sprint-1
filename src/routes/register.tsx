import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { addUser, type Profile } from "@/lib/auth-store";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

const PROFILE_DESC: Record<Profile, string> = {
  Regular: "Tarifa estándar para usuarios generales.",
  Estudiante: "Descuento del 50% con verificación académica.",
  Senior: "Descuento del 30% para mayores de 65 años.",
};

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    idDoc: "",
    nif: "",
    email: "",
    password: "",
  });
  const [profile, setProfile] = useState<Profile>("Regular");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    for (const [k, v] of Object.entries(form)) {
      if (!v.trim()) {
        setError(`El campo "${k}" es obligatorio.`);
        return;
      }
    }
    const res = addUser({ ...form, profile });
    if (!res.ok) {
      setError(res.error!);
      return;
    }
    setSuccess("¡Registro exitoso! Redirigiendo al inicio de sesión...");
    setTimeout(() => navigate({ to: "/login" }), 1500);
  };

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-md mx-auto bg-card rounded-2xl shadow-xl p-8 border">
        <div className="text-center mb-6">
          <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-md font-bold mb-2">
            SDVBO Transcor
          </div>
          <h1 className="text-2xl font-bold text-secondary">Crear Cuenta</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { k: "name", l: "Nombre completo *", t: "text" },
            { k: "phone", l: "Teléfono *", t: "tel" },
            { k: "idDoc", l: "Documento de Identidad *", t: "text" },
            { k: "nif", l: "NIF (único) *", t: "text" },
            { k: "email", l: "Correo electrónico (único) *", t: "email" },
            { k: "password", l: "Contraseña *", t: "password" },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-sm font-semibold text-secondary mb-1">
                {f.l}
              </label>
              <input
                type={f.t}
                value={form[f.k as keyof typeof form]}
                onChange={(e) => update(f.k as keyof typeof form, e.target.value)}
                required
                className="w-full h-12 px-3 text-base border-2 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-secondary mb-2">
              Tipo de perfil
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Regular", "Estudiante", "Senior"] as Profile[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProfile(p)}
                  className={`h-12 rounded-lg font-semibold border-2 transition-colors ${
                    profile === p
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-secondary border-border hover:border-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-3 p-3 bg-muted rounded-lg border-l-4 border-primary text-sm text-secondary">
              <strong>Perfil seleccionado: {profile}.</strong>{" "}
              {PROFILE_DESC[profile]}
            </div>
          </div>

          {error && (
            <div
              className="text-base font-semibold p-3 rounded-lg border-2"
              style={{
                color: "#DE350B",
                borderColor: "#DE350B",
                backgroundColor: "rgba(222,53,11,0.08)",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div className="text-base font-semibold p-3 rounded-lg bg-primary/10 text-primary border-2 border-primary">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full h-14 text-lg font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors"
          >
            Registrarme
          </button>

          <div className="text-center text-base">
            <Link to="/login" className="text-secondary hover:underline">
              ← Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}