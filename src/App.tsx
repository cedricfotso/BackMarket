import React, { useState } from 'react';
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
  ThumbsUp
} from 'lucide-react';

// --- TYPES ---
type Screen = 'home' | 'product' | 'checkout' | 'assistance' | 'success';

interface Product {
  id: number;
  title: string;
  desc: string;
  price: string;
  oldPrice: string;
  imgUrl: string;
  rating: string;
  isSeniorFriendly?: boolean;
}

// --- DONNÉES DES PRODUITS ---
const PRODUCTS: Product[] = [
  { id: 1, title: "iPhone 13", desc: "128 Go - Noir - Débloqué", price: "429", oldPrice: "749", rating: "4.6", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80" },
  { id: 2, title: "Samsung Galaxy S21", desc: "128 Go - Gris - Débloqué", price: "289", oldPrice: "859", rating: "4.5", imgUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80" },
  { id: 3, title: "iPhone SE (2022)", desc: "64 Go - Rouge - Débloqué", price: "249", oldPrice: "529", rating: "4.7", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&q=80" },
  { id: 4, title: "iPad (2021) 10.2\"", desc: "64 Go - Gris Sidéral - Wi-Fi", price: "289", oldPrice: "389", rating: "4.7", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
  { id: 5, title: "Samsung Galaxy Tab A8", desc: "32 Go - Noir - Wi-Fi", price: "159", oldPrice: "229", rating: "4.5", isSeniorFriendly: true, imgUrl: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=400&q=80" },
  { id: 6, title: "iPhone 12", desc: "64 Go - Bleu - Débloqué", price: "319", oldPrice: "689", rating: "4.4", imgUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&q=80" }
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
  const [checkoutStep, setCheckoutStep] = useState(1);

  const demoPhoneNumber = "+33 7 54 14 28 93";
  const telLink = "tel:+33754142893";

  const navigate = (screen: Screen, product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
    setCheckoutStep(1);
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-slate-100 text-xs text-center py-1 text-slate-600 hidden sm:block font-medium">
        Livraison offerte • Retour sous 30 jours • Garantie 12 mois minimum
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
          <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-7 sm:h-8" />
        </div>
        
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative">
            <input type="text" placeholder="Rechercher un produit (ex: iPhone, Samsung)..." className="w-full h-12 pl-12 pr-4 rounded-lg bg-slate-100 border-transparent focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a href={telLink} className="hidden md:flex items-center gap-2 bg-[#ccff00] px-4 py-2 rounded-full text-black hover:bg-[#bbf000] transition-colors shadow-sm">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-bold">{demoPhoneNumber}</span>
          </a>
          <button onClick={() => navigate('assistance')} className="flex items-center gap-2 text-slate-700 hover:text-black">
            <HelpCircle className="w-6 h-6" />
            <span className="text-sm font-bold hidden lg:block">Aide</span>
          </button>
          <button onClick={() => cart.length > 0 && navigate('checkout')} className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
          </button>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 text-sm text-slate-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="font-black text-black text-lg mb-4">À propos</h4>
          <ul className="space-y-3 font-medium">
            <li><button className="hover:underline">Qui sommes-nous ?</button></li>
            <li><button className="hover:underline">Le Pacte Qualité</button></li>
            <li><button className="hover:underline">Nos engagements</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-black text-lg mb-4">Besoin d'aide ?</h4>
          <ul className="space-y-3 font-medium">
            <li><button onClick={() => navigate('assistance')} className="hover:underline text-blue-600 font-bold">Assistance Sénior</button></li>
            <li><button className="hover:underline">Suivre ma commande</button></li>
            <li><button className="hover:underline">Revendre mon appareil</button></li>
          </ul>
        </div>
        <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h4 className="font-black text-black text-lg mb-4">Contact direct</h4>
          <p className="mb-4 text-slate-600 font-medium">Nos experts vous guident pas à pas dans votre choix.</p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <a href={telLink} className="inline-flex items-center justify-center gap-3 bg-[#ccff00] hover:bg-[#bbf000] text-black w-full sm:w-auto py-4 px-8 rounded-2xl shadow-sm transition-transform hover:scale-105">
              <Phone className="w-6 h-6" />
              <span className="text-xl font-black">{demoPhoneNumber}</span>
            </a>
            <span className="text-sm font-bold text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Appel gratuit 7j/7
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
        <p>© 2026 Back Market - Démo Académique</p>
        <div className="flex gap-4 font-bold text-xs uppercase justify-center">
          <button className="hover:underline">C.G.V.</button>
          <button className="hover:underline">Mentions légales</button>
          <button className="hover:underline">Données personnelles</button>
        </div>
      </div>
    </footer>
  );

  // --- ÉCRANS ---

  const HomeScreen = () => (
    <div className="min-h-screen bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative bg-[#1D1D1B] text-white min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/image-accueil.png" alt="Seniors utilisant la technologie" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6">Profiter de la technologie simplement, ça c'est une bonne résolution.</h1>
            <p className="text-xl text-slate-100 mb-8 font-medium">Des appareils testés, garantis, et une assistance dédiée pour vous accompagner pas à pas.</p>
            <button onClick={() => navigate('product', PRODUCTS[0])} className="bg-[#ccff00] text-black font-black py-5 px-10 rounded-full hover:scale-105 transition-transform text-xl shadow-xl">
              En profiter
            </button>
          </div>
        </div>
      </section>

      {/* 2. RÉASSURANCE */}
      <section className="border-b border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Ici, on s'offre le meilleur du reconditionné.</h2>
          <p className="text-lg text-slate-600 mb-10">Chaque achat est aussi performant que le neuf grâce au <span className="underline font-bold">Pacte Qualité Back Market.</span></p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> 12 mois de garantie</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Jusqu'à 40 points de contrôle</div>
            <div className="flex items-center gap-2"><ArrowLeft className="w-5 h-5" /> 30 jours pour changer d'avis</div>
            <div className="flex items-center gap-2"><Phone className="w-5 h-5" /> Assistance dédiée</div>
          </div>
        </div>
      </section>

      {/* 3. CATÉGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-black mb-6">Nos meilleures ventes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Smartphones", icon: Smartphone },
            { name: "Tablettes", icon: Tablet },
            { name: "Ordinateurs", icon: Laptop },
            { name: "Montres", icon: Watch },
            { name: "Audio", icon: Headphones },
            { name: "Séniors", icon: CheckCircle2 },
            { name: "Photo", icon: Camera },
            { name: "Bons plans", icon: Tag },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button key={idx} onClick={() => navigate('product', PRODUCTS[0])} className="bg-[#ccff00] hover:bg-[#bbf000] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-colors group h-40">
                <div className="w-16 h-16 bg-white rounded-full p-3 shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <span className="font-bold text-black">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. PORTE D'ENTRÉE ESPACE SENIOR */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#EAE0F5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border-2 border-[#2A0054]/5">
           <div className="flex-1">
             <h2 className="text-3xl md:text-4xl font-black text-[#2A0054] mb-4">L'Espace Senior : simple et rassurant.</h2>
             <p className="text-lg text-[#2A0054] mb-8 font-medium">Une sélection d'appareils aux écrans larges, une lecture confortable avec le Mode Confort et une aide téléphonique gratuite.</p>
             <button onClick={handleActivateSerenity} className="bg-[#2A0054] text-white font-bold py-4 px-8 rounded-full flex items-center gap-3">
               Activer le Mode Confort <ChevronRight />
             </button>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-4">
              {PRODUCTS.filter(p => p.isSeniorFriendly).slice(0, 2).map(p => (
                <div key={p.id} onClick={() => navigate('product', p)} className="bg-white p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                  <div className="h-32 flex items-center justify-center mb-2">
                    <img src={p.imgUrl} alt={p.title} className="max-h-full object-contain" />
                  </div>
                  <p className="font-bold text-center text-sm">{p.title}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. PRODUCT GRID (IMAGE FIXE) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-black mb-8">Nos recommandations du moment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(p => (
            <div key={p.id} onClick={() => navigate('product', p)} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-black transition-all cursor-pointer group flex flex-col h-full">
              {/* FIX: Hauteur fixe pour alignement parfait */}
              <div className="h-60 w-full flex items-center justify-center mb-6 overflow-hidden bg-white">
                <img src={p.imgUrl} alt={p.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-black">{p.title}</h4>
                  {p.isSeniorFriendly && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded">SENIOR+</span>}
                </div>
                <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <span className="text-2xl font-black">{p.price} €</span>
                <div className="bg-slate-100 p-3 rounded-full group-hover:bg-[#ccff00] transition-colors"><ChevronRight className="w-5 h-5" /></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BANNIÈRE NEWSLETTER (GREEN) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#ccff00] rounded-3xl p-8 md:p-12 text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-black text-black mb-2">5 € offerts sur votre premier achat.</h3>
          <p className="text-black font-medium mb-6">Inscrivez-vous pour recevoir des astuces d'utilisation et nos offres.</p>
          <div className="flex w-full max-w-md gap-2">
            <input type="email" placeholder="Adresse e-mail" className="flex-1 rounded-lg px-4 py-3 outline-none" />
            <button className="bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-slate-800">S'inscrire</button>
          </div>
        </div>
      </section>

      {/* 7. BANNIÈRE RACHAT (PURPLE) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#EAE0F5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-black text-[#2A0054] mb-4">Que faire de votre ancien téléphone ?</h3>
            <p className="text-[#2A0054] font-medium text-lg mb-6">Nous le reprenons au meilleur prix. C'est bon pour la planète et votre portefeuille.</p>
            <button className="bg-[#2A0054] text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-colors">
              Revendre mon appareil
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 text-sm font-bold text-slate-800">
            <div className="flex items-center gap-3"><CheckCircle2 className="text-[#2A0054]" /> Paiement direct sur compte</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-[#2A0054]" /> Envoi gratuit</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-[#2A0054]" /> Effacement total des données</div>
          </div>
        </div>
      </section>

      {/* 8. TÉMOIGNAGES */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-black text-center mb-12">Leurs témoignages nous motivent</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Jean-Pierre, 72 ans", text: "Commander a été un jeu d'enfant. J'ai eu un conseiller qui m'a rassuré sur le choix du téléphone. Reçu en 48h !", stars: 5 },
              { name: "Marie-Louise, 68 ans", text: "Le mode confort est une révolution pour mes yeux. Je lis mes mails sans chercher mes lunettes. Merci Back Market.", stars: 5 },
              { name: "Robert, 80 ans", text: "Excellent suivi. On m'a même aidé par vidéo pour transférer mes photos. Service impeccable.", stars: 5 }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-5 h-5 fill-black text-black" />)}
                </div>
                <p className="italic text-slate-700 mb-6 text-lg">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#EAE0F5] rounded-full flex items-center justify-center font-bold text-[#2A0054]">{t.name[0]}</div>
                  <span className="font-bold text-slate-900">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. VIDÉOS DE RÉASSURANCE */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-black mb-12 text-center text-[#2A0054]">
          Achetez en toute sérénité : nos engagements en vidéo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white flex flex-col">
            <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><PlayCircle className="w-16 h-16 text-white" /></div>
               <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80" alt="Vidéo 1" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl text-slate-900">Acheter en ligne sans stress</h4>
              <p className="text-slate-600 mt-2">Ici tout est testé, contrôlé et garanti. On vous explique comment.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white flex flex-col">
            <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><PlayCircle className="w-16 h-16 text-white" /></div>
               <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80" alt="Vidéo 2" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl text-slate-900">Le concept Back Market</h4>
              <p className="text-slate-600 mt-2">Plus qu'un achat : nous participons activement à votre bonheur au quotidien.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white flex flex-col">
            <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><PlayCircle className="w-16 h-16 text-white" /></div>
               <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" alt="Vidéo 3" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl text-slate-900">Nos garanties en détail</h4>
              <p className="text-slate-600 mt-2">12 mois de garantie et des vendeurs rigoureusement certifiés.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ProductScreen = () => {
    if (!selectedProduct) return null;
    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 font-bold text-slate-500 mb-8 hover:underline">
            <ArrowLeft className="w-5 h-5" /> Retour à l'accueil
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Produit Fixe */}
            <div className="bg-slate-50 rounded-3xl p-10 flex items-center justify-center border border-slate-100 h-[450px] md:h-[550px]">
              <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded">PARFAIT ÉTAT</span>
                {selectedProduct.isSeniorFriendly && <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded">Optimisé Sénior</span>}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{selectedProduct.title}</h1>
              <p className="text-xl text-slate-500 mb-10">{selectedProduct.desc}</p>
              
              <div className="flex items-end gap-6 mb-12">
                <span className="text-6xl font-black tracking-tighter">{selectedProduct.price} €</span>
                <span className="text-xl text-slate-400 line-through mb-2">Neuf : {selectedProduct.oldPrice} €</span>
              </div>

              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                  <div>
                    <span className="font-bold block text-lg">Garantie 12 mois incluse</span>
                    <span className="text-slate-600">On répare ou on remplace en cas de souci.</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
                  <Truck className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="font-bold block text-lg">Livraison offerte demain</span>
                    <span className="text-slate-600">Suivi par e-mail et SMS jusqu'à chez vous.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setCart([selectedProduct]);
                    navigate('checkout');
                  }}
                  className="w-full bg-black text-white py-6 rounded-full text-2xl font-black shadow-xl hover:bg-slate-800 transition-colors"
                >
                  Acheter en 2 clics
                </button>
                <a href={telLink} className="flex items-center justify-center gap-3 p-5 bg-[#ccff00]/10 border-2 border-[#ccff00] rounded-2xl hover:bg-[#ccff00]/20 transition-colors">
                  <Phone className="w-6 h-6 text-black" />
                  <div className="text-left">
                    <p className="font-black text-lg">Besoin d'aide pour choisir ?</p>
                    <p className="text-sm">Un expert vous répond au {demoPhoneNumber}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutScreen = () => (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center mb-10">
           <h2 className="text-3xl font-black tracking-tight">Finaliser ma commande</h2>
           <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-bold">Étape {checkoutStep} sur 2</span>
        </div>

        {checkoutStep === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-2xl font-bold flex items-center gap-3"><Truck className="w-7 h-7" /> Où livrer votre colis ?</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-bold text-slate-700 ml-1">Prénom et Nom de famille</label>
                <input type="text" placeholder="Ex: Jean Dupont" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="font-bold text-slate-700 ml-1">Adresse de livraison</label>
                <input type="text" placeholder="Ex: 12 Rue de la Paix" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 ml-1">Code Postal</label>
                  <input type="text" placeholder="75000" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 ml-1">Ville</label>
                  <input type="text" placeholder="Paris" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
                </div>
              </div>
            </div>
            <button onClick={() => setCheckoutStep(2)} className="w-full bg-black text-white py-6 rounded-full text-2xl font-black shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              Continuer <ArrowRight />
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <h3 className="text-2xl font-bold flex items-center gap-3"><CreditCard className="w-7 h-7" /> Paiement Sécurisé</h3>
            <div className="bg-slate-50 p-8 rounded-3xl space-y-6 border border-slate-100">
              <div className="space-y-2">
                <label className="font-bold text-slate-700 ml-1">Numéro de Carte Bancaire</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 ml-1">Date (MM/AA)</label>
                  <input type="text" placeholder="12/28" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 ml-1">Code (CVC)</label>
                  <input type="text" placeholder="123" className="w-full p-5 border-2 border-slate-200 rounded-2xl text-xl outline-none focus:border-black transition-colors" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-500 text-sm justify-center bg-green-50 p-3 rounded-xl border border-green-100">
              <Lock className="w-5 h-5 text-green-600" /> Vos informations sont cryptées et protégées.
            </div>
            <button onClick={() => navigate('success')} className="w-full bg-[#ccff00] text-black py-6 rounded-full text-2xl font-black shadow-xl hover:scale-[1.02] transition-transform">
              Payer {selectedProduct?.price} €
            </button>
          </div>
        )}
        
        <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col items-center gap-4 text-slate-600">
           <p className="font-bold text-center">Un doute ? Un blocage ?</p>
           <a href={telLink} className="flex items-center gap-3 bg-white border-2 border-slate-200 px-6 py-3 rounded-full hover:border-black transition-colors">
             <Phone className="w-5 h-5" /> Appeler gratuitement au {demoPhoneNumber}
           </a>
        </div>
      </div>
    </div>
  );

  const SuccessScreen = () => (
    <div className="min-h-screen bg-white flex items-center justify-center text-center p-4">
      <div className="max-w-xl w-full">
        <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
          <CheckCircle2 className="w-20 h-20" />
        </div>
        <h1 className="text-5xl font-black mb-6 tracking-tight">C'est tout bon !</h1>
        <p className="text-2xl text-slate-500 mb-12">Votre commande est validée. Vous recevrez un appel de confirmation d'ici 30 minutes pour tout vérifier avec vous.</p>
        <div className="bg-slate-50 p-8 rounded-3xl mb-12 border border-slate-100 flex flex-col gap-4">
           <div className="flex justify-between font-bold text-lg"><span>Numéro :</span> <span className="text-[#2A0054]">#BM-2026-987</span></div>
           <div className="flex justify-between font-bold text-lg"><span>Arrivée prévue :</span> <span className="text-green-600">Demain avant 18h</span></div>
        </div>
        <button onClick={() => navigate('home')} className="w-full bg-black text-white py-5 rounded-full font-black text-2xl shadow-xl">Retourner à l'accueil</button>
      </div>
    </div>
  );

  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 font-bold text-slate-500 mb-12 mx-auto hover:underline text-lg">
          <ArrowLeft className="w-6 h-6" /> Retour
        </button>
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Besoin d'un coup de main ?</h1>
        <p className="text-xl text-slate-600 mb-16">Nos conseillers sont disponibles 7j/7 pour vous accompagner par téléphone ou en vidéo.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center">
            <Phone className="w-16 h-16 mb-8 text-[#ccff00] fill-black p-4 bg-black rounded-3xl" />
            <h2 className="text-3xl font-bold mb-4">Par téléphone</h2>
            <p className="mb-10 text-lg text-slate-500">Appelez gratuitement le <strong>{demoPhoneNumber}</strong> pour passer commande en direct.</p>
            <a href={telLink} className="w-full bg-black text-white px-10 py-5 rounded-full font-black text-xl shadow-lg">Appeler maintenant</a>
          </div>
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center">
            <Video className="w-16 h-16 mb-8 text-white p-4 bg-purple-600 rounded-3xl" />
            <h2 className="text-3xl font-bold mb-4">Assistance vidéo</h2>
            <p className="mb-10 text-lg text-slate-500">Montrez-nous votre écran, nous vous guiderons pas à pas pour la configuration.</p>
            <button className="w-full bg-slate-100 px-10 py-5 rounded-full font-black text-xl hover:bg-slate-200">Démarrer une visio</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen selection:bg-[#ccff00] selection:text-black">
      {currentScreen !== 'success' && currentScreen !== 'checkout' && <Header />}
      
      <main>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
        {currentScreen === 'success' && <SuccessScreen />}
      </main>

      {currentScreen !== 'success' && currentScreen !== 'checkout' && <Footer />}

      {/* BOUTON MODE CONFORT (FLOTTANT) */}
      <button 
        onClick={handleActivateSerenity}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-8 py-5 rounded-full shadow-2xl font-black border-2 transition-all hover:scale-105 active:scale-95 ${serenityMode ? 'bg-black text-[#ccff00] border-black' : 'bg-white text-black border-slate-200'}`}
      >
        {serenityMode ? <X className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />} 
        <span className="text-xl hidden md:inline">{serenityMode ? 'Quitter Confort' : 'Mode Confort'}</span>
      </button>

      {/* CHATBOT */}
      <button onClick={() => setShowChatbot(!showChatbot)} className="fixed bottom-6 right-6 z-50 w-20 h-20 bg-black rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-slate-700 hover:scale-105 transition-transform active:scale-95">
        <MessageCircle className="w-10 h-10 text-[#ccff00]" />
      </button>

      {showChatbot && (
        <div className="fixed bottom-28 right-6 z-50 w-96 bg-white border-2 border-slate-100 rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5">
           <div className="bg-black text-white p-6 font-bold flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
               <span className="text-lg">Votre conseiller en ligne</span>
             </div>
             <button onClick={() => setShowChatbot(false)}><X className="w-6 h-6" /></button>
           </div>
           <div className="p-8 space-y-6">
             <p className="text-lg font-medium text-slate-700">Bonjour ! Je suis là pour vous aider. Voulez-vous qu'on discute de votre prochain smartphone par téléphone ?</p>
             <div className="flex flex-col gap-3">
               <a href={telLink} className="w-full bg-[#ccff00] text-black p-5 rounded-2xl font-black flex items-center justify-center gap-3 text-lg shadow-sm hover:scale-[1.02] transition-transform">
                 <Phone className="w-5 h-5" /> M'appeler maintenant
               </a>
               <button onClick={() => {setShowChatbot(false); navigate('assistance');}} className="w-full bg-slate-50 text-slate-700 p-4 rounded-2xl font-bold border border-slate-100">
                 Voir les tutoriels vidéo
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
