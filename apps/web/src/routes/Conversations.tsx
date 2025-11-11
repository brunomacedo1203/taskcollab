import React, { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useNotificationsStore } from '../features/notifications/store';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export const ConversationsPage: React.FC = () => {
  const items = useNotificationsStore((s) => s.items);
  const initialized = useNotificationsStore((s) => s.initialized);
  const bootstrap = useNotificationsStore((s) => s.bootstrap);
  const markRead = useNotificationsStore((s) => s.markRead);

  useEffect(() => {
    if (!initialized) void bootstrap(25);
  }, [initialized, bootstrap]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Conversations</h1>
        <div className="text-sm text-foreground/60">Unread: {items.length}</div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-border p-6 text-center text-foreground/70">
          No unread messages. You’re all caught up.
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {items.map((n) => (
            <li key={n.id} className="p-4 hover:bg-gaming-dark/40 transition-colors">
              <Link
                to="/tasks/$id"
                params={{ id: n.taskId }}
                className="block"
                onClick={async () => {
                  await markRead(n.id);
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {n.title || 'New activity'}
                    </div>
                    {n.body && (
                      <div className="text-sm text-foreground/70 line-clamp-2 mt-1">{n.body}</div>
                    )}
                  </div>
                  <div className="text-[11px] text-foreground/50 whitespace-nowrap">
                    {formatDate(n.createdAt)}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
