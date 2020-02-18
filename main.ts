// const ADODB = require('node-adodb');
import * as ADODB from 'node-adodb'; 
import * as SqlString from'sqlstring';

async function main() {
    const connection = ADODB.open('DSN=DataFlex Test32;');
    try {
      const queryTablePersona = crearConsulta();
      console.log(queryTablePersona);
      const dealers = await connection.query('select * from dealers')
      // console.log(dealers);
      const users = await connection.execute(queryTablePersona);
      console.log(users);
    } catch (error) {
      console.error(error);
    }
}

main()
.then()
.catch();

function crearConsulta(){
  const fechas = `select * from ALLHITS where ENTRYDATE >= {d '1992-05-27'} AND ENTRYDATE <= {d '1992-07-27'}`;
  const numeros = `select * from ALLHITS where RECORD_NUMBER = 3061`;
  const like = `select * from ALLHITS where TITLE like '%Love%'`;
  const inQuery = `SELECT * FROM ALLHITS WHERE WEEKS IN (4,5)`;
  const exists = `SELECT * FROM ALLHITS WHERE EXISTS (select RECORD_NUMBER FROM ALLHITS WHERE WEEKS > 4 AND WEEKS < 6 )`;
  const between = `SELECT * FROM ALLHITS WHERE ENTRYDATE BETWEEN {d '1992-05-27'} AND {d '1992-07-27'}`
  const registro = {
    NAME:'a',
    ADDR1:'a',
    ADDR2:'a',
    ADDR3:'a',
    COUNTRY:'a',
    PHONE:'a',
    FAX:'a',
    EMAIL:'a',
    ACTIVE: 'a'
  }
  const registroHits = {
    ENTRYDATE: '1992-07-27', 
    WEEKS:3, 
    TITLE:'MA', 
    ARTIST:'ME', 
    SINGLE_ALBUM:'C', 
    POP_COUNTRY:'S'
  }
  //const insercion = crearConsultaInsercion('DEALERS', registro);
  const insercion = crearConsultaInsercion('ALLHITS', registroHits);
  console.log(insercion);
  return ``;
  `INSERT INTO ALLHITS (
    ENTRYDATE, 
    WEEKS, 
    TITLE, 
    ARTIST, 
    SINGLE_ALBUM, 
    POP_COUNTRY 
  ) VALUES({d '1992-07-27'},3,'I Saw the Light','Wynonna','S','C')`;

}
   
function crearConsultaInsercion(
  nombreTabla: string,
  objeto:{ [key: string]: number | string | Date}
  ):string {
    let consulta = `INSERT INTO ${nombreTabla} ( `;
    let parametros = '';
    let valores = [];
    const arregloObjeto = Object.keys(objeto);
    arregloObjeto
      .forEach(
        (llave, indice) => {
          const coma = indice === arregloObjeto.length - 1 ? '':',';
          consulta = consulta + `${llave}${coma} `; 
          parametros = parametros + `?${coma} `
          const valor = objeto[llave] as Date; 
          if(typeof valor.getMonth === 'function'){
            valores.push(`{d ${formatDate(valor)}}`)
          } else {
            if(typeof objeto[llave] === 'string'){
              const esFechaValida = esFechaString(objeto[llave] as string)
              if(esFechaValida){
                valores.push(`{d ${valor}}`)
              }else{
                valores.push(objeto[llave]);
              }
            } else {
              valores.push(objeto[llave]);
            }
          }
        }
      );
    consulta = consulta + `) VALUES ( ${parametros} )`
    return SqlString.format(consulta, valores)
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function esFechaString(fecha:string){
  const splitFecha = fecha.split('-');
  if(splitFecha.length === 3){
    const anio = splitFecha[0];
    const mes = splitFecha[1];
    const dia = splitFecha[2];
  
    const primeroTieneCuatroDigitos = anio.length === 4;
    const segundoTieneDosDigitos = mes.length === 2;
    const terceroTieneDosDigitos = dia.length === 2;
    const anioNumero = Number(anio);
    const mesNumero = Number(mes);
    const diaNumero = Number(dia);
    const primeroEsNumero = !isNaN(anioNumero);
    const segundoEsNumero = !isNaN(mesNumero);
    const terceroEsNumero = !isNaN(diaNumero);
    const primeroValido = primeroTieneCuatroDigitos && primeroEsNumero;
    const segundoValido = segundoTieneDosDigitos && segundoEsNumero;
    const terceroValido = terceroTieneDosDigitos && terceroEsNumero;
    if(primeroValido && segundoValido && terceroValido){
      const mesValido = mesNumero > 1 && mesNumero < 12;
      const anioValido = anioNumero > 0 && anioNumero < 4000;
      const diaValido = diaNumero > 1 && diaNumero < 31;
      if(mesValido && anioValido && diaValido){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }else{
    return false;
  }
  
 

}