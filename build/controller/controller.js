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
exports.Controller = void 0;
var express_1 = require("express");
var repository_1 = require("../repository/repository");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.handler = function () {
        var _this = this;
        var router = express_1.Router();
        var repo = new repository_1.Repository();
        router.post('/receiverlogin', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, token, r, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, repo.receiverlogin(req.body)];
                    case 1:
                        p = _a.sent();
                        if (!(p.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, repo.createAccessToken(p[0])];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, repo.createRefreshToken(p[0])];
                    case 3:
                        r = _a.sent();
                        //res.json({user: p[0], token: [t, r]});
                        res.send(token);
                        return [3 /*break*/, 5];
                    case 4:
                        res.send(false);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log('error in receiver login');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        router.post('/senderlogin', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, repo.senderlogin(req.body)];
                    case 1:
                        p = _a.sent();
                        if (!(p.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, repo.createAccessToken(p[0])];
                    case 2:
                        token = _a.sent();
                        res.send(token);
                        return [3 /*break*/, 4];
                    case 3:
                        res.send(false);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log('error in sender login' + error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        router.post('/createSender', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var p, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, repo.createSender(req.body)];
                    case 1:
                        p = _a.sent();
                        res.send(p);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log('error in createSender');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.post('/createReceiver', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var l, r, p, token, r_1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        l = { email: req.body.email, password: req.body.password };
                        console.log(l);
                        return [4 /*yield*/, repo.createReceiver(req.body)];
                    case 1:
                        r = _a.sent();
                        return [4 /*yield*/, repo.receiverlogin(l)];
                    case 2:
                        p = _a.sent();
                        if (!(p.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, repo.createAccessToken(p[0])];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, repo.createRefreshToken(p[0])];
                    case 4:
                        r_1 = _a.sent();
                        res.send(token);
                        return [3 /*break*/, 6];
                    case 5:
                        res.send(false);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        console.log('error in createReceiver' + error_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        return router;
    };
    return Controller;
}());
exports.Controller = Controller;
