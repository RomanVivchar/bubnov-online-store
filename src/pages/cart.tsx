import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, Minus, Plus, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { blink } from '@/lib/blink';
import { toast } from 'sonner';

export function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Пожалуйста, войдите в аккаунт для оформления заказа');
      navigate('/auth');
      return;
    }

    setIsCheckoutLoading(true);
    try {
      // Create order
      const order = await blink.db.orders.create({
        userId: user.id,
        total: total,
        status: 'pending',
      });

      // Create order items
      await blink.db.order_items.createMany(
        items.map((item) => ({
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      );

      // Update bonuses (10% cashback)
      const bonusesEarned = Math.floor(total * 0.1);
      if (profile) {
        await blink.db.profiles.update(profile.id, {
          bonuses: (profile.bonuses || 0) + bonusesEarned,
        });
      }

      toast.success(`Заказ оформлен! Начислено ${bonusesEarned} бонусов.`);
      clearCart();
      navigate('/profile');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Ошибка при оформлении заказа');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">В КОРЗИНЕ ПУСТО</h1>
        <p className="text-muted-foreground mb-8">Вы еще ничего не добавили. Время провести разбор каталога!</p>
        <Link to="/catalog">
          <Button size="lg" className="h-12 px-8 font-bold">Перейти к покупкам</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-4xl font-display font-black tracking-tighter mb-8">ВАША КОРЗИНА</h1>
      
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border-2 rounded-2xl bg-card hover:border-primary/30 transition-colors">
              <div className="w-24 h-24 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-primary font-display font-black">{item.price} ₽</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 rounded-lg">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="border-2 shadow-elegant">
          <CardHeader>
            <CardTitle className="font-display">ИТОГО</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товары ({items.length})</span>
              <span>{total} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Доставка</span>
              <span className="text-green-600 font-bold uppercase text-xs">Бесплатно</span>
            </div>
            <Separator />
            <div className="flex justify-between items-end">
              <span className="font-bold">К оплате</span>
              <span className="text-3xl font-display font-black text-primary">{total} ₽</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              * За эту покупку вы получите <span className="text-primary font-bold">+{Math.floor(total * 0.1)}</span> бонусов на ваш счет.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full h-12 text-lg font-bold gap-2" onClick={handleCheckout} disabled={isCheckoutLoading}>
              {isCheckoutLoading ? 'Оформление...' : (
                <>Оформить заказ <ArrowRight className="h-5 w-5" /></>
              )}
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CreditCard className="h-3 w-3" /> Безопасная оплата
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
