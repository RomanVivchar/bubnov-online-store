import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blink } from '@/lib/blink';
import { ProductCard } from '@/components/shop/product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('cat');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const result = await blink.db.products.list({
          where: categoryFilter ? { category: categoryFilter } : undefined,
        });
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryFilter]);

  const categories = [
    { id: null, name: 'Все' },
    { id: 'mugs', name: 'Кружки' },
    { id: 't-shirts', name: 'Футболки' },
    { id: 'stickers', name: 'Стикерпаки' },
    { id: 'books', name: 'Книги' },
    { id: 'audiobooks', name: 'Аудио' },
  ];

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-bold tracking-tight">КАТАЛОГ ТОВАРОВ</h1>
          <p className="text-muted-foreground">ТТД каждой вещи проверены лично.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id || 'all'}
              variant={categoryFilter === cat.id ? 'default' : 'outline'}
              size="sm"
              asChild
            >
              <a href={cat.id ? `/catalog?cat=${cat.id}` : '/catalog'}>
                {cat.name}
              </a>
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border rounded-2xl bg-muted/20">
            <p className="text-lg text-muted-foreground">Товары не найдены в этой категории.</p>
          </div>
        )}
      </div>
    </div>
  );
}
