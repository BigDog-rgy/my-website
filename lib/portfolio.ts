import fs from "node:fs";
import path from "node:path";
import type { Portfolio, Project } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "projects_2025_portfolio.json");

export function loadPortfolio(): Portfolio {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Portfolio;
}

export function getAllProjects(): Project[] {
  return loadPortfolio().projects;
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find(p => p.slug === slug) ?? null;
}
