import { Sequelize } from "sequelize";
import { db } from "../config/BlogDatabase.js";

const { DataTypes } = Sequelize;

export const Blogs = db.define(
  "blogs",
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();
