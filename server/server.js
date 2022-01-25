const express = require("express");
const app = express();
const connect = require("./config/db");
const cors = require("cors");

const { graphqlHTTP } = require("express-graphql");
const root = require("./graphQl/resolver");
const schema = require("./graphQl/schema");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.SERVER_PORT || 4000;

connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Now browse to localhost:${PORT}/graphql`)
    );
  })
  .catch((err) => {
    console.log("DB connection Error", err);
  });
