import * as fs from "fs";
import { OAuth2Client } from "google-auth-library";
import * as path from "path";
import { File } from "./File";
import { Query } from "./Query";
import { ICreateFolderOptions, IUpdateMetaOptions } from "./types";

const oAuth2ClientSymbol = Symbol("oAuth2Client");
const SCOPES = "https://www.googleapis.com/auth/drive";

export type TsGoogleDriveOptions = { clientId?: string, clientSecret?: string, refreshToken?: string, scopes?: string | string[] };
export const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";
export const GOOGLE_DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/files";
export const FIELDS = "id,kind,name,mimeType,parents,modifiedTime,createdTime,size";

type ISearchFileOptions = {
  folderOnly?: boolean;
  fileOnly?: boolean;
  nameContains?: string;
  query?: string;
  inParents?: string | number;
};

export class TsGooleDrive {
  constructor(private options: TsGoogleDriveOptions) {
    options.scopes = SCOPES;

  }

  public query() {
    return new Query(this._getClient());
  }

  public async testPermissions() {
    const client = await this._getClient();
  }

  // https://developers.google.com/drive/api/v3/reference/files/get
  public async getFile(id: string) {
    const client = await this._getClient();
    const url = `/files/${id}`;
    const params = { fields: FIELDS };

    try {
      const res = await client.request({ baseURL: GOOGLE_DRIVE_API, url, params });
      const file = new File(client);
      Object.assign(file, res.data);
      return file;
    } catch (err) {
      if (err.code === 404) {
        return undefined;
      }

      throw err;
    }
  }

  // https://developers.google.com/drive/api/v3/reference/files/create
  public async createFolder(options: ICreateFolderOptions = {}) {
    const client = await this._getClient();
    const url = `/files`;
    const params = { fields: FIELDS };
    const data: any = { mimeType: "application/vnd.google-apps.folder", name: options.name, description: options.description };
    if (options.parent) {
      data.parents = [options.parent];
    }

    const res = await client.request({ baseURL: GOOGLE_DRIVE_API, url, params, data, method: "POST" });
    const file = new File(client);
    Object.assign(file, res.data);
    return file;
  }

  // https://developers.google.com/drive/api/v3/reference/files/create
  public async upload(filename: string, options: IUpdateMetaOptions = {}) {
    const client = await this._getClient();
    const params = { uploadType: "media", fields: FIELDS };

    // upload
    const buffer = fs.readFileSync(filename);
    const res = await client.request({ url: GOOGLE_DRIVE_UPLOAD_API, method: "POST", params, body: buffer });

    // create file
    const file = new File(client);
    Object.assign(file, res.data);

    // update meta
    if (!options.name) {
      options.name = path.basename(filename);
    }
    await file.update(options);

    return file;
  }

  // https://developers.google.com/drive/api/v3/reference/files/emptyTrash
  public async emptyTrash() {
    const client = await this._getClient();
    const url = `/files/trash`;
    const params = {};
    const res = await client.request({ baseURL: GOOGLE_DRIVE_API, url, method: "DELETE", params });
    return true;
  }

  private _getClient() {
    const { clientSecret, clientId, refreshToken } = this.options
    const oAuth2Client = new OAuth2Client(clientId, clientSecret);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    return oAuth2Client
  }
}
