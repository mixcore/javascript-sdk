// Framework-agnostic, TypeScript refactor of modal-nav-metas logic from legacy AngularJS
// This module provides a class for managing navigation meta data for Mixcore databases.
// All dependencies must be injected; no Angular or browser globals are used.

export interface ModalNavMetasConfig {
  mixDatabaseId?: string | number;
  mixDatabaseName?: string;
  parentId?: string | number;
  parentType?: string;
  type?: string;
  columnDisplay?: any;
  selectedList?: any[];
  dataService: any;
  navService: any;
  databaseService: any;
  requestTemplate: any;
  findObjectByKey: (arr: any[], key: string, value: any) => any;
  showMessage: (type: string, msg: string) => void;
  showErrors: (errors: any) => void;
  generateKeyword: (title: string, sep: string) => string;
  selectCallback?: (args: { data: any }) => void;
}

export class ModalNavMetasService {
  config: ModalNavMetasConfig;
  request: any;
  navs: any[] = [];
  queries: any = {};
  data: { items: any[] } = { items: [] };
  selectedValues: any[] = [];
  columns: any;
  defaultNav: any;
  defaultData: any;
  mixDatabaseData: any;
  isBusy = false;
  newTitle = '';

  constructor(config: ModalNavMetasConfig) {
    this.config = config;
    this.request = { ...config.requestTemplate, key: 'readData', isGroup: true };
    this.selectedValues = (config.selectedList ?? []).map((m: any) => m.dataId);
  }

  async onInit() {
    if (!this.config.selectedList) {
      this.config.selectedList = [];
    }
    this.selectedValues = (this.config.selectedList ?? []).map((m: any) => m.dataId);
    if (this.config.mixDatabaseId) {
      this.request.mixDatabaseId = this.config.mixDatabaseId;
    }
    if (this.config.mixDatabaseName) {
      this.request.mixDatabaseName = this.config.mixDatabaseName;
    }
    await this.loadDefaultModel();
    await this.loadData();
    this.filterData();
  }

  async loadDefaultModel() {
    this.defaultNav = {
      id: null,
      specificulture: this.config.navService.lang,
      dataId: null,
      parentId: this.config.parentId,
      parentType: this.config.parentType,
      mixDatabaseId: this.config.mixDatabaseId,
      mixDatabaseName: this.config.mixDatabaseName,
      status: 'Published',
      attributeData: null,
    };
    if (!this.columns) {
      const getMixDatabase = await this.config.databaseService.getSingle([
        this.config.mixDatabaseName || this.config.mixDatabaseId,
      ]);
      if (getMixDatabase.isSucceed) {
        this.columns = getMixDatabase.data.columns;
        this.config.mixDatabaseId = getMixDatabase.data.id;
        this.config.mixDatabaseName = getMixDatabase.data.name;
        this.defaultNav.mixDatabaseId = getMixDatabase.data.id;
        this.defaultNav.mixDatabaseName = getMixDatabase.data.name;
      }
    }
    const getDefault = await this.config.dataService.initData(
      this.config.mixDatabaseName || this.config.mixDatabaseId
    );
    this.defaultData = getDefault.data;
    if (this.defaultData) {
      this.defaultData.mixDatabaseId = this.config.mixDatabaseId || 0;
      this.defaultData.mixDatabaseName = this.config.mixDatabaseName;
    }
    if (!this.mixDatabaseData) {
      this.mixDatabaseData = { ...this.defaultData };
    }
  }

  isSelected(value: any, level: any) {
    const item = this.config.findObjectByKey(
      (this.config.selectedList ?? []),
      'dataId',
      value
    );
    if (item) {
      item.level = level;
    }
    return this.selectedValues.indexOf(value) >= 0;
  }

  async reload() {
    this.newTitle = '';
    this.mixDatabaseData = { ...this.defaultData };
  }

