import { Header } from "./Header";

// TODO: Restore dynamic article detection after DB migration (replaces Vercel Blob)
// import { getArticlesData } from "@/lib/articles";
export async function ServerAwareHeader() {
    // Temporarily hardcoded to false — blob storage is at 100% capacity
    // and there are no official articles yet.
    const hasArticles = false;
    return <Header hasArticles={hasArticles} />;
}
