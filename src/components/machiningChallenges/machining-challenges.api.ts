
export interface BlogCategory {
  id: number;
  name: string;
}

export interface ParentBlog {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category: BlogCategory;
  root_blog: number;
  tags: string[];
  lang: "fa" | "en";
  published: boolean;
}

export interface ChildBlog {
  id: number;
  blog: number;
  title: string;
  description: string;
  image: string | null;
}

export interface BlogDetails {
  parent: ParentBlog;
  child: ChildBlog[];
}

export interface BilingualBlogDetails {
  fa: BlogDetails;
  en: BlogDetails;
}

export const BLOG_READ_TIME = 5;

export async function getLatestBlogs(
  locale: string,
  signal?: AbortSignal,
): Promise<ParentBlog[]> {
  const lang = locale === "en" ? "en" : "fa";

  const res = await fetch(
    `/api/blogs/latest?lang=${lang}`,
    { signal },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch latest blogs");
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid latest blogs response");
  }

  return (data as ParentBlog[]).filter(
    (blog) => blog.published && blog.lang === lang,
  );
}

export async function getBlogChildren(
  id: number,
  signal?: AbortSignal,
): Promise<BilingualBlogDetails> {
  const res = await fetch(
    `/api/blogs/children/${id}`,
    { signal },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog children");
  }

  const data: unknown = await res.json();

  if (
    !data ||
    typeof data !== "object" ||
    !("fa" in data) ||
    !("en" in data)
  ) {
    throw new Error("Invalid blog children response");
  }

  return data as BilingualBlogDetails;
}

export async function getRelatedBlogs(
  id: number,
  signal?: AbortSignal,
): Promise<ParentBlog[]> {
  const res = await fetch(
    `/api/blogs/related/${id}`,
    { signal },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch related blogs");
  }

  const data: unknown = await res.json();

  if (Array.isArray(data)) {
    return data as ParentBlog[];
  }

  // Defensive handling in case the endpoint wraps the list.
  if (data && typeof data === "object") {
    const result = data as Record<string, unknown>;

    if (Array.isArray(result.results)) {
      return result.results as ParentBlog[];
    }

    if (Array.isArray(result.related)) {
      return result.related as ParentBlog[];
    }
  }

  return [];
}
