import type {
  TableInfo,
  ColumnDefinition,
  FilterCondition,
  RecordData
} from './types';

/**
 * Transform a MixDB database API object to TableInfo
 */
export function transformMixDbDatabaseToTable(db: any): TableInfo {
  return {
    id: db.id?.toString() || db.systemName,
    name: db.systemName || db.displayName,
    displayName: db.displayName || db.systemName,
    description: `${db.databaseProvider} database - ${db.namingConvention}`,
    recordCount: 0, // MixDbDatabase doesn't provide record count directly
    createdDate: db.createdDateTime || new Date().toISOString(),
    lastModified: db.modifiedDateTime || db.createdDateTime || new Date().toISOString(),
    isSystemTable: db.systemName === 'master' || db.isSystem || false,
    schema: {
      columns: [
        { name: 'id', type: 'bigint', isRequired: true, isUnique: true, description: 'Primary key' }
      ],
      primaryKey: 'id',
      indexes: [],
      relationships: []
    }
  };
}

export function transformMixDbTableToTable(table: any): TableInfo {
  return {
    id: table.id?.toString() || table.systemName,
    name: table.systemName || table.displayName,
    displayName: table.displayName || table.systemName,
    description: table.description || `Database table in ${table.mixDbDatabaseName}`,
    recordCount: table.recordCount || 0,
    createdDate: table.createdDateTime || new Date().toISOString(),
    lastModified: table.modifiedDateTime || table.createdDateTime || new Date().toISOString(),
    isSystemTable: table.isSystem || false,
    schema: {
      columns: transformColumns(table.columns || table.fields || [
        { name: 'id', type: 'bigint', isRequired: true, isUnique: true, description: 'Primary key' }
      ]),
      primaryKey: table.primaryKey || 'id',
      indexes: table.indexes || [],
      relationships: table.relationships || table.relations || []
    }
  };
}

export function transformDatabasesToTables(databases: any[]): TableInfo[] {
  return databases.map(db => ({
    id: db.id || db.name,
    name: db.name || db.id,
    displayName: db.displayName || db.title || db.name,
    description: db.description || '',
    recordCount: db.recordCount || db.totalRecords || 0,
    createdDate: db.createdDate || db.createdDateTime || new Date().toISOString(),
    lastModified: db.lastModified || db.modifiedDate || db.modifiedDateTime || new Date().toISOString(),
    isSystemTable: db.isSystemTable || db.isSystem || false,
    schema: {
      columns: transformColumns(db.columns || db.fields || []),
      primaryKey: db.primaryKey || 'id',
      indexes: db.indexes || [],
      relationships: db.relationships || db.relations || []
    }
  }));
}

export function transformModuleItemToTable(item: any): TableInfo {
  return {
    id: item.id || item.name,
    name: item.name || item.id,
    displayName: item.displayName || item.title || item.name,
    description: item.description || '',
    recordCount: item.recordCount || item.totalRecords || 0,
    createdDate: item.createdDate || item.createdDateTime || new Date().toISOString(),
    lastModified: item.lastModified || item.modifiedDate || item.modifiedDateTime || new Date().toISOString(),
    isSystemTable: item.isSystemTable || item.isSystem || false,
    schema: {
      columns: transformColumns(item.columns || item.fields || [
        { name: 'id', type: 'bigint', isRequired: true, isUnique: true, description: 'Primary key' }
      ]),
      primaryKey: item.primaryKey || 'id',
      indexes: item.indexes || [],
      relationships: item.relationships || item.relations || []
    }
  };
}

export function transformColumns(columns: any[]): ColumnDefinition[] {
  return columns.map(col => ({
    name: col.name || col.fieldName,
    type: col.type || col.datatype || col.dataType || 'varchar',
    isRequired: col.isRequired || col.required || false,
    isUnique: col.isUnique || col.unique || false,
    defaultValue: col.defaultValue || col.default,
    maxLength: col.maxLength || col.length,
    description: col.description || col.note
  }));
}

/**
 * CSV Utilities
 */
export function convertToCSV(data: RecordData[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      }).join(',')
    )
  ];
  return csvRows.join('\n');
}

export function parseCSV(content: string): RecordData[] {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const record: RecordData = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    return record;
  });
}

/**
 * Generic record filter logic
 */
export function applyFilter(record: RecordData, filter: FilterCondition): boolean {
  const value = record[filter.column];
  switch (filter.operator) {
    case 'eq':
      return value === filter.value;
    case 'neq':
      return value !== filter.value;
    case 'gt':
      return value > filter.value;
    case 'gte':
      return value >= filter.value;
    case 'lt':
      return value < filter.value;
    case 'lte':
      return value <= filter.value;
    case 'like':
      return value?.toString().toLowerCase().includes(filter.value.toLowerCase());
    case 'in':
      return Array.isArray(filter.value) && filter.value.includes(value);
    case 'notin':
      return Array.isArray(filter.value) && !filter.value.includes(value);
    case 'isnull':
      return value === null || value === undefined;
    case 'isnotnull':
      return value !== null && value !== undefined;
    default:
      return true;
  }
}
