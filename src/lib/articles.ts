import fs from 'fs/promises';
import path from 'path';

const ARTICLES_FILE = path.join(process.cwd(), 'content', 'articles.json');

export interface LocalizedString {
    it: string;
    en: string;
}

export interface Article {
    id: string;
    slug: string;
    title: LocalizedString;
    excerpt: LocalizedString;
    content: LocalizedString;
    coverImage: string;
    publishedAt: string;
    tags: string[];
    published: boolean;
}

export interface ArticlesData {
    articles: Article[];
}

export async function getArticlesData(): Promise<ArticlesData> {
    const content = await fs.readFile(ARTICLES_FILE, 'utf-8');
    return JSON.parse(content);
}

export async function saveArticlesData(data: ArticlesData): Promise<void> {
    await fs.writeFile(ARTICLES_FILE, JSON.stringify(data, null, 4), 'utf-8');
}

export async function addArticle(article: Omit<Article, 'id'>): Promise<Article> {
    const data = await getArticlesData();
    const newArticle = {
        ...article,
        id: `article-${Date.now()}`
    };
    data.articles.unshift(newArticle);
    await saveArticlesData(data);
    return newArticle;
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
    const data = await getArticlesData();
    const index = data.articles.findIndex(article => article.id === id);
    if (index === -1) return null;

    data.articles[index] = { ...data.articles[index], ...updates };
    await saveArticlesData(data);
    return data.articles[index];
}

export async function deleteArticle(id: string): Promise<boolean> {
    const data = await getArticlesData();
    const index = data.articles.findIndex(article => article.id === id);
    if (index === -1) return false;

    data.articles.splice(index, 1);
    await saveArticlesData(data);
    return true;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const data = await getArticlesData();
    return data.articles.find(article => article.slug === slug) || null;
}
