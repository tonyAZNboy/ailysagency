import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertTriangle, Database } from "lucide-react";

interface AdminTableProps<T> {
  title: string;
  description?: string;
  table: string;
  selectColumns?: string;
  orderBy?: { column: string; ascending: boolean };
  columns: Array<{
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
  }>;
  emptyHint?: string;
}

export function AdminTable<T extends Record<string, unknown>>({
  title,
  description,
  table,
  selectColumns = "*",
  orderBy = { column: "created_at", ascending: false },
  columns,
  emptyHint,
}: AdminTableProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error: dbError } = await supabase
          .from(table)
          .select(selectColumns)
          .order(orderBy.column, { ascending: orderBy.ascending })
          .limit(200);

        if (!mounted) return;
        if (dbError) {
          setError(dbError.message);
        } else {
          setRows((data ?? []) as T[]);
        }
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(String(err));
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [table, selectColumns, orderBy.column, orderBy.ascending]);

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Admin / {title.toLowerCase()}
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading {table}...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              Database error
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2 break-all">{error}</p>
          <p className="text-xs text-muted-foreground/70">
            If you see "relation does not exist", apply the migration in{" "}
            <code className="font-mono">supabase/migrations/0001_admin_tables.sql</code>.
          </p>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md p-10 text-center">
          <Database className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="font-display text-2xl italic text-muted-foreground mb-2">
            No records yet.
          </p>
          {emptyHint && (
            <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
              {emptyHint}
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/40">
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={(row.id as string) ?? i}
                    className="border-t border-border/30 hover:bg-card/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-4 py-3 align-top"
                      >
                        {col.render ? col.render(row) : String(row[col.key as string] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border/30 text-xs text-muted-foreground/60 font-mono">
            {rows.length} {rows.length === 1 ? "row" : "rows"} · most recent 200
          </div>
        </div>
      )}
    </div>
  );
}
