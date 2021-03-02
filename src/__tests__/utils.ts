import { createConnection, getConnection } from "typeorm";

function beforeAllAndAfterAll() {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });
}

export default beforeAllAndAfterAll;
