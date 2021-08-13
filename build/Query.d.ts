import { OAuth2Client } from "google-auth-library";
import { File } from "./File";
declare type IOperator = "=" | ">" | ">=" | "<" | "<=";
declare type orderByKey = "createdTime" | "folder" | "modifiedByMeTime" | "modifiedTime" | "name" | "name_natural" | "quotaBytesUsed" | "recency" | "sharedWithMeTime" | "starred" | "viewedByMeTime";
export declare class Query {
    private client;
    queries: string[];
    pageSize: number;
    orderBy: string[];
    private nextPageToken?;
    constructor(client: Promise<OAuth2Client>);
    hasNextPage(): boolean;
    setPageSize(value: number): this;
    setOrderBy(value: orderByKey | orderByKey[]): this;
    setFolderOnly(): this;
    setFileOnly(): this;
    setFullTextContains(name: string): this;
    setNameContains(name: string): this;
    setNameEqual(name: string): this;
    setModifiedTime(operator: IOperator, date: Date): this;
    setCreatedTime(operator: IOperator, date: Date): this;
    setQuery(query: string): this;
    inFolder(folderId: string): this;
    inTrash(): this;
    runOnce(): Promise<File | undefined>;
    run(): Promise<File[]>;
}
export {};
