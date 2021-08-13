/// <reference types="node" />
import { OAuth2Client } from "google-auth-library";
import { IUpdateMetaOptions } from "./types";
export declare class File {
    id: string;
    name: string;
    mimeType: string;
    kind: string;
    modifiedTime: string;
    createdTime: string;
    size: number;
    parents: string[];
    constructor(oAuth2Client: OAuth2Client);
    get modifiedAt(): Date;
    get createdAt(): Date;
    get isFolder(): boolean;
    download(): Promise<Buffer>;
    update(options?: IUpdateMetaOptions): Promise<void>;
    delete(): Promise<boolean>;
    private _getClient;
}
