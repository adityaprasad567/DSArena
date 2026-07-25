import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch {
      setError("Couldn't create that account — check the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Create your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-tape text-xs text-muted">username</label>
          <input required minLength={3} value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border border-ink-raised bg-ink px-3 py-2 outline-none focus:border-signal" />
        </div>
        <div>
          <label className="mb-1 block font-tape text-xs text-muted">email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-ink-raised bg-ink px-3 py-2 outline-none focus:border-signal" />
        </div>
        <div>
          <label className="mb-1 block font-tape text-xs text-muted">password</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-ink-raised bg-ink px-3 py-2 outline-none focus:border-signal" />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={isSubmitting}
          className="w-full rounded bg-signal py-2 font-medium text-ink hover:bg-signal/90 disabled:opacity-60">
          {isSubmitting ? "creating account…" : "Sign up"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="text-signal hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}
