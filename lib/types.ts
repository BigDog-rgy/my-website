export type ProjectLog = {
  date: string;      // "YYYY-MM-DD"
  pre: string;
  post: string;
};

export type ProjectImage = {
  path: string;      // "project_images/..."
  caption: string | null;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  artwork: string;
  color: string;
  dateStarted: string;
  dateFinished: string;
  triumphs: string;
  pitfalls: string;
  logs: ProjectLog[];
  images: ProjectImage[];
  tasks: unknown[];  // tighten later if you formalize tasks
};

export type Portfolio = {
  year: number;
  projects: Project[];
};
