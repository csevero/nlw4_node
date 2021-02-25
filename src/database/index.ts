import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export default async (): Promise<Connection> => {
   const defaultOptions = await getConnectionOptions();

   return createConnection(
      //basicamente estamos pegando o objeto que criamos acima, que no caso é as configurações do ormconfig.json, e estamos usando o Object.assign para substituir um campo específico do nosso objeto, verificamos primeiro se a variável NODE_ENV é test, se sim, alteramos o nosso database para um de teste se não for irá continuar usando as configurações padrões
      Object.assign(defaultOptions, {
         database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database
      })
   );
}