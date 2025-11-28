import React from 'react';
import { CommentsSection } from '../components/CommentsSection';
import { HistorySection } from '../components/HistorySection';
import ConfirmDialog from '../components/ConfirmDialog';
import { TaskDetailsLoading } from '../components/tasks/TaskDetailsLoading';
import { TaskDetailsError } from '../components/tasks/TaskDetailsError';
import { TaskHeader } from '../components/tasks/TaskHeader';
import { TaskEditForm } from '../components/tasks/TaskEditForm';
import { useTaskDetailsPage } from '../features/tasks/useTaskDetailsPage';
import { useTranslation } from 'react-i18next';

export const TaskDetailsPage: React.FC = () => {
  const { t } = useTranslation('tasks');
  const {
    task,
    isLoading,
    isError,
    usersData,
    isLoadingUsers,
    isErrorUsers,
    canEdit,
    currentUserId,
    register,
    handleSubmit,
    errors,
    isDirty,
    setValue,
    assigneeInputValue,
    confirmLeaveOpen,
    setConfirmLeaveOpen,
    saveMutation,
    isAssignedToMe,
    handleBack,
    onSubmit,
  } = useTaskDetailsPage();

  if (isLoading) return <TaskDetailsLoading />;
  if (isError || !task) return <TaskDetailsError />;

  return (
    <div className="space-y-8 p-4">
      <TaskHeader task={task} isAssignedToMe={isAssignedToMe} onBackClick={handleBack} />

      <TaskEditForm
        task={task}
        canEdit={canEdit}
        users={usersData}
        isLoadingUsers={isLoadingUsers}
        isErrorUsers={isErrorUsers}
        currentUserId={currentUserId}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isDirty={isDirty}
        setValue={setValue}
        assigneeInputValue={assigneeInputValue}
        isSubmitting={saveMutation.isPending}
        onSubmit={onSubmit}
      />

      <CommentsSection taskId={task.id} />
      <HistorySection taskId={task.id} />

      <ConfirmDialog
        open={confirmLeaveOpen}
        title={t('details.discardTitle')}
        description={t('details.discardDescription')}
        cancelText={t('details.discardCancel')}
        confirmText={t('details.discardConfirm')}
        onCancel={() => setConfirmLeaveOpen(false)}
        onConfirm={() => {
          setConfirmLeaveOpen(false);
          handleBack();
        }}
      />
    </div>
  );
};
