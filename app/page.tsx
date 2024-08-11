import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-12 w-3/4 mx-auto" />
    <div className="grid md:grid-cols-2 gap-8">
      {[...Array(2)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
    <div>
      <Skeleton className="h-8 w-1/3 mb-4" />
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-[200px] h-[280px] flex-shrink-0" />
        ))}
      </div>
    </div>
  </div>
);

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/featured-products', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch featured products');
  }
  return res.json();
}

const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
        <Link href="/featured" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="w-[200px] flex-shrink-0 group">
              <Link href={`/products/${product.id}`}>
                <CardContent className="p-4 relative">
                  <div className="relative mb-2 overflow-hidden rounded-lg">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name} 
                      width={200} 
                      height={200} 
                      className="object-cover w-full h-[200px] transition-transform duration-300 group-hover:scale-105" 
                    />
                    <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
                  <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default async function Home() {
  return (
    <div className="space-y-16 container mx-auto px-4 py-12">
      <Suspense fallback={<LoadingSkeleton />}>
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
            Welcome to Pakistan Fragrance Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover exquisite fragrances from around the world and right here in Pakistan.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "PFC",
              description: "Explore our collection of high-class European, French, and niche imported perfumes.",
              link: "/european-niche",
              hoverContent: "Discover the finest fragrances from renowned European and international brands.",
            },
            {
              title: "Made in Pakistan",
              description: "Discover fragrances crafted by talented Pakistani perfumers and local houses.",
              link: "/mbp",
              hoverContent: "Support local talent and explore unique fragrances made in Pakistan.",
            },
          ].map((item, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={item.link} className="w-full">
                      <Button variant="secondary" size="lg" className="w-full group">
                        Shop {item.title}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm text-muted-foreground">{item.hoverContent}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </section>

        <FeaturedProducts />
      </Suspense>
    </div>
  );
}