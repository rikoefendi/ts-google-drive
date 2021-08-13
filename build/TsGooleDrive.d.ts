import { GoogleAuthOptions } from "google-auth-library";
import { File } from "./File";
import { Query } from "./Query";
import { ICreateFolderOptions, IUpdateMetaOptions } from "./types";
declare const oAuth2ClientSymbol: unique symbol;
export declare type TsGoogleDriveOptions = GoogleAuthOptions & {
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
};
export declare const GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";
export declare const GOOGLE_DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/files";
export declare const FIELDS = "id,kind,name,mimeType,parents,modifiedTime,createdTime,size";
export declare class TsGooleDrive {
    private options;
    private [oAuth2ClientSymbol];
    constructor(options: TsGoogleDriveOptions);
    query(): Query;
    testPermissions(): Promise<void>;
    getFile(id: string): Promise<File | undefined>;
    createFolder(options?: ICreateFolderOptions): Promise<File>;
    upload(filename: string, options?: IUpdateMetaOptions): Promise<File>;
    emptyTrash(): Promise<boolean>;
    private _getClient;
}
export {};
