import { Sequelize, DataTypes, ModelDefined } from "sequelize";

const postgresConfig = {
  host: "localhost",
  port: 5432,
  username: "nicholasfemia",
};

export const UsersDB = new Sequelize(
  "users",
  postgresConfig.username,
  undefined,
  {
    dialect: "postgres",
  }
);

const User: ModelDefined<UserAttributes, UserAttributes> = UsersDB.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }
);

interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

export const DBmodels = {
  User,
};
