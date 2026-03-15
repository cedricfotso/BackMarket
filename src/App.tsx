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
  MessageSquare // Ajout de l'import manquant
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
  isSeniorFriendly?: boolean;
}

// --- DONNÉES DES PRODUITS ---
const PRODUCTS: Product[] = [
  { id: 1, brand: "Apple", title: "iPhone 13", desc: "128 Go - Noir - Débloqué", price: 429, oldPrice: 749, rating: "4.6", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80" },
  { id: 2, brand: "Samsung", title: "Galaxy S21", desc: "128 Go - Gris - Débloqué", price: 289, oldPrice: 859, rating: "4.5", isSeniorFriendly: false, imgUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80" },
  { id: 3, brand: "Apple", title: "iPhone SE (2022)", desc: "64 Go - Rouge - Débloqué", price: 249, oldPrice: 529, rating: "4.7", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80" },
  { id: 4, brand: "Apple", title: "iPad (2021) 10.2\"", desc: "64 Go - Gris Sidéral - Wi-Fi", price: 289, oldPrice: 389, rating: "4.7", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80" },
  { id: 5, brand: "Samsung", title: "Galaxy Tab A8", desc: "32 Go - Noir - Wi-Fi", price: 159, oldPrice: 229, rating: "4.5", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=500&q=80" },
  { id: 6, brand: "Apple", title: "iPhone 12", desc: "64 Go - Bleu - Débloqué", price: 319, oldPrice: 689, rating: "4.4", isSeniorFriendly: false, imgUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&q=80" }
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

  // Navigation fluide
  const navigate = (screen: Screen, product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
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

  // --- COMPOSANTS DE STRUCTURE ---

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="bg-[#ccff00] text-black text-[10px] font-black text-center py-1.5 uppercase tracking-widest">
        Livraison standard offerte • Garantie 12 mois minimum • Assistance téléphonique gratuite
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
          <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-7 sm:h-8" />
        </div>
        
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <input type="text" placeholder="Quel appareil cherchez-vous ?" className="w-full h-11 pl-12 pr-4 rounded-full bg-slate-100 border-none outline-none focus:ring-2 focus:ring-black font-medium" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <a href={telLink} className="hidden lg:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-black text-sm shadow-sm hover:bg-slate-800 transition-colors">
            <Phone className="w-4 h-4 text-[#ccff00]" /> {demoPhoneNumber}
          </a>
          <button onClick={() => navigate('assistance')} className="text-slate-700 hover:text-black font-bold text-sm hidden sm:block underline decoration-[#ccff00] decoration-2 underline-offset-4">Besoin d'aide ?</button>
          <button onClick={() => cart.length > 0 && navigate('checkout')} className="relative group">
            <ShoppingCart className="w-6 h-6 text-slate-800 group-hover:text-black transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ccff00] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div>
          <h4 className="font-black text-black text-lg mb-6">À propos de Back Market</h4>
          <ul className="space-y-4 font-medium text-slate-600">
            <li><button className="hover:underline">Notre mission pour l'écologie</button></li>
            <li><button className="hover:underline">Le Pacte Qualité</button></li>
            <li><button className="hover:underline">Comment nous testons les produits</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-black text-lg mb-6">Support Senior</h4>
          <ul className="space-y-4 font-medium text-slate-600">
            <li><button onClick={() => navigate('assistance')} className="text-blue-600 font-bold hover:underline">Accompagnement personnalisé</button></li>
            <li><button className="hover:underline">Suivre mon colis</button></li>
            <li><button className="hover:underline">Retourner un article</button></li>
          </ul>
        </div>
        <div className="md:col-span-2 bg-slate-50 p-10 rounded-[32px] border border-slate-100 shadow-inner">
          <h4 className="font-black text-black text-xl mb-4">Un conseiller vous rappelle ?</h4>
          <p className="mb-6 text-slate-600 font-medium">Laissez-vous guider par nos experts pour choisir l'appareil idéal selon vos besoins.</p>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href={telLink} className="inline-flex items-center justify-center gap-4 bg-[#ccff00] hover:bg-[#bbf000] text-black py-5 px-10 rounded-[24px] shadow-xl transition-all hover:scale-105 active:scale-95">
              <Phone className="w-7 h-7" />
              <span className="text-2xl font-black">{demoPhoneNumber}</span>
            </a>
            <div className="text-sm font-bold text-slate-500">
              <p className="flex items-center gap-2 mb-1"><Check className="w-4 h-4 text-green-600" /> Appel gratuit 7j/7</p>
              <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /> Experts basés en France</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
        <p>© 2026 Back Market - Spécialiste du reconditionné</p>
        <div className="flex gap-10">
          <button className="hover:text-black transition-colors">C.G.V.</button>
          <button className="hover:text-black transition-colors">Politique de confidentialité</button>
          <button className="hover:text-black transition-colors">Cookies</button>
        </div>
      </div>
    </footer>
  );

  // --- ÉCRAN ACCUEIL ---

  const HomeScreen = () => (
    <div className="animate-in fade-in duration-700">
      {/* 1. HERO BANNER */}
      <section className="relative h-[550px] md:h-[650px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/image-accueil.png" alt="Seniors heureux avec technologie" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#ccff00] text-black font-black text-xs px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Sélection Spéciale Seniors
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 drop-shadow-sm">
              Découvrez la technologie sans les complications.
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-slate-100 font-medium leading-relaxed max-w-xl">
              Des smartphones testés, garantis et accompagnés d'un service client qui prend le temps de vous expliquer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('product', PRODUCTS[0])} className="bg-white text-black font-black py-5 px-12 rounded-full text-2xl shadow-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95">
                Voir nos offres
              </button>
              <button onClick={() => navigate('assistance')} className="bg-transparent border-2 border-white/50 text-white font-black py-5 px-12 rounded-full text-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                Aide vidéo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRE DE RÉASSURANCE */}
      <section className="bg-white border-b border-slate-100 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-black shadow-sm"><ShieldCheck className="w-8 h-8" /></div>
            <div><p className="font-black text-lg text-slate-900 leading-tight">Garantie 1 an</p><p className="text-sm text-slate-500 font-medium">Panne ? On répare ou remplace.</p></div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-black shadow-sm"><Truck className="w-8 h-8" /></div>
            <div><p className="font-black text-lg text-slate-900 leading-tight">Envoi gratuit</p><p className="text-sm text-slate-500 font-medium">Chez vous en 48h maximum.</p></div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-black shadow-sm"><CheckCircle2 className="w-8 h-8" /></div>
            <div><p className="font-black text-lg text-slate-900 leading-tight">État certifié</p><p className="text-sm text-slate-500 font-medium">Testé sur 40 points de contrôle.</p></div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-black shadow-sm"><Phone className="w-8 h-8" /></div>
            <div><p className="font-black text-lg text-slate-900 leading-tight">Aide téléphonique</p><p className="text-sm text-slate-500 font-medium">Gratuite et illimitée 7j/7.</p></div>
          </div>
        </div>
      </section>

      {/* 3. NOUVEL ÉLÉMENT : RASSURANCE INTERCALÉE (AVIS FLASH) */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
           <div className="flex items-center gap-3">
             <div className="flex text-[#ccff00]"><Star className="fill-current text-black w-5 h-5" /><Star className="fill-current text-black w-5 h-5" /><Star className="fill-current text-black w-5 h-5" /><Star className="fill-current text-black w-5 h-5" /><Star className="fill-current text-black w-5 h-5" /></div>
             <span className="font-black text-lg">4.8/5 sur Trustpilot</span>
           </div>
           <p className="text-slate-600 font-bold text-center italic">"Un service client incroyable qui prend vraiment le temps." — Mme. Lefebvre</p>
           <div className="flex items-center gap-2">
             <ThumbsUp className="w-5 h-5 text-blue-600" />
             <span className="font-black text-sm">98% de clients satisfaits</span>
           </div>
        </div>
      </section>

      {/* 4. GRILLE DE CATÉGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4">Que recherchez-vous aujourd'hui ?</h2>
            <p className="text-xl text-slate-500 font-medium">Cliquez sur une image pour voir nos modèles disponibles.</p>
          </div>
          <button className="flex items-center gap-2 font-black text-lg hover:underline decoration-[#ccff00] decoration-4 underline-offset-8 transition-all">
            Voir tout le catalogue <ArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Smartphones", icon: Smartphone, color: "bg-blue-50" },
            { name: "Tablettes", icon: Tablet, color: "bg-emerald-50" },
            { name: "Ordinateurs", icon: Laptop, color: "bg-purple-50" },
            { name: "Montres", icon: Watch, color: "bg-orange-50" },
            { name: "Audio", icon: Headphones, color: "bg-rose-50" },
            { name: "Séniors", icon: Heart, color: "bg-[#ccff00]/20" },
            { name: "Photo", icon: Camera, color: "bg-cyan-50" },
            { name: "Bons plans", icon: Tag, color: "bg-slate-100" },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button 
                key={idx} 
                onClick={() => navigate('product', PRODUCTS[0])}
                className={`${cat.color} hover:bg-white hover:ring-4 hover:ring-black p-10 rounded-[40px] flex flex-col items-center justify-center gap-6 transition-all group h-52 border border-transparent shadow-sm`}
              >
                <div className="w-20 h-20 bg-white rounded-[24px] p-5 shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Icon className="w-10 h-10 text-black" />
                </div>
                <span className="font-black text-black text-xl tracking-tight">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. PORTE D'ENTRÉE ESPACE SENIOR (MODE CONCONFORT) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#EAE0F5] rounded-[56px] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border-4 border-white shadow-2xl relative overflow-hidden">
           <div className="absolute -top-10 -right-10 opacity-5"><Smartphone className="w-96 h-96 -rotate-12" /></div>
           <div className="flex-1 relative z-10">
             <div className="bg-white text-[#2A0054] text-xs font-black px-5 py-2 rounded-full mb-8 w-max shadow-sm border border-[#2A0054]/10">
               ESPACE DÉDIÉ AUX SÉNIORS
             </div>
             <h2 className="text-5xl md:text-6xl font-black text-[#2A0054] mb-8 leading-tight">L'informatique enfin lisible.</h2>
             <p className="text-2xl text-[#2A0054] mb-12 font-medium leading-relaxed opacity-90">
               Nous avons sélectionné des écrans larges et conçu un "Mode Confort" qui agrandit les écritures pour vous. 
               C'est gratuit et ça change tout.
             </p>
             <div className="flex flex-wrap gap-6">
               <button onClick={handleActivateSerenity} className="bg-[#2A0054] text-white font-black py-6 px-12 rounded-full flex items-center gap-4 shadow-xl hover:bg-black transition-all hover:scale-105 active:scale-95 text-xl">
                 {serenityMode ? 'Quitter le Mode Confort' : 'Activer le Mode Confort'} <ShieldCheck className="w-8 h-8 text-[#ccff00]" />
               </button>
             </div>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-8 relative z-10">
              {PRODUCTS.filter(p => p.isSeniorFriendly).slice(0, 2).map(p => (
                <div key={p.id} onClick={() => navigate('product', p)} className="bg-white p-8 rounded-[40px] shadow-lg cursor-pointer hover:scale-105 transition-all group border-2 border-transparent hover:border-[#2A0054]">
                  {/* FIX: Force les dimensions et l'alignement */}
                  <div className="aspect-square w-full flex items-center justify-center mb-6 bg-slate-50 rounded-3xl p-6 overflow-hidden">
                    <img src={p.imgUrl} alt={p.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="font-black text-center text-slate-900 text-lg">{p.title}</p>
                  <div className="text-center mt-3 flex items-center justify-center gap-2">
                    <span className="text-[#2A0054] font-black text-xl">{p.price} €</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. GRILLE DE PRODUITS (FORÇAGE DES IMAGES) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-black mb-16 tracking-tight">Nos smartphones les plus faciles à utiliser</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map(p => (
            <div 
              key={p.id} 
              onClick={() => navigate('product', p)}
              className="bg-white border-2 border-slate-100 rounded-[48px] p-10 hover:border-black transition-all cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-2xl"
            >
              {/* FIX: Dimensions identiques obligatoires pour toutes les images */}
              <div className="aspect-square w-full flex items-center justify-center mb-10 overflow-hidden bg-white p-8 relative">
                <img 
                  src={p.imgUrl} 
                  alt={p.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                />
                {p.isSeniorFriendly && (
                  <div className="absolute top-0 left-0 bg-[#ccff00] text-black text-[11px] font-black px-4 py-2 rounded-br-3xl shadow-sm uppercase tracking-tighter">
                    Idéal Senior
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-3xl font-black text-slate-900">{p.title}</h4>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3.5 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-black text-black" />
                    <span className="text-sm font-black">{p.rating}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xl mb-8 leading-tight font-medium">{p.desc}</p>
              </div>
              
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 font-bold line-through mb-1">Prix neuf : {p.oldPrice}€</span>
                  <span className="text-4xl font-black text-black">{p.price} €</span>
                </div>
                <div className="bg-black text-white p-5 rounded-full group-hover:bg-[#ccff00] group-hover:text-black transition-all shadow-lg">
                  <ArrowRight className="w-7 h-7" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NOUVEL ÉLÉMENT : RASSURANCE ÉTAPE PAR ÉTAPE */}
      <section className="bg-black text-white py-24 px-6 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00] rounded-full blur-[180px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10 text-center lg:text-left">
            <div className="space-y-6">
               <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto lg:mx-0"><Shield className="w-8 h-8 text-[#ccff00]" /></div>
               <h3 className="text-3xl font-black">Satisfait ou remboursé</h3>
               <p className="text-xl text-slate-400 font-medium">Vous avez 30 jours pour tester tranquillement chez vous. Si ça ne convient pas, on reprend tout.</p>
            </div>
            <div className="space-y-6">
               <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto lg:mx-0"><Clock className="w-8 h-8 text-[#ccff00]" /></div>
               <h3 className="text-3xl font-black">Livraison ultra-rapide</h3>
               <p className="text-xl text-slate-400 font-medium">Commandez aujourd'hui, recevez demain ou après-demain. Suivi par SMS à chaque étape.</p>
            </div>
            <div className="space-y-6">
               <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto lg:mx-0"><Headset className="w-8 h-8 text-[#ccff00]" /></div>
               <h3 className="text-3xl font-black">Humain au bout du fil</h3>
               <p className="text-xl text-slate-400 font-medium">Pas de robots. Des conseillers réels basés en France qui répondent en moins de 2 minutes.</p>
            </div>
         </div>
      </section>

      {/* 8. BANNIÈRE NEWSLETTER (VERTE) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#ccff00] rounded-[56px] p-12 md:p-24 text-center flex flex-col items-center shadow-xl border-4 border-white">
          <h3 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight">On vous offre 5 € sur votre premier achat.</h3>
          <p className="text-black font-black text-2xl mb-12 opacity-80 max-w-2xl">Rejoignez 100 000 seniors qui reçoivent nos tutoriels vidéo chaque semaine.</p>
          <div className="flex w-full max-w-2xl gap-4 flex-col sm:flex-row">
            <input type="email" placeholder="Votre adresse e-mail" className="flex-1 rounded-3xl px-10 py-6 text-2xl outline-none shadow-2xl border-4 border-transparent focus:border-black font-bold" />
            <button className="bg-black text-white font-black px-12 py-6 rounded-3xl text-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95">S'abonner</button>
          </div>
        </div>
      </section>

      {/* 9. BANNIÈRE RACHAT (MAUVE) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#EAE0F5] rounded-[56px] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-lg border-2 border-white">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-4xl md:text-6xl font-black text-[#2A0054] mb-8 tracking-tight leading-tight">Que faire de votre ancien téléphone ?</h3>
            <p className="text-[#2A0054] font-black text-2xl mb-12 leading-relaxed opacity-70">
               Ne le laissez pas dans un tiroir. Nous le rachetons cash au meilleur prix. 
               C'est bon pour la planète et pour votre budget.
            </p>
            <button className="bg-[#2A0054] text-white font-black px-14 py-7 rounded-full text-2xl hover:opacity-90 shadow-2xl transition-all transform hover:scale-105 active:scale-95">
              Estimer le prix de mon appareil
            </button>
          </div>
          <div className="bg-white rounded-[48px] p-12 shadow-2xl flex flex-col gap-8 text-xl font-black text-slate-800 border-2 border-[#2A0054]/5">
            <div className="flex items-center gap-5"><div className="bg-green-100 p-3 rounded-2xl"><CheckCircle2 className="text-green-600 w-8 h-8" /></div> Argent versé en 48h</div>
            <div className="flex items-center gap-5"><div className="bg-green-100 p-3 rounded-2xl"><CheckCircle2 className="text-green-600 w-8 h-8" /></div> Envoi 100% gratuit</div>
            <div className="flex items-center gap-5"><div className="bg-green-100 p-3 rounded-2xl"><CheckCircle2 className="text-green-600 w-8 h-8" /></div> Effacement total garanti</div>
          </div>
        </div>
      </section>

      {/* 10. TÉMOIGNAGES DÉTAILLÉS */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-5xl font-black mb-20 tracking-tight">Ce sont nos clients qui en parlent le mieux</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { name: "Jean-Pierre, 72 ans", text: "Commander a été d'une simplicité déconcertante. Le conseiller m'a rassuré sur l'état de la batterie. C'est parfait.", stars: 5, avatar: "JP" },
              { name: "Marie-Louise, 68 ans", text: "Le mode confort permet de lire enfin le site sans plisser les yeux. J'ai reçu mon iPad très vite, il est comme neuf.", stars: 5, avatar: "ML" },
              { name: "Robert, 80 ans", text: "Service impeccable. On m'a aidé par vidéo pour transférer mes photos de mon ancien téléphone. Très patient.", stars: 5, avatar: "R" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[48px] shadow-sm border border-slate-100 hover:shadow-2xl transition-all flex flex-col relative">
                <div className="absolute -top-6 -left-6 bg-[#ccff00] text-black p-4 rounded-3xl shadow-lg"><MessageSquare className="w-8 h-8" /></div>
                <div className="flex gap-1.5 mb-8 mt-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-6 h-6 fill-black text-black" />)}
                </div>
                <p className="italic text-slate-700 mb-12 text-2xl font-medium leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-5 mt-auto">
                  <div className="w-16 h-16 bg-[#EAE0F5] rounded-full flex items-center justify-center font-black text-[#2A0054] text-2xl shadow-inner border-2 border-white">{t.avatar}</div>
                  <span className="font-black text-slate-900 text-xl">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. VIDÉOS DE RÉASSURANCE */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-black mb-16 text-center text-[#2A0054] tracking-tight">
          Achetez en toute confiance : nos engagements en vidéo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { title: "Acheter en ligne sans peur", desc: "Comment nous sécurisons votre paiement et vos données.", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80" },
            { title: "La qualité Back Market", desc: "Découvrez nos usines de test et nos experts certifiés.", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80" },
            { title: "Votre garantie expliquée", desc: "12 mois de tranquillité d'esprit, on vous dit tout.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" }
          ].map((v, i) => (
            <div key={i} className="group rounded-[56px] overflow-hidden shadow-sm border border-slate-100 bg-white flex flex-col hover:shadow-2xl transition-all">
              <div className="aspect-video bg-slate-900 relative overflow-hidden">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[1.5s]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                  <PlayCircle className="w-24 h-24 text-white drop-shadow-2xl opacity-90 group-hover:scale-125 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-10">
                <h4 className="font-black text-2xl text-slate-900 mb-4">{v.title}</h4>
                <p className="text-slate-500 font-bold text-lg leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
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
          <button onClick={() => navigate('home')} className="flex items-center gap-3 font-black text-slate-400 mb-16 hover:text-black transition-all text-xl group">
            <ArrowLeft className="w-7 h-7 group-hover:-translate-x-3 transition-transform" /> Retour à la liste
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* FIX: Conteneur image produit forcé */}
            <div className="bg-slate-50 rounded-[64px] p-12 md:p-24 flex items-center justify-center border-4 border-white shadow-inner h-[550px] md:h-[750px] relative overflow-hidden">
              <div className="absolute top-10 left-10 text-slate-200 font-black text-9xl opacity-20 uppercase pointer-events-none">{selectedProduct.brand}</div>
              <div className="w-full h-full flex items-center justify-center relative z-10">
                <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]" />
              </div>
            </div>
            
            <div className="flex flex-col py-10">
              <div className="flex gap-4 mb-8">
                <span className="bg-[#ccff00] text-black text-[11px] font-black px-5 py-2.5 rounded-full shadow-sm tracking-widest">ÉTAT PARFAIT</span>
                {selectedProduct.isSeniorFriendly && <span className="bg-blue-100 text-blue-800 text-[11px] font-black px-5 py-2.5 rounded-full tracking-widest">SPÉCIAL SENIORS</span>}
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[1.05]">{selectedProduct.title}</h1>
              <p className="text-3xl text-slate-400 mb-12 font-black italic">{selectedProduct.desc}</p>
              
              <div className="flex items-baseline gap-8 mb-16">
                <span className="text-8xl font-black tracking-tighter text-black">{selectedProduct.price} €</span>
                <span className="text-3xl text-slate-300 line-through font-black">Neuf : {selectedProduct.oldPrice} €</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="flex items-center gap-6 p-8 border-4 border-slate-50 rounded-[40px] bg-slate-50/30">
                  <ShieldCheck className="w-12 h-12 text-green-600" />
                  <div>
                    <span className="font-black block text-2xl">Garantie 1 an</span>
                    <span className="text-slate-500 font-black text-sm uppercase">Tranquillité Totale.</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-8 border-4 border-slate-50 rounded-[40px] bg-slate-50/30">
                  <Truck className="w-12 h-12 text-blue-600" />
                  <div>
                    <span className="font-black block text-2xl">L'envoi est offert</span>
                    <span className="text-slate-500 font-black text-sm uppercase">Livré d'ici demain.</span>
                  </div>
                </div>
              </div>

              {/* PARCOURS ULTRA-COURT : DIRECT TO CHECKOUT */}
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => {
                    setCart([selectedProduct]);
                    setCheckoutStep('info');
                    navigate('checkout');
                  }}
                  className="w-full bg-black text-white py-8 rounded-full text-3xl font-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:bg-slate-800 transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-6"
                >
                  Acheter en 2 clics <ChevronRight className="w-10 h-10" strokeWidth={3} />
                </button>
                <div className="flex gap-6">
                  <button onClick={() => {setCart([...cart, selectedProduct]);}} className="flex-1 py-7 border-4 border-slate-100 rounded-full font-black text-2xl hover:bg-slate-50 transition-colors">Ajouter au panier</button>
                  <a href={telLink} className="flex-1 flex items-center justify-center gap-4 py-7 bg-[#ccff00] text-black rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform">
                    <Phone className="w-8 h-8" /> Aide au téléphone
                  </a>
                </div>
              </div>

              <div className="mt-16 p-10 bg-slate-50 rounded-[48px] border-2 border-slate-100 relative group">
                <div className="absolute top-6 right-6 text-slate-200 group-hover:text-[#ccff00] transition-colors"><Info className="w-10 h-10" /></div>
                <h4 className="font-black text-2xl mb-6">Pourquoi ce smartphone est-il si simple ?</h4>
                <p className="text-slate-600 text-xl leading-relaxed font-black opacity-80 italic">
                  "Nous avons testé ce modèle : son écran est très lumineux, le son des appels est clair et la batterie dure plus de deux jours. C'est l'appareil idéal pour rester en contact sans se compliquer la vie."
                </p>
                <div className="mt-8 flex items-center gap-4 text-[#ccff00] bg-black px-6 py-3 rounded-2xl w-max font-black uppercase text-xs tracking-widest">
                   Expertise Back Market Senior
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- ÉCRAN TUNNEL DE PAIEMENT (SHOPIFY STYLE) ---

  const CheckoutScreen = () => {
    if (!selectedProduct) return null;
    const shipping = 0;
    const total = selectedProduct.price + shipping;

    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-in slide-in-from-bottom-12 duration-1000">
        {/* Colonne de Gauche : Formulaire de Saisie */}
        <div className="flex-1 px-8 py-16 md:px-20 lg:px-32 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-6 mb-16">
               <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-7" />
               <ChevronRight className="w-5 h-5 text-slate-200" />
               <h2 className="text-lg font-black text-slate-900 tracking-tight">Finaliser ma commande</h2>
            </div>

            {/* Barre de Progression Shopify Style */}
            <nav className="flex gap-6 text-sm font-black mb-16">
              <button className={checkoutStep === 'info' ? 'text-black border-b-4 border-[#ccff00] pb-2' : 'text-slate-300 pb-2'}>1. Informations</button>
              <ChevronRight className="w-5 h-5 text-slate-100" />
              <button className={checkoutStep === 'payment' ? 'text-black border-b-4 border-[#ccff00] pb-2' : 'text-slate-300 pb-2'}>2. Paiement</button>
            </nav>

            {checkoutStep === 'info' ? (
              <div className="space-y-12 animate-in fade-in duration-500">
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-black">Où envoyons-nous le colis ?</h3>
                    <p className="text-sm text-slate-400 font-black uppercase tracking-wider">Identifiants sécurisés</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Adresse E-mail pour le suivi</label>
                      <input type="email" placeholder="votre@email.com" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none transition-all font-black" />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-3xl font-black mb-8">Votre adresse de livraison</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Prénom</label>
                        <input type="text" placeholder="Jean" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Nom</label>
                        <input type="text" placeholder="Dupont" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Adresse complète</label>
                      <input type="text" placeholder="Numéro et nom de votre rue" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Code Postal</label>
                        <input type="text" placeholder="75000" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Ville</label>
                        <input type="text" placeholder="Paris" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de téléphone</label>
                      <input type="tel" placeholder="Indispensable pour le livreur" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                    </div>
                  </div>
                </section>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 pt-12 border-t border-slate-100">
                  <button onClick={() => setCheckoutStep('payment')} className="w-full md:w-auto bg-black text-white font-black py-7 px-16 rounded-3xl text-2xl shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                    Continuer vers le paiement
                  </button>
                  <button onClick={() => navigate('product')} className="text-slate-400 font-black flex items-center gap-3 hover:text-black transition-colors text-xl">
                    <ArrowLeft className="w-6 h-6" /> Revenir à l'article
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-3xl font-black mb-8">Dernière étape : Paiement sécurisé</h3>
                  <p className="text-slate-500 mb-10 font-black text-xl leading-relaxed italic">"Nous cryptons toutes vos données. Votre sécurité est notre priorité absolue."</p>
                  
                  <div className="border-4 border-black rounded-[40px] overflow-hidden shadow-2xl">
                    <div className="p-8 bg-slate-50 flex items-center justify-between border-b-4 border-black">
                      <div className="flex items-center gap-5">
                        <div className="w-7 h-7 border-[6px] border-black rounded-full shadow-inner" />
                        <span className="font-black text-2xl tracking-tight">Carte Bancaire</span>
                      </div>
                      <div className="flex gap-3">
                         <div className="bg-white border-2 border-slate-100 rounded-lg p-2 text-[10px] font-black tracking-widest">VISA</div>
                         <div className="bg-white border-2 border-slate-100 rounded-lg p-2 text-[10px] font-black tracking-widest">MC</div>
                      </div>
                    </div>
                    <div className="p-10 space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Numéro de Carte</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                          <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 w-8 h-8" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Expiration (MM/AA)</label>
                          <input type="text" placeholder="12 / 28" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Code (CVV)</label>
                          <div className="relative">
                            <input type="text" placeholder="123" className="w-full p-6 border-4 border-slate-50 rounded-3xl text-2xl focus:border-black outline-none font-black" />
                            <Info className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 w-8 h-8 cursor-help" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="bg-[#ccff00]/10 p-8 rounded-[32px] border-4 border-[#ccff00] flex items-center gap-6">
                  <div className="bg-black p-4 rounded-2xl shadow-lg"><ShieldCheck className="w-10 h-10 text-[#ccff00]" /></div>
                  <p className="text-black font-black text-xl leading-snug">Votre garantie "Pacte Qualité Senior" de 12 mois est activée automatiquement.</p>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 pt-12 border-t border-slate-100">
                  <button onClick={() => navigate('success')} className="w-full md:w-auto bg-black text-white font-black py-8 px-20 rounded-[32px] text-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                    Payer {total} €
                  </button>
                  <button onClick={() => setCheckoutStep('info')} className="text-slate-400 font-black flex items-center gap-3 hover:text-black transition-colors text-xl">
                    <ArrowLeft className="w-6 h-6" /> Revenir aux informations
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-24 py-12 border-t border-slate-50 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] text-center">
              Transactions Sécurisées • Protection des données Senior
            </div>
          </div>
        </div>

        {/* Colonne de Droite : Récapitulatif Flottant */}
        <div className="w-full lg:w-[500px] bg-slate-50 border-l-4 border-white px-8 py-16 md:px-12">
          <div className="sticky top-16 max-w-md mx-auto">
            <h3 className="text-2xl font-black mb-12 pb-6 border-b-4 border-white flex items-center gap-3"><ShoppingCart className="w-8 h-8" /> Votre commande</h3>
            
            <div className="flex items-center gap-8 mb-12">
              <div className="relative group">
                <div className="w-32 h-32 bg-white border-4 border-white rounded-[32px] p-4 flex items-center justify-center shadow-xl group-hover:rotate-3 transition-transform">
                   <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="absolute -top-4 -right-4 bg-black text-white text-sm font-black w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-50 shadow-lg">1</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-2xl text-slate-900 mb-1">{selectedProduct.title}</p>
                <p className="text-lg text-slate-400 font-black italic">{selectedProduct.desc}</p>
              </div>
              <p className="font-black text-2xl text-slate-900">{selectedProduct.price} €</p>
            </div>

            <div className="space-y-6 py-10 border-t-4 border-white">
              <div className="flex justify-between text-slate-500 font-black text-xl">
                <span>Sous-total</span>
                <span>{selectedProduct.price} €</span>
              </div>
              <div className="flex justify-between text-slate-500 font-black text-xl">
                <span>Frais de port</span>
                <span className="text-green-600">Offert</span>
              </div>
            </div>

            <div className="pt-10 border-t-4 border-slate-200 flex justify-between items-center text-slate-900">
              <span className="text-3xl font-black tracking-tight">Total à régler</span>
              <div className="text-right">
                <span className="text-xs font-black text-slate-400 block uppercase tracking-widest mb-1">EURO TTC</span>
                <span className="text-6xl font-black tracking-tighter">{total} €</span>
              </div>
            </div>

            {/* BLOC DE RASSURANCE DANS LE TUNNEL */}
            <div className="mt-20 bg-white p-10 rounded-[48px] border-4 border-white shadow-2xl flex flex-col gap-6">
               <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-[#ccff00] rounded-2xl flex items-center justify-center text-black shadow-inner"><Phone className="w-8 h-8" /></div>
                 <div>
                   <p className="font-black text-lg text-slate-900 leading-tight">Un blocage ?</p>
                   <p className="text-sm text-slate-500 font-bold leading-relaxed">Appelez Julien au {demoPhoneNumber} pour valider par téléphone.</p>
                 </div>
               </div>
               <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-black shadow-inner"><MessageCircle className="w-8 h-8" /></div>
                 <p className="text-sm text-slate-500 font-bold leading-relaxed">Chattez en direct avec notre assistance senior en bas à droite.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 animate-in zoom-in duration-700">
      <div className="max-w-3xl w-full text-center py-20">
        <div className="w-40 h-40 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl ring-[16px] ring-green-50 animate-bounce">
          <Check className="w-24 h-24" strokeWidth={4} />
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter">Félicitations !</h1>
        <p className="text-3xl text-slate-500 mb-16 font-black italic leading-tight max-w-2xl mx-auto">
          Votre commande est confirmée. On s'occupe de tout pour que votre appareil arrive demain.
        </p>
        
        <div className="bg-slate-50 p-12 rounded-[64px] mb-16 border-4 border-white grid grid-cols-1 md:grid-cols-2 gap-10 text-left shadow-inner">
           <div className="space-y-2">
             <span className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] block">RÉFÉRENCE COMMANDE</span>
             <p className="text-3xl font-black text-[#2A0054]">#BACK-S-2026-X</p>
           </div>
           <div className="space-y-2">
             <span className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] block">LIVRAISON ESTIMÉE</span>
             <p className="text-3xl font-black text-green-600">Demain avant 18h00</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          <button onClick={() => navigate('home')} className="flex-1 bg-black text-white py-7 rounded-full font-black text-3xl shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
            Retour à l'accueil
          </button>
          <button onClick={() => navigate('assistance')} className="flex-1 py-7 border-8 border-slate-50 rounded-full font-black text-3xl text-slate-700 hover:bg-slate-50 transition-all">
            Besoin d'aide ?
          </button>
        </div>
      </div>
    </div>
  );

  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 py-24 px-8 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('home')} className="flex items-center gap-4 font-black text-slate-400 mb-16 hover:text-black text-2xl group">
          <ArrowLeft className="group-hover:-translate-x-3 transition-transform" /> Revenir
        </button>
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tight leading-none">On ne vous lâche pas.</h1>
          <p className="text-3xl text-slate-600 max-w-4xl mx-auto font-black italic opacity-70">
            Une équipe dédiée aux seniors pour que la technologie reste un plaisir, pas un casse-tête.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-16 rounded-[80px] shadow-sm border-4 border-white flex flex-col items-center text-center group hover:shadow-2xl transition-all">
            <div className="w-24 h-24 bg-black text-[#ccff00] rounded-[32px] flex items-center justify-center mb-10 shadow-2xl group-hover:rotate-6 transition-transform">
              <Phone className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black mb-8">Parler à un humain</h2>
            <p className="text-2xl text-slate-400 mb-12 font-bold leading-relaxed">Appelez gratuitement notre équipe pour poser vos questions ou commander par téléphone.</p>
            <a href={telLink} className="w-full bg-black text-white py-7 rounded-full font-black text-3xl shadow-xl hover:scale-105 transition-transform">
              Appeler le {demoPhoneNumber}
            </a>
          </div>
          
          <div className="bg-white p-16 rounded-[80px] shadow-sm border-4 border-white flex flex-col items-center text-center group hover:shadow-2xl transition-all">
            <div className="w-24 h-24 bg-purple-600 text-white rounded-[32px] flex items-center justify-center mb-10 shadow-2xl group-hover:-rotate-6 transition-transform">
              <Video className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black mb-8">Assistance Vidéo</h2>
            <p className="text-2xl text-slate-400 mb-12 font-bold leading-relaxed">Partagez votre écran avec nous pour que nous puissions vous guider visuellement pas à pas.</p>
            <button className="w-full bg-slate-100 text-slate-700 py-7 rounded-full font-black text-3xl hover:bg-slate-200 transition-all">
              Démarrer une visio
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen selection:bg-[#ccff00] selection:text-black">
      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Header />}
      
      <main>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
        {currentScreen === 'success' && <SuccessScreen />}
      </main>

      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Footer />}

      {/* BOUTON FLOTTANT MODE CONFORT */}
      <div className="fixed bottom-10 left-10 z-[100]">
        <button 
          onClick={handleActivateSerenity}
          className={`flex items-center gap-6 px-12 py-7 rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.4)] font-black border-4 transition-all hover:scale-105 active:scale-95 ${serenityMode ? 'bg-black text-[#ccff00] border-black' : 'bg-white text-black border-slate-50'}`}
        >
          {serenityMode ? <X className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />} 
          <span className="text-3xl hidden md:inline">{serenityMode ? 'Quitter le Confort' : 'Activer le Confort'}</span>
        </button>
      </div>

      {/* CHATBOT BULLÉ */}
      <button onClick={() => setShowChatbot(!showChatbot)} className="fixed bottom-10 right-10 z-[100] w-24 h-24 bg-black rounded-full flex items-center justify-center text-white shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-4 border-slate-800 hover:scale-110 transition-transform active:scale-90">
        <MessageCircle className="w-12 h-12 text-[#ccff00]" />
      </button>

      {showChatbot && (
        <div className="fixed bottom-40 right-10 z-[100] w-[450px] bg-white border-4 border-slate-50 rounded-[64px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-bottom-16">
           <div className="bg-black text-white p-10 font-black flex justify-between items-center border-b-8 border-[#ccff00]">
             <div className="flex items-center gap-5">
               <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse ring-8 ring-green-950" />
               <span className="text-3xl tracking-tighter">Votre assistant</span>
             </div>
             <button onClick={() => setShowChatbot(false)}><X className="w-10 h-10" /></button>
           </div>
           <div className="p-12 space-y-10">
             <p className="text-3xl font-black text-slate-800 leading-tight">Bonjour ! Comment puis-je vous aider dans votre choix aujourd'hui ?</p>
             <div className="flex flex-col gap-6">
               <a href={telLink} className="w-full bg-[#ccff00] text-black p-8 rounded-[32px] font-black flex items-center justify-center gap-5 text-3xl shadow-xl hover:scale-[1.03] transition-transform">
                 <Phone className="w-10 h-10" /> On s'appelle ?
               </a>
               <button onClick={() => {setShowChatbot(false); navigate('assistance');}} className="w-full bg-slate-100 text-slate-600 p-8 rounded-[32px] font-black text-2xl hover:bg-slate-200 transition-all">
                 Aide par Vidéo
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
