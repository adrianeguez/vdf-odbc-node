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
var SqlString = require("sqlstring");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, queryTablePersona, dealers, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = ADODB.open('DSN=DataFlex Test32;');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    queryTablePersona = crearConsulta();
                    console.log(queryTablePersona);
                    return [4 /*yield*/, connection.query('select * from dealers')
                        // console.log(dealers);
                    ];
                case 2:
                    dealers = _a.sent();
                    return [4 /*yield*/, connection.execute(queryTablePersona)];
                case 3:
                    users = _a.sent();
                    console.log(users);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
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
    var registro = {
        NAME: 'a',
        ADDR1: 'a',
        ADDR2: 'a',
        ADDR3: 'a',
        COUNTRY: 'a',
        PHONE: 'a',
        FAX: 'a',
        EMAIL: 'a',
        ACTIVE: 'a'
    };
    var registroHits = {
        ENTRYDATE: '1992-07-27',
        WEEKS: 3,
        TITLE: 'MA',
        ARTIST: 'ME',
        SINGLE_ALBUM: 'C',
        POP_COUNTRY: 'S'
    };
    //const insercion = crearConsultaInsercion('DEALERS', registro);
    var insercion = crearConsultaInsercion('ALLHITS', registroHits);
    console.log(insercion);
    return "";
    "INSERT INTO ALLHITS (\n    ENTRYDATE, \n    WEEKS, \n    TITLE, \n    ARTIST, \n    SINGLE_ALBUM, \n    POP_COUNTRY \n  ) VALUES({d '1992-07-27'},3,'I Saw the Light','Wynonna','S','C')";
}
function crearConsultaInsercion(nombreTabla, objeto) {
    var consulta = "INSERT INTO " + nombreTabla + " ( ";
    var parametros = '';
    var valores = [];
    var arregloObjeto = Object.keys(objeto);
    arregloObjeto
        .forEach(function (llave, indice) {
        var coma = indice === arregloObjeto.length - 1 ? '' : ',';
        consulta = consulta + ("" + llave + coma + " ");
        parametros = parametros + ("?" + coma + " ");
        var valor = objeto[llave];
        if (typeof valor.getMonth === 'function') {
            valores.push("{d " + formatDate(valor) + "}");
        }
        else {
            if (typeof objeto[llave] === 'string') {
                var esFechaValida = esFechaString(objeto[llave]);
                if (esFechaValida) {
                    valores.push("{d " + valor + "}");
                }
                else {
                    valores.push(objeto[llave]);
                }
            }
            else {
                valores.push(objeto[llave]);
            }
        }
    });
    consulta = consulta + (") VALUES ( " + parametros + " )");
    return SqlString.format(consulta, valores);
}
function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
function esFechaString(fecha) {
    var splitFecha = fecha.split('-');
    if (splitFecha.length === 3) {
        var anio = splitFecha[0];
        var mes = splitFecha[1];
        var dia = splitFecha[2];
        var primeroTieneCuatroDigitos = anio.length === 4;
        var segundoTieneDosDigitos = mes.length === 2;
        var terceroTieneDosDigitos = dia.length === 2;
        var anioNumero = Number(anio);
        var mesNumero = Number(mes);
        var diaNumero = Number(dia);
        var primeroEsNumero = !isNaN(anioNumero);
        var segundoEsNumero = !isNaN(mesNumero);
        var terceroEsNumero = !isNaN(diaNumero);
        var primeroValido = primeroTieneCuatroDigitos && primeroEsNumero;
        var segundoValido = segundoTieneDosDigitos && segundoEsNumero;
        var terceroValido = terceroTieneDosDigitos && terceroEsNumero;
        if (primeroValido && segundoValido && terceroValido) {
            var mesValido = mesNumero > 1 && mesNumero < 12;
            var anioValido = anioNumero > 0 && anioNumero < 4000;
            var diaValido = diaNumero > 1 && diaNumero < 31;
            if (mesValido && anioValido && diaValido) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
