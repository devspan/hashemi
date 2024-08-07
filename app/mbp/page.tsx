'use client';

import React, { useState } from 'react';
import { useProducts } from '@/app/hooks/useProducts';

export default function MBPPage() {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc' as 'asc' | 'desc',
  });

  const { products, loading, error, loadMore, hasMore } = useProducts({
    category: 'MBP',
    ...filters,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">PFC Made by Pakistan (MBP) Collection</h1>
      <p className="mb-4">Discover unique fragrances created by talented Pakistani perfumers.</p>
      
      {/* Filters */}
      <div className="mb-4">
        <input
          type="text"
          name="brand"
          placeholder="Filter by brand"
          onChange={handleFilterChange}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min price"
          onChange={handleFilterChange}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          onChange={handleFilterChange}
          className="mr-2 p-2 border rounded"
        />
        <select
          name="sort"
          onChange={handleFilterChange}
          className="mr-2 p-2 border rounded"
        >
          <option value="createdAt">Latest</option>
          <option value="price">Price</option>
        </select>
        <select
          name="order"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Product listing */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold mt-2">Price: ${product.price.toFixed(2)}</p>
            <p>Brand: {product.brand}</p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Load More
        </button>
      )}
    </div>
  );
}