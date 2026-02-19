import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, BookOpen, Mic2, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                Легенда советского футбола
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] tracking-tighter">
                АЛЕКСАНДР <span className="text-primary">БУБНОВ</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-[600px]">
                Советский футболист, защитник. Мастер спорта СССР международного класса.
                Известен своим бескомпромиссным анализом, системой ТТД и уникальным взглядом на футбол.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/catalog">
                  <Button size="lg" className="h-12 px-8 text-base gap-2">
                    В магазин <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    Биография
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-8 border-t border-primary/10">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Следите за разборами:</span>
                <div className="flex gap-4">
                  <a href="#" className="p-2 rounded-lg bg-card border hover:border-primary hover:text-primary transition-all shadow-sm"><Twitter className="h-5 w-5" /></a>
                  <a href="#" className="p-2 rounded-lg bg-card border hover:border-primary hover:text-primary transition-all shadow-sm"><Instagram className="h-5 w-5" /></a>
                  <a href="#" className="p-2 rounded-lg bg-card border hover:border-primary hover:text-primary transition-all shadow-sm"><Youtube className="h-5 w-5" /></a>
                  <a href="#" className="p-2 rounded-lg bg-card border hover:border-primary hover:text-primary transition-all shadow-sm"><Facebook className="h-5 w-5" /></a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square max-w-[500px] mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative z-10 w-full h-full border-4 border-primary/20 rounded-2xl overflow-hidden bg-card shadow-2xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <div className="w-48 h-64 bg-slate-200 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center pt-10">
                      <div className="w-20 h-20 bg-slate-300 rounded-full mb-4" />
                      <div className="w-32 h-40 bg-slate-400 rounded-t-xl" />
                    </div>
                  </div>
                  <span className="font-medium">Фото скоро появится</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 text-center space-y-12">
          <div className="space-y-4 max-w-[800px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">ЭКСКЛЮЗИВНЫЙ МЕРЧ</h2>
            <p className="text-muted-foreground">Качественные вещи, созданные для тех, кто понимает футбол так же глубоко, как Александр Викторович.</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/catalog?cat=mugs" className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Кружки с цитатами</h3>
                <p className="text-sm text-muted-foreground">Начинайте утро с правильного разбора.</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform" />
            </Link>

            <Link to="/catalog?cat=books" className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Книги и автографы</h3>
                <p className="text-sm text-muted-foreground">История футбола в печатном слове.</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform" />
            </Link>

            <Link to="/catalog?cat=audiobooks" className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mic2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Аудио-разборы</h3>
                <p className="text-sm text-muted-foreground">Голос легенды в ваших наушниках.</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="bio" className="py-20 bg-muted/20 border-y">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-black tracking-tighter">БИОГРАФИЯ <br/><span className="text-primary text-5xl">ЛЕГЕНДЫ</span></h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Александр Викторович Бубнов родился 10 октября 1955 года в Люберцах. Советский футболист, защитник. 
                  Мастер спорта СССР международного класса. Выступал за клубы «Спартак» (Орджоникидзе), «Динамо» (Москва), «Спартак» (Москва) и французский «Ред Стар».
                </p>
                <p>
                  В составе сборной СССР провёл 34 матча, забил 1 гол. Участник чемпионата мира 1986 года. 
                  Трёхкратный чемпион СССР (1976 — весна, 1987, 1989), обладатель Кубка СССР (1977).
                </p>
                <p>
                  После завершения карьеры стал одним из самых известных и влиятельных футбольных аналитиков России. 
                  Его система подсчёта технико-тактических действий (ТТД) стала легендарной, а фразы разлетелись на цитаты.
                </p>
              </div>
              <Button variant="link" className="p-0 h-auto font-bold text-primary hover:text-primary/80" asChild>
                <a href="https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B1%D0%BD%D0%BE%D0%B2,_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80_%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87" target="_blank" rel="noopener noreferrer">
                  Подробнее в Википедии <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 p-6 rounded-2xl bg-card border-2 shadow-elegant">
                <div className="text-4xl font-display font-black text-primary">34</div>
                <div className="text-sm font-bold uppercase tracking-wider">Матча за сборную</div>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-card border-2 shadow-elegant">
                <div className="text-4xl font-display font-black text-primary">3</div>
                <div className="text-sm font-bold uppercase tracking-wider">Титула чемпиона</div>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-card border-2 shadow-elegant">
                <div className="text-4xl font-display font-black text-primary">100%</div>
                <div className="text-sm font-bold uppercase tracking-wider">Честность и ТТД</div>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-card border-2 shadow-elegant">
                <div className="text-4xl font-display font-black text-primary">∞</div>
                <div className="text-sm font-bold uppercase tracking-wider">Любовь фанатов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-white/20 aspect-square" />
            ))}
          </div>
        </div>
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <blockquote className="max-w-[800px] mx-auto space-y-8">
            <p className="text-3xl md:text-5xl font-display font-medium leading-tight italic">
              "Дилетанты! Вы футбол не видели, вы в него не играли! А я всю жизнь в нем!"
            </p>
            <footer className="text-primary font-bold tracking-widest uppercase">
              — АЛЕКСАНДР БУБНОВ
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
