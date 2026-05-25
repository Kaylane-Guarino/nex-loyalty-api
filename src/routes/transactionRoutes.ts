import { Router } from "express";
import multer from "multer";

import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

import {
  getWallet,
  listAdminTransactions,
  listUserTransactions,
  uploadTransactions,
} from "../controllers/transactionController";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  uploadTransactions
);

router.get("/admin", authMiddleware, adminMiddleware, listAdminTransactions);

router.get("/me", authMiddleware, listUserTransactions);

router.get("/wallet", authMiddleware, getWallet);

export default router;