import { Response } from "express";
import { prisma } from "../prisma/prisma";
import { Request } from "express";


interface AuthRequest extends Request {
    userId?: string;
}

export class TaskController {
    static async create(req: AuthRequest, res: Response) {
        try {
            const { title, description } = req.body;

            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    userId: req.userId!,
                },
            });

            return res.status(201).json(task);
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                error: "Erro ao criar tarefa",
            });
        }
    }

    static async getAll(req: AuthRequest, res: Response) {
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    userId: req.userId,
                },
            });

            return res.json(tasks);
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                error: "Erro ao buscar tarefas",
            });
        }
    }

    static async update(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;

            const { title, description, completed } = req.body;

            const taskExists = await prisma.task.findFirst({
                where: {
                    id,
                    userId: req.userId,
                },
            });

            if (!taskExists) {
                return res.status(404).json({
                    error: "Tarefa não encontrada",
                });
            }

            const task = await prisma.task.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    completed,
                },
            });

            return res.json(task);
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                error: "Erro ao atualizar tarefa",
            });
        }
    }

    static async delete(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string;

            const taskExists = await prisma.task.findFirst({
                where: {
                    id,
                    userId: req.userId,
                },
            });

            if (!taskExists) {
                return res.status(404).json({
                    error: "Tarefa não encontrada",
                });
            }

            await prisma.task.delete({
                where: {
                    id,
                },
            });

            return res.json({
                message: "Tarefa deletada com sucesso",
            });
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                error: "Erro ao deletar tarefa",
            });
        }
    }
}