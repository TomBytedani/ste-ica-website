import { getArticlesData } from "@/lib/articles";
import { Header } from "./Header";

export async function ServerAwareHeader() {
    let hasArticles = false;
    try {
        const data = await getArticlesData();
        hasArticles = data.articles.some((a) => a.published);
    } catch {
        hasArticles = false;
    }
    return <Header hasArticles={hasArticles} />;
}
