import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { z } from 'zod';

export type RosterAction = 'create' | 'edit' | 'view' | 'delete';

export interface RosterColumnConfig {
  field: string;
  headerName: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'custom';
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderComponent?: (value: any, row: any) => ReactNode;
  renderCell?: (params: any) => ReactNode;
}

export interface RosterEntity<T = any> {
  columns: RosterColumnConfig[];
  schema: z.ZodSchema<T>;
  idField: keyof T;
  displayField?: keyof T;
}

export interface RosterMutations<T> {
  create?: (data: T) => Promise<T>;
  update?: (id: string | number, data: Partial<T>) => Promise<T>;
  delete?: (id: string | number) => Promise<void>;
}

export interface RosterPermissions {
  allowView?: boolean;
  allowEdit?: boolean;
  allowCreate?: boolean;
  allowDelete?: boolean;
  showDeleteModal?: boolean;
}

export interface QueryParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface QueryResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export type QueryFunction<T> = (params: QueryParams) => UseQueryResult<QueryResult<T>>;

export interface CustomFieldRenderer<T> {
  (field: any, fieldState: any, column: RosterColumnConfig, disabled: boolean): ReactNode;
}

export interface AdditionalField<T> {
  name: keyof T;
  label: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'custom';
}

export interface ModalCustomization<T> {
  customFieldRenderer?: CustomFieldRenderer<T>;
  additionalFields?: AdditionalField<T>[];
  fieldsToExclude?: Array<keyof T>;
  modalTitles?: {
    create?: string;
    edit?: string;
    view?: string;
  };
}

export interface RosterTableProps<T> {
  entity: RosterEntity<T>;
  queryFunction: QueryFunction<T>;
  permissions?: RosterPermissions;
  mutations?: RosterMutations<T>;
  title?: string;
  subtitle?: string;
  initialPage?: number;
  initialPageSize?: number;
  modalCustomization?: ModalCustomization<T>; 
}

export interface RosterModalProps<T> {
  open: boolean;
  action: RosterAction;
  data?: T;
  entity: RosterEntity<T>;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void>;
  loading?: boolean;
  modalCustomization?: ModalCustomization<T>; 
}

export interface RosterDeleteModalProps {
  open: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RosterProviderValue {
  pagination: PaginationState;
  setPagination: (pagination: Partial<PaginationState>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}