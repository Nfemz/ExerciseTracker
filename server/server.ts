const express = require("express");
import { Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
import resolvers from "./graphql/resolvers";
import jwt from "jsonwebtoken";
import { authenticateJWT, jwtSecret } from "./middleware/auth";
import { RequestWithMiddleware } from "./types/auth.types";
import { v4 as uuid4 } from "uuid";
import { DBmodels, UsersDB } from "./database";

const PORT = 9000;
const app = express();
app.use(cors(), bodyParser.json());
app.use("/graphql", cors(), authenticateJWT, bodyParser.json());

const context = ({ req }: { req: RequestWithMiddleware }) => {
  return {
    user: req.user,
  };
};

const typeDefs = gql(
  fs.readFileSync("./graphql/schema.graphql", { encoding: "utf8" })
);

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.post("/login", async (req: RequestWithMiddleware, res: Response) => {
  const { email, password } = req.body;
  const data = await DBmodels.User.findOne({
    where: {
      email,
      password,
    },
  });

  const user = data?.get();

  if (user) {
    const accessToken = jwt.sign(
      { email: user.email, password: user.password },
      jwtSecret
    );
    res.json({ message: `${email} logged in successfully!` });
  } else {
    res
      .status(401)
      .json({ message: "Email and Password combination incorrect" });
  }
});

app.post("/register", async (req: RequestWithMiddleware, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await DBmodels.User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    res.status(409).json({ message: "This email address is already in use" });
  }

  const user = await DBmodels.User.create({
    email,
    password,
    id: uuid4(),
  });

  res.status(201);
  res.json({ message: `Account for ${email} created successfully` });
});

UsersDB.sync().then(async () => {
  app.listen(PORT, () => console.info(`Server listening on Port:${PORT}`));
});
