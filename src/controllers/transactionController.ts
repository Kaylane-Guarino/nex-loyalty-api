import { Request, Response } from "express";
import { Op } from "sequelize";
import xlsx from "xlsx";

import { Transaction, User } from "../models";

import {
  normalizeCpf,
  parseBrazilianDate,
  parseBrazilianMoney,
  parsePoints,
  parseTransactionStatus,
} from "../utils/formatters";

interface SpreadsheetRow {
  CPF?: string;
  "Descrição da transação"?: string;
  "Data da transação"?: string;
  "Valor em pontos"?: string | number;
  Valor?: string | number;
  Status?: string;
}

export async function uploadTransactions(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Spreadsheet file is required.",
      });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];

    const rows = xlsx.utils.sheet_to_json<SpreadsheetRow>(
      workbook.Sheets[sheetName]
    );

    let created = 0;
    let ignored = 0;

    for (const row of rows) {
      const cpf = normalizeCpf(row["CPF"]);

      const user = await User.findOne({
        where: { cpf },
      });

      if (!user) {
        ignored++;
        continue;
      }

      await Transaction.create({
        userId: user.id,
        cpf,
        description: row["Descrição da transação"] || "",
        transactionDate: parseBrazilianDate(row["Data da transação"]),
        points: parsePoints(row["Valor em pontos"]),
        amount: parseBrazilianMoney(row["Valor"]),
        status: parseTransactionStatus(row["Status"]),
      });

      created++;
    }

    return res.json({
      message: "Spreadsheet processed successfully.",
      created,
      ignored,
    });
  } catch (error) {
    console.error("Error processing spreadsheet:", error);

    return res.status(500).json({
      message: "Error processing spreadsheet.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function listAdminTransactions(req: Request, res: Response) {
  try {
    const { cpf, product, startDate, endDate, minAmount, maxAmount, status } =
      req.query;

    const where: Record<string, unknown> = {};

    if (cpf) {
      where.cpf = normalizeCpf(cpf);
    }

    if (product) {
      where.description = {
        [Op.like]: `%${product}%`,
      };
    }

    if (status) {
      where.status = status;
    }

    if (startDate && endDate) {
      where.transactionDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (minAmount && maxAmount) {
      where.amount = {
        [Op.between]: [minAmount, maxAmount],
      };
    }

    const transactions = await Transaction.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "cpf"],
        },
      ],
      order: [["transactionDate", "DESC"]],
    });

    return res.json(transactions);
  } catch {
    return res.status(500).json({
      message: "Error listing transactions.",
    });
  }
}

export async function listUserTransactions(req: Request, res: Response) {
  try {
    const { status, startDate, endDate } = req.query;

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const where: Record<string, unknown> = {
      userId: req.user.id,
    };

    if (status) {
      where.status = status;
    }

    if (startDate && endDate) {
      where.transactionDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    const transactions = await Transaction.findAll({
      where,
      order: [["transactionDate", "DESC"]],
    });

    return res.json(transactions);
  } catch {
    return res.status(500).json({
      message: "Error listing user transactions.",
    });
  }
}

export async function getWallet(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const approvedTransactions = await Transaction.findAll({
      where: {
        userId: req.user.id,
        status: "APPROVED",
      },
    });

    const balance = approvedTransactions.reduce((total, transaction) => {
      return total + Number(transaction.points);
    }, 0);

    return res.json({ balance });
  } catch {
    return res.status(500).json({
      message: "Error loading wallet.",
    });
  }
}