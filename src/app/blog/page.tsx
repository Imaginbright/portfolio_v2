// This is a Server Component by default (no "use client")
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList"; // Import the component we just made

export default function BlogIndexPage() {
  // This runs on the server, so 'fs' works!
  const posts = getAllPosts();

  return (
    <main>
      <BlogList allPosts={posts} />
    </main>
  );
}
