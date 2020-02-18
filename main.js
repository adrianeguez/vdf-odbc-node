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
exports.__esModule = true;
// const ADODB = require('node-adodb');
var ADODB = require("node-adodb");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, queryTablePersona, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = ADODB.open('DSN=DataFlex Test32;');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    queryTablePersona = crearConsulta();
                    return [4 /*yield*/, connection.query(queryTablePersona)];
                case 2:
                    users = _a.sent();
                    console.log(typeof users);
                    console.log(users);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main()
    .then()["catch"]();
function crearConsulta() {
    var fechas = "select * from ALLHITS where ENTRYDATE >= {d '1992-05-27'} AND ENTRYDATE <= {d '1992-07-27'}";
    var numeros = "select * from ALLHITS where RECORD_NUMBER = 3061";
    var like = "select * from ALLHITS where TITLE like '%Love%'";
    var inQuery = "SELECT * FROM ALLHITS WHERE WEEKS IN (4,5)";
    var exists = "SELECT * FROM ALLHITS WHERE EXISTS (select RECORD_NUMBER FROM ALLHITS WHERE WEEKS > 4 AND WEEKS < 6 )";
    var between = "SELECT * FROM ALLHITS WHERE ENTRYDATE BETWEEN {d '1992-05-27'} AND {d '1992-07-27'}";
    return "\n  SELECT Top 15\n  *\n  FROM\n  (\n   SELECT TOP 45\n   *\n   FROM ALLHITS\n   ORDER BY RECORD_NUMBER\n  )\n";
    "\n  SELECT *\n  FROM (\n      SELECT Top 5 sub.ClientCode\n      FROM (\n          SELECT TOP 15 ALLHITS.RECORD_NUMBER\n          FROM ALLHITS\n          ORDER BY ALLHITS.RECORD_NUMBER\n      ) sub\n     ORDER BY sub.RECORD_NUMBER DESC\n  ) subOrdered\n  ORDER BY subOrdered.RECORD_NUMBER\n  ";
}