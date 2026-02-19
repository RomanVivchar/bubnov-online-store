import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { blink } from '@/lib/blink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Send, Award, ShoppingBag, SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePage() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [telegram, setTelegram] = useState(profile?.telegram || '');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    async function fetchOrders() {
      try {
        const result = await blink.db.orders.list({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
        });
        setOrders(result);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
    if (profile?.telegram) setTelegram(profile.telegram);
  }, [user, navigate, profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await blink.db.profiles.update(profile.id, {
        telegram: telegram,
      });
      toast.success('Профиль обновлен!');
    } catch (error: any) {
      toast.error('Ошибка обновления');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="container py-12 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <Card className="border-2 shadow-elegant">
            <CardHeader className="pb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-black mb-4 mx-auto md:mx-0">
                {profile?.displayName?.[0] || user.email?.[0]?.toUpperCase()}
              </div>
              <CardTitle className="text-xl font-display">{profile?.displayName || 'Пользователь'}</CardTitle>
              <CardDescription className="truncate">{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 text-primary border border-primary/10">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-bold">Бонусы</span>
                </div>
                <span className="font-display font-black">{profile?.bonuses || 0}</span>
              </div>
              <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Выйти
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8 space-x-8">
              <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 text-base">
                История заказов
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 text-base">
                Настройки профиля
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6 mt-0">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order.id} className="border-2 overflow-hidden hover:border-primary/40 transition-colors">
                    <div className="bg-muted/50 p-4 border-b flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase text-muted-foreground">Заказ #{order.id.slice(-8)}</p>
                        <p className="text-sm font-medium">{new Date(order.created_at || order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-display font-black">{order.total} ₽</p>
                        <span className="text-xs font-bold uppercase text-primary">{order.status === 'completed' ? 'Выполнен' : 'В обработке'}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ShoppingBag className="h-4 w-4" />
                        <span className="text-sm">ТТД: Максимальная точность</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/20">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">У вас пока нет заказов.</p>
                  <Button variant="link" onClick={() => navigate('/catalog')}>Перейти в каталог</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Card className="border-2 shadow-elegant">
                <CardHeader>
                  <CardTitle className="font-display">Персональные данные</CardTitle>
                  <CardDescription>Укажите ваш телеграм для оперативной связи</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="telegram">Ник в Telegram</Label>
                      <div className="relative">
                        <SendHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="telegram" 
                          placeholder="@username" 
                          className="pl-10" 
                          value={telegram}
                          onChange={(e) => setTelegram(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={loading} className="font-bold">
                      {loading ? 'Сохранение...' : 'Сохранить изменения'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
