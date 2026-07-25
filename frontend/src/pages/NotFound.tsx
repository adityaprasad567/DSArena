import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="font-tape text-signal">404</p>
      <h1 className="font-display text-2xl font-medium">This trace doesn't exist</h1>
      <Link to="/" className="text-signal hover:underline">Back to the landing page</Link>
    </div>
  );
}
