import path from "path";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import * as shiftRoutesModule from "./routes/shiftRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend with correct MIME types
app.use(express.static(path.join(process.cwd(), "public"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  }
}));

// Resolve router whether exported as default or named
const shiftsRouter = (shiftRoutesModule as any).default || (shiftRoutesModule as any);
if (typeof shiftsRouter !== "function") {
  console.error("[Boot] shiftRoutes is not a Router function. Ensure routes/shiftRoutes exports a Router (default export).\nExample: export default router;");
  process.exit(1);
}

// Healthcheck
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API routes
app.use("/api/shifts", shiftsRouter as any);

// Start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();