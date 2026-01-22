import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { IPost } from "../../post";

const postsDirectory = path.join(process.cwd(), "content/posts");

// 1. Define exactly what is in your MDX frontmatter
interface MDXFrontmatter {
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

    // 2. Map the data to your specific interface instead of 'any'
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

  // 3. Use the interface here as well
  const frontmatter = data as MDXFrontmatter;

  return {
    slug,
    frontmatter,
    content,
  };
}
