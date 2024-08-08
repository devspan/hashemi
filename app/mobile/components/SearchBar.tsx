'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/app/hooks/useDebounce';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const debouncedSearch = useDebounce((term: string) => {
    if (term) {
      router.push(`/mobile/products?q=${encodeURIComponent(term)}`);
    } else {
      router.push('/mobile/products');
    }
  }, 300);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchQuery(term);
    debouncedSearch(term);
  }, [debouncedSearch]);

  return (
    <div className="sticky top-0 z-10 bg-background shadow-sm p-2">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search fragrances..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full"
          aria-label="Search fragrances"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} aria-hidden="true" />
      </div>
    </div>
  );
}