import bcrypt from "bcrypt";

import User from "../models/User";

type SeedUser = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: "admin" | "user";
};

export async function runSeed() {
  const password = await bcrypt.hash(
    "123456",
    10
  );

  const users: SeedUser[] = [
    {
      name: "Admin Nex",
      email: "admin@nex.com",
      cpf: "89612919046",
      password,
      role: "admin",
    },
    {
      name: "John Doe",
      email: "john@nex.com",
      cpf: "62920354094",
      password,
      role: "user",
    },
    {
      name: "Maria Silva",
      email: "maria@nex.com",
      cpf: "16329809089",
      password,
      role: "user",
    },
    {
      name: "Pedro Santos",
      email: "pedro@nex.com",
      cpf: "81009443003",
      password,
      role: "user",
    },
  ];

  for (const user of users) {
    const exists = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (!exists) {
      await User.create(user);

      console.log(
        `Seed user created: ${user.email}`
      );
    }
  }

  console.log("Seed completed.");
}