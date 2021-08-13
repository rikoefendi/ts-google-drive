"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.TsGooleDrive = exports.FIELDS = exports.GOOGLE_DRIVE_UPLOAD_API = exports.GOOGLE_DRIVE_API = void 0;
var fs = __importStar(require("fs"));
var google_auth_library_1 = require("google-auth-library");
var path = __importStar(require("path"));
var File_1 = require("./File");
var Query_1 = require("./Query");
var oAuth2ClientSymbol = Symbol("oAuth2Client");
var SCOPES = "https://www.googleapis.com/auth/drive";
exports.GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3";
exports.GOOGLE_DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/files";
exports.FIELDS = "id,kind,name,mimeType,parents,modifiedTime,createdTime,size";
var TsGooleDrive = /** @class */ (function () {
    function TsGooleDrive(options) {
        this.options = options;
        options.scopes = SCOPES;
    }
    TsGooleDrive.prototype.query = function () {
        return new Query_1.Query(this._getClient());
    };
    TsGooleDrive.prototype.testPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getClient()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // https://developers.google.com/drive/api/v3/reference/files/get
    TsGooleDrive.prototype.getFile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var client, url, params, res, file, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getClient()];
                    case 1:
                        client = _a.sent();
                        url = "/files/" + id;
                        params = { fields: exports.FIELDS };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, client.request({ baseURL: exports.GOOGLE_DRIVE_API, url: url, params: params })];
                    case 3:
                        res = _a.sent();
                        file = new File_1.File(client);
                        Object.assign(file, res.data);
                        return [2 /*return*/, file];
                    case 4:
                        err_1 = _a.sent();
                        if (err_1.code === 404) {
                            return [2 /*return*/, undefined];
                        }
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // https://developers.google.com/drive/api/v3/reference/files/create
    TsGooleDrive.prototype.createFolder = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var client, url, params, data, res, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getClient()];
                    case 1:
                        client = _a.sent();
                        url = "/files";
                        params = { fields: exports.FIELDS };
                        data = { mimeType: "application/vnd.google-apps.folder", name: options.name, description: options.description };
                        if (options.parent) {
                            data.parents = [options.parent];
                        }
                        return [4 /*yield*/, client.request({ baseURL: exports.GOOGLE_DRIVE_API, url: url, params: params, data: data, method: "POST" })];
                    case 2:
                        res = _a.sent();
                        file = new File_1.File(client);
                        Object.assign(file, res.data);
                        return [2 /*return*/, file];
                }
            });
        });
    };
    // https://developers.google.com/drive/api/v3/reference/files/create
    TsGooleDrive.prototype.upload = function (filename, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var client, params, buffer, res, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getClient()];
                    case 1:
                        client = _a.sent();
                        params = { uploadType: "media", fields: exports.FIELDS };
                        buffer = fs.readFileSync(filename);
                        return [4 /*yield*/, client.request({ url: exports.GOOGLE_DRIVE_UPLOAD_API, method: "POST", params: params, body: buffer })];
                    case 2:
                        res = _a.sent();
                        file = new File_1.File(client);
                        Object.assign(file, res.data);
                        // update meta
                        if (!options.name) {
                            options.name = path.basename(filename);
                        }
                        return [4 /*yield*/, file.update(options)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, file];
                }
            });
        });
    };
    // https://developers.google.com/drive/api/v3/reference/files/emptyTrash
    TsGooleDrive.prototype.emptyTrash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, url, params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getClient()];
                    case 1:
                        client = _a.sent();
                        url = "/files/trash";
                        params = {};
                        return [4 /*yield*/, client.request({ baseURL: exports.GOOGLE_DRIVE_API, url: url, method: "DELETE", params: params })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    TsGooleDrive.prototype._getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientSecret, clientId, refreshToken, oAuth2Client, googleAuth, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this[oAuth2ClientSymbol]) return [3 /*break*/, 3];
                        _a = this.options, clientSecret = _a.clientSecret, clientId = _a.clientId, refreshToken = _a.refreshToken;
                        if (!(clientId || clientSecret)) return [3 /*break*/, 1];
                        oAuth2Client = new google_auth_library_1.OAuth2Client(clientId, clientSecret);
                        oAuth2Client.setCredentials({ refresh_token: refreshToken });
                        this[oAuth2ClientSymbol] = oAuth2Client;
                        return [3 /*break*/, 3];
                    case 1:
                        googleAuth = new google_auth_library_1.GoogleAuth(this.options);
                        _b = this;
                        _c = oAuth2ClientSymbol;
                        return [4 /*yield*/, googleAuth.getClient()];
                    case 2:
                        _b[_c] = (_d.sent());
                        _d.label = 3;
                    case 3: return [2 /*return*/, this[oAuth2ClientSymbol]];
                }
            });
        });
    };
    return TsGooleDrive;
}());
exports.TsGooleDrive = TsGooleDrive;
