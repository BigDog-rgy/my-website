import Image from "next/image";
import { getAllProjects } from "@/lib/portfolio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { slug?: string; id?: string };
}) {
  const projects = getAllProjects();

  const bySlug =
    searchParams.slug
      ? projects.find((p) => p.slug === searchParams.slug)
      : null;

  const byId =
    searchParams.id
      ? projects.find((p) => String(p.id) === String(searchParams.id))
      : null;

  const project = bySlug ?? byId;

  if (!project) {
    return (
      <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
        <h1>Projects</h1>
        <p>Select a project from the homepage.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1>{project.title}</h1>
      <p style={{ color: "#555" }}>{project.description}</p>

      <div style={{ marginTop: 16 }}>
        <h2>Triumphs</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{project.triumphs}</p>

        <h2>Pitfalls</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{project.pitfalls}</p>
      </div>

      {project.images?.length ? (
        <div style={{ marginTop: 24 }}>
          <h2>Images</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {project.images.map((img, i) => (
              <div key={i} style={{ position: "relative", width: "100%", height: 160, background: "#f5f5f5", borderRadius: 10, overflow: "hidden" }}>
                <Image
                  src={`/${img.path}`}
                  alt={img.caption ?? `${project.title} image ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 240px"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
