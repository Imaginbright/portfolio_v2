import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

// 1. Define exactly what is in your MDX frontmatter
interface MDXFrontmatter {
  title: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
}

export interface IPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
}

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
    };
  });
}

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

export function getFeaturedPostsByCategory(
  category: string,
  limit: number = 6,
): IPost[] {
  const allPosts = getAllPosts();

  // 1. Filter: Keep only posts where the category matches exactly
  // We use .toLowerCase() to ensure "Featured" matches "featured"
  const filteredPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );

  // 2. Sort: Ensure newest featured posts are first
  filteredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // 3. Slice: Only return the requested number of items
  return filteredPosts.slice(0, limit);
}
