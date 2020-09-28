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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mariadb = __importStar(require("mariadb"));
var jwt = require('jsonwebtoken');
require('dotenv').config();
var Repository = /** @class */ (function () {
    function Repository() {
        this.pool = mariadb.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'pts',
            connectionLimit: 5
        });
    }
    Repository.prototype.createSender = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.number, sender.photo, sender.zib, sender.street, sender.housenr])];
                    case 1:
                        x = _a.sent();
                        console.log(x);
                        return [2 /*return*/, x];
                    case 2:
                        ex_1 = _a.sent();
                        console.log("error in createUser repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.createReceiver = function (receiver) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO receiver VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, receiver.name, receiver.veh, receiver.username, receiver.password, receiver.firstname, receiver.lastname, receiver.sex, receiver.email, receiver.number, receiver.photo, receiver.zib, receiver.street, receiver.housenr])];
                    case 1:
                        x = _a.sent();
                        console.log(x);
                        return [2 /*return*/, x];
                    case 2:
                        ex_2 = _a.sent();
                        console.log("error in createReceiver repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.newRoute = function (id, car) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO route VALUE (?, ?, ?, ?, ?)", [null, new Date(Date.now()), null, car, id])];
                    case 1:
                        x = _a.sent();
                        console.log(x);
                        return [2 /*return*/, x];
                    case 2:
                        ex_3 = _a.sent();
                        console.log("error in newRoute repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.endRoute = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("UPDATE route SET endtime = ? WHERE id = ?", [new Date(Date.now()), id])];
                    case 1:
                        x = _a.sent();
                        console.log(x);
                        return [2 /*return*/, x];
                    case 2:
                        ex_4 = _a.sent();
                        console.log("error in endRoute repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.savePosition = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO position VALUE (?, ?, ?, ?, ?)", [null, position.routeid, position.lat, position.lng, new Date(Date.now())])];
                    case 1:
                        x = _a.sent();
                        console.log(x);
                        return [2 /*return*/, x];
                    case 2:
                        ex_5 = _a.sent();
                        console.log("error in save repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.createToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                try {
                    token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600 });
                    return [2 /*return*/, { token: token }];
                }
                catch (ex) {
                    console.log("error in create token");
                }
                return [2 /*return*/];
            });
        });
    };
    Repository.prototype.senderlogin = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("select id, username, password, firstname, lastname, sex, email, number, photo, zib, street, housenr from sender where email=? AND password=?", [sender.email, sender.password])
                            //console.log(x)
                        ];
                    case 1:
                        x = _a.sent();
                        //console.log(x)
                        return [2 /*return*/, x];
                    case 2:
                        ex_6 = _a.sent();
                        console.log("error in sender login");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.receiverlogin = function (receiver) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("select id, name, veh, username, firstname, lastname, sex, email, number, photo, zib, street, housenr from receiver where email=? AND password=?", [receiver.email, receiver.password])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_7 = _a.sent();
                        console.log("error in receiver login");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Repository;
}());
exports.Repository = Repository;
