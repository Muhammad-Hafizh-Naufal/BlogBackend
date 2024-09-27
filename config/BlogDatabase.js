import { Sequelize } from "sequelize";

export const db = new Sequelize("myblog", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
