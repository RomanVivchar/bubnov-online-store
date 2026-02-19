import React from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus } from 'lucide-react';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`"${product.name}" добавлен в корзину`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-elegant">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-1 flex-col p-4 space-y-3">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-primary/70">
            {product.category}
          </div>
          <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-display font-black">
            {product.price} ₽
          </span>
          <Button 
            size="sm" 
            className="rounded-full h-10 w-10 p-0"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
