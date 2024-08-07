import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
}

interface ProductsResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}

interface UseProductsProps {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  limit?: number;
}

export function useProducts({
  category,
  brand,
  minPrice,
  maxPrice,
  sort = 'createdAt',
  order = 'desc',
  limit = 10,
}: UseProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        sort,
        order,
      });

      if (category) queryParams.append('category', category);
      if (brand) queryParams.append('brand', brand);
      if (minPrice) queryParams.append('minPrice', minPrice.toString());
      if (maxPrice) queryParams.append('maxPrice', maxPrice.toString());

      try {
        const response = await fetch(`/api/products?${queryParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ProductsResponse = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, brand, minPrice, maxPrice, sort, order, limit, currentPage]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return { products, loading, error, loadMore, hasMore: currentPage < totalPages };
}