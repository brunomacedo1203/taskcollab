import React from 'react';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/Skeleton';
import { Link } from '@tanstack/react-router';
import TasksFilters from '../components/tasks/TasksFilters';
import CreateTaskForm from '../components/tasks/CreateTaskForm';
import { useTasksListPage } from '../features/tasks/useTasksListPage';
import { useTranslation } from 'react-i18next';

export const TasksListPage: React.FC = () => {
  const { t: tTasks } = useTranslation('tasks');
  const {
    page,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    showCreate,
    setShowCreate,
    data,
    isLoading,
    isError,
    isFetching,
    filtered,
    usersById,
    usersData,
    createMutation,
    handleCreate,
    currentUserId,
  } = useTasksListPage();

  return (
    <div className="space-y-4 md:space-y-6 p-3 sm:p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl text-emerald-400 sm:text-3xl font-gaming font-bold text-primary">
          {tTasks('list.title')}
        </h1>
        <Button
          onClick={() => setShowCreate((v) => !v)}
          variant="secondary"
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 text-white hover:brightness-105 shadow-lg whitespace-nowrap"
        >
          {showCreate ? tTasks('list.toggleCreateOpen') : tTasks('list.toggleCreateClosed')}
        </Button>
      </div>

      {showCreate && (
        <div className="rounded-xl border-2 border-border bg-gaming-light/50 backdrop-blur-sm p-6 shadow-xl">
          <h2 className="font-gaming font-bold text-xl text-primary mb-4">
            {tTasks('list.createTitle')}
          </h2>
          <CreateTaskForm
            users={usersData ?? []}
            currentUserId={currentUserId}
            isSubmitting={createMutation.isPending}
            onCancel={() => setShowCreate(false)}
            onCreate={handleCreate}
          />
        </div>
      )}

      <TasksFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <div className="overflow-x-auto rounded-xl border-2 border-border bg-gaming-light/30 backdrop-blur-sm shadow-xl">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-gaming-light/80">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-gaming font-bold uppercase tracking-wider text-emerald-400">
                {tTasks('list.headers.task')}
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-gaming font-bold uppercase tracking-wider text-emerald-400">
                {tTasks('list.headers.status')}
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-gaming font-bold uppercase tracking-wider text-emerald-400">
                {tTasks('list.headers.priority')}
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-gaming font-bold uppercase tracking-wider text-emerald-400">
                {tTasks('list.headers.dueDate')}
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-gaming font-bold uppercase tracking-wider text-emerald-400">
                {tTasks('list.headers.assignees')}
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-gaming-dark/50">
            {isLoading || isFetching ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-12" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Skeleton className="h-8 w-20 ml-auto" />
                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td className="px-4 py-6 text-sm text-red-400 font-medium" colSpan={6}>
                  {tTasks('list.loadingError')}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-sm text-foreground/70" colSpan={6}>
                  {tTasks('list.empty')}
                </td>
              </tr>
            ) : (
              filtered.map((t) => {
                const isAssignedToMe = t.assigneeIds.includes(currentUserId || '');

                const assigneeNames = t.assigneeIds
                  .map((id) => usersById.get(id)?.username || id.slice(0, 8))
                  .filter(Boolean);

                return (
                  <tr
                    key={t.id}
                    className="hover:bg-gaming-light/50 hover:shadow-lg transition-all duration-200"
                  >
                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      <div className="space-y-1">
                        <Link
                          to="/tasks/$id"
                          params={{ id: t.id }}
                          search={{ from: 'tasks' }}
                          className="font-semibold text-sm sm:text-base text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          {t.title}
                        </Link>
                        {t.description && (
                          <div
                            className="text-xs sm:text-sm text-foreground/70 max-w-[12rem] sm:max-w-[22rem] truncate"
                            title={t.description}
                          >
                            {t.description}
                          </div>
                        )}
                        <div className="text-[11px] sm:text-xs text-foreground/60 flex items-center gap-2 flex-wrap">
                          <span>📅 {new Date(t.createdAt).toLocaleDateString()}</span>
                          {isAssignedToMe && t.lastAssignedByUsername && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-400 font-medium">
                                {tTasks('list.assignedToYouBy', {
                                  username: t.lastAssignedByUsername,
                                })}
                              </span>
                            </>
                          )}
                          {!isAssignedToMe && t.lastAssignedByUsername && (
                            <>
                              <span>•</span>
                              <span>
                                {tTasks('list.assignedBy', {
                                  username: t.lastAssignedByUsername,
                                })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-primary/20 text-primary border border-primary/30 whitespace-nowrap">
                        {tTasks(`status.${t.status}`)}
                      </span>
                    </td>

                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-accent/20 text-accent border border-accent/30 whitespace-nowrap">
                        {tTasks(`priority.${t.priority}`)}
                      </span>
                    </td>

                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-xs sm:text-base text-foreground/80">
                      {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}
                    </td>

                    <td className="px-2 sm:px-4 py-3 sm:py-4">
                      {assigneeNames.length === 0 ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-500/20 text-gray-300 border border-gray-500/30 whitespace-nowrap">
                          {tTasks('list.unassigned')}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 flex-wrap justify-center text-[11px] sm:text-xs">
                          {assigneeNames.slice(0, 2).map((name, idx) => (
                            <span
                              key={idx}
                              className="bg-accent/20 text-accent text-xs font-medium px-2.5 py-1 rounded-full border border-accent/30"
                              title={name}
                            >
                              {name.split(' ')[0]}
                            </span>
                          ))}
                          {assigneeNames.length > 2 && (
                            <span
                              className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full border border-primary/30"
                              title={assigneeNames.slice(2).join(', ')}
                            >
                              +{assigneeNames.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="px-2 sm:px-4 py-3 sm:py-4 text-right">
                      <Link to="/tasks/$id" params={{ id: t.id }} search={{ from: 'tasks' }}>
                        <Button variant="outline" size="sm">
                          {tTasks('list.details')}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/70 font-medium">
          {tTasks('list.pagination.pageOf', {
            current: (data as any)?.page ?? page,
            total: data
              ? Math.max(1, Math.ceil(((data as any).total ?? 0) / ((data as any).size ?? 10)))
              : 1,
          })}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page <= 1 || isLoading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-white border-primary/70 hover:bg-primary/20 disabled:text-gray-400 disabled:border-gray-600 disabled:bg-transparent disabled:opacity-100"
          >
            {tTasks('list.pagination.previous')}
          </Button>
          <Button
            variant="outline"
            disabled={!!data && page >= Math.ceil((data as any).total / (data as any).size)}
            onClick={() => setPage((p) => p + 1)}
            className="text-white border-primary/70 hover:bg-primary/20 disabled:text-gray-400 disabled:border-gray-600 disabled:bg-transparent disabled:opacity-100"
          >
            {tTasks('list.pagination.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};
