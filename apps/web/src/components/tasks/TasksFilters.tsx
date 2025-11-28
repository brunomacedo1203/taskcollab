import React from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { useTranslation } from 'react-i18next';

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  priority: string;
  onPriorityChange: (v: string) => void;
};

export const TasksFilters: React.FC<Props> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}) => {
  const { t } = useTranslation('tasks');
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="md:col-span-1">
        <Label>{t('list.filters.searchLabel', { defaultValue: 'Buscar' })}</Label>
        <Input
          placeholder={t('list.filters.searchPlaceholder', {
            defaultValue: 'Título ou descrição...',
          })}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <Label>{t('list.headers.status')}</Label>
        <Select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">{t('list.filters.allStatus', { defaultValue: 'Todos' })}</option>
          <option value="TODO">{t('status.TODO')}</option>
          <option value="IN_PROGRESS">{t('status.IN_PROGRESS')}</option>
          <option value="REVIEW">{t('status.REVIEW')}</option>
          <option value="DONE">{t('status.DONE')}</option>
        </Select>
      </div>
      <div>
        <Label>{t('list.headers.priority')}</Label>
        <Select value={priority} onChange={(e) => onPriorityChange(e.target.value)}>
          <option value="">{t('list.filters.allPriorities', { defaultValue: 'Todas' })}</option>
          <option value="LOW">{t('priority.LOW')}</option>
          <option value="MEDIUM">{t('priority.MEDIUM')}</option>
          <option value="HIGH">{t('priority.HIGH')}</option>
          <option value="URGENT">{t('priority.URGENT')}</option>
        </Select>
      </div>
    </div>
  );
};

export default TasksFilters;
