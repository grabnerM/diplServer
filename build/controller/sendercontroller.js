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
exports.SenderController = void 0;
var express_1 = require("express");
var repository_1 = require("../repository/repository");
var websocket_1 = require("../websocket/websocket");
var SenderController = /** @class */ (function () {
    function SenderController() {
    }
    SenderController.handler = function () {
        var _this = this;
        var router = express_1.Router();
        var repo = new repository_1.Repository();
        var ws = websocket_1.Websocket.getInstance();
        router.get('/echo', function (req, res) {
            res.send('Hello NodeJS');
        });
        router.post('/savePosition', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, i, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, repo.savePosition(req.body)];
                    case 1:
                        p = _a.sent();
                        return [4 /*yield*/, repo.getReceiverByRoute(req.body.routeid)];
                    case 2:
                        i = _a.sent();
                        ws.broadcast('Data changed ' + i[0].receiverid);
                        res.send(p);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log('error in save pos');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/startRoute/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, i, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, repo.startRoute(req.params.id)];
                    case 1:
                        p = _a.sent();
                        return [4 /*yield*/, repo.getReceiverByRoute(req.params.id)];
                    case 2:
                        i = _a.sent();
                        ws.broadcast('Data changed ' + i[0].receiverid);
                        res.send(p);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log('error in new route');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/endRoute/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, i, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, repo.endRoute(req.params.id)];
                    case 1:
                        p = _a.sent();
                        return [4 /*yield*/, repo.getReceiverByRoute(req.params.id)];
                    case 2:
                        i = _a.sent();
                        ws.broadcast('Data changed ' + i[0].receiverid);
                        res.send(p);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log('error in endRoute controller');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getOpenTasks/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getOpenTasks()];
                    case 1:
                        p = _a.sent();
                        ws.broadcast('Data changed');
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.log('error in getOpenTasks controller ' + ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/acceptTask/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.acceptTask(repo.getSenderPayload(req.headers['authorization']), req.params.id)];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        console.log('error in acceptTask controller ' + ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getOpenTasksBySender/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getOpenTasksBySender(repo.getSenderPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        console.log('error in getOpenTasksBySender controller ' + ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getFinishedTasksBySender/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getFinishedTasksBySender(repo.getSenderPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        console.log('error in getOpenTasksBySender controller ' + ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return router;
    };
    return SenderController;
}());
exports.SenderController = SenderController;
