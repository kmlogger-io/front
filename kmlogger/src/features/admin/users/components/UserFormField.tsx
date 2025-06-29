import React from 'react';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import type { RosterColumnConfig } from '../../../../shared/components/table/roster/types/roster.types';
import { useRolesQuery } from '../../../../shared/hooks/useRolesQuery.hook';
import { RolesAutocomplete } from '../../../../shared/components/autocompletes/RolesAutoComplete';
import RosterFormField from '../../../../shared/components/table/roster/components/RosterFormField';

interface UserFormFieldProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  column: RosterColumnConfig;
  disabled?: boolean;
}

export const UserFormField: React.FC<UserFormFieldProps> = ({
  field,
  fieldState,
  column,
  disabled = false
}) => {
  const { data: roles = [], isLoading: rolesLoading } = useRolesQuery();

  if (field.name === 'roleIds') {
    return (
      <RolesAutocomplete
        field={field}
        fieldState={fieldState}
        roles={roles}
        loading={rolesLoading}
        disabled={disabled}
      />
    );
  }

  return (
    <RosterFormField
      field={field}
      fieldState={fieldState}
      column={column}
      disabled={disabled}
    />
  );
};