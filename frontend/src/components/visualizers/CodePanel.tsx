import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodePanel({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-raised">
      <div className="border-b border-ink-raised bg-ink-raised/40 px-4 py-2 font-tape text-xs text-muted">
        C++ implementation
      </div>
      <SyntaxHighlighter
        language="cpp"
        style={oneDark}
        customStyle={{ margin: 0, background: "transparent", fontSize: "13px", padding: "20px" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
