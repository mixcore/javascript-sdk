import { MixDatabaseRestPortalService } from './mix-database-rest-portal-service';
import { MixDatabaseDataRestPortalService } from './mix-database-data-rest-portal-service';
import type { ApiService, ApiResult } from '@mixcore/api';

// Optionally: Define types for params for better DX
export interface ListDatabasesParams {
  pageSize?: number;
  status?: string;
  sortBy?: string;
  direction?: 'Asc' | 'Desc';
  searchColumns?: string;
  compareOperator?: string;
  conjunction?: string;
  columns?: string;
  keyword?: string;
  pageIndex?: number;
}

export interface ListTablesParams {
  pageSize?: number;
  status?: string;
  direction?: 'Asc' | 'Desc';
  compareOperator?: string;
  conjunction?: string;
  keyword?: string;
  pageIndex?: number;
  sortBy?: string;
}

/**
 * High-level MixDbClient for ergonomic MixDB database and table operations.
 * Wraps low-level SDK services and provides DRY, robust methods.
 */
export class MixDbClient {
  private dbService: MixDatabaseRestPortalService;
  private tableService: MixDatabaseDataRestPortalService;

  constructor(apiService: ApiService) {
    this.dbService = new MixDatabaseRestPortalService(apiService);
    this.tableService = new MixDatabaseDataRestPortalService(apiService);
  }

  /** List databases with sensible defaults */
  /**
   * List databases with sensible defaults and robust error handling.
   * Returns ApiResult or fallback mock data on error.
   */
  async listDatabases(params?: ListDatabasesParams): Promise<ApiResult> {
    try {
      return await this.dbService['api'].get('/api/v2/rest/mix-portal/mix-db-database', {
        pageSize: 20,
        status: 'Published',
        sortBy: 'id',
        direction: 'Desc',
        searchColumns: 'displayName,systemName',
        compareOperator: 'Like',
        conjunction: 'Or',
        columns: 'id,displayName,systemName,type,createdDatetime',
        ...params
      });
    } catch (error) {
      // Optionally: Provide fallback/mock data here
      return {
        isSucceed: false,
        data: { items: [] },
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async getDatabaseById(id: string): Promise<ApiResult> {
    try {
      return await this.dbService['api'].get(`/api/v2/rest/mix-portal/mix-db-database/get-by/${id}`);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async createDatabase(data: any): Promise<ApiResult> {
    try {
      return await this.dbService['api'].post('/api/v2/rest/mix-portal/mix-db-database/save', data);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async updateDatabase(data: any): Promise<ApiResult> {
    try {
      return await this.dbService['api'].post('/api/v2/rest/mix-portal/mix-db-database/save', data);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async deleteDatabase(id: string): Promise<ApiResult> {
    try {
      return await this.dbService['api'].delete(`/api/v2/rest/mix-portal/mix-db-database/delete/${id}`);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  /** List tables for a database */
  /**
   * List tables for a database with sensible defaults and robust error handling.
   * Returns ApiResult or fallback mock data on error.
   */
  async listTables(mixDbDatabaseId: string | number, params?: ListTablesParams): Promise<ApiResult> {
    try {
      return await this.dbService['api'].get('/api/v2/rest/mix-portal/mix-db-table', {
        pageSize: 20,
        status: 'Published',
        direction: 'Desc',
        compareOperator: 'Like',
        conjunction: 'Or',
        mixDbDatabaseId: mixDbDatabaseId.toString(),
        ...params
      });
    } catch (error) {
      // Optionally: Provide fallback/mock data here
      return {
        isSucceed: false,
        data: { items: [] },
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async getTableById(id: string): Promise<ApiResult> {
    try {
      return await this.dbService['api'].get(`/api/v2/rest/mix-portal/mix-db-table/get-by/${id}`);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async createTable(data: any): Promise<ApiResult> {
    try {
      return await this.dbService['api'].post('/api/v2/rest/mix-portal/mix-db-table/save', data);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async updateTable(data: any): Promise<ApiResult> {
    try {
      return await this.dbService['api'].post('/api/v2/rest/mix-portal/mix-db-table/save', data);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }

  async deleteTable(id: string): Promise<ApiResult> {
    try {
      return await this.dbService['api'].delete(`/api/v2/rest/mix-portal/mix-db-table/delete/${id}`);
    } catch (error) {
      return {
        isSucceed: false,
        data: null,
        errors: [error instanceof Error ? error.message : String(error)]
      };
    }
  }
}

/** Factory function for ergonomic usage */
export function createMixDbClient(apiService: ApiService) {
  return new MixDbClient(apiService);
}
