/**
 * File service interface for Mixcore SDK
 */
export interface FileServices {
  getFile(folder: string, filename: string): Promise<any>;
  initFile(type: string): Promise<any>;
  getFiles(request: any): Promise<any>;
  removeFile(fullPath: string): Promise<any>;
  saveFile(file: any): Promise<any>;
  uploadFile(file: File, folder: string): Promise<any>;
}