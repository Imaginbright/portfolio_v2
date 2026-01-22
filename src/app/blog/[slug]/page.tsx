import fs from "fs";
import path from "path";
import { getPostData } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXLayout from "@/components/mdx/mdx-layout";

//This fixed the no slug approach i learnt
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  return (
    <MDXLayout>
      {/* Optional: Render your metadata here */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
        <p className="text-gray-400">
          {post.frontmatter.date} • {post.frontmatter.author}
        </p>
      </header>

      {/* This will render my MDX content */}
      <MDXRemote source={post.content} />
    </MDXLayout>
  );
}

// Tell Next.js which slugs exist at build time (Static Site Generation)
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));
  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}
