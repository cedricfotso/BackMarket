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
  MessageSquare,
  Video,
  PlayCircle,
  ShieldCheck,
  ThumbsUp,
  X,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Tag,
  ArrowRight
} from 'lucide-react';

type Screen = 'home' | 'product' | 'assistance';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [serenityMode, setSerenityMode] = useState(() => {
    const saved = localStorage.getItem('serenityMode') === 'true';
    if (saved) document.body.classList.add('serenity-mode');
    return saved;
  });
  const [showChatbot, setShowChatbot] = useState(true);
  const [showSerenityToast, setShowSerenityToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showCartToast, setShowCartToast] = useState(false);

  // Numéro pour la démo
  const demoPhoneNumber = "+237600000000";

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowCartToast(true);
    setTimeout(() => setShowCartToast(false), 3000);
  };

  const handleActivateSerenity = () => {
    const newValue = !serenityMode;
    setSerenityMode(newValue);
    localStorage.setItem('serenityMode', String(newValue));
    
    if (newValue) {
      document.body.classList.add('serenity-mode');
      setShowSerenityToast(true);
      setTimeout(() => setShowSerenityToast(false), 4000);
      setShowChatbot(true);
    } else {
      document.body.classList.remove('serenity-mode');
    }
  };

  // --- COMPOSANTS REUTILISABLES ---
  
  const ProductCard = ({ title, desc, price, oldPrice, imgUrl, rating, isSeniorFriendly = false }: any) => (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-200 transition-all cursor-pointer flex flex-col group p-4 relative h-full"
      onClick={() => navigate('product')}
    >
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <span className="bg-[#ccff00] text-black text-xs font-bold px-2 py-1 rounded-sm w-max">
          RECONDITIONNÉ PARFAIT ÉTAT
        </span>
        {isSeniorFriendly && serenityMode && (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-sm w-max">
            Sélection Senior
          </span>
        )}
      </div>
      
      <div className="h-48 flex items-center justify-center mb-4 mt-8">
        <img src={imgUrl} alt={title} className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{title}</h3>
        <p className="text-sm text-slate-500 mb-2 line-clamp-2">{desc}</p>
        
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-black text-black" />
          <span className="text-sm font-bold">{rating}</span>
        </div>
        
        <div className="mt-auto">
          <p className="text-xs text-slate-500 line-through">Neuf : {oldPrice} €</p>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-black text-slate-900">{price} €</span>
            <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- HEADER ---
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-slate-100 text-xs text-center py-1 text-slate-600 hidden sm:block">
        Livraison standard offerte • Retour gratuit sous 30 jours • Garantie 12 mois minimum
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
<div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
          <img 
            src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" 
            alt="Back Market" 
            className="h-7 sm:h-8" 
          />
        </div>
        
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Rechercher un produit, une marque..." 
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-slate-100 border-transparent focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('assistance')} className="flex items-center gap-2 text-slate-700 hover:text-black transition-colors">
            <HelpCircle className="w-6 h-6" />
            <span className="text-sm font-bold hidden lg:block">Besoin d'aide ?</span>
          </button>
          <button className="flex items-center gap-2 text-slate-700 hover:text-black transition-colors relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="border-t border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-8 overflow-x-auto text-sm font-bold text-slate-700">
          <button className="hover:text-black whitespace-nowrap">Bons plans</button>
          <button onClick={() => navigate('product')} className="hover:text-black whitespace-nowrap">Smartphones</button>
          <button className="hover:text-black whitespace-nowrap">Tablettes</button>
          <button className="hover:text-black whitespace-nowrap">Ordinateurs</button>
          <button onClick={() => navigate('assistance')} className="hover:text-black whitespace-nowrap text-blue-600">Assistance Senior</button>
        </div>
      </div>
    </header>
  );

  // --- HOME SCREEN ---
  const HomeScreen = () => (
    <div className="min-h-screen bg-white pb-12">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#1D1D1B] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-16 flex-1 z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl tracking-tighter">Back Market</span>
              <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded-sm">Séniors</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
              Profiter de la technologie simplement, ça c'est une bonne résolution.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-md font-medium">
              Des smartphones testés, garantis, et une assistance dédiée pour vous accompagner pas à pas.
            </p>
            <button onClick={() => navigate('product')} className="bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-slate-200 transition-colors text-lg">
              En profiter
            </button>
          </div>
          <div className="flex-1 w-full h-[400px] md:h-[500px] relative">
            <img 
              src="/Image_fx (19).png"
              alt="Seniors utilisant un smartphone" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              style={{ objectPosition: 'center 20%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-[#1D1D1B] opacity-80 md:opacity-100 w-full md:w-1/3"></div>
          </div>
        </div>
      </section>

      {/* 2. REASSURANCE */}
      <section className="border-b border-slate-200 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Ici, on s'offre le meilleur du reconditionné.</h2>
          <p className="text-lg text-slate-600 mb-10">Chaque achat est aussi performant que le neuf grâce au <span className="underline font-bold cursor-pointer">Pacte Qualité Back Market.</span></p>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> 12 mois de garantie</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Jusqu'à 40 points de contrôle</div>
            <div className="flex items-center gap-2"><ArrowLeft className="w-5 h-5" /> 30 jours pour changer d'avis</div>
            <div className="flex items-center gap-2"><Phone className="w-5 h-5" /> Assistance dédiée</div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES GRID */}
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
            const Icon = cat.icon; // Securisation du composant Icon
            return (
              <button 
                key={idx} 
                onClick={() => navigate('product')}
                className="bg-[#ccff00] hover:bg-[#bbf000] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-colors group h-40"
              >
                <div className="w-16 h-16 bg-white rounded-full p-3 shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center overflow-hidden">
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <span className="font-bold text-black">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-black mb-6">Des écrans larges, parfaits pour lire</h3>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 rounded-2xl overflow-hidden relative min-h-[400px]">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Lifestyle" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
              <ProductCard 
                title="iPad (2021) 10.2 pouces" 
                desc="64 Go - Gris Sidéral - Wi-Fi" 
                price="289" oldPrice="389" rating="4.7" isSeniorFriendly={true}
                imgUrl="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80"
              />
              <ProductCard 
                title="Samsung Galaxy Tab A8" 
                desc="32 Go - Noir - Wi-Fi" 
                price="159" oldPrice="229" rating="4.5" isSeniorFriendly={true}
                imgUrl="https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=300&q=80"
              />
              <ProductCard 
                title="iPad Air 4" 
                desc="64 Go - Bleu - Wi-Fi" 
                price="419" oldPrice="689" rating="4.8"
                imgUrl="https://images.unsplash.com/photo-1588702545922-77ca5dafb844?w=300&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black">Nos smartphones les plus simples d'utilisation</h3>
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            title="iPhone 13" desc="128 Go - Noir - Débloqué" price="429" oldPrice="749" rating="4.6" isSeniorFriendly={true}
            imgUrl="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&q=80"
          />
          <ProductCard 
            title="Samsung Galaxy S21" desc="128 Go - Gris - Débloqué" price="289" oldPrice="859" rating="4.5"
            imgUrl="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80"
          />
          <ProductCard 
            title="iPhone SE (2022)" desc="64 Go - Rouge - Débloqué" price="249" oldPrice="529" rating="4.7" isSeniorFriendly={true}
            imgUrl="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=300&q=80"
          />
          <ProductCard 
            title="iPhone 12" desc="64 Go - Bleu - Débloqué" price="319" oldPrice="689" rating="4.4"
            imgUrl="https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=300&q=80"
          />
        </div>
      </section>

      {/* 6. GREEN BANNER (Newsletter) */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-[#ccff00] rounded-2xl p-8 md:p-12 text-center flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-black text-black mb-2">5 € offerts sur votre premier achat.</h3>
          <p className="text-black font-medium mb-6">Inscrivez-vous pour recevoir des astuces d'utilisation et nos offres.</p>
          <div className="flex w-full max-w-md gap-2">
            <input type="email" placeholder="Adresse e-mail" className="flex-1 rounded-lg px-4 py-3 outline-none" />
            <button className="bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-slate-800">S'inscrire</button>
          </div>
        </div>
      </section>

      {/* 7. PURPLE BANNER (Trade-in) */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-[#EAE0F5] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-black text-[#2A0054] mb-4">Que faire de votre ancien téléphone ?</h3>
            <p className="text-[#2A0054] font-medium text-lg mb-6">Nous le reprenons. C'est bon pour la planète et pour votre porte-monnaie.</p>
            <button className="bg-[#2A0054] text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-colors">
              Revendre mon appareil
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 text-sm font-bold text-slate-800">
            <div className="flex items-center gap-3"><CheckCircle2 className="text-[#2A0054]" /> Paiement direct sur votre compte</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-[#2A0054]" /> Envoi gratuit</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="text-[#2A0054]" /> Effacement total de vos données</div>
          </div>
        </div>
      </section>

      {/* 8. EXPERTS / TUTORIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black">Nos experts vous accompagnent</h3>
          <button onClick={() => navigate('assistance')} className="text-sm font-bold underline hidden sm:block">Voir toutes nos aides</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Comment passer son premier appel en visio ?", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" },
            { title: "Agrandir le texte sur son écran", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80" },
            { title: "Quel téléphone simple choisir ?", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" }
          ].map((video, idx) => (
            <div key={idx} className="group cursor-pointer rounded-2xl overflow-hidden bg-[#2A0054] relative aspect-[4/5] flex flex-col justify-end p-6 hover:shadow-xl transition-all" onClick={() => navigate('assistance')}>
              <img src={video.img} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A0054] via-transparent to-transparent opacity-90"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                  <PlayCircle className="w-6 h-6 text-[#2A0054]" />
                </div>
                <h4 className="text-2xl font-black text-white leading-tight">{video.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );

  // --- PRODUCT SCREEN ---
  const ProductScreen = () => (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-2 text-slate-600 font-bold mb-8 hover:underline">
          <ArrowLeft className="w-5 h-5" /> Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-slate-50 rounded-2xl p-12 flex flex-col items-center justify-center border border-slate-100 relative">
             <span className="absolute top-6 left-6 bg-[#ccff00] text-black text-sm font-bold px-3 py-1 rounded-sm">
                PARFAIT ÉTAT
             </span>
             <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80" alt="iPhone 13" className="max-w-[80%] mix-blend-multiply mb-8" />
             {serenityMode && (
               <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-lg">
                 <ShieldCheck className="w-5 h-5" /> Recommandé pour sa simplicité
               </div>
             )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">iPhone 13 - 128 Go - Noir</h1>
            <p className="text-lg text-slate-500 mb-6 font-medium">Débloqué tout opérateur</p>
            
            <div className="flex items-center gap-2 mb-8 text-sm font-bold">
              <div className="flex text-black"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current opacity-30" /></div>
              <span>4.6/5</span>
              <span className="text-slate-500 font-normal underline">(1 432 avis)</span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-slate-500">Choisissez l'apparence</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-slate-300 rounded-lg p-3 text-center cursor-pointer hover:border-black">
                  <span className="block font-bold">Correct</span><span className="text-xs text-slate-500">Dès 389€</span>
                </div>
                <div className="border border-slate-300 rounded-lg p-3 text-center cursor-pointer hover:border-black">
                  <span className="block font-bold">Très bon</span><span className="text-xs text-slate-500">Dès 409€</span>
                </div>
                <div className="border-2 border-black rounded-lg p-3 text-center cursor-pointer">
                  <span className="block font-bold">Parfait</span><span className="text-xs text-slate-500">429€</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl mb-8">
              <p className="text-sm text-slate-500 line-through mb-1">Prix du neuf: 749 €</p>
              <div className="text-5xl font-black mb-4">429 €</div>
              <p className="text-sm font-bold flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Livraison gratuite d'ici demain
              </p>
              <button onClick={handleAddToCart} className="w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-slate-800 transition-colors">
                Ajouter au panier
              </button>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl">
                 <ShieldCheck className="w-6 h-6 text-black" />
                 <div><span className="font-bold block">Garantie 12 mois minimum</span><span className="text-sm text-slate-600">En cas de panne, on répare ou on remplace.</span></div>
               </div>
               {serenityMode && (
                 <a href={`tel:${demoPhoneNumber}`} className="flex items-center gap-3 p-4 border border-blue-200 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100">
                   <Phone className="w-6 h-6 text-blue-600" />
                   <div><span className="font-bold text-blue-900 block">Besoin d'aide pour commander ?</span><span className="text-sm text-blue-700">Appelez un conseiller gratuitement.</span></div>
                 </a>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ASSISTANCE SCREEN ---
  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-2 font-bold hover:underline mb-8">
          <ArrowLeft className="w-5 h-5" /> Retour
        </button>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">L'assistance, toujours là pour vous.</h1>
          <p className="text-lg text-slate-600">Besoin d'aide pour choisir ou configurer votre appareil ? Nos conseillers vous accompagnent.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-[#ccff00] rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-xl font-bold mb-2">Parler de vive voix</h2>
            <p className="text-slate-600 text-sm mb-6">Un conseiller vous répond directement pour vous guider pas à pas.</p>
            <a href={`tel:${demoPhoneNumber}`} className="inline-block w-full bg-black text-white font-bold py-3 rounded-full hover:bg-slate-800">
              Appeler le conseiller
            </a>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-[#EAE0F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-8 h-8 text-[#2A0054]" />
            </div>
            <h2 className="text-xl font-bold mb-2">Assistance Vidéo</h2>
            <p className="text-slate-600 text-sm mb-6">Montrez-nous votre écran, nous vous montrons sur quoi appuyer.</p>
            <button className="w-full bg-slate-100 text-black font-bold py-3 rounded-full hover:bg-slate-200">
              Démarrer la visio
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-black mb-8 text-center">Nos tutoriels vidéo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-xl mb-4 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" alt="Tutoriel" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" /></div>
              </div>
              <h3 className="font-bold text-lg">Comment configurer la taille du texte ?</h3>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-xl mb-4 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80" alt="Tutoriel" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" /></div>
              </div>
              <h3 className="font-bold text-lg">Comment ajouter un contact favori ?</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- CHATBOT FLOTTANT ---
  const Chatbot = () => {
    if (!showChatbot) return null;
    return (
      <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="font-bold flex items-center gap-2"><Headset className="w-5 h-5"/> Conseiller</span>
          <button onClick={() => setShowChatbot(false)}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 bg-slate-50">
          <p className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-sm mb-4 font-medium">
            Bonjour ! Vous avez besoin d'aide pour choisir ou vous préférez qu'on s'appelle ?
          </p>
          <a href={`tel:${demoPhoneNumber}`} className="w-full flex items-center justify-center gap-2 bg-black hover:bg-slate-800 text-white p-3 rounded-lg font-bold text-sm transition-colors mb-2">
            <Phone className="w-4 h-4" /> M'appeler maintenant
          </a>
          <button onClick={() => navigate('assistance')} className="w-full bg-white border border-slate-300 font-bold p-3 rounded-lg text-sm hover:bg-slate-50">
            Voir les tutoriels
          </button>
        </div>
      </div>
    );
  };

  // --- FOOTER ---
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
            <li><button className="hover:underline">Nous contacter</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-black text-lg mb-4">Garanties</h4>
          <ul className="space-y-3 font-medium">
            <li><button className="hover:underline">Garantie 12 mois</button></li>
            <li><button className="hover:underline">Retours sous 30 jours</button></li>
            <li><button className="hover:underline">Paiement sécurisé</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-black text-lg mb-4">Inscrivez-vous</h4>
          <p className="mb-4">Recevez nos meilleures offres et astuces.</p>
          <div className="flex border border-slate-300 rounded-lg overflow-hidden">
            <input type="email" placeholder="E-mail" className="px-3 py-2 w-full outline-none" />
            <button className="bg-black text-white px-4 font-bold">OK</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2026 Back Market - Démo Académique</p>
        <div className="flex gap-4 font-bold text-xs uppercase">
          <button className="hover:underline">C.G.V.</button>
          <button className="hover:underline">Mentions légales</button>
          <button className="hover:underline">Données personnelles</button>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen flex flex-col selection:bg-[#ccff00] selection:text-black">
      <Header />
      <main className="flex-1">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
      </main>
      <Footer />
      <Chatbot />
      
      {/* Floating Serenity Toggle */}
      <button
        onClick={handleActivateSerenity}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border-2 transition-all hover:scale-105 ${
          serenityMode 
            ? 'bg-black text-[#ccff00] border-black' 
            : 'bg-white text-black border-slate-200 hover:border-black'
        }`}
      >
        {serenityMode ? <X className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
        <span className="font-bold text-lg hidden sm:block">
          {serenityMode ? 'Désactiver Sérénité' : 'Activer Mode Sérénité'}
        </span>
      </button>

      {/* Serenity Mode Toast */}
      {showSerenityToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-black text-[#ccff00] px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-10 duration-500 border border-slate-800">
          <CheckCircle2 className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">Mode Sérénité activé</span>
        </div>
      )}

      {/* Cart Toast */}
      {showCartToast && (
        <div className="fixed top-24 right-6 z-[100] bg-[#ccff00] text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-10 duration-500">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-lg font-bold tracking-tight">Ajouté au panier !</span>
        </div>
      )}
    </div>
  );
}
