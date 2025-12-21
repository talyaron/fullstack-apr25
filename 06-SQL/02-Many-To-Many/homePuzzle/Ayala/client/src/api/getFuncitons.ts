const port = 'http://localhost:3000'

interface GetProps {
  search?: string;
  sortBy?: 'name' | 'count';
  order?: 'asc' | 'desc';
}

export async function getAuthors(params: GetProps) {
  try {
    const query = new URLSearchParams();

    if (params.search) query.append('search', params.search);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.order) query.append('order', params.order);

    const response = await fetch(
      `${port}/api/authors/stats?${query.toString()}`
    );

    if (!response.ok) {
      throw new Error('failed to fetch in getAuthors');
    }

    const authors = await response.json();
    return authors;

  } catch (error) {
    console.error('Error in getAuthors:', error);
    return [];
  }
}
