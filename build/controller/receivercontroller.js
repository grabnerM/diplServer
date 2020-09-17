"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var repository_1 = require("../repository/repository");
var ReceiverController = /** @class */ (function () {
    function ReceiverController() {
    }
    ReceiverController.handler = function () {
        var router = express_1.Router();
        var repo = new repository_1.Repository();
        router.get('/echo', function (req, res) {
            res.send('Hello NodeJS');
        });
        return router;
    };
    return ReceiverController;
}());
exports.ReceiverController = ReceiverController;
