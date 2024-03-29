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
exports.ReceiverController = void 0;
var express_1 = require("express");
var repository_1 = require("../repository/repository");
var jwt = require('jsonwebtoken');
require('dotenv').config();
var ReceiverController = /** @class */ (function () {
    function ReceiverController() {
    }
    ReceiverController.handler = function () {
        var _this = this;
        var router = express_1.Router();
        var repo = new repository_1.Repository();
        router.get('/echo', function (req, res) {
            res.send('Hello NodeJS');
        });
        router.get('/getUser', function (req, res) {
            var authHeader = req.headers['authorization'];
            var token = authHeader && authHeader.split(' ')[1];
            var payload;
            try {
                payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            }
            catch (e) {
                console.log("token expired or invalid");
            }
            res.json(payload.user);
        });
        router.get('/getUserId', function (req, res) {
            var payload = 0;
            try {
                payload = repo.getReceiverPayload(req.headers['authorization']);
                console.log(repo.getReceiverPayload(req.headers['authorization']));
            }
            catch (e) {
                console.log("token expired or invalid");
            }
            res.json(payload);
        });
        router.get('/getAllPositions/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getAllPositions(repo.getReceiverPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('error in getAllRoutes');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getRouteById/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getRouteById(req.params.id)];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.log("error in getRouteById controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/findOldRoutes/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.findOldRoutesByReceiver(repo.getReceiverPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        console.log("error in findOldRoutes receivercontroller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/findMostDrivingSender/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p // = await repo.findMostDrivingSender(repo.getReceiverPayload(req.headers['authorization']))
            ;
            return __generator(this, function (_a) {
                try {
                    p = void 0;
                    res.send(p);
                }
                catch (ex) {
                    console.log("error in findMostDrivingSender controller");
                }
                return [2 /*return*/];
            });
        }); });
        router.get('/findAllRoutesByUser/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.findAllRoutesByUser(repo.getReceiverPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("error in findAllRoutesByUser controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.post('/createTask/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.createTask(repo.getReceiverPayload(req.headers['authorization']), req.body)];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        console.log("error in createTask controller " + ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getOpenTasksByReceiver/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getOpenTasksByReceiver(repo.getReceiverPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        console.log("error in getOpenTasksByReceiver controller " + ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getRouteByTask/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getRouteByTask(req.params.id)];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        console.log("error in getRouteByTask controller");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/getCreatedTasks/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.getCreatedTasks(repo.getReceiverPayload(req.headers['authorization']))];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        console.log("error in getCreatedTasks controller " + ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return router;
    };
    return ReceiverController;
}());
exports.ReceiverController = ReceiverController;
