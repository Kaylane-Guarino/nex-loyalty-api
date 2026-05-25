import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface TransactionAttributes {
  id: number;
  userId: number;
  cpf: string;
  description: string;
  transactionDate: string;
  points: number;
  amount: number;
  status: "APPROVED" | "REJECTED" | "PENDING";
}

type TransactionCreationAttributes = Optional<TransactionAttributes, "id">;

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public userId!: number;
  public cpf!: string;
  public description!: string;
  public transactionDate!: string;
  public points!: number;
  public amount!: number;
  public status!: "APPROVED" | "REJECTED" | "PENDING";
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    transactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("APPROVED", "REJECTED", "PENDING"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

export default Transaction;