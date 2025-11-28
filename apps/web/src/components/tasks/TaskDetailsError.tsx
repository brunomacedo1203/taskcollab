import React from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const TaskDetailsError: React.FC<{ message?: string }> = ({ message }) => {
  const { t } = useTranslation('tasks');
  return (
    <div className="p-4">
      <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4 mb-4">
        <p className="text-red-400 font-medium">{message ?? 'Erro ao carregar tarefa.'}</p>
      </div>
      <Link to="/tasks" className="text-primary hover:text-accent font-semibold transition-colors">
        {t('details.backButton')}
      </Link>
    </div>
  );
};