  async loadData(pageIndex?: number) {
    this.request.query = '{}';
    if (pageIndex !== undefined) {
      this.request.pageIndex = pageIndex;
    }
    if (this.request.fromDate !== null) {
      const d = new Date(this.request.fromDate);
      this.request.fromDate = d.toISOString();
    }
    if (this.request.toDate !== null) {
      const d = new Date(this.request.toDate);
      this.request.toDate = d.toISOString();
    }
    if (this.config.mixDatabaseId) {
      this.request.mixDatabaseId = this.config.mixDatabaseId;
    }
    if (this.config.mixDatabaseName) {
      this.request.mixDatabaseName = this.config.mixDatabaseName;
    }
    if (this.config.type) {
      this.request.type = this.config.type;
    }
    Object.keys(this.queries).forEach((e) => {
      if (this.queries[e]) {
        this.request[e] = this.queries[e];
      }
    });
    this.request.key = 'data';
    const response = await this.config.dataService.getList(this.request);
    if (response.isSucceed) {
      this.data = response.data;
      this.filterData();
      this.isBusy = false;
    } else {
      this.config.showErrors(response.errors);
      this.isBusy = false;
    }
  }

  filterData() {
    (this.data.items || []).forEach((e: any) => {
      e.disabled = this.selectedValues.indexOf(e.id) >= 0;
    });
    (this.config.selectedList || []).forEach((e: any) => {
      let subIds: any[] = [];
      e.isActived = e.isActived === undefined ? true : e.isActived;
      if (e.attributeData && e.attributeData.obj && e.attributeData.obj.childItems) {
        (e.attributeData.obj.childItems || []).forEach((sub: any) => {
          sub.isActived = this.selectedValues.indexOf(e.id) >= 0;
        });
        subIds = e.attributeData.obj.childItems.map((m: any) => m.id);
      } else if (e.childItems) {
        subIds = e.childItems.map((m: any) => m.id);
      }
      const subData = (this.config.selectedList || []).filter(
        (m: any) => subIds.indexOf(m.dataId) >= 0
      );
      (subData || []).forEach((s: any) => {
        s.disabled = true;
      });
    });
  }

  async select(dataId: any, isSelected: boolean, level: any) {
    let idx = this.selectedValues.indexOf(dataId);
    let nav = (this.config.selectedList ?? [])[idx];
    if (!nav) {
      this.selectedValues.push(dataId);
      nav = { ...this.defaultNav };
      nav.dataId = dataId;
      nav.attributeData = this.config.findObjectByKey(
        this.data.items,
        'id',
        dataId
      );
      if (!this.config.selectedList) this.config.selectedList = [];
      this.config.selectedList.push(nav);
    }
    nav.level = level;
    if (isSelected) {
      nav.isActived = true;
      if (nav.parentId) {
        const saveResult = await this.config.navService.save(nav);
        nav.id = saveResult.data.id;
        this.config.showMessage('success', 'success');
        this.filterData();
      }
    }
    if (!isSelected) {
      await this.removeNav(idx);
      if (this.config.selectCallback) {
        this.config.selectCallback({ data: nav });
      }
      return;
    }
  }

  async removeNav(idx: number) {
    const nav = (this.config.selectedList ?? [])[idx];
    this.selectedValues.splice(idx, 1);
    if (this.config.selectedList) {
      this.config.selectedList.splice(idx, 1);
    }
    this.filterData();
    if (nav && nav.id) {
      await this.config.navService.delete([nav.id]);
      this.config.showMessage('success', 'success');
    }
  }

  disableNavitem(nav: any, isDisable: boolean) {
    nav.disabled = isDisable;
  }

  async createData() {
    if (this.newTitle) {
      const tmp = this.config.findObjectByKey(
        this.data.items,
        'title',
        this.newTitle
      );
      if (!tmp) {
        this.isBusy = true;
        this.mixDatabaseData.parentId = 0;
        this.mixDatabaseData.parentType = 'Set';
        this.mixDatabaseData.obj.title = this.newTitle;
        this.mixDatabaseData.obj.slug = this.config.generateKeyword(
          this.newTitle,
          '-'
        );
        this.mixDatabaseData.obj.type = this.config.type;
        const resp = await this.config.dataService.save(this.mixDatabaseData);
        if (resp.isSucceed) {
          this.data.items.push(resp.data);
          await this.reload();
          await this.select(resp.data.id, true, undefined);
          this.filterData();
          this.isBusy = false;
        } else {
          this.config.showErrors(resp.errors);
          this.isBusy = false;
        }
      } else {
        tmp.isActived = true;
        await this.select(tmp.dataId, true, undefined);
      }
    }
  }
}
