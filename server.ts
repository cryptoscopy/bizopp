import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const distPath = path.join(process.cwd(), "dist");
  const publicPath = path.join(process.cwd(), "public");

  // Route 1: /robots.txt
  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    const distRobots = path.join(distPath, "robots.txt");
    const publicRobots = path.join(publicPath, "robots.txt");

    if (fs.existsSync(distRobots)) {
      return res.sendFile(distRobots);
    } else if (fs.existsSync(publicRobots)) {
      return res.sendFile(publicRobots);
    } else {
      return res.send(`User-agent: *\nAllow: /\n\nSitemap: https://bizopp.ai.studio/sitemap.xml\n`);
    }
  });

  // Route 2: /sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    const distSitemap = path.join(distPath, "sitemap.xml");
    const publicSitemap = path.join(publicPath, "sitemap.xml");

    if (fs.existsSync(distSitemap)) {
      return res.sendFile(distSitemap);
    } else if (fs.existsSync(publicSitemap)) {
      return res.sendFile(publicSitemap);
    } else {
      return res.status(404).send('<?xml version="1.0" encoding="UTF-8"?><error>Sitemap not found</error>');
    }
  });

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve static public assets explicitly if needed
  app.use(express.static(publicPath));

  // Vite middleware in dev mode vs static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    // Dev SPA Fallback
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Serve static assets from dist
    app.use(express.static(distPath));

    // Production SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
