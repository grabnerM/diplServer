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
exports.Repository = void 0;
var mariadb = __importStar(require("mariadb"));
var jwt = require('jsonwebtoken');
require('dotenv').config();
var Repository = /** @class */ (function () {
    function Repository() {
        this.pool = mariadb.createPool({
            host: '195.128.100.64',
            user: 'pts',
            password: 'sXkh8XkBWYVfZAy',
            database: 'pts',
            connectionLimit: 15
        });
    }
    Repository.prototype.getReceiverPayload = function (authHeader) {
        try {
            var token = authHeader && authHeader.split(' ')[1];
            var payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return payload.user.receiverid;
        }
        catch (ex) {
            return false;
        }
    };
    Repository.prototype.createSender = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO sender VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, sender.username, sender.password, sender.firstname, sender.lastname, sender.sex, sender.email, sender.zip, sender.street, sender.housenr, sender.city])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_1 = _a.sent();
                        console.log("error in createSender repo" + ex_1);
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
                        return [4 /*yield*/, this.pool.query("INSERT INTO receiver VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [null, receiver.username, receiver.password, receiver.firstname, receiver.lastname, receiver.sex, receiver.email, receiver.number, receiver.zip, receiver.street, receiver.housenr, receiver.city])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_2 = _a.sent();
                        console.log("error in createReceiver repo" + ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.newRoute = function (id, task) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO route VALUE (?, ?, ?, ?, ?)", [null, new Date(Date.now()), null, task.id, id])];
                    case 1:
                        x = _a.sent();
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
                        return [4 /*yield*/, this.pool.query("UPDATE route SET endtime = ? WHERE routeid = ? and endtime is null", [new Date(Date.now()), id])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_4 = _a.sent();
                        console.log("error in endRoute repo: " + ex_4);
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
                        return [2 /*return*/, x];
                    case 2:
                        ex_5 = _a.sent();
                        console.log("error in savepos repo: " + ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.createTask = function (id, task) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("INSERT INTO task VALUE (?, ?, ?, ?, ?, ?, ?, ?)", [null, task.startlat, task.startlng, task.endlat, task.endlng, task.description, task.status, id])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_6 = _a.sent();
                        console.log("error in createTask repo: " + ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.createAccessToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                try {
                    token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1800 });
                    return [2 /*return*/, token];
                }
                catch (ex) {
                    console.log("error in create token");
                }
                return [2 /*return*/];
            });
        });
    };
    Repository.prototype.createRefreshToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                try {
                    token = jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 2.628e+6 });
                    return [2 /*return*/, { refreshtoken: token }];
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
            var x, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("select * from sender where email=? AND password=?", [sender.email, sender.password])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_7 = _a.sent();
                        console.log("error in sender login");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.receiverlogin = function (receiver) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("select receiverid, username, firstname, lastname, sex, email, number, zip, street, housenr, city from receiver"
                                + " where email=? AND password=?", [receiver.email, receiver.password])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_8 = _a.sent();
                        console.log("error in receiver login repository: " + ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.getAllPositions = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("SELECT distinct ro.*, p.lat, p.lng, max(p.time), s.senderid, s.username, s.firstname, s.lastname"
                                + " from task t join route ro on (t.taskid = ro.taskid) join position p on (ro.routeid = p.routeid) join sender s on (s.senderid = ro.senderid)"
                                + " where t.receiverid = ? group by s.senderid;", [id])
                            /* = await this.pool.query("SELECT distinct ro.*, p.lat, p.lng, max(p.time), s.senderid, s.username, s.firstname, s.lastname"
                            + " FROM receiver r JOIN receiver_sender rs ON (r.receiverid = rs.receiverid) JOIN sender s ON (rs.senderid = s.senderid) JOIN route ro ON(rs.rsid = ro.rsid) JOIN position p ON (p.routeid = ro.routeid)"
                            + " where r.receiverid = ? group BY s.senderid;", [id])*/
                        ];
                    case 1:
                        x = _a.sent();
                        /* = await this.pool.query("SELECT distinct ro.*, p.lat, p.lng, max(p.time), s.senderid, s.username, s.firstname, s.lastname"
                        + " FROM receiver r JOIN receiver_sender rs ON (r.receiverid = rs.receiverid) JOIN sender s ON (rs.senderid = s.senderid) JOIN route ro ON(rs.rsid = ro.rsid) JOIN position p ON (p.routeid = ro.routeid)"
                        + " where r.receiverid = ? group BY s.senderid;", [id])*/
                        return [2 /*return*/, x];
                    case 2:
                        ex_9 = _a.sent();
                        console.log("error in getAllPositions repo: " + ex_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.getOpenTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("select distinct t.*, r.username from task t join receiver r on (t.receiverid = r.receiverid) "
                                + "where t.status = -1")];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_10 = _a.sent();
                        console.log("error in getAllPositions repo: " + ex_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.getRouteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("Select p.positionid, p.lat, p.lng, p.time from route r join position p on(r.routeid = p.routeid) where r.routeid = ?", [id])];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, x];
                    case 2:
                        ex_11 = _a.sent();
                        console.log("error in getRouteById repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.findOldRoutesByReceiver = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var x, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.query("select ro.*, s.*"
                                + " from task t join route ro on (t.taskid = ro.taskid) join sender s on (ro.senderid = s.senderid)"
                                + " where t.receiverid = ? and ro.endtime is not null;", [id])];
                    case 1:
                        x = _a.sent();
                        /* = await this.pool.query("select r.*, s.* from receiver re join receiver_sender rs on (re.receiverid = rs.receiverid) join sender s on (rs.senderid = s.senderid) join route r on (rs.rsid = r.rsid)"
                        + " where re.receiverid = ? and r.endtime is not null", [id])*/
                        return [2 /*return*/, x];
                    case 2:
                        ex_12 = _a.sent();
                        console.log("error in findOldRoutesByReceiver repo");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*    public async findMostDrivingSender(id: any){
            try {
                let x = await this.pool.query("select s.*, count(r.routeid) from receiver re join receiver_sender rs on (re.receiverid = rs.receiverid) join sender s on (rs.senderid = s.senderid) join route r on (rs.rsid = r.rsid)"
                + " where re.receiverid = ? group by s.senderid", [id])
            
                return x
            } catch (ex) {
                console.log("error in findMostDrivingSender repo")
            }
        }*/
    Repository.prototype.findAllRoutesByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var x /* = await this.pool.query("select r.*, s.* from route r join receiver_sender rs on (r.rsid = rs.rsid) join sender s on (rs.senderid = s.senderid) WHERE r.rsid = ?", [id]);*/;
            return __generator(this, function (_a) {
                try {
                    x = void 0;
                    return [2 /*return*/, x];
                }
                catch (ex) {
                    console.log("error in findAllRoutesByUser repo");
                }
                return [2 /*return*/];
            });
        });
    };
    return Repository;
}());
exports.Repository = Repository;
