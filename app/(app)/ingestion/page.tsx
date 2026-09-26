import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

interface DocRow {
  id: string
  filename: string
  file_type: string | null
  file_size: number | null
  status: string
  questions_generated: number
  error_message: string | null
  created_at: string
}

interface StatusCounts {
  completed: number
  processing: number
  failed: number
  pending: number
  total: number
}

async function getIngestionData() {
  const supabase = await createClient()

  // All source_documents — we only need status aggregates + recent rows
  const { data: docs } = await supabase
    .from('source_documents')
    .select(
      'id, filename, file_type, file_size, status, questions_generated, error_message, created_at'
    )
    .order('created_at', { ascending: false })

  const allDocs: DocRow[] = docs ?? []

  const counts: StatusCounts = allDocs.reduce(
    (acc, d) => {
      acc.total++
      const s = d.status as keyof Omit<StatusCounts, 'total'>
      if (s in acc) acc[s]++
      return acc
    },
    { completed: 0, processing: 0, failed: 0, pending: 0, total: 0 }
  )

  const totalQuestions = allDocs.reduce(
    (sum, d) => sum + (d.questions_generated ?? 0),
    0
  )

  const recent = allDocs.slice(0, 20)

  return { counts, totalQuestions, recent }
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function shortenFilename(filename: string): string {
  const parts = filename.split(/[/\\]/)
  return parts[parts.length - 1] ?? filename
}

export default async function IngestionPage() {
  const { counts, totalQuestions, recent } = await getIngestionData()

  const pct =
    counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0

  return (
    <div
      className="min-h-screen px-6 py-8 md:px-10 md:py-10"
      style={{ color: '#c8d0e8' }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold tracking-wide mb-1"
          style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
        >
          Ingestion Status
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
          DDC Library → Supabase pipeline tracker
        </p>
      </div>

      {/* Stats grid */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--gold-subtle)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Registered" value={counts.total.toLocaleString()} />
          <StatCard
            label="Completed"
            value={counts.completed.toLocaleString()}
            accent="#4ade80"
          />
          <StatCard
            label="Processing"
            value={counts.processing.toLocaleString()}
            accent="#facc15"
          />
          <StatCard
            label="Failed"
            value={counts.failed.toLocaleString()}
            accent="#f87171"
          />
        </div>

        {/* Questions total */}
        <div
          className="flex items-center justify-between py-4 border-t border-b mb-5"
          style={{ borderColor: 'var(--gold-subtle)' }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            Questions generated
          </span>
          <span
            className="text-2xl font-bold tabular-nums"
            style={{ color: 'var(--gold)' }}
          >
            {totalQuestions.toLocaleString()}
          </span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-dim)' }}>
            <span>
              {counts.completed.toLocaleString()} of {counts.total.toLocaleString()} files completed
            </span>
            <span className="font-semibold" style={{ color: 'var(--gold)' }}>
              {pct}%
            </span>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: '8px', background: 'var(--border)' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--gold) 0%, #f0d060 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatusBadge
          status="completed"
          count={counts.completed}
          total={counts.total}
          color="#4ade80"
          description="Processed and questions generated"
        />
        <StatusBadge
          status="pending / processing"
          count={counts.pending + counts.processing}
          total={counts.total}
          color="#facc15"
          description="Queued or currently running"
        />
        <StatusBadge
          status="failed"
          count={counts.failed}
          total={counts.total}
          color="#f87171"
          description="Scanned PDFs or extraction errors"
        />
      </div>

      {/* Recent documents table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--gold-subtle)',
        }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--gold-subtle)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
            Recently processed (last 20 files)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: '#0a1022', color: 'var(--text-dim)' }}>
                <th className="text-left px-4 py-3 font-medium">Filename</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Size</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Questions</th>
                <th className="text-right px-4 py-3 font-medium hidden md:table-cell">Registered</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((doc, i) => (
                <tr
                  key={doc.id}
                  style={{
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                    borderTop: '1px solid var(--gold-subtle)',
                  }}
                >
                  <td className="px-4 py-3 max-w-xs">
                    <span
                      className="block truncate font-mono"
                      style={{ color: '#c8d0e8' }}
                      title={doc.filename}
                    >
                      {shortenFilename(doc.filename)}
                    </span>
                    {doc.error_message && (
                      <span
                        className="block text-xs mt-0.5 truncate"
                        style={{ color: '#f87171' }}
                        title={doc.error_message}
                      >
                        {doc.error_message}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell" style={{ color: 'var(--text-dim)' }}>
                    {doc.file_type ?? '—'}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell" style={{ color: 'var(--text-dim)' }}>
                    {formatBytes(doc.file_size)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={doc.status} />
                  </td>
                  <td
                    className="px-4 py-3 text-right tabular-nums font-medium"
                    style={{ color: doc.questions_generated > 0 ? 'var(--gold)' : 'var(--text-dim)' }}
                  >
                    {doc.questions_generated.toLocaleString()}
                  </td>
                  <td
                    className="px-4 py-3 text-right hidden md:table-cell"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {formatDate(doc.created_at)}
                  </td>
                </tr>
              ))}

              {recent.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    No documents registered yet. Run the ingestion pipeline to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to run hint */}
      <div
        className="mt-6 rounded-xl px-5 py-4 text-xs"
        style={{
          background: 'var(--gold-subtle)',
          border: '1px solid var(--gold-subtle)',
          color: '#6b7a9e',
        }}
      >
        <span style={{ color: 'var(--gold)' }} className="font-semibold">
          To run the pipeline:
        </span>{' '}
        open a terminal in{' '}
        <code className="font-mono" style={{ color: 'var(--text-muted)' }}>
          ph-law-bar-review/ingestion/
        </code>{' '}
        and run{' '}
        <code className="font-mono" style={{ color: 'var(--text-muted)' }}>
          uv run python ingest.py
        </code>
        . The page refreshes automatically on each visit to show the latest status.
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────

function StatCard({
  label,
  value,
  accent = 'var(--gold)',
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--gold-subtle)' }}
    >
      <div className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>
        {label}
      </div>
      <div className="text-xl font-bold tabular-nums" style={{ color: accent }}>
        {value}
      </div>
    </div>
  )
}

function StatusBadge({
  status,
  count,
  total,
  color,
  description,
}: {
  status: string
  count: number
  total: number
  color: string
  description: string
}) {
  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
  return (
    <div
      className="rounded-xl px-4 py-4"
      style={{
        background: '#0a1022',
        border: `1px solid ${color}22`,
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs capitalize font-medium" style={{ color }}>
          {status}
        </span>
        <span className="text-xs tabular-nums" style={{ color: 'var(--text-dim)' }}>
          {pct}%
        </span>
      </div>
      <div className="text-lg font-bold tabular-nums mb-1" style={{ color }}>
        {count.toLocaleString()}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-dim)' }}>
        {description}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; fg: string }> = {
    completed:  { label: 'done',       bg: '#052e16', fg: '#4ade80' },
    processing: { label: 'running',    bg: '#1c1917', fg: '#facc15' },
    failed:     { label: 'failed',     bg: '#1c0e0e', fg: '#f87171' },
    pending:    { label: 'pending',    bg: '#0f172a', fg: '#60a5fa' },
  }
  const style = map[status] ?? { label: status, bg: 'var(--border)', fg: 'var(--text-muted)' }

  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: style.bg, color: style.fg }}
    >
      {style.label}
    </span>
  )
}
