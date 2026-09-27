import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

// ---------------------------------------------------------------------
// 1. TYPES
// ---------------------------------------------------------------------

interface MDXFrontmatter {
  title: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  featured: boolean;
  description?: string;
  updated?: string;
  lastVerified?: string;
}

export interface IPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  featured: boolean;
  description?: string;
  updated?: string;
  lastVerified?: string;
}

export function getPostDescription(content: string): string {
  const paragraph = content
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .replace(/<[^>]+>/g, " ")
        .replace(/!\[[^\]]*\]\([^\)]+\)/g, " ")
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/[*_`#>]/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .find((block) => block.length >= 80 && !block.startsWith("|"));

  if (!paragraph) return "";
  return paragraph.length > 157 ? `${paragraph.slice(0, 157).trim()}…` : paragraph;
}

// ---------------------------------------------------------------------
// 2. INTERNAL CACHE  ← ⭐ THIS IS THE "HIGHLY RECOMMENDED" PART
// ---------------------------------------------------------------------
// This variable lives in memory while the server is running.
// The filesystem is read ONCE instead of every request.

let cachedPosts: IPost[] | null = null;

// ---------------------------------------------------------------------
// 3. CORE DATA FUNCTION (unchanged)
// ---------------------------------------------------------------------

export function getAllPosts(): IPost[] {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);
    const frontmatter = data as MDXFrontmatter;

    return {
      slug,
      ...frontmatter,
      featured: frontmatter.featured || false,
    };
  });
}

// ---------------------------------------------------------------------
// 4. CACHED WRAPPER  ← ⭐ YOU USE THIS INSTEAD OF getAllPosts()
// ---------------------------------------------------------------------

function getAllPostsCached(): IPost[] {
  if (!cachedPosts) {
    cachedPosts = getAllPosts(); // filesystem read happens ONCE
  }
  return cachedPosts;
}

// ---------------------------------------------------------------------
// 5. SINGLE POST (unchanged)
// ---------------------------------------------------------------------

export function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const frontmatter = data as MDXFrontmatter;

  return {
    slug,
    frontmatter,
    content,
  };
}

// ---------------------------------------------------------------------
// 6. FEATURED POSTS (UPDATED TO USE CACHE)
// ---------------------------------------------------------------------

export function getFeaturedPosts(limit: number = 6): IPost[] {
  const allPosts = getAllPostsCached(); // ← changed line

  const featuredPosts = allPosts.filter((post) => post.featured === true);

  featuredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return featuredPosts.slice(0, limit);
}

// ---------------------------------------------------------------------
// 7. RELATED POSTS  ← ⭐ NEW FUNCTION
// ---------------------------------------------------------------------

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit: number = 2,
): IPost[] {
  const allPosts = getAllPostsCached(); // ← changed line

  return allPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
