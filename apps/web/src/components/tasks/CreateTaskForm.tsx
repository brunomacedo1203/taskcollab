import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import AssigneesPicker from './AssigneesPicker';
import type { UserSummary } from '../../features/users/users.api';
import type { CreateTaskInput } from '../../features/tasks/types';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

type FormValues = {
  title: string;
  description?: string;
  dueDate?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
};

type Props = {
  users: UserSummary[];
  currentUserId: string | null;
  isSubmitting?: boolean;
  onCancel: () => void;
  onCreate: (input: CreateTaskInput) => void;
};

export const CreateTaskForm: React.FC<Props> = ({
  users,
  currentUserId,
  isSubmitting = false,
  onCancel,
  onCreate,
}) => {
  const { t } = useTranslation('tasks');

  const schema = useMemo(
    () =>
      z.object({
        title: z.string().min(1, t('form.errors.titleRequired')).max(255),
        description: z.string().optional(),
        dueDate: z
          .string()
          .regex(dateRegex, t('form.errors.dueDateInvalid'))
          .optional()
          .or(z.literal('')),
        status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']).optional(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const assigneesIds = useMemo(() => selectedAssignees, [selectedAssignees]);

  const submit = (values: FormValues) => {
    const input: CreateTaskInput = {
      title: values.title,
      description: values.description || undefined,
      dueDate: values.dueDate || undefined,
      status: values.status,
      priority: values.priority,
      assigneeIds: assigneesIds.length ? assigneesIds : undefined,
    };
    onCreate(input);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <Label htmlFor="title">{t('form.create.titleLabel')}</Label>
        <Input id="title" {...register('title')} />
        {errors.title && (
          <p className="text-sm text-red-400 mt-1 font-medium">{errors.title.message}</p>
        )}
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="description">{t('form.create.descriptionLabel')}</Label>
        <Textarea id="description" rows={3} {...register('description')} />
      </div>
      <div>
        <Label htmlFor="dueDate">{t('form.create.dueDateLabel')}</Label>
        <Input id="dueDate" type="date" {...register('dueDate')} />
        {errors.dueDate && (
          <p className="text-sm text-red-400 mt-1 font-medium">{errors.dueDate.message}</p>
        )}
      </div>
      <div>
        <Label>{t('form.create.statusLabel')}</Label>
        <Select defaultValue="" {...register('status')}>
          <option value="">—</option>
          <option value="TODO">{t('status.TODO')}</option>
          <option value="IN_PROGRESS">{t('status.IN_PROGRESS')}</option>
          <option value="REVIEW">{t('status.REVIEW')}</option>
          <option value="DONE">{t('status.DONE')}</option>
        </Select>
      </div>
      <div>
        <Label>{t('form.create.priorityLabel')}</Label>
        <Select defaultValue="" {...register('priority')}>
          <option value="">—</option>
          <option value="LOW">{t('priority.LOW')}</option>
          <option value="MEDIUM">{t('priority.MEDIUM')}</option>
          <option value="HIGH">{t('priority.HIGH')}</option>
          <option value="URGENT">{t('priority.URGENT')}</option>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="create-assignee-ids">{t('form.create.assignLabel')}</Label>
        <AssigneesPicker
          users={users}
          valueIds={assigneesIds}
          onChange={setSelectedAssignees}
          excludeUserId={currentUserId}
          inputId="create-assignee-ids"
          placeholder={t('form.create.assigneesPlaceholder')}
        />
      </div>
      <div className="md:col-span-2 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('form.create.cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('form.create.creating') : t('form.create.create')}
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
