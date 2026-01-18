import { BlogPost } from './blogPosts';

export interface ArticleSeries {
  id: string;
  name: string;
  description: string;
  slug: string;
  posts: BlogPost[];
  coverImage?: string;
}

export const getSeriesBySlug = (slug: string, allPosts: BlogPost[]): ArticleSeries | null => {
  const seriesPosts = allPosts.filter(post => post.series === slug).sort((a, b) => {
    const orderA = a.seriesOrder || 0;
    const orderB = b.seriesOrder || 0;
    return orderA - orderB;
  });

  if (seriesPosts.length === 0) return null;

  const firstPost = seriesPosts[0];
  return {
    id: slug,
    name: firstPost.series || slug,
    description: `Complete guide series: ${firstPost.series}`,
    slug: slug,
    posts: seriesPosts,
    coverImage: firstPost.image
  };
};

export const getAllSeries = (allPosts: BlogPost[]): ArticleSeries[] => {
  const seriesMap = new Map<string, BlogPost[]>();

  allPosts.forEach(post => {
    if (post.series) {
      if (!seriesMap.has(post.series)) {
        seriesMap.set(post.series, []);
      }
      seriesMap.get(post.series)!.push(post);
    }
  });

  return Array.from(seriesMap.entries()).map(([slug, posts]) => {
    const sortedPosts = posts.sort((a, b) => {
      const orderA = a.seriesOrder || 0;
      const orderB = b.seriesOrder || 0;
      return orderA - orderB;
    });

    const firstPost = sortedPosts[0];
    return {
      id: slug,
      name: firstPost.series || slug,
      description: `Complete guide series: ${firstPost.series}`,
      slug: slug,
      posts: sortedPosts,
      coverImage: firstPost.image
    };
  });
};

export const getSeriesForPost = (post: BlogPost, allPosts: BlogPost[]): ArticleSeries | null => {
  if (!post.series) return null;
  return getSeriesBySlug(post.series, allPosts);
};

