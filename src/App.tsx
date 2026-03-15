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
  Check
} from 'lucide-react';

// --- TYPES ---
type Screen = 'home' | 'product' | 'checkout' | 'assistance' | 'success';

interface Product {
  id: number;
  title: string;
  desc: string;
  price: number;
  oldPrice: number;
  imgUrl: string;
  rating: string;
  isSeniorFriendly?: boolean;
  brand: string;
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
  const [checkoutStep, setCheckoutStep] = useState<'information' | 'payment'>('information');

  const demoPhoneNumber = "+33 7 54 14 28 93";
  const telLink = "tel:+33754142893";

  // --- ACTIONS ---
  const navigate = (screen: Screen, product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCart([product]); // Pour la démo, on simule un seul produit à la fois (focus senior)
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

  // --- COMPOSANTS ---

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-slate-100 text-[11px] text-center py-1.5 text-slate-600 hidden sm:block font-bold uppercase tracking-wider">
        Livraison offerte • Garantie 12 mois minimum • 30 jours pour changer d'avis
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
          <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Logo Back Market" className="h-7 md:h-8" />
        </div>
        
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <input type="text" placeholder="Rechercher un modèle, une marque..." className="w-full h-11 pl-12 pr-4 rounded-full bg-slate-100 border-none outline-none focus:ring-2 focus:ring-black font-medium" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <a href={telLink} className="hidden lg:flex items-center gap-2 bg-[#ccff00] px-5 py-2.5 rounded-full text-black font-black text-sm shadow-sm hover:scale-105 transition-transform">
            <Phone className="w-4 h-4" /> {demoPhoneNumber}
          </a>
          <button onClick={() => navigate('assistance')} className="text-slate-800 hover:text-black font-bold text-sm hidden sm:block">Aide Senior</button>
          <button onClick={() => cart.length > 0 && navigate('checkout')} className="relative group">
            <ShoppingCart className="w-6 h-6 text-slate-800 group-hover:text-black transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 className="font-black text-black text-lg mb-6">À propos de nous</h4>
          <ul className="space-y-4 font-medium text-slate-600">
            <li><button className="hover:underline">Qui est Back Market ?</button></li>
            <li><button className="hover:underline">Le Pacte Qualité</button></li>
            <li><button className="hover:underline">Écologie et Impact</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-black text-lg mb-6">Besoin d'aide ?</h4>
          <ul className="space-y-4 font-medium text-slate-600">
            <li><button onClick={() => navigate('assistance')} className="text-blue-600 font-bold hover:underline">Espace Accompagnement Senior</button></li>
            <li><button className="hover:underline">Suivre ma commande</button></li>
            <li><button className="hover:underline">Retourner un produit</button></li>
          </ul>
        </div>
        <div className="md:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-inner">
          <h4 className="font-black text-black text-xl mb-4">On s'appelle ?</h4>
          <p className="mb-6 text-slate-600 font-medium">Nos conseillers basés en France sont à votre écoute pour vous aider à choisir sans stress.</p>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href={telLink} className="inline-flex items-center justify-center gap-4 bg-[#ccff00] hover:bg-[#bbf000] text-black py-5 px-10 rounded-[24px] shadow-lg transition-all hover:scale-105">
              <Phone className="w-7 h-7" />
              <span className="text-2xl font-black tracking-tight">{demoPhoneNumber}</span>
            </a>
            <div className="text-sm font-bold text-slate-500">
              <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /> Gratuit depuis un fixe ou mobile</p>
              <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600" /> Disponible 7j/7</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
        <p>© 2026 Back Market - Projet Académique Accessibilité</p>
        <div className="flex gap-8">
          <button className="hover:text-black">C.G.V.</button>
          <button className="hover:text-black">Confidentialité</button>
          <button className="hover:text-black">Mentions légales</button>
        </div>
      </div>
    </footer>
  );

  // --- ÉCRAN ACCUEIL ---

