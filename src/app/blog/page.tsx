//Server
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main>
      <BlogList allPosts={posts} />
    </main>
  );
}
