import type { UserRole } from './LayoutShell';

export interface Application {
  id: string;
  applicant: string;
  service: string;
  status: 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Payment Pending';
  owner: string;
  submittedAt: string;
  amount?: number;
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'APP-2412-001',
    applicant: 'Greenfield Holdings Ltd',
    service: 'New Registration',
    status: 'In Review',
    owner: 'You',
    submittedAt: '2025-12-06',
    amount: 2500,
  },
  {
    id: 'APP-2412-002',
    applicant: 'Silverline Mining Co.',
    service: 'Change of Ownership',
    status: 'Payment Pending',
    owner: 'You',
    submittedAt: '2025-12-05',
    amount: 4100,
  },
  {
    id: 'APP-2412-014',
    applicant: 'Lakeview Energy Ltd',
    service: 'New Registration',
    status: 'Submitted',
    owner: 'Officer M. Nawa',
    submittedAt: '2025-12-05',
    amount: 1800,
  },
  {
    id: 'APP-2412-019',
    applicant: 'Kafue Textiles',
    service: 'Annual Return',
    status: 'Approved',
    owner: 'Officer T. Banda',
    submittedAt: '2025-12-04',
    amount: 950,
  },
];

interface DashboardWidgetsProps {
  role: UserRole;
}

export function DashboardWidgets({ role }: DashboardWidgetsProps) {
  const isSupervisor = role === 'supervisor';

  const ownApplications = MOCK_APPLICATIONS.filter((a) => a.owner === 'You');
  const visibleApplications = isSupervisor ? MOCK_APPLICATIONS : ownApplications;
  const pendingPayments = visibleApplications.filter((a) => a.status === 'Payment Pending');

  const totalVisible = visibleApplications.length;
  const inReview = visibleApplications.filter((a) => a.status === 'In Review').length;
  const submitted = visibleApplications.filter((a) => a.status === 'Submitted').length;
  const approved = visibleApplications.filter((a) => a.status === 'Approved').length;

  return (
    <div className="space-y-6">
      {/* Top row: greeting + stats */}
      <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold text-slate-50">
                {isSupervisor ? 'What your team is working on' : 'What is on your desk today'}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {isSupervisor
                  ? 'Quick view of open submissions, approvals and payments across officers.'
                  : 'A short summary of your current cases and anything waiting on you.'}
              </p>
            </div>
            <div className="hidden flex-col items-end text-right text-xs text-slate-400 sm:flex">
              <span>{new Date().toLocaleDateString()}</span>
              <span className="text-slate-500">Last sync: a few seconds ago</span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <StatPill label="In progress" value={inReview + submitted} tone="primary" />
            <StatPill label="Awaiting payment" value={pendingPayments.length} tone="amber" />
            <StatPill label="Approved this week" value={approved} tone="emerald" />
            {isSupervisor ? (
              <StatPill label="Total across team" value={totalVisible} tone="slate" />
            ) : (
              <StatPill label="Assigned to you" value={ownApplications.length} tone="slate" />
            )}
          </div>
        </div>

        {/* Action shortcuts */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Quick actions
            </h2>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
              {isSupervisor ? 'Supervisor' : 'Officer'} view
            </span>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <ShortcutCard
              title={isSupervisor ? 'Check escalated cases' : 'Continue draft application'}
              description={
                isSupervisor
                  ? 'Items your team has flagged for a second look in the last day.'
                  : 'Pick up where you left off on a client application from earlier.'
              }
              primary
            />
            <ShortcutCard
              title={isSupervisor ? 'Balance queues' : 'Record payment confirmation'}
              description={
                isSupervisor
                  ? 'Move a few files between officers when one queue is overloaded.'
                  : 'Confirm a payment and remove it from the “awaiting” list.'
              }
            />
            {isSupervisor && (
              <ShortcutCard
                title="Team snapshot"
                description="See ageing, throughput and where things are getting stuck."
              />
            )}
          </div>
        </section>
      </section>

      {/* Search + filters */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Search applications
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Filter by status, service type and owner. Results update instantly.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
            <div className="flex-1">
              <input
                type="search"
                placeholder="Search by application ID or applicant name"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none ring-primary-500/40 placeholder:text-slate-500 focus:border-primary-400 focus:ring-2"
              />
            </div>
            <div className="flex gap-2 text-xs">
              <select className="rounded-xl border border-slate-700/80 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/40">
                <option>Status: All</option>
                <option>In Review</option>
                <option>Submitted</option>
                <option>Approved</option>
                <option>Payment Pending</option>
              </select>
              <select className="hidden rounded-xl border border-slate-700/80 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/40 md:block">
                <option>Service: All</option>
                <option>New Registration</option>
                <option>Change of Ownership</option>
                <option>Annual Return</option>
              </select>
              {isSupervisor && (
                <select className="rounded-xl border border-slate-700/80 bg-slate-950 px-2.5 py-2 text-slate-100 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/40">
                  <option>Owner: Anyone</option>
                  <option>You</option>
                  <option>Officer M. Nawa</option>
                  <option>Officer T. Banda</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main grid: recent applications + pending payments + summary */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.1fr)]">
        <RecentApplicationsTable applications={visibleApplications} role={role} />
        <div className="space-y-4">
          <PendingPaymentsList applications={pendingPayments} />
          <SummaryAnalytics isSupervisor={isSupervisor} />
        </div>
      </section>
    </div>
  );
}

interface StatPillProps {
  label: string;
  value: number;
  tone: 'primary' | 'amber' | 'emerald' | 'slate';
}

function StatPill({ label, value, tone }: StatPillProps) {
  const toneClass: Record<StatPillProps['tone'], string> = {
    primary: 'bg-primary-500/15 text-primary-200 border-primary-500/30',
    amber: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
    slate: 'bg-slate-800/80 text-slate-200 border-slate-600/50',
  };

  return (
    <div className={`rounded-xl border px-3 py-2 text-xs ${toneClass[tone]}`}>
      <div className="text-[11px] uppercase tracking-[0.16em]">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

interface ShortcutCardProps {
  title: string;
  description: string;
  primary?: boolean;
}

function ShortcutCard({ title, description, primary }: ShortcutCardProps) {
  return (
    <button
      type="button"
      className={`flex h-full flex-col rounded-2xl border px-3 py-3 text-left text-xs transition hover:-translate-y-0.5 hover:border-primary-500/60 hover:bg-slate-800/70 ${
        primary ? 'border-primary-500/50 bg-primary-500/10' : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      <div className="text-[11px] font-semibold text-slate-100">{title}</div>
      <p className="mt-1 text-[11px] text-slate-300">{description}</p>
      <span className="mt-2 text-[10px] font-medium text-primary-300">Open</span>
    </button>
  );
}

interface RecentApplicationsTableProps {
  applications: Application[];
  role: UserRole;
}

function RecentApplicationsTable({ applications, role }: RecentApplicationsTableProps) {
  const isSupervisor = role === 'supervisor';

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Recent applications
        </h2>
        <button className="rounded-full border border-slate-700 px-3 py-1 text-[10px] text-slate-200 hover:border-primary-400 hover:text-primary-200">
          View all
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-1">
          <thead className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-2 py-1 text-left">ID</th>
              <th className="px-2 py-1 text-left">Applicant</th>
              <th className="px-2 py-1 text-left">Service</th>
              <th className="px-2 py-1 text-left">Status</th>
              {isSupervisor && <th className="px-2 py-1 text-left">Owner</th>}
              <th className="px-2 py-1 text-right">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="align-middle text-[11px] text-slate-200">
                <td className="rounded-l-xl bg-slate-900/90 px-2 py-2 font-mono text-[11px] text-primary-200">
                  {app.id}
                </td>
                <td className="bg-slate-900/90 px-2 py-2">{app.applicant}</td>
                <td className="bg-slate-900/90 px-2 py-2 text-slate-300">{app.service}</td>
                <td className="bg-slate-900/90 px-2 py-2">
                  <StatusPill status={app.status} />
                </td>
                {isSupervisor && (
                  <td className="bg-slate-900/90 px-2 py-2 text-slate-300">{app.owner}</td>
                )}
                <td className="rounded-r-xl bg-slate-900/90 px-2 py-2 text-right text-slate-400">
                  {app.submittedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Application['status'] }) {
  const map: Record<Application['status'], string> = {
    Draft: 'bg-slate-800 text-slate-200 border-slate-600',
    Submitted: 'bg-sky-500/15 text-sky-200 border-sky-500/40',
    'In Review': 'bg-amber-500/15 text-amber-200 border-amber-500/40',
    Approved: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
    'Payment Pending': 'bg-rose-500/15 text-rose-200 border-rose-500/40',
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] ${map[status]}`}>
      {status}
    </span>
  );
}

interface PendingPaymentsListProps {
  applications: Application[];
}

function PendingPaymentsList({ applications }: PendingPaymentsListProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Pending payments
        </h2>
        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-200">
          {applications.length} pending
        </span>
      </div>

      {applications.length === 0 ? (
        <p className="mt-3 text-[11px] text-slate-400">No pending payments at the moment.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {applications.map((app) => (
            <li
              key={app.id}
              className="flex items-start justify-between gap-2 rounded-xl bg-slate-900 px-3 py-2"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="font-mono text-primary-200">{app.id}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-200">{app.applicant}</span>
                </div>
                <div className="mt-0.5 text-[10px] text-slate-400">
                  {app.service} • Submitted {app.submittedAt}
                </div>
              </div>
              {typeof app.amount === 'number' && (
                <div className="text-right text-[11px] text-amber-200">
                  <div>ZMW {app.amount.toLocaleString()}</div>
                  <div className="text-[10px] text-amber-300">Awaiting confirmation</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SummaryAnalytics({ isSupervisor }: { isSupervisor: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {isSupervisor ? 'Team analytics' : 'Your analytics'}
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <MiniMetric label="Avg. age in queue" value="2.3 days" trend="-0.4" />
        <MiniMetric label="On-time decisions" value="94%" trend="+3" />
        <MiniMetric label="Payment completion" value={isSupervisor ? '88%' : '92%'} trend="+1" />
      </div>
      <div className="mt-4 h-16 rounded-xl bg-gradient-to-r from-primary-500/20 via-emerald-500/15 to-sky-500/10">
        <div className="flex h-full items-end gap-1 px-2 pb-1">
          {[40, 55, 35, 60, 48, 72, 64].map((h, idx) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-t-full bg-primary-500/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MiniMetricProps {
  label: string;
  value: string;
  trend: string; // "+3" or "-0.4"
}

function MiniMetric({ label, value, trend }: MiniMetricProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="rounded-xl bg-slate-900 px-3 py-2">
      <div className="text-[10px] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-50">{value}</div>
      <div
        className={`mt-0.5 text-[10px] ${
          isPositive ? 'text-emerald-300' : 'text-amber-300'
        }`}
      >
        {isPositive ? '▲' : '▼'} {trend}% vs last week
      </div>
    </div>
  );
}
