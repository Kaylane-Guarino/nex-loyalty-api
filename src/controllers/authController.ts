import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import { User } from "../models";

export async function register(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      cpf,
      password,
    } = req.body;

    const normalizedCPF = cpf.replace(/\D/g, "");
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: normalizedEmail,
          },
          {
            cpf: normalizedCPF,
          },
        ],
      },
    });

    if (existingUser) {
      if (
        existingUser.email === normalizedEmail
      ) {
        return res.status(409).json({
          message:
            "Já existe uma conta com este e-mail.",
        });
      }

      if (
        existingUser.cpf === normalizedCPF
      ) {
        return res.status(409).json({
          message:
            "Já existe uma conta com este CPF.",
        });
      }
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      cpf: normalizedCPF,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message:
        "User created successfully.",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Error creating user.",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({
      message: "Error logging in.",
    });
  }
}