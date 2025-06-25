import { either, option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import type { BaseResponse, ApiError } from '../types/api-types.types';
import type { TableData } from '../components/table/stores/useTableStore.store';
import { createSafeFunction } from '../fp-ts/create-function-safe';

/**
 * Configuração para conversão de API para TableData
 */
interface ApiToTableConfig<T = any> {
  idField?: keyof T;
  includeFields?: (keyof T)[];
  excludeFields?: (keyof T)[];
  fieldMapping?: Record<string, string>;
  fieldTransformers?: Record<string, (value: any) => any>;
  defaultValues?: Record<string, any>;
}

/**
 * Erro de conversão
 */
interface ConversionError extends ApiError {
  type: 'CONVERSION_ERROR';
  originalData?: any;
}

const extractId = <T>(item: T, config: ApiToTableConfig<T>): either.Either<ConversionError, string | number> => {
  const obj = item as Record<string, any>;
  
  if (config.idField && obj[config.idField as string] != null) {
    return either.right(obj[config.idField as string]);
  }
  
  const idFields = ['id', '_id', 'uuid', 'key'];
  for (const field of idFields) {
    if (obj[field] != null) {
      return either.right(obj[field]);
    }
  }
  const firstField = Object.keys(obj)[0];
  if (firstField && obj[firstField] != null) {
    return either.right(obj[firstField]);
  }
  
  return either.left({
    type: 'CONVERSION_ERROR',
    statusCode: 422,
    message: 'Não foi possível extrair ID do objeto',
    originalData: item,
  });
};

/**
 * Função para transformar um item da API em TableData
 */
const transformItem = <T>(item: T, config: ApiToTableConfig<T>): either.Either<ConversionError, TableData> => {
  return pipe(
    extractId(item, config),
    either.chain(id => {
      try {
        const obj = item as Record<string, any>;
        const tableData: TableData = { id };
        
        let fieldsToProcess: string[];
        if (config.includeFields) {
          fieldsToProcess = config.includeFields as string[];
        } else {
          fieldsToProcess = Object.keys(obj).filter(
            key => !config.excludeFields?.includes(key as keyof T)
          );
        }
        for (const field of fieldsToProcess) {
          const mappedField = config.fieldMapping?.[field] || field;
          let value = obj[field];
          if (config.fieldTransformers?.[field]) {
            value = config.fieldTransformers[field](value);
          }
          if (value == null && config.defaultValues?.[mappedField]) {
            value = config.defaultValues[mappedField];
          }
          tableData[mappedField] = value;
        }
        
        if (config.defaultValues) {
          for (const [key, defaultValue] of Object.entries(config.defaultValues)) {
            if (!(key in tableData)) {
              tableData[key] = defaultValue;
            }
          }
        }
        
        return either.right(tableData);
      } catch (error) {
        return either.left({
          type: 'CONVERSION_ERROR',
          statusCode: 500,
          message: `Erro ao transformar item: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          originalData: item,
        });
      }
    })
  );
};

/**
 * Função principal para converter resposta da API em TableData[]
 */
export const apiToTableData = <T>(
  config: ApiToTableConfig<T> = {}
) => (
  apiResponse: BaseResponse<T[]>
): either.Either<ConversionError, TableData[]> => {
  try {
    if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
      return either.left({
        type: 'CONVERSION_ERROR',
        statusCode: 422,
        message: 'Resposta da API não contém array de dados válido',
        originalData: apiResponse,
      });
    }
    
    const results = apiResponse.data.map(item => transformItem(item, config));
    const errors = results.filter(either.isLeft);
    if (errors.length > 0) {
      return either.left({
        type: 'CONVERSION_ERROR',
        statusCode: 422,
        message: `Falha ao converter ${errors.length} item(s)`,
        originalData: errors.map(e => e.left.originalData),
      });
    }
    
    const tableData = results.map(result => 
      either.isRight(result) ? result.right : {} as TableData
    );
    
    return either.right(tableData);
  } catch (error) {
    return either.left({
      type: 'CONVERSION_ERROR',
      statusCode: 500,
      message: `Erro inesperado na conversão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      originalData: apiResponse,
    });
  }
};

export const safeApiToTableData = <T>(config?: ApiToTableConfig<T>) =>
  createSafeFunction(apiToTableData<T>(config));
