import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-ink-raised bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-medium tracking-tight">
          DS<span className="text-signal">Arena</span>
        </Link>
        <nav className="flex items-center gap-6 font-tape text-sm text-muted">
          <Link to="/sorting" className="hover:text-paper">sorting</Link>
          <Link to="/searching" className="hover:text-paper">searching</Link>
          <Link to="/structures" className="hover:text-paper">structures</Link>
          <Link to="/graph" className="hover:text-paper">graph</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-paper">dashboard</Link>
              <button onClick={logout} className="rounded border border-ink-raised px-3 py-1.5 text-paper hover:border-signal">
                log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-paper">log in</Link>
              <Link to="/register" className="rounded bg-signal px-3 py-1.5 text-ink hover:bg-signal/90">
                sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
