import { Github, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold tracking-tighter text-primary">BUBNOV</span>
              <span className="font-display text-2xl font-bold tracking-tighter">SHOP</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Официальный магазин Александра Бубнова. Уникальный мерч для истинных ценителей футбола. Разбор полетов гарантирован.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Магазин</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Все товары</Link></li>
              <li><Link to="/catalog?cat=mugs" className="hover:text-primary transition-colors">Кружки</Link></li>
              <li><Link to="/catalog?cat=t-shirts" className="hover:text-primary transition-colors">Футболки</Link></li>
              <li><Link to="/catalog?cat=books" className="hover:text-primary transition-colors">Книги</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Поддержка</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">О нас</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Контакты</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/delivery" className="hover:text-primary transition-colors">Доставка</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Соцсети</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
            <p className="text-xs text-muted-foreground pt-4">
              &copy; {currentYear} Bubnov Shop. Все права защищены. ТТД в подарок.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
