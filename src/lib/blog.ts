import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

// 1. Defines exactly what is in my MDX frontmatter
interface MDXFrontmatter {
  title: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  featured: boolean;
}

export interface IPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  thumbnail: string;
  featured: boolean;
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
      // Ensured featured is a boolean even if i miss it in MDX
      featured: frontmatter.featured || false,
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

export function getFeaturedPosts(limit: number = 6): IPost[] {
  const allPosts = getAllPosts();

  // Filter based on the 'featured' boolean flag
  const featuredPosts = allPosts.filter((post) => post.featured === true);

  // Sort by newest date
  featuredPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return featuredPosts.slice(0, limit);
}
