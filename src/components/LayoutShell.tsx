import type { ReactNode } from 'react';

export type UserRole = 'cso' | 'supervisor';

interface LayoutShellProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  children: ReactNode;
}

export function LayoutShell({ role, onRoleChange, children }: LayoutShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400">
              Open ownership portal
            </span>
            <span className="text-sm text-slate-300">Day‑to‑day work overview</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Viewing as</span>
            <div className="inline-flex rounded-full border border-slate-700 bg-slate-900 p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => onRoleChange('cso')}
                className={`rounded-full px-3 py-1 font-medium transition ${
                  role === 'cso'
                    ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Customer Service Officer
              </button>
              <button
                type="button"
                onClick={() => onRoleChange('supervisor')}
                className={`rounded-full px-3 py-1 font-medium transition ${
                  role === 'supervisor'
                    ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/40'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Supervisor
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-1 flex-col gap-6 px-4 py-6 md:flex-row">
        <aside className="w-full shrink-0 space-y-4 md:w-60">
          <nav className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-sm">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Navigation
            </div>
            <button className="flex w-full items-center justify-between rounded-xl bg-slate-800/80 px-3 py-2 text-left text-slate-50">
              <span>Dashboard</span>
              <span className="rounded-full bg-primary-500/15 px-2 py-0.5 text-[10px] text-primary-300">
                Default
              </span>
            </button>
            <button className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-slate-300 hover:bg-slate-800/60">
              <span>Applications</span>
            </button>
            <button className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-slate-300 hover:bg-slate-800/60">
              <span>Payments</span>
            </button>
            <button className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-slate-300 hover:bg-slate-800/60">
              <span>Documents</span>
            </button>
          </nav>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-400">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              What you see here
            </div>
            {role === 'cso' ? (
              <p>
                A trimmed view showing <span className="text-slate-200">only cases assigned to you</span>,
                plus any payments you still need to follow up on.
              </p>
            ) : (
              <p>
                A wider view across <span className="text-slate-200">your team</span> so you can spot
                ageing cases, uneven queues, and missing payments.
              </p>
            )}
          </div>
        </aside>

        <main className="flex-1 space-y-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
