import { create } from 'zustand';

interface TableData {
  [key: string]: any;
  id?: string | number;
}

interface TableState {
  // State
  data: TableData[];
  filteredData: TableData[];
  page: number;
  rowsPerPage: number;
  totalItems: number;
  loading: boolean;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, string>;
  selected: readonly string[];
}

interface TableActions {
  // Actions
  setData: (data: TableData[]) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setSorting: (sortColumn: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  setSelected: (selected: readonly string[]) => void;
  selectAll: (checked: boolean) => void;
  selectOne: (id: string, checked: boolean) => void;
  toggleSelectAll: () => void;
}

type TableStore = TableState & TableActions;

export const useTableStore = create<TableStore>((set, get) => ({
  // State
  data: [],
  filteredData: [],
  page: 0,
  rowsPerPage: 10,
  totalItems: 0,
  loading: false,
  sortColumn: null,
  sortDirection: 'asc',
  filters: {},
  selected: [],
  
  // Actions
  setData: (data: TableData[]) => set({ 
    data, 
    filteredData: data, 
    totalItems: data.length,
    page: 0,
    selected: []
  }),
  
  setLoading: (loading: boolean) => set({ loading }),
  
  setPage: (page: number) => set({ page }),
  
  setRowsPerPage: (rowsPerPage: number) => set({ 
    rowsPerPage, 
    page: 0 
  }),
  
  setSorting: (sortColumn: string) => {
    const { sortColumn: currentSortColumn, sortDirection } = get();
    const isAsc = currentSortColumn === sortColumn && sortDirection === 'asc';
    const newDirection: 'asc' | 'desc' = isAsc ? 'desc' : 'asc';
    
    set({ sortColumn, sortDirection: newDirection });
    
    const { filteredData } = get();
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (aVal < bVal) return newDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return newDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    set({ filteredData: sorted });
  },
  
  setFilters: (filters: Record<string, string>) => {
    set({ filters, page: 0 });
    
    const { data } = get();
    const filtered = data.filter((item: TableData) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    });
    
    set({ filteredData: filtered, totalItems: filtered.length });
  },
  
  setSelected: (selected: readonly string[]) => set({ selected }),
  
  selectAll: (checked: boolean) => {
    const { filteredData } = get();
    if (checked) {
      const newSelected = filteredData.map((item) => String(item.id));
      set({ selected: newSelected });
    } else {
      set({ selected: [] });
    }
  },
  
  selectOne: (id: string, checked: boolean) => {
    const { selected } = get();
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    
    set({ selected: newSelected });
  },

  toggleSelectAll: () => {
    const { filteredData, selected } = get();
    const allIds = filteredData.map(item => String(item.id)).filter(Boolean);
    const isAllSelected = allIds.length > 0 && allIds.every(id => selected.includes(id));
    
    if (isAllSelected) {
      const newSelected = selected.filter(id => !allIds.includes(id));
      set({ selected: newSelected });
    } else {
      const newSelected = Array.from(new Set([...selected, ...allIds]));
      set({ selected: newSelected });
    }
  }
}));

export type { TableData, TableState, TableActions, TableStore };