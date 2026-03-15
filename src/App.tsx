import React, { useState, useEffect } from 'react';
import { 
  Search, 
  HelpCircle, 
  ShoppingCart, 
  Smartphone, 
  Tablet, 
  Headset, 
  CheckCircle2, 
  Star, 
  MessageCircle,
  ArrowLeft,
  Phone,
  Video,
  PlayCircle,
  ShieldCheck,
  X,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Tag,
  ArrowRight,
  CreditCard,
  Truck,
  Lock,
  ChevronRight,
  ThumbsUp,
  User,
  Info,
  MapPin,
  Check,
  Shield,
  Clock,
  Heart,
  MessageSquare,
  ChevronDown,
  AlertCircle,
  Menu,
  Facebook,
  Instagram,
  Twitter,
  ChevronLeft,
  Play,
  Settings
} from 'lucide-react';

// --- TYPES ---
type Screen = 'home' | 'product' | 'checkout' | 'assistance' | 'success';

interface Product {
  id: number;
  brand: string;
  title: string;
  desc: string;
  price: number;
  oldPrice: number;
  imgUrl: string;
  rating: string;
  reviewsCount: number;
  isSeniorFriendly?: boolean;
  category: string;
}

// --- DONNÉES DES PRODUITS ---
const PRODUCTS: Product[] = [
  { id: 1, brand: "Apple", title: "iPhone 13", desc: "128 Go - Noir - Débloqué", price: 429, oldPrice: 749, rating: "4.8", reviewsCount: 12450, isSeniorFriendly: true, category: "smartphones", imgUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80" },
  { id: 2, brand: "Samsung", title: "Galaxy S21", desc: "128 Go - Gris - Débloqué", price: 289, oldPrice: 859, rating: "4.5", reviewsCount: 8900, isSeniorFriendly: false, category: "smartphones", imgUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80" },
  { id: 3, brand: "Apple", title: "iPhone SE (2022)", desc: "64 Go - Rouge - Débloqué", price: 249, oldPrice: 529, rating: "4.9", reviewsCount: 5600, isSeniorFriendly: true, category: "smartphones", imgUrl: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80" },
  { id: 4, brand: "Apple", title: "iPad (2021) 10.2\"", desc: "64 Go - Gris Sidéral - Wi-Fi", price: 289, oldPrice: 389, rating: "4.7", reviewsCount: 3400, isSeniorFriendly: true, category: "tablettes", imgUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80" },
  { id: 5, brand: "Samsung", title: "Galaxy Tab A8", desc: "32 Go - Noir - Wi-Fi", price: 159, oldPrice: 229, rating: "4.6", reviewsCount: 1200, isSeniorFriendly: true, category: "tablettes", imgUrl: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=600&q=80" },
  { id: 6, brand: "Apple", title: "iPhone 12", desc: "64 Go - Bleu - Débloqué", price: 319, oldPrice: 689, rating: "4.4", reviewsCount: 15600, isSeniorFriendly: false, category: "smartphones", imgUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80" },
  { id: 7, brand: "Apple", title: "MacBook Air M1", desc: "256 Go - Gris - 8 Go RAM", price: 749, oldPrice: 1129, rating: "4.9", reviewsCount: 4500, isSeniorFriendly: true, category: "ordinateurs", imgUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80" },
  { id: 8, brand: "Sony", title: "WH-1000XM4", desc: "Noir - Réduction de bruit", price: 199, oldPrice: 349, rating: "4.8", reviewsCount: 2300, isSeniorFriendly: true, category: "audio", imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [serenityMode, setSerenityMode] = useState(() => {
    const saved = localStorage.getItem('serenityMode') === 'true';
    if (saved) document.body.classList.add('serenity-mode');
    return saved;
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'info' | 'payment'>('info');

  const demoPhoneNumber = "+33 7 54 14 28 93";
  const telLink = "tel:+33754142893";

  // Navigation logic
  const navigate = (screen: Screen, product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCart([product]);
  };

  const handleActivateSerenity = () => {
    const newValue = !serenityMode;
    setSerenityMode(newValue);
    localStorage.setItem('serenityMode', String(newValue));
    if (newValue) {
      document.body.classList.add('serenity-mode');
    } else {
      document.body.classList.remove('serenity-mode');
    }
  };

  // --- HELPERS POUR LES CLASSES CONDITIONNELLES ---
  // On utilise des fonctions pour rendre le code propre et adaptatif
  const titleSize = serenityMode ? "text-5xl md:text-7xl" : "text-3xl md:text-5xl";
  const bodySize = serenityMode ? "text-xl md:text-2xl" : "text-base md:text-lg";
  const buttonPadding = serenityMode ? "py-6 px-12 text-2xl" : "py-3 px-8 text-base";
  const iconSize = serenityMode ? 40 : 24;

  // --- COMPOSANTS DE STRUCTURE ---

  const Header = () => (
    <header className={`sticky top-0 z-50 bg-white border-b border-slate-200 transition-all ${serenityMode ? 'h-28' : 'h-20 md:h-24'}`}>
      <div className="bg-black text-[#ccff00] text-[10px] font-black text-center py-1.5 uppercase tracking-widest">
        Livraison standard offerte • Garantie 12 mois minimum • Assistance Senior 7j/7
      </div>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className={serenityMode ? "h-10" : "h-7 md:h-8"} />
          </div>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 hidden lg:block">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Rechercher un iPhone, iPad..." 
              className={`w-full bg-slate-100 border-2 border-transparent focus:bg-white focus:border-black rounded-full outline-none transition-all font-medium ${serenityMode ? 'h-14 px-14 text-xl' : 'h-11 px-12 text-sm'}`} 
            />
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors ${serenityMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <a href={telLink} className={`hidden md:flex items-center gap-2 bg-[#ccff00] text-black rounded-full font-black shadow-sm hover:scale-105 transition-transform ${serenityMode ? 'px-8 py-4 text-xl' : 'px-4 py-2 text-xs uppercase'}`}>
            <Phone className={serenityMode ? "w-6 h-6" : "w-4 h-4"} /> {demoPhoneNumber}
          </a>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('assistance')} className={`text-slate-700 hover:text-black font-black hidden sm:block uppercase tracking-tighter ${serenityMode ? 'text-xl' : 'text-xs'}`}>Aide</button>
            <button onClick={() => cart.length > 0 && navigate('checkout')} className="relative p-2 hover:bg-slate-50 rounded-full">
              <ShoppingCart className={serenityMode ? "w-8 h-8" : "w-6 h-6"} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-black text-[#ccff00] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-in zoom-in">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-[#1D1D1B] text-white pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Logo" className="h-7 brightness-0 invert" />
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Le premier site dédié au reconditionné de haute qualité. Chaque appareil est testé pour garantir une expérience parfaite.
            </p>
            <div className="flex gap-4">
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"><Facebook className="w-4 h-4" /></button>
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"><Instagram className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-sm mb-6 border-l-2 border-[#ccff00] pl-3 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3 text-sm font-bold text-slate-400">
              <li><button className="hover:text-white">iPhone reconditionnés</button></li>
              <li><button className="hover:text-white">MacBook et PC</button></li>
              <li><button className="hover:text-white">iPad et Tablettes</button></li>
              <li><button className="hover:text-white">Consoles de jeux</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm mb-6 border-l-2 border-[#ccff00] pl-3 uppercase tracking-widest">Accompagnement</h4>
            <ul className="space-y-3 text-sm font-bold text-slate-400">
              <li><button onClick={() => navigate('assistance')} className="text-[#ccff00] hover:underline">Espace Senior</button></li>
              <li><button className="hover:text-white">Suivre ma commande</button></li>
              <li><button className="hover:text-white">Garanties</button></li>
              <li><button className="hover:text-white">Retours</button></li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
            <h4 className="font-black text-lg mb-2 tracking-tight">Une question ?</h4>
            <p className="text-slate-400 text-xs mb-6">Appelez-nous gratuitement. Un expert vous répond en moins de 2 minutes.</p>
            <a href={telLink} className="flex items-center justify-center gap-3 bg-[#ccff00] text-black py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" /> {demoPhoneNumber}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <p>© 2026 Back Market - Qualité certifiée pour tous</p>
          <div className="flex gap-8">
            <button className="hover:text-white">Mentions légales</button>
            <button className="hover:text-white">C.G.V.</button>
            <button className="hover:text-white">Données</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // --- ÉCRAN ACCUEIL ---

  const HomeScreen = () => (
    <div className="animate-in fade-in duration-700">
      {/* 1. HERO BANNER ADAPTATIF */}
      <section className={`relative flex items-center text-white overflow-hidden transition-all ${serenityMode ? 'h-[700px]' : 'h-[500px] md:h-[600px]'}`}>
        <div className="absolute inset-0 z-0">
          <img src="/image-accueil.png" alt="Seniors heureux" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className={`transition-all ${serenityMode ? 'max-w-4xl' : 'max-w-2xl'}`}>
            <div className={`inline-flex items-center gap-2 bg-[#ccff00] text-black font-black px-3 py-1 rounded-full mb-6 uppercase tracking-wider shadow-lg transition-all ${serenityMode ? 'text-base' : 'text-[10px]'}`}>
              <ShieldCheck className={serenityMode ? 'w-5 h-5' : 'w-3 h-3'} /> Sélection Senior Certifiée
            </div>
            <h1 className={`font-black leading-tight mb-8 tracking-tighter transition-all ${titleSize}`}>
              La technologie,<br /><span className="text-[#ccff00]">enfin simple.</span>
            </h1>
            <p className={`mb-12 text-slate-100 font-medium leading-relaxed transition-all ${bodySize}`}>
              Des smartphones et tablettes comme neufs, garantis 1 an et faciles à lire. Un expert vous accompagne à chaque étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('product', PRODUCTS[0])} className={`bg-white text-black font-black rounded-full shadow-2xl hover:bg-[#ccff00] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 ${buttonPadding}`}>
                Voir les offres <ArrowRight />
              </button>
              <button onClick={() => navigate('assistance')} className={`bg-black/20 backdrop-blur-md border-2 border-white/30 text-white font-black rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3 ${buttonPadding}`}>
                <PlayCircle /> Aide Vidéo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRE DE RÉASSURANCE - TAILLE CONTRÔLÉE */}
      <section className="bg-white border-b border-slate-100 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Garantie 1 an", desc: "On répare tout." },
            { icon: Truck, title: "Envoi Gratuit", desc: "Chez vous en 48h." },
            { icon: CheckCircle2, title: "Testé Pro", desc: "40 points de contrôle." },
            { icon: Phone, title: "Aide Senior", desc: "Appel gratuit 7j/7." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
              <div className={`bg-slate-50 rounded-2xl flex items-center justify-center text-black shrink-0 transition-all ${serenityMode ? 'w-16 h-16' : 'w-12 h-12'}`}>
                <item.icon className={serenityMode ? 'w-8 h-8' : 'w-6 h-6'} />
              </div>
              <div className="space-y-0.5">
                <p className={`font-black text-slate-900 leading-none ${serenityMode ? 'text-xl' : 'text-base tracking-tight'}`}>{item.title}</p>
                <p className={`text-slate-500 font-medium ${serenityMode ? 'text-lg' : 'text-xs'}`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AVIS FLASH - ÉQUILIBRÉ */}
      <section className={`bg-slate-50 border-b border-slate-100 transition-all ${serenityMode ? 'py-16' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10">
           <div className="flex flex-col items-center">
             <div className="flex text-black gap-1 mb-2">
               {[...Array(5)].map((_, i) => <Star key={i} className="fill-[#ccff00] text-[#ccff00] w-5 h-5" />)}
             </div>
             <span className="font-black text-xs uppercase tracking-widest">Excellent sur Trustpilot</span>
           </div>
           <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
           <p className={`text-slate-700 font-black text-center italic transition-all ${serenityMode ? 'text-2xl' : 'text-sm'}`}>
             "Un service client incroyable qui prend vraiment le temps de tout expliquer." — Mme. Lefebvre
           </p>
        </div>
      </section>

      {/* 4. GRILLE DE CATÉGORIES - FORÇAGE DIMENSIONS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className={`font-black tracking-tight mb-12 text-center md:text-left transition-all ${serenityMode ? 'text-5xl' : 'text-2xl md:text-3xl'}`}>
          Trouvez votre appareil idéal
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Smartphones", icon: Smartphone, color: "bg-blue-50" },
            { name: "Tablettes", icon: Tablet, color: "bg-emerald-50" },
            { name: "Ordinateurs", icon: Laptop, color: "bg-purple-50" },
            { name: "Montres", icon: Watch, color: "bg-orange-50" },
            { name: "Audio", icon: Headphones, color: "bg-rose-50" },
            { name: "Séniors", icon: Heart, color: "bg-[#ccff00]/10" },
            { name: "Photo", icon: Camera, color: "bg-cyan-50" },
            { name: "Promo", icon: Tag, color: "bg-slate-100" },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button 
                key={idx} 
                onClick={() => navigate('product', PRODUCTS[0])}
                className={`${cat.color} hover:bg-white hover:ring-2 hover:ring-black rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all group border-2 border-transparent shadow-sm ${serenityMode ? 'h-64' : 'h-44'}`}
              >
                <div className={`bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center border border-slate-100 ${serenityMode ? 'w-20 h-20 p-5' : 'w-14 h-14 p-3'}`}>
                  <Icon className="w-full h-full text-black" />
                </div>
                <span className={`font-black text-black tracking-tight ${serenityMode ? 'text-xl' : 'text-sm'}`}>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. ESPACE SENIOR - L'ENTRÉE DU MODE CONFORT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className={`bg-[#EAE0F5] rounded-[48px] flex flex-col md:flex-row items-center gap-12 border-4 border-white shadow-xl relative overflow-hidden transition-all ${serenityMode ? 'p-20' : 'p-12'}`}>
           <div className="flex-1 relative z-10">
             <div className="bg-white text-[#2A0054] text-[10px] font-black px-4 py-1.5 rounded-full mb-6 w-max shadow-sm tracking-widest uppercase">
               Espace Dédié
             </div>
             <h2 className={`font-black text-[#2A0054] mb-6 tracking-tighter transition-all ${serenityMode ? 'text-6xl' : 'text-3xl md:text-4xl'}`}>
               Besoin d'un affichage plus grand ?
             </h2>
             <p className={`text-[#2A0054] mb-10 font-medium opacity-90 transition-all ${serenityMode ? 'text-2xl' : 'text-lg'}`}>
               Activez le "Mode Confort" pour agrandir les textes et les images. C'est l'interface idéale pour naviguer sans se fatiguer les yeux.
             </p>
             <button onClick={handleActivateSerenity} className={`bg-[#2A0054] text-white font-black rounded-full flex items-center gap-3 shadow-xl hover:bg-black transition-all hover:scale-105 active:scale-95 ${buttonPadding}`}>
               {serenityMode ? 'Désactiver le Mode Confort' : 'Essayer le Mode Confort'} <Settings className="animate-spin-slow" />
             </button>
           </div>
           
           <div className="flex-1 grid grid-cols-2 gap-6 relative z-10">
              {PRODUCTS.filter(p => p.isSeniorFriendly).slice(0, 2).map(p => (
                <div key={p.id} onClick={() => navigate('product', p)} className="bg-white p-6 rounded-[32px] shadow-lg cursor-pointer hover:scale-105 transition-all group border-2 border-transparent hover:border-[#2A0054]">
                  {/* FIX: Conteneur d'image forcé */}
                  <div className="aspect-square w-full flex items-center justify-center mb-4 bg-slate-50 rounded-2xl p-4 overflow-hidden border border-slate-100">
                    <img src={p.imgUrl} alt={p.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                  </div>
                  <p className={`font-black text-center text-slate-900 ${serenityMode ? 'text-xl' : 'text-sm'}`}>{p.title}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. GRILLE DE PRODUITS PRINCIPALE - FORÇAGE DIMENSIONS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className={`font-black tracking-tighter mb-16 text-center md:text-left transition-all ${serenityMode ? 'text-5xl' : 'text-3xl'}`}>
          Les smartphones que nous recommandons
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map(p => (
            <div 
              key={p.id} 
              onClick={() => navigate('product', p)}
              className="bg-white border-2 border-slate-100 rounded-[40px] p-8 hover:border-black transition-all cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-xl"
            >
              {/* FIX: Carré parfait obligatoire pour toutes les images */}
              <div className="aspect-square w-full flex items-center justify-center mb-8 overflow-hidden bg-white p-10 relative rounded-[32px] border border-slate-50">
                <img 
                  src={p.imgUrl} 
                  alt={p.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                />
                {p.isSeniorFriendly && (
                  <div className="absolute top-4 left-4 bg-[#ccff00] text-black text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase">
                    Senior +
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-black text-slate-900 tracking-tight leading-none ${serenityMode ? 'text-3xl' : 'text-xl md:text-2xl'}`}>{p.title}</h4>
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full text-xs font-bold">
                    <Star className="w-3 h-3 fill-black" /> {p.rating}
                  </div>
                </div>
                <p className={`text-slate-400 font-bold mb-8 transition-all ${serenityMode ? 'text-xl' : 'text-sm italic'}`}>{p.desc}</p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-300 font-black line-through mb-0.5 uppercase tracking-widest">Neuf : {p.oldPrice}€</span>
                  <span className={`font-black text-black tracking-tighter ${serenityMode ? 'text-4xl' : 'text-2xl'}`}>{p.price} €</span>
                </div>
                <div className="bg-black text-[#ccff00] p-4 rounded-full group-hover:bg-[#ccff00] group-hover:text-black transition-all shadow-md">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VIDÉOS DE RÉASSURANCE - ACCUEIL */}
      <section className={`bg-black text-white px-6 transition-all ${serenityMode ? 'py-32' : 'py-20'}`}>
         <div className="max-w-7xl mx-auto">
            <h3 className={`font-black mb-16 text-center tracking-tighter transition-all ${serenityMode ? 'text-5xl' : 'text-3xl'}`}>
              Achetez en toute sérénité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Sécurité du paiement", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80" },
                { title: "L'art du reconditionné", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80" },
                { title: "Garantie expliquée", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" }
              ].map((v, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-slate-900 relative overflow-hidden rounded-[32px] mb-6">
                    <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#ccff00] group-hover:scale-110 transition-all">
                        <Play className="w-6 h-6 text-white group-hover:text-black fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                  <h4 className={`font-black tracking-tight ${serenityMode ? 'text-2xl' : 'text-lg'}`}>{v.title}</h4>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* 8. NEWSLETTER - BANNIÈRE VERTE */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-[#ccff00] rounded-[64px] p-12 md:p-24 flex flex-col items-center shadow-lg border-4 border-white relative overflow-hidden">
          <h3 className={`font-black text-black mb-6 tracking-tighter leading-none transition-all ${serenityMode ? 'text-6xl' : 'text-4xl'}`}>
            On vous offre 5 €
          </h3>
          <p className={`text-black font-bold mb-12 opacity-80 max-w-2xl leading-relaxed transition-all ${serenityMode ? 'text-2xl' : 'text-lg'}`}>
            Recevez nos tutoriels "spécial débutant" et nos meilleures offres par e-mail.
          </p>
          <div className="flex w-full max-w-xl gap-4 flex-col md:flex-row">
            <input type="email" placeholder="votre@email.com" className="flex-1 rounded-2xl px-8 py-5 text-xl outline-none shadow-inner border-4 border-transparent focus:border-black font-bold" />
            <button className="bg-black text-white font-black px-10 py-5 rounded-2xl text-xl hover:scale-105 transition-all">S'inscrire</button>
          </div>
        </div>
      </section>

      {/* 9. RACHAT - MAUVE BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#EAE0F5] rounded-[64px] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-inner border-2 border-white">
          <div className="flex-1 text-center lg:text-left">
            <h3 className={`font-black text-[#2A0054] mb-8 tracking-tighter leading-tight transition-all ${serenityMode ? 'text-6xl' : 'text-4xl'}`}>
              Ne jetez pas vos anciens téléphones.
            </h3>
            <p className={`text-[#2A0054] font-bold mb-10 opacity-70 transition-all ${serenityMode ? 'text-2xl' : 'text-lg'}`}>
               Nous les rachetons cash. C'est bon pour la planète et pour votre portefeuille.
            </p>
            <button className="bg-[#2A0054] text-white font-black px-12 py-6 rounded-full text-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-xl">
              Estimer le prix
            </button>
          </div>
          <div className="bg-white rounded-[40px] p-10 shadow-2xl flex flex-col gap-6 text-xl font-black text-slate-800 border-4 border-[#2A0054]/5">
            <div className="flex items-center gap-4"><CheckCircle2 className="text-green-600 w-8 h-8" /> Virement en 48h</div>
            <div className="flex items-center gap-4"><CheckCircle2 className="text-green-600 w-8 h-8" /> Envoi 100% gratuit</div>
          </div>
        </div>
      </section>
    </div>
  );

  // --- ÉCRAN PRODUIT DÉTAILLÉ ---

  const ProductScreen = () => {
    if (!selectedProduct) return null;
    return (
      <div className="min-h-screen bg-white pb-32 animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 font-black text-slate-400 mb-12 hover:text-black transition-all text-xl group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-3 transition-transform" /> Revenir
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* FIX: Conteneur image produit forcé */}
            <div className={`bg-slate-50 rounded-[64px] flex items-center justify-center border-4 border-white shadow-inner relative transition-all ${serenityMode ? 'h-[600px] p-24' : 'h-[450px] md:h-[550px] p-12'}`}>
              <div className="absolute top-10 left-10 text-slate-100 font-black text-[150px] opacity-30 uppercase pointer-events-none tracking-tighter leading-none">{selectedProduct.brand}</div>
              <div className="w-full h-full flex items-center justify-center relative z-10 drop-shadow-2xl">
                <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>
            </div>
            
            <div className="flex flex-col py-6">
              <div className="flex gap-3 mb-6">
                <span className="bg-[#ccff00] text-black text-[10px] font-black px-4 py-2 rounded-full shadow-sm tracking-widest ring-4 ring-white uppercase">Parfait État</span>
              </div>
              <h1 className={`font-black tracking-tighter leading-none text-slate-900 transition-all ${serenityMode ? 'text-7xl mb-8' : 'text-4xl md:text-5xl mb-4'}`}>{selectedProduct.title}</h1>
              <p className={`text-slate-400 font-black transition-all ${serenityMode ? 'text-3xl mb-12' : 'text-xl mb-10'}`}>{selectedProduct.desc}</p>
              
              <div className="flex items-baseline gap-6 mb-12">
                <span className={`font-black tracking-tighter text-black leading-none transition-all ${serenityMode ? 'text-8xl' : 'text-6xl'}`}>{selectedProduct.price} €</span>
                <span className="text-xl text-slate-200 line-through font-black">Neuf : {selectedProduct.oldPrice} €</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="flex items-center gap-5 p-6 border-4 border-slate-50 rounded-[32px] bg-slate-50/50">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                  <div><span className="font-black block text-xl">Garantie 1 an</span><span className="text-slate-400 font-bold text-xs uppercase">Zéro Risque.</span></div>
                </div>
                <div className="flex items-center gap-5 p-6 border-4 border-slate-50 rounded-[32px] bg-slate-50/50">
                  <Truck className="w-10 h-10 text-blue-600" />
                  <div><span className="font-black block text-xl">Gratuit</span><span className="text-slate-400 font-bold text-xs uppercase">Livré demain.</span></div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setCheckoutStep('info');
                    navigate('checkout');
                  }}
                  className={`w-full bg-black text-white font-black shadow-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-6 rounded-full ${serenityMode ? 'py-10 text-4xl' : 'py-6 text-2xl'}`}
                >
                  Acheter en 2 clics <ChevronRight strokeWidth={4} />
                </button>
                <a href={telLink} className="flex items-center justify-center gap-4 py-5 bg-[#ccff00] text-black rounded-full font-black text-xl shadow-lg hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" /> Aide par téléphone
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- TUNNEL DE PAIEMENT SHOPIFY-STYLE ---

  const CheckoutScreen = () => {
    if (!selectedProduct) return null;
    const shipping = 0;
    const total = selectedProduct.price + shipping;

    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-in slide-in-from-bottom-20 duration-700">
        {/* Colonne Gauche : Formulaire */}
        <div className="flex-1 px-8 py-16 md:px-20 lg:px-32 bg-white">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
               <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Logo" className="h-6" />
               <ChevronRight className="w-4 h-4 text-slate-200" />
               <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Paiement Sécurisé</h2>
            </div>

            <nav className="flex gap-8 text-[11px] font-black mb-16 uppercase tracking-[0.2em]">
              <span className={checkoutStep === 'info' ? 'text-black border-b-4 border-[#ccff00] pb-2' : 'text-slate-200'}>1. Coordonnées</span>
              <ChevronRight className="w-4 h-4 text-slate-100" />
              <span className={checkoutStep === 'payment' ? 'text-black border-b-4 border-[#ccff00] pb-2' : 'text-slate-200'}>2. Paiement</span>
            </nav>

            {checkoutStep === 'info' ? (
              <div className="space-y-12 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-2xl font-black mb-8 tracking-tight">Où devons-nous envoyer votre colis ?</h3>
                  <div className="space-y-6">
                    <input type="email" placeholder="votre@email.com" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-xl font-bold focus:border-black outline-none transition-all" />
                    <div className="grid grid-cols-2 gap-6">
                      <input type="text" placeholder="Prénom" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-xl font-bold focus:border-black outline-none" />
                      <input type="text" placeholder="Nom" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-xl font-bold focus:border-black outline-none" />
                    </div>
                    <input type="text" placeholder="Adresse complète" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-xl font-bold focus:border-black outline-none" />
                  </div>
                </section>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 pt-10 border-t border-slate-50">
                  <button onClick={() => setCheckoutStep('payment')} className="w-full md:w-auto bg-black text-white font-black py-6 px-16 rounded-2xl text-2xl shadow-xl hover:scale-105 transition-all">
                    Aller au paiement
                  </button>
                  <button onClick={() => navigate('product')} className="text-slate-300 font-bold flex items-center gap-2 hover:text-black transition-colors uppercase text-xs tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Revenir
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-2xl font-black mb-10 tracking-tight">Paiement Sécurisé</h3>
                  <div className="border-4 border-black rounded-[40px] overflow-hidden shadow-2xl">
                    <div className="p-8 bg-slate-50 border-b-4 border-black flex justify-between items-center font-black text-xl">
                       <span>Carte Bancaire</span>
                       <div className="flex gap-2">
                          <div className="bg-white px-2 py-1 border rounded text-[8px] font-black">VISA</div>
                          <div className="bg-white px-2 py-1 border rounded text-[8px] font-black">MASTERCARD</div>
                       </div>
                    </div>
                    <div className="p-10 space-y-6">
                      <input type="text" placeholder="Numéro de votre carte" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-2xl font-black outline-none focus:border-black" />
                      <div className="grid grid-cols-2 gap-6">
                        <input type="text" placeholder="MM/AA" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-2xl font-black outline-none" />
                        <input type="text" placeholder="Code (CVV)" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-2xl text-2xl font-black outline-none" />
                      </div>
                    </div>
                  </div>
                </section>
                <button onClick={() => navigate('success')} className="w-full bg-[#ccff00] text-black font-black py-8 rounded-3xl text-3xl shadow-xl hover:scale-105 transition-all">
                  Payer {total} €
                </button>
              </div>
            )}
            <p className="text-center text-[10px] text-slate-300 font-black mt-20 uppercase tracking-[0.4em]">Transactions Cryptées • Serveurs Sécurisés</p>
          </div>
        </div>

        {/* Colonne Droite : Récapitulatif */}
        <div className="w-full lg:w-[450px] bg-slate-50 border-l-2 border-slate-100 px-10 py-24">
          <div className="sticky top-24 max-w-sm mx-auto">
            <h3 className="text-xl font-black mb-10 pb-6 border-b-2 border-slate-200">Votre panier</h3>
            <div className="flex items-center gap-8 mb-12">
              <div className="relative">
                <div className="w-24 h-24 bg-white border-2 border-white rounded-[24px] p-4 flex items-center justify-center shadow-lg">
                   <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="absolute -top-3 -right-3 bg-black text-[#ccff00] text-[10px] font-black w-7 h-7 rounded-lg flex items-center justify-center border-4 border-slate-50">1</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-xl text-slate-900 leading-tight">{selectedProduct.title}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{selectedProduct.brand}</p>
              </div>
              <p className="font-black text-xl text-slate-900">{selectedProduct.price} €</p>
            </div>

            <div className="space-y-4 py-8 border-t-2 border-slate-200">
              <div className="flex justify-between text-slate-500 font-black text-sm">
                <span>Expédition</span>
                <span className="text-green-600 uppercase tracking-widest">Gratuit</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-2xl pt-6 border-t border-slate-100">
                <span>Total</span>
                <span>{total} €</span>
              </div>
            </div>
            
            <div className="mt-16 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
               <Phone className="w-6 h-6 text-slate-900" />
               <div>
                  <p className="font-black text-xs text-slate-900 tracking-tight">Besoin d'aide ?</p>
                  <p className="text-[10px] text-slate-400 font-bold">Un conseiller peut valider la commande avec vous par téléphone.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- ÉCRAN SUCCÈS ---

  const SuccessScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-12 text-center">
      <div className="max-w-2xl w-full">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
          <Check className="w-16 h-16" strokeWidth={5} />
        </div>
        <h1 className="text-6xl font-black mb-8 tracking-tighter">Bravo !</h1>
        <p className="text-2xl text-slate-400 mb-16 font-bold leading-tight">Votre commande est validée. Elle arrive demain avant 18h00.</p>
        <button onClick={() => navigate('home')} className="w-full bg-black text-white py-6 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-all">Retour Accueil</button>
      </div>
    </div>
  );

  // --- ÉCRAN ASSISTANCE ---

  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 py-24 px-8 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('home')} className="flex items-center gap-4 font-black text-slate-400 mb-16 hover:text-black text-xl group uppercase tracking-widest">
          <ArrowLeft className="group-hover:-translate-x-3 transition-transform" /> Revenir
        </button>
        <div className="text-center mb-24">
          <h1 className={`font-black mb-10 tracking-tight leading-none text-slate-900 transition-all ${serenityMode ? 'text-7xl' : 'text-5xl md:text-6xl'}`}>On ne vous laisse jamais seul.</h1>
          <p className={`text-slate-400 max-w-3xl mx-auto font-black italic opacity-70 transition-all ${serenityMode ? 'text-3xl' : 'text-xl'}`}>
            Une équipe dédiée aux seniors pour que chaque appareil reste un plaisir.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white p-12 rounded-[64px] shadow-sm border-4 border-white flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-black text-[#ccff00] rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
              <Phone className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black mb-6">Par téléphone</h2>
            <p className="text-lg text-slate-400 mb-10 font-bold">Un vrai humain vous répond gratuitement et sans attente.</p>
            <a href={telLink} className="w-full bg-black text-white py-6 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform">
              {demoPhoneNumber}
            </a>
          </div>
          
          <div className="bg-white p-12 rounded-[64px] shadow-sm border-4 border-white flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
              <Video className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black mb-6">Aide en Vidéo</h2>
            <p className="text-lg text-slate-400 mb-10 font-bold">Partagez votre écran pour que nous puissions vous guider pas à pas.</p>
            <button className="w-full bg-slate-100 text-slate-700 py-6 rounded-full font-black text-2xl hover:bg-slate-200 transition-all">
              Démarrer visio
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[64px] p-16 shadow-xl border-4 border-white">
           <h3 className="text-3xl font-black mb-12 text-center tracking-tighter uppercase">Nos tutoriels simples</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {[
                { title: "Agrandir les écritures", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" },
                { title: "Appeler sur WhatsApp", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80" }
              ].map((g, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-slate-100 rounded-[40px] mb-6 flex items-center justify-center relative overflow-hidden shadow-md">
                    <img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                    <PlayCircle className="absolute w-16 h-16 text-white shadow-2xl" />
                  </div>
                  <h4 className="text-xl font-black tracking-tight">{g.title}</h4>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`font-sans text-slate-900 min-h-screen selection:bg-[#ccff00] selection:text-black transition-all ${serenityMode ? 'serenity-active' : ''}`}>
      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Header />}
      
      <main>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
        {currentScreen === 'success' && <SuccessScreen />}
      </main>

      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Footer />}

      {/* BOUTON FLOTTANT MODE CONFORT - TAILLE ADAPTATIVE */}
      <div className="fixed bottom-6 left-6 z-[100]">
        <button 
          onClick={handleActivateSerenity}
          className={`flex items-center gap-3 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.2)] font-black border-4 transition-all hover:scale-110 active:scale-95 ${serenityMode ? 'bg-black text-[#ccff00] border-black p-8 text-3xl' : 'bg-white text-black border-slate-50 p-4 text-sm uppercase'}`}
        >
          {serenityMode ? <X className="w-10 h-10" /> : <Settings className="w-5 h-5" />} 
          <span className={serenityMode ? 'inline' : 'hidden lg:inline'}>{serenityMode ? 'Quitter Confort' : 'Mode Confort'}</span>
        </button>
      </div>

      {/* CHATBOT BULLÉ - TAILLE ADAPTATIVE */}
      <button onClick={() => setShowChatbot(!showChatbot)} className={`fixed bottom-6 right-6 z-[100] bg-black rounded-full flex items-center justify-center text-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] border-4 border-slate-900 hover:scale-110 transition-transform active:scale-90 ${serenityMode ? 'w-24 h-24' : 'w-16 h-16'}`}>
        <MessageCircle className={serenityMode ? "w-10 h-10 text-[#ccff00]" : "w-6 h-6 text-[#ccff00]"} />
      </button>

      {showChatbot && (
        <div className={`fixed bottom-28 right-6 z-[100] bg-white border-4 border-slate-50 shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-bottom-10 transition-all ${serenityMode ? 'w-[500px] rounded-[64px]' : 'w-[350px] rounded-[40px]'}`}>
           <div className="bg-black text-white p-8 font-black flex justify-between items-center border-b-8 border-[#ccff00]">
             <div className="flex items-center gap-4">
               <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
               <span className={serenityMode ? 'text-3xl' : 'text-xl'}>Votre assistant</span>
             </div>
             <button onClick={() => setShowChatbot(false)}><X className={serenityMode ? 'w-8 h-8' : 'w-5 h-5'} /></button>
           </div>
           <div className={`p-10 space-y-8 transition-all ${serenityMode ? 'text-3xl' : 'text-lg'}`}>
             <p className="font-black text-slate-800 leading-tight italic">"Bonjour ! Comment puis-je vous aider dans votre choix ? On s'appelle ?"</p>
             <div className="flex flex-col gap-4">
               <a href={telLink} className={`w-full bg-[#ccff00] text-black rounded-2xl font-black flex items-center justify-center gap-4 shadow-xl hover:scale-105 transition-transform ${serenityMode ? 'p-8 text-3xl' : 'p-5 text-xl'}`}>
                 <Phone /> M'appeler
               </a>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
