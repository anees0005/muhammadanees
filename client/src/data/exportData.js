// Export blog posts and other data for build-time scripts
// This file exports data in a format that can be imported by Node.js scripts

import { blogPosts } from './blogPosts.js';
import { getAllSaaSProducts } from './saasTools.js';

export { blogPosts, getAllSaaSProducts };

