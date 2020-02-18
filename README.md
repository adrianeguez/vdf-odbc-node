# vdf-odbc-node

## Busqueda de `fechas` flexodbc

```sql
SELECT * FROM nombre_tabla 
WHERE nombre_campo >= {d 'aaaa-mm-dd'} AND ENTRYDATE <= {d 'aaaa-mm-dd'};
```

## Busqueda de `numeros` flexodbc

```sql
SELECT * FROM nombre_tabla WHERE nombre_campo = 0000;    
```

## Busqueda de `LIKE` flexodbc

```sql
SELECT * FROM nombre_tabla WHERE nombre_campo LIKE '%Love%'   
```


## Busqueda de `IN` flexodbc

```sql
SELECT * FROM nombre_tabla WHERE nombre_campo IN (4,5)  
```

## Busqueda de `EXISTS` flexodbc

```sql
SELECT * FROM nombre_tabla WHERE EXISTS (
select nombre_campo 
FROM nombre_tabla 
WHERE nombre_campo > 4 AND nombre_campo < 6 )
```

## Busqueda de `BETWEEN` flexodbc

```sql
SELECT * FROM ALLHITS 
WHERE ENTRYDATE 
BETWEEN {d '1992-05-27'} AND {d '1992-07-27'}
```

