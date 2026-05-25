import app from "./app";

import sequelize from "./config/database";

import "./models";

import { runSeed } from "./seed/seed";

const PORT =
  process.env.PORT || 3333;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log(
      "Database connected."
    );

    await sequelize.sync({
      alter: true,
    });

    console.log(
      "Tables synchronized."
    );

    await runSeed();

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server error:",
      error
    );
  }
}

startServer();