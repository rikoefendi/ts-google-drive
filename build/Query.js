"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var File_1 = require("./File");
var TsGooleDrive_1 = require("./TsGooleDrive");
var oAuth2ClientSymbol = Symbol("oAuth2Client");
// https://developers.google.com/drive/api/v3/reference/files/list
// https://developers.google.com/drive/api/v3/search-files
var Query = /** @class */ (function () {
    function Query(client) {
        this.client = client;
        this.queries = [];
        this.pageSize = 100;
        this.orderBy = [];
    }
    Query.prototype.hasNextPage = function () {
        return this.nextPageToken === undefined || !!this.nextPageToken;
    };
    Query.prototype.setPageSize = function (value) {
        this.pageSize = value;
        return this;
    };
    Query.prototype.setOrderBy = function (value) {
        if (Array.isArray(value)) {
            this.orderBy = this.orderBy.concat(value);
        }
        else {
            this.orderBy.push(value);
        }
        return this;
    };
    Query.prototype.setFolderOnly = function () {
        this.queries.push("mimeType='application/vnd.google-apps.folder'");
        return this;
    };
    Query.prototype.setFileOnly = function () {
        this.queries.push("mimeType!='application/vnd.google-apps.folder'");
        return this;
    };
    Query.prototype.setFullTextContains = function (name) {
        this.queries.push("fullText contains '" + name + "'");
        return this;
    };
    Query.prototype.setNameContains = function (name) {
        this.queries.push("name contains '" + name + "'");
        return this;
    };
    Query.prototype.setNameEqual = function (name) {
        this.queries.push("name = '" + name + "'");
        return this;
    };
    Query.prototype.setModifiedTime = function (operator, date) {
        this.queries.push("modifiedTime " + operator + " '" + date.toISOString() + "'");
        return this;
    };
    Query.prototype.setCreatedTime = function (operator, date) {
        this.queries.push("createdTime " + operator + " '" + date.toISOString() + "'");
        return this;
    };
    Query.prototype.setQuery = function (query) {
        this.queries.push(query);
        return this;
    };
    Query.prototype.inFolder = function (folderId) {
        this.queries.push("'" + folderId + "' in parents");
        return this;
    };
    Query.prototype.inTrash = function () {
        this.queries.push("trashed = true");
        return this;
    };
    Query.prototype.runOnce = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setPageSize(1);
                        return [4 /*yield*/, this.run()];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list.length ? list[0] : undefined];
                }
            });
        });
    };
    Query.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, url, params, res, result, list, _i, _a, item, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // if the next page token is ""
                        if (this.nextPageToken === "") {
                            throw new Error("The query has no more next page.");
                        }
                        return [4 /*yield*/, this.client];
                    case 1:
                        client = _b.sent();
                        url = "/files";
                        params = {
                            q: this.queries.join(" and "),
                            spaces: "drive",
                            pageSize: this.pageSize,
                            pageToken: this.nextPageToken,
                            fields: "kind,nextPageToken,incompleteSearch,files(" + TsGooleDrive_1.FIELDS + ")",
                            orderBy: this.orderBy.join(","),
                        };
                        return [4 /*yield*/, client.request({ baseURL: TsGooleDrive_1.GOOGLE_DRIVE_API, url: url, params: params })];
                    case 2:
                        res = _b.sent();
                        result = res.data;
                        // update next page token, we must at least mark it into empty
                        this.nextPageToken = result.nextPageToken || "";
                        list = [];
                        if (result.files && Array.isArray(result.files)) {
                            for (_i = 0, _a = result.files; _i < _a.length; _i++) {
                                item = _a[_i];
                                file = new File_1.File(client);
                                Object.assign(file, item);
                                list.push(file);
                            }
                        }
                        return [2 /*return*/, list];
                }
            });
        });
    };
    return Query;
}());
exports.Query = Query;
