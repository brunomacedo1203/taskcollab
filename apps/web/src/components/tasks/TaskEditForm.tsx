import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import AssigneesPicker from './AssigneesPicker';
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import type { EditTaskForm } from '../../features/tasks/forms/editTaskForm';
import type { UserSummary } from '../../features/users/users.api';
import type { Task } from '../../features/tasks/types';
import { parseCsv, joinCsv } from '../../lib/csv';

type Props = {
  task: Task;
  canEdit: boolean;
  users: UserSummary[] | undefined;
  isLoadingUsers: boolean;
  isErrorUsers: boolean;
  currentUserId: string | null;
  register: UseFormRegister<EditTaskForm>;
  handleSubmit: UseFormHandleSubmit<EditTaskForm>;
  errors: FieldErrors<EditTaskForm>;
  isDirty: boolean;
  setValue: UseFormSetValue<EditTaskForm>;
  assigneeInputValue: string;
  onSubmit: (values: EditTaskForm) => void;
  isSubmitting: boolean;
};

export const TaskEditForm: React.FC<Props> = ({
  task,
  canEdit,
  users,
  isLoadingUsers,
  isErrorUsers,
  currentUserId,
  register,
  handleSubmit,
  errors,
  isDirty,
  setValue,
  assigneeInputValue,
  onSubmit,
  isSubmitting,
}) => {
  const { t } = useTranslation('tasks');
  return (
    <div className="bg-gaming-light/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 shadow-xl">
      <h2 className="font-gaming text-emerald-400 font-bold text-xl text-primary mb-4">
        {t('form.edit.heading')}
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
        {!canEdit && (
          <div className="md:col-span-2 mb-2 rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3 text-xs text-yellow-300">
            {t('form.edit.onlyCreatorWarning')}
          </div>
        )}
        <div className="md:col-span-2">
          <Label htmlFor="title">{t('form.create.titleLabel')}</Label>
          <Input id="title" {...register('title')} disabled={!canEdit} />
          {errors.title && (
            <p className="text-sm text-red-400 mt-1 font-medium">
              {errors.title.message as string}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">{t('form.create.descriptionLabel')}</Label>
          <Textarea id="description" rows={4} {...register('description')} disabled={!canEdit} />
        </div>
        <div>
          <Label htmlFor="dueDate">{t('form.create.dueDateLabel')}</Label>
          <Input id="dueDate" type="date" {...register('dueDate')} disabled={!canEdit} />
        </div>
        <div>
          <Label>{t('form.create.statusLabel')}</Label>
          <Select {...register('status')} defaultValue={task.status} disabled={!canEdit}>
            <option value="TODO">{t('status.TODO')}</option>
            <option value="IN_PROGRESS">{t('status.IN_PROGRESS')}</option>
            <option value="REVIEW">{t('status.REVIEW')}</option>
            <option value="DONE">{t('status.DONE')}</option>
          </Select>
        </div>
        <div>
          <Label>{t('form.create.priorityLabel')}</Label>
          <Select {...register('priority')} defaultValue={task.priority} disabled={!canEdit}>
            <option value="LOW">{t('priority.LOW')}</option>
            <option value="MEDIUM">{t('priority.MEDIUM')}</option>
            <option value="HIGH">{t('priority.HIGH')}</option>
            <option value="URGENT">{t('priority.URGENT')}</option>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="edit-assignee-ids">{t('form.create.assignLabel')}</Label>
          <input type="hidden" {...register('assigneeIds')} />
          <AssigneesPicker
            users={users ?? []}
            valueIds={parseCsv(assigneeInputValue)}
            excludeUserId={currentUserId ?? undefined}
            inputId="edit-assignee-ids"
            placeholder={t('form.create.assigneesPlaceholder')}
            loading={isLoadingUsers}
            error={isErrorUsers}
            disabled={!canEdit}
            onChange={(ids) =>
              setValue('assigneeIds', joinCsv(ids), {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: false,
              })
            }
          />
        </div>
        <div className="md:col-span-2 flex justify-end gap-3">
          <Button type="submit" disabled={isSubmitting || !isDirty || !canEdit}>
            {isSubmitting ? t('form.edit.saving') : t('form.edit.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};
