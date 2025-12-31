import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/portfolio";

export function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <header style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ position: "relative", width: 220, height: 140, background: "#f5f5f5", borderRadius: 12, overflow: "hidden" }}>
          <Image
            src={`/${project.artwork}`}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="220px"
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>{project.title}</h1>
          <p style={{ margin: "8px 0 0", color: "#555" }}>{project.description}</p>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#777" }}>
            {project.dateStarted} → {project.dateFinished}
          </p>
        </div>
      </header>

      <section style={{ marginTop: 16 }}>
        <h2>Triumphs</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{project.triumphs}</p>

        <h2>Pitfalls</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{project.pitfalls}</p>
      </section>

      {project.images?.length ? (
        <section style={{ marginTop: 24 }}>
          <h2>Images</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {project.images.map((img, i) => (
              <figure key={i} style={{ margin: 0 }}>
                <div style={{ position: "relative", width: "100%", height: 160, background: "#f5f5f5", borderRadius: 10, overflow: "hidden" }}>
                  <Image
                    src={`/${img.path}`}
                    alt={img.caption ?? `${project.title} image ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 240px"
                  />
                </div>
                {img.caption ? <figcaption style={{ fontSize: 12, color: "#666", marginTop: 6 }}>{img.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {project.logs?.length ? (
        <section style={{ marginTop: 24 }}>
          <h2>Logs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {project.logs.map((log) => (
              <article key={log.date} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                <h3 style={{ margin: 0 }}>{log.date}</h3>
                <div style={{ marginTop: 8 }}>
                  <strong>Pre</strong>
                  <p style={{ whiteSpace: "pre-wrap", marginTop: 4 }}>{log.pre}</p>
                </div>
                <div style={{ marginTop: 8 }}>
                  <strong>Post</strong>
                  <p style={{ whiteSpace: "pre-wrap", marginTop: 4 }}>{log.post}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
