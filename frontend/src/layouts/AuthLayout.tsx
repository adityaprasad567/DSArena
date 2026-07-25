import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AuthLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 block text-center font-display text-lg font-medium">
          DS<span className="text-signal">Arena</span>
        </Link>
        <div className="rounded-xl border border-ink-raised bg-ink-raised/40 p-8">
          <h1 className="mb-6 font-display text-xl font-medium">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
