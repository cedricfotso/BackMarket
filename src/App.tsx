import React, { useState, useEffect, useMemo } from 'react';
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
  Play
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

// --- DONNÉES DES PRODUITS (Étendues pour la densité) ---
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

  // Navigation
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

  // --- COMPOSANTS INTERNES ---

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="bg-black text-[#ccff00] text-[10px] font-black text-center py-2 uppercase tracking-[0.2em]">
        Livraison standard offerte • Garantie 12 mois minimum • Assistance Senior 7j/7
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2"><Menu /></button>
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-7 sm:h-8" />
          </div>
        </div>
        
        <div className="flex-1 max-w-xl mx-12 hidden md:block">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Rechercher un iPhone, un iPad, une marque..." 
              className="w-full h-12 pl-12 pr-4 rounded-full bg-slate-100 border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 outline-none transition-all font-medium text-slate-700" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black w-5 h-5 transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <a href={telLink} className="hidden lg:flex items-center gap-3 bg-[#ccff00] text-black px-6 py-3 rounded-full font-black text-sm shadow-sm hover:scale-105 transition-transform border border-black/5">
            <Phone className="w-4 h-4" /> {demoPhoneNumber}
          </a>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('assistance')} className="text-slate-700 hover:text-black font-black text-sm hidden sm:block uppercase tracking-tighter">Aide</button>
            <button className="text-slate-700 hover:text-black font-black text-sm hidden sm:block uppercase tracking-tighter">Connexion</button>
            <button onClick={() => cart.length > 0 && navigate('checkout')} className="relative p-2 hover:bg-slate-50 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-slate-800" />
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
    <footer className="bg-[#1D1D1B] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Logo" className="h-8 brightness-0 invert" />
            <p className="text-slate-400 font-medium leading-relaxed">
              Le premier site dédié au reconditionné de haute qualité. Nous redonnons vie aux appareils pour sauver la planète et votre portefeuille.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"><Facebook className="w-5 h-5" /></button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"><Instagram className="w-5 h-5" /></button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"><Twitter className="w-5 h-5" /></button>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-xl mb-8 border-l-4 border-[#ccff00] pl-4 uppercase tracking-tighter">Produits</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><button className="hover:text-white transition-colors">iPhone reconditionnés</button></li>
              <li><button className="hover:text-white transition-colors">iPad et Tablettes</button></li>
              <li><button className="hover:text-white transition-colors">MacBook et Laptops</button></li>
              <li><button className="hover:text-white transition-colors">Consoles de jeux</button></li>
              <li><button className="hover:text-white transition-colors">Ventes Flash</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8 border-l-4 border-[#ccff00] pl-4 uppercase tracking-tighter">Aide Senior</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><button onClick={() => navigate('assistance')} className="text-[#ccff00] hover:underline">Espace Accompagnement</button></li>
              <li><button className="hover:text-white transition-colors">Suivre mon colis</button></li>
              <li><button className="hover:text-white transition-colors">Retours et Garanties</button></li>
              <li><button className="hover:text-white transition-colors">Le Pacte Qualité</button></li>
              <li><button className="hover:text-white transition-colors">Paiement sécurisé</button></li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
            <h4 className="font-black text-xl mb-4">On reste en contact ?</h4>
            <p className="text-slate-400 mb-6 text-sm">Appelez-nous gratuitement pour toute question. Nous sommes là pour ça.</p>
            <a href={telLink} className="flex items-center justify-center gap-3 bg-[#ccff00] text-black py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl">
              <Phone className="w-6 h-6" /> {demoPhoneNumber}
            </a>
            <p className="text-center mt-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Disponible du lundi au dimanche</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">
          <p>© 2026 Back Market - Qualité certifiée</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <button className="hover:text-white transition-colors">Mentions légales</button>
            <button className="hover:text-white transition-colors">C.G.V.</button>
            <button className="hover:text-white transition-colors">Confidentialité</button>
            <button className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // --- ÉCRAN ACCUEIL ---

  const HomeScreen = () => (
    <div className="animate-in fade-in duration-1000">
      {/* 1. HERO BANNER */}
      <section className="relative h-[600px] md:h-[750px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/image-accueil.png" alt="Seniors heureux avec technologie" className="w-full h-full object-cover scale-105 animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 bg-[#ccff00] text-black font-black text-[12px] px-5 py-2 rounded-full mb-10 uppercase tracking-widest shadow-2xl">
              <ShieldCheck className="w-4 h-4" /> Qualité Senior Certifiée
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.95] mb-10 tracking-tighter drop-shadow-2xl">
              La technologie,<br /><span className="text-[#ccff00]">sans le stress.</span>
            </h1>
            <p className="text-xl md:text-3xl mb-14 text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow-lg">
              Des smartphones et tablettes comme neufs, testés par des experts et garantis 1 an. On s'occupe de tout pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => navigate('product', PRODUCTS[0])} className="group bg-white text-black font-black py-6 px-14 rounded-full text-2xl shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:bg-[#ccff00] transition-all hover:scale-110 active:scale-95 flex items-center justify-center gap-4">
                Découvrir nos offres <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => navigate('assistance')} className="bg-black/20 backdrop-blur-xl border-4 border-white/20 text-white font-black py-6 px-14 rounded-full text-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-4">
                <PlayCircle className="w-8 h-8" /> Aide Vidéo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRE DE RÉASSURANCE DYNAMIQUE */}
      <section className="bg-white border-b border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="flex flex-col items-center lg:items-start gap-6 group">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-black shadow-inner group-hover:bg-[#ccff00] transition-all duration-500 rotate-3 group-hover:rotate-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <p className="font-black text-2xl text-slate-900 leading-none mb-2 tracking-tight">Garantie 1 an</p>
              <p className="text-lg text-slate-500 font-medium leading-snug">Une panne ? On répare ou remplace sans frais.</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-6 group">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-black shadow-inner group-hover:bg-[#ccff00] transition-all duration-500 -rotate-3 group-hover:rotate-0">
              <Truck className="w-10 h-10" />
            </div>
            <div>
              <p className="font-black text-2xl text-slate-900 leading-none mb-2 tracking-tight">Livraison Offerte</p>
              <p className="text-lg text-slate-500 font-medium leading-snug">Expédition sécurisée sous 24h directement chez vous.</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-6 group">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-black shadow-inner group-hover:bg-[#ccff00] transition-all duration-500 rotate-6 group-hover:rotate-0">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <p className="font-black text-2xl text-slate-900 leading-none mb-2 tracking-tight">Qualité Pro</p>
              <p className="text-lg text-slate-500 font-medium leading-snug">Plus de 40 points de contrôle sur chaque appareil.</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-6 group">
            <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-black shadow-inner group-hover:bg-[#ccff00] transition-all duration-500 -rotate-6 group-hover:rotate-0">
              <Phone className="w-10 h-10" />
            </div>
            <div>
              <p className="font-black text-2xl text-slate-900 leading-none mb-2 tracking-tight">Aide Humaine</p>
              <p className="text-lg text-slate-500 font-medium leading-snug">Pas de robot. Des conseillers réels vous répondent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOC RASSURANCE INTERCALÉ : AVIS FLASH */}
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
             <div className="flex flex-col items-center gap-3">
               <div className="flex text-black gap-1">
                 <Star className="fill-[#ccff00] text-[#ccff00] w-7 h-7" /><Star className="fill-[#ccff00] text-[#ccff00] w-7 h-7" /><Star className="fill-[#ccff00] text-[#ccff00] w-7 h-7" /><Star className="fill-[#ccff00] text-[#ccff00] w-7 h-7" /><Star className="fill-[#ccff00] text-[#ccff00] w-7 h-7" />
               </div>
               <span className="font-black text-xl tracking-tighter uppercase">Excellent sur Trustpilot</span>
             </div>
             <div className="h-16 w-1 bg-slate-200 hidden md:block"></div>
             <p className="text-2xl text-slate-700 font-black text-center italic leading-tight max-w-xl">
               "J'avais peur d'acheter reconditionné. Le conseiller m'a rassuré au téléphone. Mon iPhone est magnifique !"
               <br /><span className="text-sm font-bold text-slate-400 mt-2 block not-italic">— Marie-Claude, 69 ans</span>
             </p>
             <div className="h-16 w-1 bg-slate-200 hidden md:block"></div>
             <div className="flex flex-col items-center gap-1">
               <ThumbsUp className="w-10 h-10 text-blue-600 mb-2" />
               <span className="font-black text-sm uppercase tracking-widest text-slate-500">Service 5 Étoiles</span>
             </div>
          </div>
        </div>
      </section>

      {/* 4. GRILLE DE CATÉGORIES - FORÇAGE DIMENSIONS */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-black mb-6 tracking-tight leading-none">Que cherchez-vous aujourd'hui ?</h2>
            <p className="text-2xl text-slate-500 font-medium">Parcourez nos rayons simplifiés et trouvez votre bonheur.</p>
          </div>
          <button className="flex items-center gap-3 font-black text-2xl hover:gap-6 transition-all border-b-8 border-[#ccff00] pb-2">
            Tout voir <ArrowRight className="w-8 h-8" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { name: "Smartphones", icon: Smartphone, color: "bg-blue-50", desc: "iPhone, Samsung..." },
            { name: "Tablettes", icon: Tablet, color: "bg-emerald-50", desc: "iPad, Galaxy Tab" },
            { name: "Ordinateurs", icon: Laptop, color: "bg-purple-50", desc: "MacBook, PC" },
            { name: "Montres", icon: Watch, color: "bg-orange-50", desc: "Apple Watch..." },
            { name: "Audio", icon: Headphones, color: "bg-rose-50", desc: "Casques, Écouteurs" },
            { name: "Séniors", icon: Heart, color: "bg-[#ccff00]/20", desc: "Sélection Confort" },
            { name: "Photo", icon: Camera, color: "bg-cyan-50", desc: "Appareils, Objectifs" },
            { name: "Bons plans", icon: Tag, color: "bg-slate-100", desc: "Les meilleures prix" },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button 
                key={idx} 
                onClick={() => navigate('product', PRODUCTS[0])}
                className={`${cat.color} hover:bg-white hover:ring-8 hover:ring-black p-12 rounded-[56px] flex flex-col items-center justify-center gap-8 transition-all group h-72 border-4 border-white shadow-xl hover:shadow-2xl`}
              >
                {/* FIX: Dimensions d'icône forcées */}
                <div className="w-24 h-24 bg-white rounded-3xl p-6 shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center border border-slate-100">
                  <Icon className="w-12 h-12 text-black" />
                </div>
                <div className="text-center">
                  <span className="font-black text-black text-2xl block leading-none mb-1 tracking-tighter">{cat.name}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. ESPACE SENIOR / MODE CONCONFORT - RASSURANCE MAXIMALE */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#EAE0F5] rounded-[72px] p-16 md:p-24 flex flex-col md:flex-row items-center gap-20 border-8 border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden">
           <div className="absolute -top-20 -right-20 opacity-5 pointer-events-none transform rotate-12"><ShieldCheck className="w-[500px] h-[500px]" /></div>
           <div className="flex-1 relative z-10">
             <div className="bg-[#2A0054] text-white text-[12px] font-black px-6 py-2.5 rounded-full mb-10 w-max shadow-lg tracking-[0.2em] uppercase">
               Exclusivité Senior
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-[#2A0054] mb-10 leading-[1] tracking-tighter">
               L'informatique enfin<br /><span className="underline decoration-[#ccff00] decoration-8 underline-offset-8">lisible pour tous.</span>
             </h2>
             <p className="text-2xl text-[#2A0054] mb-14 font-medium leading-relaxed opacity-90">
               Nous avons conçu le "Mode Confort" : un bouton magique qui agrandit toutes les écritures et simplifie l'affichage. 
               Essayez-le, c'est gratuit et ça change la vie.
             </p>
             <div className="flex flex-wrap gap-8">
               <button onClick={handleActivateSerenity} className="bg-[#2A0054] text-white font-black py-7 px-14 rounded-full flex items-center gap-4 shadow-[0_25px_50px_rgba(42,0,84,0.3)] hover:bg-black transition-all hover:scale-105 active:scale-95 text-2xl group">
                 {serenityMode ? 'Quitter le Mode Confort' : 'Activer le Mode Confort'} 
                 <ShieldCheck className="w-10 h-10 text-[#ccff00] group-hover:rotate-12 transition-transform" />
               </button>
             </div>
           </div>
           
           <div className="flex-1 grid grid-cols-2 gap-8 relative z-10">
              {PRODUCTS.filter(p => p.isSeniorFriendly).slice(0, 2).map(p => (
                <div key={p.id} onClick={() => navigate('product', p)} className="bg-white p-10 rounded-[48px] shadow-2xl cursor-pointer hover:scale-105 transition-all group border-4 border-transparent hover:border-[#2A0054]">
                  {/* FIX: Conteneur image forcé */}
                  <div className="aspect-square w-full flex items-center justify-center mb-8 bg-slate-50 rounded-[32px] p-8 overflow-hidden border border-slate-100">
                    <img src={p.imgUrl} alt={p.title} className="w-full h-full object-contain group-hover:scale-125 transition-transform duration-700" />
                  </div>
                  <p className="font-black text-center text-slate-900 text-2xl tracking-tighter mb-2">{p.title}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 fill-black" />
                    <span className="font-black text-[#2A0054] text-xl">{p.price} €</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. GRILLE DE PRODUITS PRINCIPALE - FORÇAGE STRICT DES DIMENSIONS */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-center gap-6 mb-20">
           <h3 className="text-5xl font-black tracking-tighter">Nos smartphones recommandés</h3>
           <div className="h-2 flex-1 bg-slate-100 rounded-full mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {PRODUCTS.map(p => (
            <div 
              key={p.id} 
              onClick={() => navigate('product', p)}
              className="bg-white border-4 border-slate-50 rounded-[64px] p-12 hover:border-black transition-all cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-2xl active:scale-[0.98]"
            >
              {/* FIX: Dimensions d'image 1:1 obligatoires avec fond blanc et padding uniforme */}
              <div className="aspect-square w-full flex items-center justify-center mb-12 overflow-hidden bg-white p-10 relative rounded-[40px] border border-slate-50">
                <img 
                  src={p.imgUrl} 
                  alt={p.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                />
                {p.isSeniorFriendly && (
                  <div className="absolute top-4 left-4 bg-[#ccff00] text-black text-[12px] font-black px-5 py-2 rounded-2xl shadow-lg uppercase tracking-tighter ring-4 ring-white">
                    Choix Senior
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{p.title}</h4>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 fill-black text-black" />
                    <span className="text-sm font-black">{p.rating}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xl mb-10 leading-snug font-bold italic">"{p.desc}"</p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-10 border-t-4 border-slate-50">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-300 font-black line-through mb-1 uppercase tracking-widest">Neuf : {p.oldPrice}€</span>
                  <span className="text-5xl font-black text-black tracking-tighter">{p.price} €</span>
                </div>
                <div className="bg-black text-[#ccff00] p-6 rounded-full group-hover:rotate-12 transition-all shadow-xl group-hover:bg-[#ccff00] group-hover:text-black">
                  <ArrowRight className="w-8 h-8" strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NOUVEL ÉLÉMENT : RASSURANCE PAR ÉTAPES - BLOC NOIR */}
      <section className="bg-[#1D1D1B] text-white py-32 px-6 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <h3 className="text-5xl font-black mb-24 text-center tracking-tighter">On s'occupe de tout pour vous.</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 text-center lg:text-left">
               <div className="space-y-8 group">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 group-hover:bg-[#ccff00] transition-colors"><Shield className="w-10 h-10 group-hover:text-black transition-colors" /></div>
                  <h3 className="text-4xl font-black tracking-tight">Garantie Totale 1 an</h3>
                  <p className="text-2xl text-slate-400 font-medium leading-relaxed">Pas besoin de stresser. En cas de panne, on récupère l'appareil, on le répare ou on vous rembourse.</p>
                  <button className="text-[#ccff00] font-black text-xl flex items-center gap-2 hover:underline">En savoir plus <ChevronRight /></button>
               </div>
               <div className="space-y-8 group">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 group-hover:bg-[#ccff00] transition-colors"><Clock className="w-10 h-10 group-hover:text-black transition-colors" /></div>
                  <h3 className="text-4xl font-black tracking-tight">Livraison Rapide</h3>
                  <p className="text-2xl text-slate-400 font-medium leading-relaxed">Commandez aujourd'hui, soyez livré d'ici 48h. On vous appelle dès que le colis est prêt.</p>
                  <button className="text-[#ccff00] font-black text-xl flex items-center gap-2 hover:underline">Suivre un colis <ChevronRight /></button>
               </div>
               <div className="space-y-8 group">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 group-hover:bg-[#ccff00] transition-colors"><Headset className="w-10 h-10 group-hover:text-black transition-colors" /></div>
                  <h3 className="text-4xl font-black tracking-tight">Assistance Humaine</h3>
                  <p className="text-2xl text-slate-400 font-medium leading-relaxed">Nos conseillers parlent votre langue. Ils prennent le temps de vous expliquer comment ça marche.</p>
                  <button className="text-[#ccff00] font-black text-xl flex items-center gap-2 hover:underline">Appeler Julien <ChevronRight /></button>
               </div>
            </div>
         </div>
      </section>

      {/* 8. BANNIÈRE NEWSLETTER (VERTE) - FORTE DENSITÉ VISUELLE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#ccff00] rounded-[80px] p-16 md:p-32 text-center flex flex-col items-center shadow-2xl border-8 border-white relative overflow-hidden">
          <div className="absolute top-10 right-10 text-black/10"><Tag className="w-64 h-64 rotate-12" /></div>
          <h3 className="text-5xl md:text-8xl font-black text-black mb-10 tracking-tighter leading-none">On vous offre 5 €<br />immédiatement.</h3>
          <p className="text-black font-black text-2xl mb-16 opacity-80 max-w-3xl leading-relaxed">
            Inscrivez-vous pour recevoir nos tutoriels vidéo "spécial débutant" et nos bons plans du moment. 
            C'est gratuit et sans engagement.
          </p>
          <div className="flex w-full max-w-3xl gap-6 flex-col md:flex-row relative z-10">
            <input 
              type="email" 
              placeholder="Votre adresse e-mail ici..." 
              className="flex-1 rounded-full px-12 py-8 text-2xl outline-none shadow-2xl border-8 border-transparent focus:border-black font-black placeholder:text-slate-300" 
            />
            <button className="bg-black text-white font-black px-16 py-8 rounded-full text-2xl hover:scale-105 transition-all shadow-2xl active:scale-95">S'abonner</button>
          </div>
          <p className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-black/40">Zéro Spam • Désinscription en 1 clic • Respect des données</p>
        </div>
      </section>

      {/* 9. BANNIÈRE RACHAT (MAUVE) - INTEGRITÉ DU DESIGN */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#EAE0F5] rounded-[80px] p-16 md:p-32 flex flex-col lg:flex-row items-center justify-between gap-24 shadow-inner border-4 border-white">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-5xl md:text-7xl font-black text-[#2A0054] mb-10 tracking-tighter leading-[0.9]">
              Votre vieux téléphone<br />vaut de l'or.
            </h3>
            <p className="text-[#2A0054] font-black text-2xl mb-14 leading-relaxed opacity-70">
               Ne le laissez pas traîner dans un tiroir. Nous vous le rachetons cash. 
               C'est écologique et ça finance votre prochain achat !
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="bg-[#2A0054] text-white font-black px-16 py-8 rounded-full text-2xl hover:opacity-90 shadow-2xl transition-all transform hover:scale-110 active:scale-95">
                Estimer le prix
              </button>
              <button className="bg-white text-[#2A0054] font-black px-16 py-8 rounded-full text-2xl border-4 border-[#2A0054]/10 hover:bg-slate-50 transition-all">
                Comment ça marche ?
              </button>
            </div>
          </div>
          <div className="bg-white rounded-[64px] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.1)] flex flex-col gap-10 text-2xl font-black text-slate-900 border-4 border-[#2A0054]/5">
            <div className="flex items-center gap-6"><div className="bg-green-100 p-4 rounded-3xl shadow-sm"><CheckCircle2 className="text-green-600 w-10 h-10" /></div> Virement en 48h</div>
            <div className="flex items-center gap-6"><div className="bg-green-100 p-4 rounded-3xl shadow-sm"><CheckCircle2 className="text-green-600 w-10 h-10" /></div> Étiquette d'envoi gratuite</div>
            <div className="flex items-center gap-6"><div className="bg-green-100 p-4 rounded-3xl shadow-sm"><CheckCircle2 className="text-green-600 w-10 h-10" /></div> Effacement des données</div>
          </div>
        </div>
      </section>

      {/* 10. TÉMOIGNAGES CLIENTS DÉTAILLÉS - RASSURANCE PSYCHOLOGIQUE */}
      <section className="bg-slate-50 py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-6xl font-black mb-24 tracking-tighter leading-none">Nos clients nous aiment,<br />et ils le disent.</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            {[
              { name: "Jean-Pierre, 72 ans", text: "Commander a été d'une simplicité folle. Le conseiller a pris le temps de m'expliquer la différence entre les modèles au téléphone. C'est très précieux de nos jours.", stars: 5, avatar: "JP", loc: "Bordeaux" },
              { name: "Marie-Louise, 68 ans", text: "Le mode confort est une révolution. Je peux enfin lire le site sans chercher mes lunettes. Mon iPad est comme neuf, je suis ravie de mon achat.", stars: 5, avatar: "ML", loc: "Lyon" },
              { name: "Robert, 81 ans", text: "Service impeccable du début à la fin. On m'a même aidé par appel vidéo pour configurer mes e-mails sur mon nouveau téléphone. Un grand merci !", stars: 5, avatar: "R", loc: "Lille" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-14 rounded-[64px] shadow-sm border-4 border-white hover:shadow-2xl transition-all flex flex-col relative group">
                <div className="absolute -top-8 -left-8 bg-[#ccff00] text-black p-6 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform"><MessageSquare className="w-10 h-10" /></div>
                <div className="flex gap-2 mb-10 mt-6">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-7 h-7 fill-black text-black" />)}
                </div>
                <p className="italic text-slate-800 mb-14 text-2xl font-black leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-6 mt-auto">
                  <div className="w-20 h-20 bg-[#EAE0F5] rounded-full flex items-center justify-center font-black text-[#2A0054] text-3xl shadow-inner border-4 border-white">{t.avatar}</div>
                  <div>
                    <span className="font-black text-slate-900 text-2xl block tracking-tighter leading-none mb-1">{t.name}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. VIDÉOS D'ENGAGEMENT - RÉASSURANCE VISUELLE FINALE */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-5xl font-black mb-20 text-center text-[#2A0054] tracking-tighter">
          Nos engagements en images
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {[
            { title: "Payer sans stress", desc: "Découvrez comment nous protégeons vos données bancaires avec les meilleurs outils.", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80" },
            { title: "L'art du test", desc: "Entrez dans nos ateliers et voyez comment nos experts vérifient chaque bouton.", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&q=80" },
            { title: "Zéro risque", desc: "Pourquoi la garantie 12 mois est la meilleure sécurité pour vous et vos proches.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" }
          ].map((v, i) => (
            <div key={i} className="group rounded-[64px] overflow-hidden shadow-sm border-4 border-white bg-white flex flex-col hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all">
              <div className="aspect-video bg-black relative overflow-hidden">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-70 group-hover:scale-125 transition-transform duration-[2s]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#ccff00] group-hover:scale-125 transition-all duration-500 ring-8 ring-white/10 group-hover:ring-[#ccff00]/30">
                    <Play className="w-10 h-10 text-white group-hover:text-black fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-12">
                <h4 className="font-black text-3xl text-slate-900 mb-4 leading-none tracking-tighter">{v.title}</h4>
                <p className="text-slate-500 font-bold text-xl leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // --- ÉCRAN PRODUIT DÉTAILLÉ - IMAGE FORCÉE ---

  const ProductScreen = () => {
    if (!selectedProduct) return null;
    return (
      <div className="min-h-screen bg-white pb-40 animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button onClick={() => navigate('home')} className="flex items-center gap-4 font-black text-slate-400 mb-20 hover:text-black transition-all text-2xl group uppercase tracking-widest">
            <ArrowLeft className="w-8 h-8 group-hover:-translate-x-4 transition-transform" /> Revenir à la sélection
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            {/* FIX: Conteneur image produit massif et forcé */}
            <div className="bg-slate-50 rounded-[80px] p-20 md:p-32 flex items-center justify-center border-8 border-white shadow-inner h-[600px] md:h-[850px] relative overflow-hidden">
              <div className="absolute -top-10 -left-10 text-slate-100 font-black text-[300px] opacity-40 uppercase pointer-events-none tracking-tighter leading-none select-none">{selectedProduct.brand}</div>
              <div className="w-full h-full flex items-center justify-center relative z-10 drop-shadow-[0_45px_45px_rgba(0,0,0,0.2)] scale-110">
                <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform hover:scale-110 duration-1000" />
              </div>
            </div>
            
            <div className="flex flex-col py-10">
              <div className="flex gap-6 mb-10">
                <span className="bg-[#ccff00] text-black text-[12px] font-black px-6 py-3 rounded-full shadow-lg tracking-widest ring-4 ring-white">PARFAIT ÉTAT</span>
                {selectedProduct.isSeniorFriendly && <span className="bg-blue-600 text-white text-[12px] font-black px-6 py-3 rounded-full shadow-lg tracking-widest ring-4 ring-white uppercase">Recommandé Senior</span>}
              </div>
              <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] text-slate-900">{selectedProduct.title}</h1>
              <p className="text-4xl text-slate-300 mb-16 font-black italic tracking-tight">{selectedProduct.desc}</p>
              
              <div className="flex items-baseline gap-10 mb-20">
                <span className="text-[140px] font-black tracking-tighter text-black leading-none">{selectedProduct.price} €</span>
                <span className="text-4xl text-slate-200 line-through font-black">Neuf : {selectedProduct.oldPrice} €</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                <div className="flex items-center gap-8 p-10 border-8 border-slate-50 rounded-[56px] bg-slate-50/50 shadow-sm">
                  <ShieldCheck className="w-16 h-16 text-green-600" />
                  <div>
                    <span className="font-black block text-3xl tracking-tight">Garantie 1 an</span>
                    <span className="text-slate-400 font-black text-sm uppercase tracking-widest">Incluse d'office.</span>
                  </div>
                </div>
                <div className="flex items-center gap-8 p-10 border-8 border-slate-50 rounded-[56px] bg-slate-50/50 shadow-sm">
                  <Truck className="w-16 h-16 text-blue-600" />
                  <div>
                    <span className="font-black block text-3xl tracking-tight">Envoi Offert</span>
                    <span className="text-slate-400 font-black text-sm uppercase tracking-widest">Chez vous demain.</span>
                  </div>
                </div>
              </div>

              {/* PARCOURS ULTRA-COURT : DIRECT TO CHECKOUT */}
              <div className="flex flex-col gap-8">
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setCheckoutStep('info');
                    navigate('checkout');
                  }}
                  className="w-full bg-black text-white py-10 rounded-full text-4xl font-black shadow-[0_35px_60px_-12px_rgba(0,0,0,0.6)] hover:bg-slate-800 transition-all hover:scale-[1.05] active:scale-95 flex items-center justify-center gap-8 group"
                >
                  Acheter en 2 clics <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform" strokeWidth={4} />
                </button>
                <div className="flex gap-8">
                  <button onClick={() => {addToCart(selectedProduct);}} className="flex-1 py-8 border-8 border-slate-50 rounded-full font-black text-2xl hover:bg-slate-50 transition-all">Ajouter au panier</button>
                  <a href={telLink} className="flex-1 flex items-center justify-center gap-4 py-8 bg-[#ccff00] text-black rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition-transform">
                    <Phone className="w-10 h-10" /> Aide au téléphone
                  </a>
                </div>
              </div>

              <div className="mt-24 p-14 bg-slate-50 rounded-[64px] border-4 border-slate-100 relative group overflow-hidden">
                <div className="absolute top-10 right-10 text-slate-100 group-hover:text-[#ccff00] transition-colors scale-[4] rotate-12 pointer-events-none"><Info className="w-24 h-24" /></div>
                <h4 className="font-black text-3xl mb-10 relative z-10 flex items-center gap-4">L'avis de notre expert Senior <ThumbsUp className="text-[#ccff00] fill-current" /></h4>
                <p className="text-slate-600 text-2xl leading-relaxed font-black italic relative z-10 opacity-80">
                  "J'ai testé ce modèle personnellement : la prise en main est excellente, les boutons sont faciles d'accès et l'écran offre un contraste superbe pour la lecture des SMS. C'est l'un des meilleurs compromis entre modernité et facilité d'usage."
                </p>
                <div className="mt-12 flex items-center gap-6 text-white bg-black px-8 py-4 rounded-3xl w-max font-black uppercase text-sm tracking-[0.2em] relative z-10 shadow-xl">
                   Expertise Back Market Senior
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- ÉCRAN TUNNEL DE PAIEMENT - STYLE SHOPIFY COMPLET ---

  const CheckoutScreen = () => {
    if (!selectedProduct) return null;
    const shipping = 0;
    const total = selectedProduct.price + shipping;

    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-in slide-in-from-bottom-20 duration-1000">
        {/* Colonne de Gauche : Formulaire de Saisie (Shopify Style) */}
        <div className="flex-1 px-8 py-20 md:px-24 lg:px-40 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-8 mb-20">
               <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-8" />
               <ChevronRight className="w-6 h-6 text-slate-200" />
               <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Finalisation sécurisée</h2>
            </div>

            {/* Barre de Progression Shopify Style */}
            <nav className="flex gap-10 text-xs font-black mb-20 uppercase tracking-[0.2em]">
              <button className={checkoutStep === 'info' ? 'text-black border-b-8 border-[#ccff00] pb-3' : 'text-slate-200 pb-3 cursor-not-allowed'}>1. Informations de livraison</button>
              <ChevronRight className="w-5 h-5 text-slate-100" />
              <button className={checkoutStep === 'payment' ? 'text-black border-b-8 border-[#ccff00] pb-3' : 'text-slate-200 pb-3 cursor-not-allowed'}>2. Paiement par carte</button>
            </nav>

            {checkoutStep === 'info' ? (
              <div className="space-y-16 animate-in fade-in duration-500">
                <section>
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-4xl font-black tracking-tight">Votre contact</h3>
                    <p className="text-sm text-slate-400 font-black uppercase tracking-widest flex items-center gap-2"><Lock className="w-4 h-4" /> Site Sécurisé</p>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Adresse E-mail (Suivi de colis)</label>
                      <input type="email" placeholder="votre@email.com" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none transition-all font-black shadow-inner" />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-4xl font-black mb-10 tracking-tight">Où devons-nous envoyer le colis ?</h3>
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Prénom</label>
                        <input type="text" placeholder="Ex: Marie" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Nom de famille</label>
                        <input type="text" placeholder="Ex: Dupont" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Adresse de votre domicile</label>
                      <input type="text" placeholder="Numéro et nom de rue" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Code Postal</label>
                        <input type="text" placeholder="75000" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Ville</label>
                        <input type="text" placeholder="Paris" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Numéro de téléphone</label>
                      <input type="tel" placeholder="Nécessaire pour le livreur" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                    </div>
                  </div>
                </section>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 pt-16 border-t-8 border-slate-50">
                  <button onClick={() => setCheckoutStep('payment')} className="w-full md:w-auto bg-black text-white font-black py-8 px-20 rounded-[40px] text-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-6">
                    Étape suivante <ArrowRight className="w-8 h-8" strokeWidth={3} />
                  </button>
                  <button onClick={() => navigate('product')} className="text-slate-300 font-black flex items-center gap-4 hover:text-black transition-colors text-2xl uppercase tracking-widest">
                    <ArrowLeft className="w-8 h-8" /> Revenir
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-16 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-4xl font-black mb-10 tracking-tight flex items-center gap-4">Paiement ultra-sécurisé <Lock className="w-8 h-8 text-green-600" /></h3>
                  <p className="text-slate-400 mb-12 font-black text-2xl leading-relaxed italic opacity-80">"Vos informations bancaires sont cryptées et ne sont jamais enregistrées sur nos serveurs."</p>
                  
                  <div className="border-8 border-black rounded-[56px] overflow-hidden shadow-2xl">
                    <div className="p-10 bg-slate-50 flex items-center justify-between border-b-8 border-black">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 border-[8px] border-black rounded-full shadow-inner ring-8 ring-black/5" />
                        <span className="font-black text-3xl tracking-tighter uppercase">Carte Bancaire</span>
                      </div>
                      <div className="flex gap-4">
                         <div className="bg-white border-4 border-slate-100 rounded-xl p-3 text-[12px] font-black tracking-widest">VISA</div>
                         <div className="bg-white border-4 border-slate-100 rounded-xl p-3 text-[12px] font-black tracking-widest">MASTERCARD</div>
                      </div>
                    </div>
                    <div className="p-14 space-y-10">
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Numéro inscrit sur votre carte</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                          <ShieldCheck className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-100 w-12 h-12" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Fin de validité (MM/AA)</label>
                          <input type="text" placeholder="12 / 28" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] ml-2">Code au dos (CVV)</label>
                          <div className="relative">
                            <input type="text" placeholder="123" className="w-full p-8 border-4 border-slate-50 rounded-[32px] text-3xl focus:border-black outline-none font-black shadow-inner" />
                            <Info className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-100 w-12 h-12 cursor-help" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="bg-[#ccff00]/10 p-10 rounded-[48px] border-8 border-[#ccff00]/30 flex items-center gap-8 shadow-xl">
                  <div className="bg-black p-6 rounded-[32px] shadow-2xl"><ShieldCheck className="w-14 h-14 text-[#ccff00]" /></div>
                  <p className="text-black font-black text-2xl leading-snug">
                    Vous êtes protégé ! Votre garantie "Sérénité Senior" de 12 mois est active dès validation du paiement.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 pt-16 border-t-8 border-slate-50">
                  <button onClick={() => navigate('success')} className="w-full md:w-auto bg-black text-[#ccff00] font-black py-10 px-24 rounded-[40px] text-4xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] hover:bg-[#111] transition-all hover:scale-110 active:scale-95 border-b-8 border-black">
                    Payer {total} €
                  </button>
                  <button onClick={() => setCheckoutStep('info')} className="text-slate-300 font-black flex items-center gap-4 hover:text-black transition-colors text-2xl uppercase tracking-widest">
                    <ArrowLeft className="w-8 h-8" /> Revenir
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-32 py-16 border-t-8 border-slate-50 text-slate-200 text-[11px] font-black uppercase tracking-[0.4em] text-center">
              Paiement 100% Sécurisé • Serveurs en France • Données Cryptées
            </div>
          </div>
        </div>

        {/* Colonne de Droite : Récapitulatif Flottant (Shopify Style) */}
        <div className="w-full lg:w-[600px] bg-slate-50 border-l-8 border-white px-10 py-24 md:px-16 relative">
          <div className="sticky top-24 max-w-lg mx-auto">
            <h3 className="text-3xl font-black mb-16 pb-8 border-b-8 border-white flex items-center gap-6 tracking-tighter uppercase"><ShoppingCart className="w-10 h-10" /> Votre commande</h3>
            
            <div className="flex items-center gap-10 mb-16 group">
              <div className="relative">
                <div className="w-40 h-40 bg-white border-8 border-white rounded-[48px] p-6 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform overflow-hidden">
                   <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <span className="absolute -top-6 -right-6 bg-black text-[#ccff00] text-xl font-black w-12 h-12 rounded-[20px] flex items-center justify-center border-8 border-slate-50 shadow-2xl">1</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-3xl text-slate-900 mb-2 leading-none tracking-tighter">{selectedProduct.title}</p>
                <p className="text-xl text-slate-400 font-black italic tracking-tight">{selectedProduct.desc}</p>
              </div>
              <p className="font-black text-3xl text-slate-900">{selectedProduct.price} €</p>
            </div>

            <div className="space-y-8 py-12 border-t-8 border-white">
              <div className="flex justify-between text-slate-500 font-black text-2xl tracking-tighter">
                <span>Prix de l'appareil</span>
                <span>{selectedProduct.price} €</span>
              </div>
              <div className="flex justify-between text-slate-500 font-black text-2xl tracking-tighter">
                <span>Livraison Standard</span>
                <span className="text-green-600 uppercase tracking-widest">Gratuit</span>
              </div>
            </div>

            <div className="pt-12 border-t-8 border-slate-200 flex justify-between items-center text-slate-900">
              <span className="text-4xl font-black tracking-tighter uppercase">À régler</span>
              <div className="text-right">
                <span className="text-sm font-black text-slate-300 block uppercase tracking-widest mb-2">EURO TTC</span>
                <span className="text-8xl font-black tracking-tighter leading-none">{total} €</span>
              </div>
            </div>

            {/* BLOC DE RASSURANCE DANS LE TUNNEL - TRÈS IMPORTANT */}
            <div className="mt-24 bg-white p-12 rounded-[64px] border-8 border-white shadow-2xl flex flex-col gap-10">
               <div className="flex items-center gap-8">
                 <div className="w-16 h-16 bg-[#ccff00] rounded-[24px] flex items-center justify-center text-black shadow-inner"><Phone className="w-8 h-8" /></div>
                 <div>
                   <p className="font-black text-2xl text-slate-900 leading-none mb-1 tracking-tighter">Un doute ?</p>
                   <p className="text-lg text-slate-400 font-black leading-tight">Appelez-nous au {demoPhoneNumber} pour valider par téléphone.</p>
                 </div>
               </div>
               <div className="flex items-center gap-8">
                 <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-black shadow-inner"><Lock className="w-8 h-8" /></div>
                 <p className="text-lg text-slate-400 font-black leading-tight">Paiement protégé par le protocole SSL 256-bit.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-12 animate-in zoom-in duration-700">
      <div className="max-w-4xl w-full text-center py-20">
        <div className="w-48 h-48 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-16 shadow-2xl ring-[32px] ring-green-50 animate-bounce">
          <Check className="w-24 h-24" strokeWidth={5} />
        </div>
        <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-none text-slate-900">Tout est parfait !</h1>
        <p className="text-4xl text-slate-400 mb-20 font-black italic leading-tight max-w-3xl mx-auto">
          Votre commande a bien été validée. Un de nos experts va vous appeler pour confirmer la livraison.
        </p>
        
        <div className="bg-slate-50 p-16 rounded-[80px] mb-20 border-8 border-white grid grid-cols-1 md:grid-cols-2 gap-16 text-left shadow-inner">
           <div className="space-y-4">
             <span className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] block">RÉFÉRENCE</span>
             <p className="text-5xl font-black text-[#2A0054] tracking-tighter leading-none">#BM-SENIOR-X</p>
           </div>
           <div className="space-y-4">
             <span className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] block">LIVRAISON</span>
             <p className="text-5xl font-black text-green-600 tracking-tighter leading-none">Demain 18h00</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          <button onClick={() => navigate('home')} className="flex-1 bg-black text-white py-10 rounded-full font-black text-4xl shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
            Retour à l'accueil
          </button>
          <button onClick={() => navigate('assistance')} className="flex-1 py-10 border-8 border-slate-50 rounded-full font-black text-4xl text-slate-500 hover:bg-slate-50 transition-all">
            Besoin d'aide ?
          </button>
        </div>
      </div>
    </div>
  );

  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 py-32 px-10 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate('home')} className="flex items-center gap-6 font-black text-slate-300 mb-20 hover:text-black text-3xl group uppercase tracking-widest">
          <ArrowLeft className="group-hover:-translate-x-6 transition-transform" /> Revenir
        </button>
        <div className="text-center mb-32">
          <h1 className="text-7xl md:text-[120px] font-black mb-12 tracking-tighter leading-[0.85] text-slate-900">On est là pour vous.</h1>
          <p className="text-4xl text-slate-400 max-w-5xl mx-auto font-black italic leading-tight opacity-80">
            Une équipe d'experts dédiée aux seniors pour que chaque appareil reste un plaisir simple au quotidien.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <div className="bg-white p-20 rounded-[100px] shadow-sm border-8 border-white flex flex-col items-center text-center group hover:shadow-2xl transition-all">
            <div className="w-32 h-32 bg-black text-[#ccff00] rounded-[40px] flex items-center justify-center mb-12 shadow-2xl group-hover:rotate-12 transition-transform">
              <Phone className="w-16 h-16" />
            </div>
            <h2 className="text-5xl font-black mb-10 tracking-tighter">Parler à un conseiller</h2>
            <p className="text-3xl text-slate-400 mb-16 font-black italic leading-relaxed">Pas de serveurs vocaux interminables. Un vrai humain vous répond gratuitement.</p>
            <a href={telLink} className="w-full bg-black text-[#ccff00] py-10 rounded-full font-black text-4xl shadow-2xl hover:scale-105 transition-transform">
              {demoPhoneNumber}
            </a>
          </div>
          
          <div className="bg-white p-20 rounded-[100px] shadow-sm border-8 border-white flex flex-col items-center text-center group hover:shadow-2xl transition-all">
            <div className="w-32 h-32 bg-purple-600 text-white rounded-[40px] flex items-center justify-center mb-12 shadow-2xl group-hover:-rotate-12 transition-transform">
              <Video className="w-16 h-16" />
            </div>
            <h2 className="text-5xl font-black mb-10 tracking-tighter">Assistance Vidéo</h2>
            <p className="text-3xl text-slate-400 mb-16 font-black italic leading-relaxed">Partagez votre écran pour que nous puissions vous guider visuellement pas à pas.</p>
            <button className="w-full bg-slate-100 text-slate-700 py-10 rounded-full font-black text-4xl hover:bg-slate-200 transition-all shadow-xl">
              Démarrer la visio
            </button>
          </div>
        </div>

        {/* GUIDES VIDÉO INTÉGRÉS DANS L'AIDE */}
        <div className="bg-white rounded-[80px] p-20 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white">
           <h3 className="text-5xl font-black mb-20 text-center tracking-tighter uppercase">Nos tutoriels en vidéo</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
              {[
                { title: "Mettre les textes plus gros", desc: "Apprenez à agrandir l'écriture en 10 secondes.", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" },
                { title: "Passer un appel WhatsApp", desc: "La méthode simple pour voir vos petits-enfants.", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80" }
              ].map((g, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-slate-100 rounded-[56px] mb-10 flex items-center justify-center relative overflow-hidden shadow-xl border-4 border-slate-50">
                    <img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[1.5s] opacity-80" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-all"><Play className="w-10 h-10 ml-2 fill-current" /></div>
                    </div>
                  </div>
                  <h4 className="text-4xl font-black tracking-tighter leading-none mb-4">{g.title}</h4>
                  <p className="text-2xl text-slate-400 font-bold italic">"{g.desc}"</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen selection:bg-[#ccff00] selection:text-black">
      {/* Header conditionnel */}
      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Header />}
      
      <main>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
        {currentScreen === 'success' && <SuccessScreen />}
      </main>

      {/* Footer conditionnel */}
      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Footer />}

      {/* BOUTON FLOTTANT MODE CONFORT - ACCESSIBILITÉ MAXIMALE */}
      <div className="fixed bottom-12 left-12 z-[100]">
        <button 
          onClick={handleActivateSerenity}
          className={`flex items-center gap-8 px-14 py-8 rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.5)] font-black border-[10px] transition-all hover:scale-110 active:scale-90 ${serenityMode ? 'bg-black text-[#ccff00] border-black' : 'bg-white text-black border-slate-100'}`}
        >
          {serenityMode ? <X className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12" />} 
          <span className="text-4xl hidden lg:inline tracking-tighter uppercase">{serenityMode ? 'Quitter' : 'Mode Confort'}</span>
        </button>
      </div>

      {/* CHATBOT BULLÉ - STYLE PREMIUM */}
      <button onClick={() => setShowChatbot(!showChatbot)} className="fixed bottom-12 right-12 z-[100] w-28 h-28 bg-black rounded-full flex items-center justify-center text-white shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-[10px] border-slate-900 hover:scale-110 transition-transform active:scale-90">
        <div className="relative">
          <MessageCircle className="w-14 h-14 text-[#ccff00]" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full animate-ping shadow-2xl" />
        </div>
      </button>

      {/* INTERFACE CHATBOT MASSIVE */}
      {showChatbot && (
        <div className="fixed bottom-48 right-12 z-[100] w-[550px] bg-white border-8 border-slate-50 rounded-[80px] shadow-[0_60px_150px_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in slide-in-from-bottom-20">
           <div className="bg-black text-white p-12 font-black flex justify-between items-center border-b-[16px] border-[#ccff00]">
             <div className="flex items-center gap-6">
               <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse ring-[12px] ring-green-950" />
               <span className="text-4xl tracking-tighter">Julien, votre expert</span>
             </div>
             <button onClick={() => setShowChatbot(false)} className="hover:rotate-90 transition-transform"><X className="w-12 h-12" /></button>
           </div>
           <div className="p-16 space-y-12">
             <p className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tight italic">
               "Bonjour ! Je suis Julien. Comment puis-je vous aider dans votre choix aujourd'hui ? On s'appelle ?"
             </p>
             <div className="flex flex-col gap-8">
               <a href={telLink} className="w-full bg-[#ccff00] text-black p-10 rounded-[40px] font-black flex items-center justify-center gap-6 text-4xl shadow-2xl hover:scale-[1.05] transition-transform active:scale-[0.98]">
                 <Phone className="w-12 h-12" /> M'appeler maintenant
               </a>
               <button onClick={() => {setShowChatbot(false); navigate('assistance');}} className="w-full bg-slate-50 text-slate-400 p-8 rounded-[32px] font-black text-2xl hover:bg-slate-100 transition-all border-4 border-slate-50">
                 Je préfère une aide vidéo
               </button>
             </div>
             <p className="text-center text-xs font-black uppercase text-slate-300 tracking-[0.4em]">Service client gratuit • 7 jours sur 7</p>
           </div>
        </div>
      )}
    </div>
  );
}
