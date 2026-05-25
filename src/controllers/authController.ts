import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../prisma/prisma";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({
          error: "Usuário já existe",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          error: "Email ou senha inválidos",
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(400).json({
          error: "Email ou senha inválidos",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        message: "Login realizado com sucesso",
        token,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }
}