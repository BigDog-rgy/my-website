import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/portfolio";

export default function HomePage() {
  const projects = getAllProjects().slice().sort((a, b) => a.id - b.id);

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Projects {new Date().getFullYear()}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: 160, background: "#f5f5f5" }}>
              <Image
                src={`/${p.artwork}`}
                alt={p.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 260px"
                priority={p.id <= 3}
              />
            </div>

            <div style={{ padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <h2 style={{ fontSize: 16, margin: 0 }}>{p.title}</h2>
                <span
                  title={p.color}
                  style={{ width: 12, height: 12, borderRadius: 999, background: p.color, border: "1px solid #ccc" }}
                />
              </div>

              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#444" }}>
                {p.description.length > 140 ? p.description.slice(0, 140) + "…" : p.description}
              </p>

              <p style={{ margin: "8px 0 0", fontSize: 12, color: "#666" }}>
                {p.dateStarted} → {p.dateFinished}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
