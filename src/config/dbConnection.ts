import { Sequelize, Model, DataTypes } from "sequelize";
const dbConfig = require("../../config/config.json");

export class DbConnection {
  public ENV = process.env.NODE_ENV;
  public connection = dbConfig[this.ENV];

  public connect() {
    const conn = new Sequelize(
      this.connection.database,
      this.connection.username,
      this.connection.password,
      {
        host: this.connection.host,
        dialect: this.connection.dialect,
        port: 5432,
        logging: false,
        define: {
          timestamps: false,
        },
      }
    );
    conn.sync({ force: false, alter: true });
    return conn;
  }
}
