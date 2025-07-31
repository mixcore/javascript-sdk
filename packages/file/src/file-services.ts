import type { ApiService, FileServices } from '@mixcore/shared';

export class FileServicesPortal implements FileServices {
  private api: ApiService;
  private prefixUrl = '/file/';

  constructor(api: ApiService) {
    this.api = api;
  }

  async getFile(folder: string, filename: string) {
    const url = `${this.prefixUrl}details?folder=${encodeURIComponent(folder)}&filename=${encodeURIComponent(filename)}`;
    return this.api.get(url);
  }

  async initFile(type: string) {
    return this.api.get(`${this.prefixUrl}init/${encodeURIComponent(type)}`);
  }

  async getFiles(request: any) {
    return this.api.post(`${this.prefixUrl}list`, request);
  }

  async removeFile(fullPath: string) {
    return this.api.get(`${this.prefixUrl}delete/?fullPath=${encodeURIComponent(fullPath)}`);
  }

  async saveFile(file: any) {
    return this.api.post(`${this.prefixUrl}save`, file);
  }

  async uploadFile(file: File, folder: string) {
    const url = `${this.prefixUrl}upload-file`;
    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('file', file);
    // Use fetch directly for multipart/form-data
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error(`UPLOAD ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }
}
