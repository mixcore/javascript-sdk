// MixDB shared types for SDK and app consumers

export interface MixQuery {
  toQueryParams(): Record<string, any>;
}

export interface TableInfo {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  recordCount: number;
  createdDate: string;
  lastModified: string;
  schema: TableSchema;
  isSystemTable: boolean;
}

export interface TableSchema {
  columns: ColumnDefinition[];
  primaryKey: string;
  indexes: IndexDefinition[];
  relationships: RelationshipDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  isRequired: boolean;
  isUnique: boolean;
  defaultValue?: any;
  maxLength?: number;
  description?: string;
}

export interface IndexDefinition {
  name: string;
  columns: string[];
  isUnique: boolean;
  type: 'btree' | 'hash' | 'gin' | 'gist';
}

export interface RelationshipDefinition {
  name: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many' | 'many-to-one';
  targetTable: string;
  targetColumn: string;
  sourceColumn: string;
  onDelete: 'cascade' | 'restrict' | 'set-null';
  onUpdate: 'cascade' | 'restrict' | 'set-null';
}

export interface RecordData {
  [key: string]: any;
}

export interface QueryResult<T = RecordData> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface DatabaseStats {
  totalTables: number;
  totalRecords: number;
  databaseSize: string;
  lastBackup?: string;
  isConnected: boolean;
}

export interface CreateTableRequest {
  name: string;
  displayName: string;
  description?: string;
  columns: Omit<ColumnDefinition, 'name'>[];
  primaryKey?: string;
}

export interface UpdateTableRequest {
  displayName?: string;
  description?: string;
  addColumns?: ColumnDefinition[];
  dropColumns?: string[];
  modifyColumns?: ColumnDefinition[];
}

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filters?: FilterCondition[];
  search?: string;
  searchColumns?: string[];
}

export interface FilterCondition {
  column: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'notin' | 'isnull' | 'isnotnull';
  value: any;
}

export interface DatabaseOperationResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
