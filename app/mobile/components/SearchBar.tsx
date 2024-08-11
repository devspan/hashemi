'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/app/hooks/useDebounce';
import Image from 'next/image';
import pfcLogo from '@/public/images/pfc.svg';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    debouncedSearch('');
    inputRef.current?.focus();
  }, [debouncedSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  }, [clearSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 searchbar p-2 shadow-md">
      <div className="relative flex items-center">
        <div className="absolute left-2 flex items-center">
          <Image
            src={pfcLogo}
            alt="PFC Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          <Search 
            className="text-primary-foreground/70" 
            size={20} 
            aria-hidden="true" 
          />
        </div>
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search fragrances..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className={`pl-16 pr-10 py-2 w-full transition-all duration-300 bg-transparent border-none text-primary-foreground placeholder-primary-foreground/70 ${
            isFocused ? 'ring-2 ring-primary-foreground/30' : ''
          }`}
          aria-label="Search fragrances"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X size={16} />
          </Button>
        )}
      </div>
      {isFocused && (
        <div className="absolute left-0 right-0 bg-background/80 backdrop-blur-md border border-t-0 border-primary/20 rounded-b-md shadow-lg mt-1 p-2">
          <p className="text-sm text-primary-foreground/70">
            {searchQuery ? `Searching for "${searchQuery}"...` : 'Start typing to search'}
          </p>
          {/* You can add recent searches or popular searches here */}
        </div>
      )}
    </div>
  );
}