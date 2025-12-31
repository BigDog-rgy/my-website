import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </main>
  );
}
