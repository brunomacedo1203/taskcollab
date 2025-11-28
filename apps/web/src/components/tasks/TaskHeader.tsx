import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Task } from '../../features/tasks/types';
import { Button } from '../ui/button';

type Props = {
  task: Task;
  isAssignedToMe: boolean;
  onBackClick: () => void;
};

export const TaskHeader: React.FC<Props> = ({ task, isAssignedToMe, onBackClick }) => {
  const { t } = useTranslation('tasks');
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl text-emerald-400 font-gaming font-bold text-primary mb-2">
          {task.title}
        </h1>
        <p className="text-sm text-foreground/60">
          {t('details.createdAtPrefix')} {new Date(task.createdAt).toLocaleString()}
          {task.lastAssignedByUsername || task.lastAssignedById || task.lastAssignedAt ? (
            <>
              {' '}
              •{' '}
              {isAssignedToMe ? (
                <span className="text-accent">
                  {t('details.assignedToYouPrefix')}{' '}
                  {task.lastAssignedByUsername ??
                    (task.lastAssignedById ? task.lastAssignedById.slice(0, 8) : '—')}
                </span>
              ) : (
                <span>
                  {t('details.assignedByPrefix')}{' '}
                  {task.lastAssignedByUsername ??
                    (task.lastAssignedById ? task.lastAssignedById.slice(0, 8) : '—')}
                </span>
              )}
              {task.lastAssignedAt
                ? ` ${t('details.assignedAtPrefix')} ${new Date(
                    task.lastAssignedAt,
                  ).toLocaleString()}`
                : ''}
            </>
          ) : null}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onBackClick}>
          {t('details.backButton')}
        </Button>
      </div>
    </div>
  );
};
