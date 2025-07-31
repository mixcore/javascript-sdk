import { ApiService } from './api-services';

export interface User {
  id?: string;
  [key: string]: any;
}

export class UserServices {
  private api: ApiService;
  private apiUrl = '/account/';

  constructor(api: ApiService) {
    this.api = api;
  }

  async getMyProfile() {
    return this.api.get(this.apiUrl + 'my-profile');
  }

  async saveUser(user: User) {
    return this.api.post(this.apiUrl + 'save', user);
  }

  async register(user: User) {
    return this.api.post(this.apiUrl + 'register', user);
  }

  async getUser(id: string, viewType: string) {
    let url = this.apiUrl + 'details/' + viewType;
    if (id) url += '/' + id;
    return this.api.get(url);
  }

  async getUsers(request: any) {
    return this.api.post(this.apiUrl + 'list', request);
  }

  async importUsers(strBase64: string) {
    return this.api.post(this.apiUrl + 'import-users', { strBase64 });
  }

  async removeUser(userId: string) {
    return this.api.get(this.apiUrl + 'remove-user/' + userId);
  }

  async updateRoleStatus(userInRole: any) {
    return this.api.post('/account/user-in-role', userInRole);
  }

  async getUserDemographicInfo() {
    return this.api.get('/GetUserDemographicInfo');
  }
}
