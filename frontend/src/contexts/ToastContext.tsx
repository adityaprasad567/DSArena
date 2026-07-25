import { createContext, useCallback, useState, type ReactNode } from "react";

interface Toast { id: number; message: string; tone: "default" | "success" }
interface ToastContextValue {
  showToast: (message: string, tone?: Toast["tone"]) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, tone: Toast["tone"] = "default") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-lg border px-4 py-2.5 font-tape text-sm shadow-lg ${
              toast.tone === "success" ? "border-jade/40 bg-jade/10 text-jade" : "border-ink-raised bg-ink-raised text-paper"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
