import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { PaginationState, RosterProviderValue } from '../types/roster.types';

const RosterContext = createContext<RosterProviderValue | undefined>(undefined);

interface RosterProviderProps {
  children: ReactNode;
  initialPagination?: Partial<PaginationState>;
}

export const RosterProvider: React.FC<RosterProviderProps> = ({
  children,
  initialPagination = {}
}) => {
  const [pagination, setPaginationState] = useState<PaginationState>({
    page: 0,
    pageSize: 10,
    total: 0,
    ...initialPagination
  });

  const [isLoading, setIsLoading] = useState(false);

  const setPagination = useCallback((newPagination: Partial<PaginationState>) => {
    setPaginationState(prev => {
      const next = { ...prev, ...newPagination };
      
      if (
        prev.page === next.page &&
        prev.pageSize === next.pageSize &&
        prev.total === next.total &&
        prev.search === next.search &&
        prev.sortBy === next.sortBy &&
        prev.sortOrder === next.sortOrder
      ) {
        return prev; 
      }
      
      return next;
    });
  }, []);

  const setIsLoadingCallback = useCallback((loading: boolean) => {
    setIsLoading(prev => prev === loading ? prev : loading);
  }, []);

  const value: RosterProviderValue = {
    pagination,
    setPagination,
    isLoading,
    setIsLoading: setIsLoadingCallback
  };

  return (
    <RosterContext.Provider value={value}>
      {children}
    </RosterContext.Provider>
  );
};

export const useRoster = (): RosterProviderValue => {
  const context = useContext(RosterContext);
  if (!context) {
    throw new Error('useRoster deve ser usado dentro de um RosterProvider');
  }
  return context;
};