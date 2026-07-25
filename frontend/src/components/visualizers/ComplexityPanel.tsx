export interface ComplexityData {
  best: string;
  average: string;
  worst: string;
  space: string;
  applications: string[];
  advantages: string[];
  disadvantages: string[];
}

export function ComplexityPanel({ data }: { data: ComplexityData }) {
  return (
    <div className="space-y-6 rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      <div>
        <h3 className="mb-3 font-display text-sm font-medium text-muted">Complexity</h3>
        <div className="grid grid-cols-2 gap-3 font-tape text-sm">
          <Stat label="best" value={data.best} />
          <Stat label="average" value={data.average} />
          <Stat label="worst" value={data.worst} />
          <Stat label="space" value={data.space} />
        </div>
      </div>
      <Section title="Applications" items={data.applications} />
      <Section title="Advantages" items={data.advantages} tone="jade" />
      <Section title="Disadvantages" items={data.disadvantages} tone="signal" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-ink-raised px-3 py-2">
      <div className="text-muted">{label}</div>
      <div className="text-paper">{value}</div>
    </div>
  );
}

function Section({ title, items, tone }: { title: string; items: string[]; tone?: "jade" | "signal" }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-sm font-medium text-muted">{title}</h3>
      <ul className="space-y-1.5 text-sm text-paper">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={tone === "jade" ? "text-jade" : tone === "signal" ? "text-signal" : "text-muted"}>·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
