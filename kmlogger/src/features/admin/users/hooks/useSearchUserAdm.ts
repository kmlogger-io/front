import { useCallback, useState } from 'react';
import { useDebounce } from 'use-debounce';

export function useSearchUserAdm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); 

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
    clearSearch,
    hasSearch: debouncedSearchTerm.length > 0
  };
}
