Ref: https://mixcore.net/swagger/v2/swagger.json
API Base URL: https://mixcore.net

| Method | Path | Summary | Tags | Parameters |
|---|---|---|---|---|
| GET | `/api/v2/rest/en-us/attribute-set/my-data` | Get My Data | en-us-attribute-set | [query] keyword (string, optional)<br>[query] orderBy (string, optional)<br>[query] direction (string, optional)<br>[query] pageSize (integer, optional)<br>[query] pageIndex (integer, optional) |
| GET | `/api/v2/rest/en-us/attribute-set/my-data/delete/{id}` | Delete My Data | en-us-attribute-set | [path] id (string, required) |
| GET | `/api/v2/rest/en-us/attribute-set/my-data/export` | Export My Data | en-us-attribute-set | [query] keyword (string, optional)<br>[query] orderBy (string, optional)<br>[query] direction (string, optional)<br>[query] pageSize (integer, optional)<br>[query] pageIndex (integer, optional) |
| GET | `/api/v2/rest/en-us/attribute-set/my-data/{id}` | Get My Data By Id | en-us-attribute-set | [path] id (string, required) |
| POST | `/api/v2/rest/en-us/attribute-set/my-data` | Save My Data | en-us-attribute-set | [body] model (object, optional) |
| POST | `/api/v2/rest/en-us/attribute-set/my-data/save-properties` | Save My Data Properties | en-us-attribute-set | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-portal/command` | Execute Commands | mix-portal | [body] model (object, optional) |
| GET | `/api/v2/rest/mix-portal/get-by-name/{name}` | Get App Settings by name | mix-portal | [path] name (string, required) |
| GET | `/api/v2/rest/mix-portal/get-config/{name}` | Get App config by name | mix-portal | [path] name (string, required)<br>[query] default (string, optional) |
| GET | `/api/v2/rest/mix-portal/get-editor-configs` | Get Editor Configs | mix-portal | |
| GET | `/api/v2/rest/mix-portal/global-settings` | Get Global Settings | mix-portal | |
| GET | `/api/v2/rest/mix-portal/health-check/readiness` | Health check | mix-portal | |
| GET | `/api/v2/rest/mix-portal/heartbeat` | Health check | mix-portal | |
| GET | `/api/v2/rest/mix-portal/init-data` | Get Init Data | mix-portal | |
| POST | `/api/v2/rest/mix-portal/init-data` | Get Init Data | mix-portal | [body] model (object, optional) |
| GET | `/api/v2/rest/mix-portal/init` | Check Is Init | mix-portal | |
| GET | `/api/v2/rest/mix-portal/is-pwa` | Get Is PWA | mix-portal | |
| GET | `/api/v2/rest/mix-portal/languages` | Get Languages | mix-portal | |
| POST | `/api/v2/rest/mix-portal/login` | Login | mix-portal | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-portal/register` | Register | mix-portal | [body] model (object, optional) |
| GET | `/api/v2/rest/mix-portal/remove-cache/{key}` | Remove Cache | mix-portal | [path] key (string, required) |
| POST | `/api/v2/rest/mix-portal/save-global-settings` | Save Global Settings | mix-portal | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-portal/save-settings` | Save Settings | mix-portal | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-portal/send-pwa-push` | Send PWA Push | mix-portal | [body] model (object, optional) |
| GET | `/api/v2/rest/mix-portal/theme-export` | Exports themes | mix-portal | |
| POST | `/api/v2/rest/mix-portal/theme-import` | Imports themes | mix-portal | |
| GET | `/api/v2/rest/mix-portal/theme-sync/{id}` | Sync Theme | mix-portal | [path] id (integer, required) |
| POST | `/api/v2/rest/mix-portal/toggle-pwa` | Toggle PWA | mix-portal | [body] isPWA (boolean, optional) |
| POST | `/api/v2/rest/mix-portal/translate` | Translate | mix-portal | [body] model (object, optional) |
| GET | `/api/v2/rest/mix-portal` | Get List | mix-portal | [query] keyword (string, optional)<br>[query] orderBy (string, optional)<br>[query] direction (string, optional)<br>[query] pageSize (integer, optional)<br>[query] pageIndex (integer, optional) |
| DELETE | `/api/v2/rest/mix-portal/delete/{id}` | Delete One | mix-portal | [path] id (string, required) |
| POST | `/api/v2/rest/mix-portal/export` | Export Data | mix-portal | [body] request (object, optional) |
| GET | `/api/v2/rest/mix-portal/get-by/{id}` | Get Single | mix-portal | [path] id (string, required) |
| POST | `/api/v2/rest/mix-portal/save` | Create / Update | mix-portal | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-portal/update-infos` | Bulk Update | mix-portal | [body] model (object, optional) |
| GET | `/api/v2/rest/mix-portal/theme` | Get List Theme | mix-portal, theme | [query] keyword (string, optional)<br>[query] pageSize (integer, optional)<br>[query] pageIndex (integer, optional) |
| POST | `/api/v2/rest/mix-portal/theme/delete/{id}` | Delete Theme | mix-portal, theme | [path] id (integer, required) |
| POST | `/api/v2/rest/mix-portal/theme/install/{id}` | Install Theme | mix-portal, theme | [path] id (integer, required) |
| GET | `/api/v2/rest/mix-portal/theme/get-by/{id}` | Get Theme | mix-portal, theme | [path] id (integer, required) |
| POST | `/api/v2/rest/mix-portal/theme/save` | Save Theme | mix-portal, theme | [body] model (object, optional) |
| POST | `/api/v2/rest/shared/decrypt` | Encrypt string | shared | [body] source (string, optional) |
| POST | `/api/v2/rest/shared/encrypt` | Encrypt string | shared | [body] source (string, optional) |
| POST | `/api/v2/rest/shared/get-firebase-token` | Get Encrypted firebase settings | shared | [body] session (object, optional) |
| GET | `/api/v2/rest/shared/get-ip-info` | Get Ip Info | shared | |
| POST | `/api/v2/rest/shared/upload-file` | Upload File | shared | |
| POST | `/api/v2/rest/shared/upload-files` | Upload multiple files | shared | |
| POST | `/api/v2/rest/{culture}/attribute-set-data/filter` | Filter | {culture}-attribute-set-data | [path] culture (string, required)<br>[body] request (object, optional) |
| GET | `/api/v2/rest/{culture}/attribute-set/default` | Get Default | {culture}-attribute-set | [path] culture (string, required) |
| POST | `/api/v2/rest/{culture}/configuration/save` | Create / Update | {culture}-configuration | [path] culture (string, required)<br>[body] model (object, optional) |
| POST | `/api/v2/rest/{culture}/file/save` | Create / Update | {culture}-file | [path] culture (string, required)<br>[body] model (object, optional) |
| POST | `/api/v2/rest/{culture}/language/save` | Create / Update | {culture}-language | [path] culture (string, required)<br>[body] model (object, optional) |
| POST | `/api/v2/rest/{culture}/mix-database-data/get-by-parent/{parentId}` | Get MixDatabaseData By Parent Id | {culture}-mix-database-data | [path] culture (string, required)<br>[path] parentId (string, required)<br>[body] request (object, optional) |
| POST | `/api/v2/rest/{culture}/mix-database/get-by-name` | Get MixDatabase By Name | {culture}-mix-database | [path] culture (string, required)<br>[body] name (string, optional) |
| GET | `/api/v2/rest/{culture}/module-data/get-by-parent-id/{id}` | Get Module Data by parent | {culture}-module-data | [path] culture (string, required)<br>[path] id (integer, required)<br>[query] keyword (string, optional)<br>[query] orderBy (string, optional)<br>[query] direction (string, optional)<br>[query] pageSize (integer, optional)<br>[query] pageIndex (integer, optional) |
| GET | `/api/v2/rest/{culture}/module/restore-default/{id}` | Restore Default Template | {culture}-module | [path] culture (string, required)<br>[path] id (integer, required) |
| POST | `/api/v2/rest/{culture}/page-module/update-positions` | Update page modules positions | {culture}-page-module | [path] culture (string, required)<br>[body] model (object, optional) |
| GET | `/api/v2/rest/{culture}/page/get-by-url` | Get Page By Url | {culture}-page | [path] culture (string, required)<br>[query] url (string, optional) |
| GET | `/api/v2/rest/{culture}/post/get-by-url` | Get Post By Url | {culture}-post | [path] culture (string, required)<br>[query] url (string, optional) |
| GET | `/api/v2/rest/{culture}/theme/get-by-name/{name}` | Get Theme By Name | {culture}-theme | [path] culture (string, required)<br>[path] name (string, required) |
| GET | `/api/v2/rest/{culture}/url-alias/get-by-alias` | Get Url Alias By Alias | {culture}-url-alias | [path] culture (string, required)<br>[query] alias (string, optional) |
| GET | `/api/v2/rest/{culture}/{controller}/default` | Get Default | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required) |
| GET | `/api/v2/rest/{culture}/{controller}` | Get List | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[query] keyword (string, optional)<br>[query] orderBy (string, optional)<br>[query] direction (string, optional)<br>[query] pageSize (integer, optional)<br>[query] pageIndex (integer, optional) |
| GET | `/api/v2/rest/{culture}/{controller}/delete/{id}` | Delete One | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[path] id (string, required) |
| POST | `/api/v2/rest/{culture}/{controller}/duplicate/{id}` | Duplicate | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[path] id (string, required) |
| POST | `/api/v2/rest/{culture}/{controller}/export` | Export Data | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[body] request (object, optional) |
| GET | `/api/v2/rest/{culture}/{controller}/{id}` | Get Single | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[path] id (string, required) |
| POST | `/api/v2/rest/{culture}/{controller}/save` | Create / Update | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[body] model (object, optional) |
| POST | `/api/v2/rest/{culture}/{controller}/update-infos` | Bulk Update | {culture}-{controller} | [path] culture (string, required)<br>[path] controller (string, required)<br>[body] model (object, optional) |
| GET | `/api/v2/rest` | Get all endpoint | | |
| POST | `/api/v2/rest/mix-media/get-by-url` | Get Media By Url | mix-media | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-post/get-by-url` | Get Post By Url | mix-post | [body] model (object, optional) |
| POST | `/api/v2/rest/mix-template/get-by-name` | Get Template By Name | mix-template | [body] model (object, optional) |
| GET | `/api/v2/rest/portal/app-settings/get-by-name` | Get App Settings | portal | [query] name (string, optional) |
| POST | `/api/v2/rest/portal/app-settings/save` | Save App Settings | portal | [body] model (object, optional) |
| GET | `/api/v2/rest/portal/configurations/get-by-keyword/{keyword}` | Get Configuration by keyword | portal | [path] keyword (string, required) |
| GET | `/api/v2/rest/portal/culture/get-by-code/{code}` | Get Language by code | portal | [path] code (string, required) |
| GET | `/api/v2/rest/portal/culture` | Get list languages | portal | |
| POST | `/api/v2/rest/portal/translate/jarray` | Translate array object | portal | [body] data (object, optional)<br>[query] srcLang (string, optional)<br>[query] destLang (string, optional) |
| POST | `/api/v2/rest/portal/translate` | Translate object | portal | [body] data (object, optional)<br>[query] srcLang (string, optional)<br>[query] destLang (string, optional) |
| GET | `/api/v2/rest/portal/translator/get-by-keyword` | Get Translator by keyword | portal | [query] keyword (string, optional)<br>[query] culture (string, optional)<br>[query] default (string, optional) |