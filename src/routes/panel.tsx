import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/panel")({
  validateSearch: (s: Record<string, unknown>) => ({
    name: typeof s.name === "string" ? s.name : "Usuario",
  }),
  component: PanelPage,
});

function PanelPage() {
  const { name } = Route.useSearch();
  return (
    <div className="min-h-screen bg-muted p-4">
      <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-xl p-8 border mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-md font-bold">
            SDVBO Transcor
          </div>
          <Link to="/login" className="text-secondary font-semibold hover:underline">
            Cerrar sesión
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Panel de Control
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Bienvenido, <strong className="text-primary">{name}</strong>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-primary/10 rounded-xl border-2 border-primary">
            <div className="text-sm text-secondary font-semibold">Saldo</div>
            <div className="text-3xl font-bold text-primary">€ 25,40</div>
          </div>
          <div className="p-6 bg-secondary/10 rounded-xl border-2 border-secondary">
            <div className="text-sm text-secondary font-semibold">Viajes</div>
            <div className="text-3xl font-bold text-secondary">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}