  const HomeScreen = () => (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[550px] md:h-[650px] flex items-center text-white">
        <div className="absolute inset-0 z-0">
          <img src="/image-accueil.png" alt="Seniors utilisant technologie" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">La technologie enfin simple, testée et garantie.</h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-100 font-medium leading-relaxed">
              Des smartphones et tablettes comme neufs, garantis 1 an, avec une aide humaine pour tout vous expliquer.
            </p>
            <button onClick={() => navigate('product', PRODUCTS[0])} className="bg-[#ccff00] text-black font-black py-5 px-12 rounded-full text-2xl shadow-2xl hover:bg-[#bbf000] transition-all transform hover:scale-105 active:scale-95">
              Voir la sélection Senior
            </button>
          </div>
        </div>
      </section>

      {/* Barre de Réassurance */}
      <section className="bg-white border-b border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-[#ccff00] transition-colors"><ShieldCheck className="w-6 h-6" /></div>
            <div><p className="font-black text-slate-900">Garantie 12 mois</p><p className="text-xs text-slate-500">Panne ? On répare.</p></div>
          </div>
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-[#ccff00] transition-colors"><Truck className="w-6 h-6" /></div>
            <div><p className="font-black text-slate-900">Livraison offerte</p><p className="text-xs text-slate-500">Chez vous d'ici 48h.</p></div>
          </div>
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-[#ccff00] transition-colors"><CheckCircle2 className="w-6 h-6" /></div>
            <div><p className="font-black text-slate-900">État certifié</p><p className="text-xs text-slate-500">Contrôlé par experts.</p></div>
          </div>
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-[#ccff00] transition-colors"><Phone className="w-6 h-6" /></div>
            <div><p className="font-black text-slate-900">Aide par téléphone</p><p className="text-xs text-slate-500">Appel gratuit illimité.</p></div>
          </div>
        </div>
      </section>

      {/* Grille de Catégories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
          Nos catégories populaires <ArrowRight className="w-6 h-6 text-slate-300" />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Smartphones", icon: Smartphone, color: "bg-blue-50" },
            { name: "Tablettes", icon: Tablet, color: "bg-emerald-50" },
            { name: "Ordinateurs", icon: Laptop, color: "bg-purple-50" },
            { name: "Montres", icon: Watch, color: "bg-orange-50" },
            { name: "Audio", icon: Headphones, color: "bg-red-50" },
            { name: "Séniors", icon: ThumbsUp, color: "bg-[#ccff00]/10" },
            { name: "Photo", icon: Camera, color: "bg-cyan-50" },
            { name: "Bons plans", icon: Tag, color: "bg-slate-50" },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button 
                key={idx} 
                onClick={() => navigate('product', PRODUCTS[0])}
                className={`${cat.color} hover:bg-white hover:ring-2 hover:ring-black p-8 rounded-[32px] flex flex-col items-center justify-center gap-6 transition-all group h-48 border border-transparent shadow-sm`}
              >
                <div className="w-20 h-20 bg-white rounded-full p-5 shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Icon className="w-10 h-10 text-black" />
                </div>
                <span className="font-black text-black text-lg">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Porte d'entrée Espace Senior */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#EAE0F5] rounded-[48px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border-4 border-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><Smartphone className="w-64 h-64 -rotate-12" /></div>
           <div className="flex-1 relative z-10">
             <div className="bg-white text-[#2A0054] text-sm font-black px-4 py-1.5 rounded-full mb-6 w-max shadow-sm">SPÉCIAL SENIORS</div>
             <h2 className="text-4xl md:text-5xl font-black text-[#2A0054] mb-6 leading-tight">Besoin de plus de simplicité ?</h2>
             <p className="text-xl text-[#2A0054] mb-10 font-medium leading-relaxed">
               Découvrez notre sélection d'appareils configurés pour une lecture facile. 
               Textes agrandis, icônes claires et une aide téléphonique pour tout configurer.
             </p>
             <div className="flex flex-wrap gap-4">
               <button onClick={handleActivateSerenity} className="bg-[#2A0054] text-white font-black py-5 px-10 rounded-full flex items-center gap-3 shadow-xl hover:scale-105 transition-transform">
                 Activer le Mode Confort <ShieldCheck className="w-6 h-6" />
               </button>
               <button onClick={() => navigate('assistance')} className="bg-white text-[#2A0054] font-black py-5 px-10 rounded-full flex items-center gap-3 shadow-xl hover:bg-slate-50 transition-all">
                 Aide par Vidéo <Video className="w-6 h-6" />
               </button>
             </div>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-6 relative z-10">
              {PRODUCTS.filter(p => p.isSeniorFriendly).slice(0, 2).map(p => (
                <div key={p.id} onClick={() => navigate('product', p)} className="bg-white p-6 rounded-[32px] shadow-lg cursor-pointer hover:scale-105 transition-all group border-2 border-transparent hover:border-[#2A0054]">
                  {/* FIX: Force les dimensions de l'image */}
                  <div className="aspect-square w-full flex items-center justify-center mb-6 overflow-hidden bg-slate-50 rounded-2xl p-4">
                    <img src={p.imgUrl} alt={p.title} className="w-full h-full object-contain" />
                  </div>
                  <p className="font-black text-center text-slate-900">{p.title}</p>
                  <p className="text-center text-sm text-[#2A0054] font-bold mt-2">{p.price} €</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Grille de Produits Principale */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-black mb-12 tracking-tight">Nos smartphones les plus simples d'utilisation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map(p => (
            <div 
              key={p.id} 
              onClick={() => navigate('product', p)}
              className="bg-white border-2 border-slate-100 rounded-[40px] p-8 hover:border-black transition-all cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-xl"
            >
              {/* FIX: Force Largeur et Hauteur identiques pour toutes les images */}
              <div className="aspect-square w-full flex items-center justify-center mb-8 overflow-hidden bg-white p-6 relative">
                <img 
                  src={p.imgUrl} 
                  alt={p.title} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                />
                {p.isSeniorFriendly && (
                  <div className="absolute top-0 left-0 bg-[#ccff00] text-black text-[10px] font-black px-3 py-1.5 rounded-br-2xl shadow-sm uppercase tracking-tighter">
                    Recommandé Senior
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-2xl font-black text-slate-900">{p.title}</h4>
                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-black" />
                    <span className="text-sm font-bold">{p.rating}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-lg mb-6 leading-snug">{p.desc}</p>
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 font-bold line-through">Neuf : {p.oldPrice}€</span>
                  <span className="text-3xl font-black text-black">{p.price} €</span>
                </div>
                <div className="bg-black text-white p-4 rounded-full group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bannières Originales (Newsletter & Rachat) */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-[#ccff00] rounded-[48px] p-10 md:p-20 text-center flex flex-col items-center shadow-lg">
          <h3 className="text-4xl md:text-5xl font-black text-black mb-4">On vous offre 5 € sur votre premier achat.</h3>
          <p className="text-black font-bold text-xl mb-10 opacity-80">Inscrivez-vous pour recevoir nos tutoriels simplifiés et nos meilleures offres.</p>
          <div className="flex w-full max-w-xl gap-4 flex-col sm:flex-row">
            <input type="email" placeholder="Votre adresse e-mail" className="flex-1 rounded-3xl px-8 py-5 text-xl outline-none shadow-inner border-2 border-transparent focus:border-black" />
            <button className="bg-black text-white font-black px-10 py-5 rounded-3xl text-xl hover:bg-slate-800 transition-colors">S'inscrire</button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-[#EAE0F5] rounded-[48px] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm border-2 border-white">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-4xl md:text-5xl font-black text-[#2A0054] mb-6">Que faire de votre ancien téléphone ?</h3>
            <p className="text-[#2A0054] font-bold text-xl mb-10 leading-relaxed opacity-80">Nous le rachetons cash. C'est bon pour la planète, et c'est un budget en plus pour votre nouveau projet.</p>
            <button className="bg-[#2A0054] text-white font-black px-12 py-6 rounded-full text-xl hover:opacity-90 shadow-xl">
              Estimer le prix de mon appareil
            </button>
          </div>
          <div className="bg-white rounded-[40px] p-10 shadow-2xl flex flex-col gap-6 text-lg font-black text-slate-800 border-2 border-[#2A0054]/5">
            <div className="flex items-center gap-4"><div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="text-green-600" /></div> Paiement direct sur votre compte</div>
            <div className="flex items-center gap-4"><div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="text-green-600" /></div> Envoi 100% gratuit</div>
            <div className="flex items-center gap-4"><div className="bg-green-100 p-2 rounded-full"><CheckCircle2 className="text-green-600" /></div> Effacement total de vos données</div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-black mb-16 tracking-tight">Ils ont choisi de nous faire confiance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {[
              { name: "Jean-Pierre, 72 ans", text: "Commander a été un jeu d'enfant. Le conseiller m'a rassuré sur l'état du téléphone. C'est une excellente expérience.", stars: 5, avatar: "JP" },
              { name: "Marie-Louise, 68 ans", text: "Le mode confort permet de lire enfin le site sans chercher mes lunettes. J'ai reçu mon iPad très vite, il est parfait.", stars: 5, avatar: "ML" },
              { name: "Robert, 80 ans", text: "Service impeccable. On m'a même aidé par vidéo pour transférer mes photos de mon ancien téléphone. Très humain.", stars: 5, avatar: "R" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-5 h-5 fill-black text-black" />)}
                </div>
                <p className="italic text-slate-700 mb-10 text-xl font-medium leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 bg-[#EAE0F5] rounded-full flex items-center justify-center font-black text-[#2A0054] text-xl shadow-inner">{t.avatar}</div>
                  <span className="font-black text-slate-900 text-lg">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos de Réassurance */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-black mb-16 text-center text-[#2A0054] tracking-tight">
          Achetez sans stress : nos engagements en vidéo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Acheter en ligne sans stress", desc: "Tout est testé et garanti. On vous montre comment.", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80" },
            { title: "Le concept Back Market", desc: "Plus qu'un achat : nous recyclons pour vous.", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80" },
            { title: "Nos garanties en détail", desc: "12 mois de tranquillité, c'est la norme ici.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" }
          ].map((v, i) => (
            <div key={i} className="group rounded-[40px] overflow-hidden shadow-sm border border-slate-100 bg-white flex flex-col hover:shadow-2xl transition-all">
              <div className="aspect-video bg-slate-900 relative overflow-hidden">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                  <PlayCircle className="w-20 h-20 text-white drop-shadow-2xl opacity-90 group-hover:scale-125 transition-transform" />
                </div>
              </div>
              <div className="p-8">
                <h4 className="font-black text-2xl text-slate-900 mb-3">{v.title}</h4>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // --- ÉCRAN PRODUIT ---

  const ProductScreen = () => {
    if (!selectedProduct) return null;
    return (
      <div className="min-h-screen bg-white pb-32 animate-in fade-in duration-500">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 font-black text-slate-500 mb-12 hover:text-black transition-colors text-lg group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" /> Revenir à l'accueil
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* FIX: Force les dimensions de l'image produit */}
            <div className="bg-slate-50 rounded-[64px] p-12 md:p-20 flex items-center justify-center border-4 border-white shadow-inner h-[500px] md:h-[650px]">
              <div className="w-full h-full flex items-center justify-center">
                <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-2xl" />
              </div>
            </div>
            
            <div className="flex flex-col py-6">
              <div className="flex gap-3 mb-6">
                <span className="bg-[#ccff00] text-black text-xs font-black px-4 py-2 rounded-full shadow-sm">PARFAIT ÉTAT</span>
                {selectedProduct.isSeniorFriendly && <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-2 rounded-full">SIMPLIFIÉ POUR SENIORS</span>}
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight leading-tight">{selectedProduct.title}</h1>
              <p className="text-2xl text-slate-500 mb-10 font-medium">{selectedProduct.desc}</p>
              
              <div className="flex items-baseline gap-6 mb-12">
                <span className="text-7xl font-black tracking-tighter text-black">{selectedProduct.price} €</span>
                <span className="text-2xl text-slate-400 line-through font-bold">Neuf : {selectedProduct.oldPrice} €</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="flex items-center gap-5 p-6 border-2 border-slate-100 rounded-[32px] bg-slate-50/50">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                  <div>
                    <span className="font-black block text-xl">Garantie 1 an</span>
                    <span className="text-slate-500 font-bold">Zéro stress.</span>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 border-2 border-slate-100 rounded-[32px] bg-slate-50/50">
                  <Truck className="w-10 h-10 text-blue-600" />
                  <div>
                    <span className="font-black block text-xl">Gratuit</span>
                    <span className="text-slate-500 font-bold">Livré demain.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    navigate('checkout');
                  }}
                  className="w-full bg-black text-white py-7 rounded-full text-3xl font-black shadow-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
                >
                  Commander en 2 clics <ChevronRight className="w-8 h-8" />
                </button>
                <div className="flex gap-4">
                  <button onClick={() => addToCart(selectedProduct)} className="flex-1 py-6 border-4 border-slate-100 rounded-full font-black text-xl hover:bg-slate-50 transition-colors">Ajouter au panier</button>
                  <a href={telLink} className="flex-1 flex items-center justify-center gap-3 py-6 bg-[#ccff00] text-black rounded-full font-black text-xl shadow-lg hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" /> Aide par téléphone
                  </a>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-50 rounded-[40px] border border-slate-200">
                <h4 className="font-black text-xl mb-4 flex items-center gap-2"><Info className="w-5 h-5" /> Pourquoi ce modèle ?</h4>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  Ce modèle a été sélectionné pour sa robustesse et sa facilité de prise en main. Idéal pour rester en contact avec ses proches, partager des photos et naviguer sur internet sans complexité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- ÉCRAN PAIEMENT (STYLE SHOPIFY) ---

  const CheckoutScreen = () => {
    if (!selectedProduct) return null;
    const shipping = 0;
    const total = selectedProduct.price + shipping;

    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-in slide-in-from-bottom-10 duration-700">
        {/* Colonne de Gauche : Formulaire (Shopify Style) */}
        <div className="flex-1 px-6 py-12 md:px-16 lg:px-24 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
               <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-6" />
               <ChevronRight className="w-4 h-4 text-slate-300" />
               <span className="text-sm font-bold text-slate-800">Finalisation de commande</span>
            </div>

            <nav className="flex gap-4 text-sm font-bold mb-12">
              <span className={checkoutStep === 'information' ? 'text-black' : 'text-slate-400'}>Informations</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={checkoutStep === 'payment' ? 'text-black' : 'text-slate-400'}>Paiement</span>
            </nav>

            {checkoutStep === 'information' ? (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black">Coordonnées de livraison</h3>
                    <p className="text-sm text-slate-500 font-bold">Déjà client ? <span className="underline cursor-pointer">Se connecter</span></p>
                  </div>
                  <div className="space-y-4">
                    <input type="email" placeholder="Adresse e-mail (pour le suivi du colis)" className="w-full p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none transition-colors" />
                    <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 font-medium">
                      <input type="checkbox" className="w-5 h-5 accent-black" id="news" />
                      <label htmlFor="news">Tenez-moi au courant des tutoriels et des offres</label>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-black mb-6">Adresse d'expédition</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Prénom" className="p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                      <input type="text" placeholder="Nom" className="p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                    </div>
                    <input type="text" placeholder="Adresse complète (numéro et nom de rue)" className="w-full p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                    <input type="text" placeholder="Appartement, étage (facultatif)" className="w-full p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Code Postal" className="p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                      <input type="text" placeholder="Ville" className="p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                    </div>
                    <input type="tel" placeholder="Numéro de téléphone (obligatoire)" className="w-full p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                  </div>
                </section>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 pt-10 border-t">
                  <button onClick={() => setCheckoutStep('payment')} className="w-full md:w-auto bg-black text-white font-black py-6 px-12 rounded-2xl text-xl shadow-xl hover:bg-slate-800 transition-all">
                    Continuer vers le paiement
                  </button>
                  <button onClick={() => navigate('product')} className="text-black font-bold flex items-center gap-2 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Revenir au produit
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in duration-500">
                <section>
                  <h3 className="text-2xl font-black mb-6">Paiement Sécurisé</h3>
                  <p className="text-slate-500 mb-6 font-bold">Toutes les transactions sont sécurisées et cryptées.</p>
                  
                  <div className="border-2 border-black rounded-2xl overflow-hidden">
                    <div className="p-6 bg-slate-50 flex items-center justify-between border-b">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-4 border-black rounded-full" />
                        <span className="font-bold text-lg">Carte de crédit</span>
                      </div>
                      <div className="flex gap-2">
                         <div className="bg-white border rounded p-1 text-[10px] font-bold">VISA</div>
                         <div className="bg-white border rounded p-1 text-[10px] font-bold">MASTERCARD</div>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="relative">
                        <input type="text" placeholder="Numéro de carte bancaire" className="w-full p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Date d'expiration (MM/AA)" className="p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                        <div className="relative">
                          <input type="text" placeholder="Code (CVV)" className="w-full p-5 border-2 border-slate-200 rounded-xl text-lg focus:border-black outline-none" />
                          <Info className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-help" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-100 flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                  <p className="text-green-800 font-bold leading-tight">Garantie 12 mois activée automatiquement pour cet appareil.</p>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 pt-10 border-t">
                  <button onClick={() => navigate('success')} className="w-full md:w-auto bg-black text-white font-black py-7 px-16 rounded-2xl text-2xl shadow-2xl hover:bg-slate-800 transition-all hover:scale-105">
                    Payer {total} €
                  </button>
                  <button onClick={() => setCheckoutStep('information')} className="text-black font-bold flex items-center gap-2 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Revenir aux informations
                  </button>
                </div>
              </div>
            )}
            
            <div className="mt-20 py-8 border-t border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
              Paiement Sécurisé • Serveurs en France • Données Protégées
            </div>
          </div>
        </div>

        {/* Colonne de Droite : Récapitulatif de Commande (Shopify Style) */}
        <div className="w-full lg:w-[450px] bg-slate-50 border-l border-slate-200 px-6 py-12 md:px-10">
          <div className="sticky top-12 max-w-md mx-auto">
            <h3 className="text-xl font-black mb-10 pb-4 border-b">Votre sélection</h3>
            
            <div className="flex items-center gap-6 mb-10">
              <div className="relative">
                <div className="w-24 h-24 bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-center shadow-sm">
                   <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="absolute -top-3 -right-3 bg-black text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center border-4 border-slate-50">1</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900">{selectedProduct.title}</p>
                <p className="text-sm text-slate-500 font-bold">{selectedProduct.desc}</p>
              </div>
              <p className="font-black text-slate-900">{selectedProduct.price} €</p>
            </div>

            <div className="space-y-4 py-8 border-t border-slate-200">
              <div className="flex justify-between text-slate-600 font-bold">
                <span>Sous-total</span>
                <span>{selectedProduct.price} €</span>
              </div>
              <div className="flex justify-between text-slate-600 font-bold">
                <span>Expédition</span>
                <span className="text-green-600">Gratuit</span>
              </div>
              <div className="flex justify-between text-slate-600 font-bold">
                <span>Taxes incluses</span>
                <span>Calculées à l'étape suivante</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-300 flex justify-between items-center text-slate-900">
              <span className="text-2xl font-black">Total</span>
              <div className="text-right">
                <span className="text-xs font-black text-slate-400 block uppercase">EUR</span>
                <span className="text-4xl font-black">{total} €</span>
              </div>
            </div>

            <div className="mt-16 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
               <Phone className="w-6 h-6 text-[#2A0054]" />
               <div>
                 <p className="font-black text-sm text-[#2A0054]">Besoin d'aide pour payer ?</p>
                 <p className="text-xs text-slate-500 font-bold leading-tight">Un conseiller vous aide à distance pour valider votre commande.</p>
                 <a href={telLink} className="text-xs font-black text-blue-600 underline mt-1 inline-block">Appeler le {demoPhoneNumber}</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 animate-in zoom-in duration-500">
      <div className="max-w-2xl w-full text-center py-20">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg ring-8 ring-green-50">
          <Check className="w-20 h-20" strokeWidth={3} />
        </div>
        <h1 className="text-5xl font-black mb-6 tracking-tight">Merci beaucoup !</h1>
        <p className="text-2xl text-slate-500 mb-12 font-medium leading-relaxed">
          Votre commande est bien enregistrée. Un e-mail de confirmation vient de vous être envoyé.
          D'ici 30 minutes, un de nos experts vous appellera pour vérifier avec vous les détails de livraison.
        </p>
        
        <div className="bg-slate-50 p-10 rounded-[48px] mb-12 border-2 border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 text-left shadow-inner">
           <div>
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">NUMÉRO DE COMMANDE</span>
             <p className="text-2xl font-black text-[#2A0054]">#BM-2026-98745</p>
           </div>
           <div>
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">DATE DE LIVRAISON ESTIMÉE</span>
             <p className="text-2xl font-black text-green-600">Demain avant 18h00</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button onClick={() => navigate('home')} className="flex-1 bg-black text-white py-6 rounded-full font-black text-2xl shadow-2xl hover:bg-slate-800 transition-all">
            Revenir à l'accueil
          </button>
          <button onClick={() => navigate('assistance')} className="flex-1 py-6 border-4 border-slate-100 rounded-full font-black text-2xl text-slate-700 hover:bg-slate-50 transition-colors">
            Aide et Suivi
          </button>
        </div>
      </div>
    </div>
  );

  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 py-20 px-6 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('home')} className="flex items-center gap-3 font-black text-slate-500 mb-12 hover:text-black text-xl">
          <ArrowLeft /> Retour
        </button>
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">On ne vous laisse jamais seul.</h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto font-medium">Nos experts en technologie sont à vos côtés pour choisir, configurer et utiliser vos appareils préférés.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-16 rounded-[64px] shadow-sm border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-black text-[#ccff00] rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
              <Phone className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black mb-6">Aide Téléphonique</h2>
            <p className="text-xl text-slate-500 mb-12 font-medium">Appelez gratuitement notre équipe pour poser toutes vos questions ou passer commande en direct.</p>
            <a href={telLink} className="w-full bg-black text-white py-6 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform">
              Appeler le {demoPhoneNumber}
            </a>
          </div>
          
          <div className="bg-white p-16 rounded-[64px] shadow-sm border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-purple-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
              <Video className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black mb-6">Démonstration Vidéo</h2>
            <p className="text-xl text-slate-500 mb-12 font-medium">Montrez-nous votre écran par vidéo pour que nous puissions vous guider pas à pas sans vous déplacer.</p>
            <button className="w-full bg-slate-100 text-slate-700 py-6 rounded-full font-black text-2xl hover:bg-slate-200 transition-all">
              Démarrer un appel vidéo
            </button>
          </div>
        </div>
        
        <div className="mt-20 bg-white rounded-[48px] p-12 shadow-sm border border-slate-100">
           <h3 className="text-3xl font-black mb-10 text-center">Nos guides vidéo pour débuter</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="group cursor-pointer">
                <div className="aspect-video bg-slate-100 rounded-[32px] mb-6 flex items-center justify-center relative overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" alt="Guide 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/0 transition-colors">
                     <PlayCircle className="w-20 h-20 text-white shadow-2xl" />
                   </div>
                </div>
                <h4 className="text-xl font-black">Comment mettre les textes plus gros ?</h4>
              </div>
              <div className="group cursor-pointer">
                <div className="aspect-video bg-slate-100 rounded-[32px] mb-6 flex items-center justify-center relative overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80" alt="Guide 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/0 transition-colors">
                     <PlayCircle className="w-20 h-20 text-white shadow-2xl" />
                   </div>
                </div>
                <h4 className="text-xl font-black">Passer un appel avec WhatsApp</h4>
              </div>
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

      {/* BOUTONS FLOTTANTS D'ACCESSIBILITÉ */}
      <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-4">
        <button 
          onClick={handleActivateSerenity}
          className={`flex items-center gap-4 px-10 py-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] font-black border-4 transition-all hover:scale-105 active:scale-95 ${serenityMode ? 'bg-black text-[#ccff00] border-black' : 'bg-white text-black border-slate-100'}`}
        >
          {serenityMode ? <X className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />} 
          <span className="text-2xl hidden md:inline">{serenityMode ? 'Quitter le Confort' : 'Activer le Mode Confort'}</span>
        </button>
      </div>

      <button onClick={() => setShowChatbot(!showChatbot)} className="fixed bottom-8 right-8 z-[100] w-24 h-24 bg-black rounded-full flex items-center justify-center text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-slate-800 hover:scale-110 transition-transform active:scale-90">
        <MessageCircle className="w-12 h-12 text-[#ccff00]" />
      </button>

      {showChatbot && (
        <div className="fixed bottom-36 right-8 z-[100] w-[400px] bg-white border-2 border-slate-100 rounded-[48px] shadow-[0_30px_100px_rgba(0,0,0,0.2)] overflow-hidden animate-in fade-in slide-in-from-bottom-10">
           <div className="bg-black text-white p-8 font-black flex justify-between items-center">
             <div className="flex items-center gap-4">
               <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse ring-4 ring-green-900" />
               <span className="text-2xl">Votre conseiller</span>
             </div>
             <button onClick={() => setShowChatbot(false)}><X className="w-8 h-8" /></button>
           </div>
           <div className="p-10 space-y-8">
             <p className="text-2xl font-bold text-slate-800 leading-tight">Bonjour ! Je m'appelle Julien. Comment puis-je vous aider dans votre choix aujourd'hui ?</p>
             <div className="flex flex-col gap-4">
               <a href={telLink} className="w-full bg-[#ccff00] text-black p-6 rounded-3xl font-black flex items-center justify-center gap-4 text-2xl shadow-lg hover:scale-[1.02] transition-transform">
                 <Phone className="w-7 h-7" /> M'appeler en direct
               </a>
               <button onClick={() => {setShowChatbot(false); navigate('assistance');}} className="w-full bg-slate-100 text-slate-700 p-6 rounded-3xl font-black text-xl hover:bg-slate-200">
                 Démonstration Vidéo
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
