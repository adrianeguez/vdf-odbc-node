// const ADODB = require('node-adodb');
import * as ADODB from 'node-adodb'; 



async function main() {
    const connection = ADODB.open('DSN=DataFlex Test32;');
    try {
      const queryTablePersona = crearConsulta();
      const users = await connection.query(queryTablePersona);
      console.log(typeof users);
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
  return `
  SELECT Top 15
  *
  FROM
  (
   SELECT TOP 45
   *
   FROM ALLHITS
   ORDER BY RECORD_NUMBER
  )
`;
}
   
