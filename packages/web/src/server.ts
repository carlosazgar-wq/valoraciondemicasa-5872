import app from "./api";
import { metaParaRuta, esRutaConocida, inyectarMeta } from "./shared/seo";

const port = Number(process.env.PORT ?? 3000);
const distDir = `${import.meta.dir}/../dist`;
const indexPath = `${distDir}/index.html`;

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    // Forzar HTTPS en producción (detrás de proxy Cloudflare/Fly)
    // cf-visitor refleja el protocolo real usado por el visitante;
    // x-forwarded-proto siempre es "https" internamente entre Cloudflare y Fly.
    let scheme: string | null = null;
    const cfVisitor = request.headers.get("cf-visitor");
    if (cfVisitor) {
      try { scheme = JSON.parse(cfVisitor).scheme; } catch {}
    }
    if (!scheme) scheme = request.headers.get("x-forwarded-proto");
    if (scheme === "http" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      const publicHost = request.headers.get("x-forwarded-host") || url.host;
      const redirectUrl = `https://${publicHost}${url.pathname}${url.search}`;
      return Response.redirect(redirectUrl, 301);
    }

    if (url.pathname.startsWith("/api")) {
      return app.fetch(request);
    }

    const filePath = getStaticFilePath(url.pathname);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    const index = Bun.file(indexPath);
    if (await index.exists()) {
      let html = await index.text();

      // Inyecta title/description/canonical reales en el HTML servido,
      // para que Google los lea sin tener que ejecutar JavaScript.
      const meta = metaParaRuta(url.pathname);
      if (meta) html = inyectarMeta(html, meta);

      // Rutas inexistentes: 404 real en lugar de "404 blando" con estado 200.
      const status = esRutaConocida(url.pathname) ? 200 : 404;

      return new Response(html, {
        status,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Build output not found. Run `bun run build` first.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
});

console.log(`Web server listening on http://localhost:${server.port}`);

function getStaticFilePath(pathname: string) {
  const cleanPath = decodeURIComponent(pathname)
    .replace(/^\/+/, "")
    .replaceAll("..", "");

  return cleanPath ? `${distDir}/${cleanPath}` : indexPath;
}
