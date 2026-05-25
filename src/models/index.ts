import User from "./User";
import Transaction from "./Transaction";

User.hasMany(Transaction, {
  foreignKey: "userId",
});

Transaction.belongsTo(User, {
  foreignKey: "userId",
});

export { User, Transaction };