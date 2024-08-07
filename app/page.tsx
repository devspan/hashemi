"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="space-y-12 container mx-auto px-4 py-8">
      <section className="text-center">
        {isLoading ? (
          <Skeleton className="h-12 w-1/2 mx-auto" />
        ) : (
          <>
            <h1 className="text-5xl font-bold mb-4 text-primary">Welcome to Pakistan Fragrance Community</h1>
            <p className="text-xl text-muted-foreground">Discover exquisite fragrances from around the world and right here in Pakistan.</p>
          </>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {isLoading ? (
          <>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-1/2" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-1/2" />
              </CardFooter>
            </Card>
          </>
        ) : (
          <>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle>PFC European Niche</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>Explore our collection of high-class European, French, and niche imported perfumes.</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/european-niche">
                      <Button variant="secondary" size="lg" className="w-full">
                        Shop European Niche
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm text-muted-foreground">Discover the finest fragrances from renowned European and international brands.</p>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle>PFC Made by Pakistan (MBP)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    <p>Discover fragrances crafted by talented Pakistani perfumers and local houses.</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/mbp">
                      <Button variant="secondary" size="lg" className="w-full">
                        Shop Made by Pakistan
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm text-muted-foreground">Support local talent and explore unique fragrances made in Pakistan.</p>
              </HoverCardContent>
            </HoverCard>
          </>
        )}
      </section>

      <section>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4 text-primary">Featured Products</h2>
            <p className="text-muted-foreground">Featured products will be displayed here.</p>
          </>
        )}
      </section>
    </div>
  );
}