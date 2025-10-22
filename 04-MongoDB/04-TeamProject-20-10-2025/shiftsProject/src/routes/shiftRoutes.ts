import { Router } from "express";
const router = Router();

// Example route (placeholder)
router.get("/", (_req, res) => {
  res.json({ message: "Shifts API working" });
});

export default router;
