import React, { useState, useEffect } from 'react';
import { 
  Search, HelpCircle, ShoppingCart, Smartphone, Tablet, Headset, 
  CheckCircle2, Star, MessageCircle, ArrowLeft, Phone, Video, 
  PlayCircle, ShieldCheck, X, Laptop, Watch, Headphones, Camera, 
  Tag, ArrowRight, CreditCard, Truck, Lock, ChevronRight, ThumbsUp, 
  User, Info, MapPin, Check, Shield, Clock, Heart, Menu, Trash2, Loader2, Plus, Minus, AlertCircle
} from 'lucide-react';

// --- TYPES ---
type Screen = 'home' | 'catalogue' | 'product' | 'checkout' | 'assistance' | 'success';

interface Variant {
  id: string;
  color: string;
  colorCode: string;
  storage: string;
  priceModifier: number;
}

interface Product {
  id: number;
  brand: string;
  title: string;
  desc: string;
  price: number;
  oldPrice: number;
  images: string[];
  rating: string;
  reviewsCount: number;
  isSeniorFriendly?: boolean;
  stock: number;
  variants: Variant[];
}

interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

// --- MOCK DATA ---
const MOCK_VARIANTS: Variant[] = [
  { id: 'v1', color: 'Noir', colorCode: '#1a1a1a', storage: '64 Go', priceModifier: 0 },
  { id: 'v2', color: 'Blanc', colorCode: '#f2f2f2', storage: '128 Go', priceModifier: 40 },
  { id: 'v3', color: 'Bleu', colorCode: '#2563eb', storage: '256 Go', priceModifier: 90 },
];

const PRODUCTS: Product[] = [
  { 
    id: 1, brand: "Apple", title: "iPhone 13", desc: "Le parfait équilibre. Simple et puissant.", 
    price: 429, oldPrice: 749, rating: "4.8", reviewsCount: 1245, isSeniorFriendly: true, stock: 4,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      "https://images.unsplash.com/photo-1603798125914-7b5d27789248?w=800&q=80",
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80"
    ],
    variants: MOCK_VARIANTS
  },
  { 
    id: 2, brand: "Samsung", title: "Galaxy S21", desc: "Un grand écran ultra-lumineux.", 
    price: 289, oldPrice: 859, rating: "4.5", reviewsCount: 890, isSeniorFriendly: false, stock: 12,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"],
    variants: [MOCK_VARIANTS[0], MOCK_VARIANTS[1]]
  },
  { 
    id: 3, brand: "Apple", title: "iPhone SE", desc: "Le bouton d'accueil classique rassurant.", 
    price: 249, oldPrice: 529, rating: "4.7", reviewsCount: 342, isSeniorFriendly: true, stock: 2,
    images: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80"],
    variants: MOCK_VARIANTS
  },
  { 
    id: 4, brand: "Apple", title: "iPad 10.2\"", desc: "Idéal pour lire et voir ses proches en visio.", 
    price: 289, oldPrice: 389, rating: "4.9", reviewsCount: 2100, isSeniorFriendly: true, stock: 15,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80"],
    variants: [MOCK_VARIANTS[0], MOCK_VARIANTS[1]]
  },
];

export default function App() {
  // --- STATES ---
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'info' | 'payment'>('info');
  const [toast, setToast] = useState<{show: boolean, msg: string}>({show: false, msg: ''});
  const [searchQuery, setSearchQuery] = useState('');
  const [showCookies, setShowCookies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [serenityMode, setSerenityMode] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('serenityMode') === 'true' : false;
    if (saved && typeof document !== 'undefined') document.body.classList.add('serenity-mode');
    return saved;
  });

  const demoPhoneNumber = "+33 7 54 14 28 93";
  const telLink = "tel:+33754142893";

  // --- ACTIONS ---
  const navigate = (screen: Screen, product?: Product) => {
    setIsLoading(true);
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    
    // Simulate network routing delay
    setTimeout(() => {
      if (product) setSelectedProduct(product);
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 400);
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const addToCart = (product: Product, variant: Variant) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.variant.id === variant.id);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    showToast(`${product.title} ajouté au panier`);
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].quantity += delta;
      if (newCart[index].quantity <= 0) newCart.splice(index, 1);
      return newCart;
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price + item.variant.priceModifier) * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleActivateSerenity = () => {
    const newValue = !serenityMode;
    setSerenityMode(newValue);
    localStorage.setItem('serenityMode', String(newValue));
    if (newValue) document.body.classList.add('serenity-mode');
    else document.body.classList.remove('serenity-mode');
  };

  // --- GLOBAL COMPONENTS ---

  const Toast = () => (
    <div className={`fixed top-24 right-6 z-[100] transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
      <div className="bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-black">
        <div className="w-8 h-8 bg-[#ccff00] rounded-full flex items-center justify-center text-black"><Check className="w-5 h-5" /></div>
        {toast.msg}
      </div>
    </div>
  );

  const CookieBanner = () => {
    if (!showCookies) return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-slate-100 p-6 z-[90] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 font-bold text-sm leading-relaxed max-w-3xl">
            🍪 Nous utilisons des cookies pour assurer le bon fonctionnement du site, mesurer l'audience et vous offrir une expérience personnalisée (et plus lisible). 
          </p>
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={() => setShowCookies(false)} className="flex-1 px-6 py-3 rounded-full font-black text-slate-500 hover:bg-slate-100 transition-colors">Refuser</button>
            <button onClick={() => setShowCookies(false)} className="flex-1 bg-black text-white px-8 py-3 rounded-full font-black hover:bg-slate-800 transition-colors">Accepter tout</button>
          </div>
        </div>
      </div>
    );
  };

  const CartDrawer = () => (
    <>
      <div className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[101] shadow-2xl transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-2xl font-black flex items-center gap-3"><ShoppingCart className="w-6 h-6" /> Mon Panier ({cartItemCount})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <ShoppingCart className="w-20 h-20 opacity-20" />
              <p className="text-xl font-black">Votre panier est vide.</p>
              <button onClick={() => {setIsCartOpen(false); navigate('catalogue');}} className="mt-4 px-8 py-3 bg-[#ccff00] text-black font-black rounded-full hover:scale-105 transition-transform">Découvrir nos offres</button>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4 bg-white border-2 border-slate-100 p-4 rounded-3xl relative group">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl p-2 flex items-center justify-center">
                  <img src={item.product.images[0]} alt={item.product.title} className="max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-lg leading-tight">{item.product.title}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.variant.storage} • {item.variant.color}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-xl">{item.product.price + item.variant.priceModifier} €</span>
                    <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1">
                      <button onClick={() => updateQuantity(i, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-red-500"><Minus className="w-4 h-4" /></button>
                      <span className="font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(i, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-green-500"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
                <button onClick={() => updateQuantity(i, -item.quantity)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex justify-between items-center mb-6 text-xl">
              <span className="font-bold text-slate-500">Total TTC</span>
              <span className="font-black text-3xl">{cartTotal} €</span>
            </div>
            <button onClick={() => {setIsCartOpen(false); navigate('checkout');}} className="w-full bg-black text-white py-5 rounded-full font-black text-2xl shadow-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
              Valider la commande <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </>
  );

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-[#ccff00] text-black text-[10px] font-black text-center py-1.5 uppercase tracking-widest hidden sm:block">
        Livraison standard offerte • Garantie 12 mois minimum • Assistance gratuite
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 -ml-2 text-slate-700">
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
          <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-6 sm:h-8" />
        </div>
        
        {/* Interactive Search */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block relative">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Chercher un iPhone, iPad..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-full bg-slate-100 border-2 border-transparent focus:border-black outline-none font-bold transition-all" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-black" />
          </div>
          {/* Fake Search Dropdown */}
          {searchQuery.length > 2 && (
            <div className="absolute top-14 left-0 w-full bg-white border-2 border-slate-100 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Résultats pour "{searchQuery}"</p>
              {PRODUCTS.slice(0,2).map(p => (
                <div key={p.id} onClick={() => {setSearchQuery(''); navigate('product', p);}} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors">
                  <img src={p.images[0]} className="w-12 h-12 object-contain" alt="" />
                  <div><p className="font-black">{p.title}</p><p className="text-sm text-slate-500 font-bold">{p.price} €</p></div>
                </div>
              ))}
              <button onClick={() => {setSearchQuery(''); navigate('catalogue');}} className="w-full text-center p-3 text-sm font-black text-blue-600 hover:bg-blue-50 rounded-xl mt-2 transition-colors">Voir tous les résultats</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <a href={telLink} className="hidden lg:flex items-center gap-2 bg-slate-50 border-2 border-slate-100 text-black px-4 py-2 rounded-full font-black text-sm hover:bg-slate-100 transition-colors">
            <Phone className="w-4 h-4 text-green-600" /> {demoPhoneNumber}
          </a>
          <button className="hidden sm:flex text-slate-700 hover:text-black hover:bg-slate-100 p-2.5 rounded-full transition-colors"><User className="w-6 h-6" /></button>
          <button onClick={() => navigate('assistance')} className="hidden sm:flex text-slate-700 hover:text-black hover:bg-slate-100 p-2.5 rounded-full transition-colors"><HelpCircle className="w-6 h-6" /></button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 hover:bg-slate-100 rounded-full transition-colors group">
            <ShoppingCart className="w-6 h-6 text-slate-800 group-hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute 0 top-0 right-0 bg-[#ccff00] text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-in zoom-in">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl p-6 space-y-6 z-40 animate-in slide-in-from-top-2">
           <input type="text" placeholder="Rechercher..." className="w-full h-12 px-6 rounded-full bg-slate-100 border-none font-bold" />
           <div className="flex flex-col gap-4">
             <button onClick={() => navigate('catalogue')} className="text-left font-black text-xl py-2 border-b border-slate-50">Smartphones</button>
             <button onClick={() => navigate('catalogue')} className="text-left font-black text-xl py-2 border-b border-slate-50">Tablettes</button>
             <button onClick={() => navigate('assistance')} className="text-left font-black text-xl py-2 text-blue-600">Aide et Contact Senior</button>
           </div>
           <a href={telLink} className="flex items-center justify-center gap-3 w-full bg-[#ccff00] text-black py-4 rounded-full font-black text-lg">
             <Phone className="w-5 h-5" /> Appeler un conseiller
           </a>
        </div>
      )}
    </header>
  );

  // --- SCREENS ---

  const CatalogueScreen = () => (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">
        <span className="cursor-pointer hover:text-black" onClick={() => navigate('home')}>Accueil</span> <ChevronRight className="w-4 h-4" /> <span className="text-black">Smartphones</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Fake Filters Sidebar */}
        <div className="w-full lg:w-64 space-y-8 hidden md:block">
          <div>
            <h4 className="font-black text-xl mb-4">Catégories</h4>
            <div className="space-y-3 font-bold text-slate-600">
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-black focus:ring-black" /> Tous les smartphones</label>
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-black focus:ring-black" /> Sélection Senior</label>
            </div>
          </div>
          <div>
            <h4 className="font-black text-xl mb-4">Marques</h4>
            <div className="space-y-3 font-bold text-slate-600">
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-black" /> Apple</label>
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-black" /> Samsung</label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black">Smartphones reconditionnés</h1>
            <select className="border-2 border-slate-200 bg-white font-bold px-4 py-2 rounded-xl outline-none focus:border-black">
              <option>Recommandés</option>
              <option>Prix croissant</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {PRODUCTS.map(p => (
              <div key={p.id} onClick={() => navigate('product', p)} className="bg-white border-2 border-slate-100 rounded-[32px] p-6 hover:border-black transition-all cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-xl">
                <div className="aspect-square w-full flex items-center justify-center mb-6 overflow-hidden relative bg-slate-50 rounded-2xl">
                  {p.stock < 5 && <span className="absolute top-3 right-3 bg-red-100 text-red-700 text-xs font-black px-3 py-1 rounded-full z-10 animate-pulse">Plus que {p.stock} !</span>}
                  <img src={p.images[0]} alt={p.title} className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="text-2xl font-black text-slate-900 mb-1">{p.title}</h4>
                  <p className="text-sm text-slate-500 font-bold mb-4 line-clamp-1">{p.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-bold line-through block mb-0.5">Neuf : {p.oldPrice}€</span>
                      <span className="text-2xl font-black">{p.price} €</span>
                    </div>
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-colors"><ArrowRight className="w-5 h-5" /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProductScreen = () => {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<Variant>(selectedProduct?.variants[0] || MOCK_VARIANTS[0]);
    const [isAdding, setIsAdding] = useState(false);

    if (!selectedProduct) return null;

    const currentPrice = selectedProduct.price + selectedVariant.priceModifier;

    const handleAddToCart = () => {
      setIsAdding(true);
      setTimeout(() => {
        addToCart(selectedProduct, selectedVariant);
        setIsAdding(false);
      }, 600);
    };

    return (
      <div className="min-h-screen bg-white pb-32 animate-in fade-in duration-500">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-black" onClick={() => navigate('home')}>Accueil</span> <ChevronRight className="w-4 h-4" /> 
            <span className="cursor-pointer hover:text-black" onClick={() => navigate('catalogue')}>Smartphones</span> <ChevronRight className="w-4 h-4" /> 
            <span className="text-black">{selectedProduct.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            
            {/* Left: Interactive Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-6 h-auto md:h-[600px]">
              <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
                {selectedProduct.images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 flex-shrink-0 bg-slate-50 flex items-center justify-center p-2 transition-all ${activeImage === idx ? 'border-black' : 'border-transparent hover:border-slate-200'}`}>
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-slate-50 rounded-[40px] p-12 flex items-center justify-center border-2 border-slate-100 relative group">
                <img src={selectedProduct.images[activeImage]} alt={selectedProduct.title} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                {selectedProduct.isSeniorFriendly && (
                  <div className="absolute top-6 left-6 bg-blue-100 text-blue-800 text-xs font-black px-4 py-2 rounded-full shadow-sm tracking-widest flex items-center gap-2"><Heart className="w-4 h-4" fill="currentColor"/> RECOMMANDÉ SÉNIOR</div>
                )}
              </div>
            </div>
            
            {/* Right: Product Info & Variants */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span className="text-sm font-black">{selectedProduct.rating} <span className="text-slate-400">({selectedProduct.reviewsCount})</span></span>
                </div>
                <span className="text-sm font-bold text-slate-400 underline cursor-pointer">Lire les avis</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-[1.05]">{selectedProduct.title}</h1>
              <p className="text-2xl text-slate-500 mb-8 font-medium leading-relaxed">{selectedProduct.desc}</p>
              
              <div className="flex items-baseline gap-6 mb-10">
                <span className="text-6xl font-black tracking-tighter text-black">{currentPrice} €</span>
                <span className="text-2xl text-slate-300 line-through font-black">Neuf : {selectedProduct.oldPrice} €</span>
              </div>

              {/* Variants Selector */}
              <div className="space-y-8 mb-12 border-y border-slate-100 py-8">
                <div>
                  <div className="flex justify-between mb-4"><span className="font-black text-sm uppercase tracking-widest text-slate-500">Capacité</span></div>
                  <div className="flex flex-wrap gap-4">
                    {selectedProduct.variants.map((v) => (
                       <button key={v.id} onClick={() => setSelectedVariant(v)} className={`px-6 py-4 rounded-2xl font-black text-lg border-4 transition-all ${selectedVariant.id === v.id ? 'border-black bg-slate-50' : 'border-slate-100 text-slate-500 hover:border-slate-300'}`}>
                         {v.storage}
                       </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-black text-sm uppercase tracking-widest text-slate-500 mb-4 block">Couleur : {selectedVariant.color}</span>
                  <div className="flex gap-4">
                    {selectedProduct.variants.map((v) => (
                      <button key={`color-${v.id}`} onClick={() => setSelectedVariant(v)} className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${selectedVariant.id === v.id ? 'border-black scale-110' : 'border-transparent hover:scale-105'}`}>
                        <span className="w-8 h-8 rounded-full shadow-inner border border-black/10" style={{backgroundColor: v.colorCode}}></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOMO Stock */}
              {selectedProduct.stock < 10 && (
                <div className="flex items-center gap-3 text-red-600 font-bold mb-6 bg-red-50 p-4 rounded-2xl">
                  <AlertCircle className="w-6 h-6" /> Attention, plus que {selectedProduct.stock} articles disponibles dans cette configuration !
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleAddToCart} 
                  disabled={isAdding}
                  className="flex-1 bg-[#ccff00] text-black py-6 rounded-full font-black text-2xl shadow-xl hover:bg-[#bbf000] transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isAdding ? <Loader2 className="w-8 h-8 animate-spin" /> : "Ajouter au panier"}
                </button>
                <a href={telLink} className="sm:w-24 w-full h-20 bg-slate-100 flex items-center justify-center text-black rounded-full shadow-sm hover:bg-slate-200 transition-colors">
                  <Phone className="w-8 h-8" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm font-bold text-slate-600">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl"><ShieldCheck className="w-6 h-6 text-green-600"/> Garantie 1 an</div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl"><CheckCircle2 className="w-6 h-6 text-green-600"/> Testé sur 40 points</div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl"><Truck className="w-6 h-6 text-blue-600"/> Livraison Gratuite</div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl"><Clock className="w-6 h-6 text-blue-600"/> 30 jours pour changer d'avis</div>
              </div>
            </div>
          </div>

          {/* Fake Reviews Section */}
          <div className="mt-32 pt-20 border-t-2 border-slate-100">
             <h3 className="text-4xl font-black mb-12">Avis clients ({selectedProduct.reviewsCount})</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-[32px]">
                  <div className="flex gap-1 mb-4"><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/></div>
                  <h4 className="font-black text-xl mb-2">Parfait pour moi</h4>
                  <p className="text-slate-600 mb-4 font-medium leading-relaxed">Arrivé en 2 jours, bien emballé. La configuration était facile et la batterie tient bien. Je recommande !</p>
                  <p className="text-sm font-bold text-slate-400">Jean P. - Il y a 2 jours</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-[32px]">
                  <div className="flex gap-1 mb-4"><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/><Star className="fill-black w-5 h-5"/><Star className="text-slate-300 w-5 h-5"/></div>
                  <h4 className="font-black text-xl mb-2">Très bon état comme promis</h4>
                  <p className="text-slate-600 mb-4 font-medium leading-relaxed">Une micro rayure au dos mais avec une coque ça ne se voit pas. Fonctionne parfaitement.</p>
                  <p className="text-sm font-bold text-slate-400">Martine D. - Il y a 1 semaine</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const CheckoutScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ email: '', fname: '', lname: '', zip: '', card: '' });
    const [errors, setErrors] = useState<any>({});

    const total = cartTotal;

    const validateInfo = () => {
      let newErrors: any = {};
      if (!formData.email.includes('@')) newErrors.email = true;
      if (formData.fname.length < 2) newErrors.fname = true;
      if (formData.zip.length < 5) newErrors.zip = true;
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) setCheckoutStep('payment');
    };

    const handlePay = () => {
      if (formData.card.length < 15) {
        setErrors({card: true});
        return;
      }
      setIsSubmitting(true);
      // Simulate API Call for Payment
      setTimeout(() => {
        setIsSubmitting(false);
        setCart([]); // Clear cart
        navigate('success');
      }, 2500);
    };

    if (cart.length === 0 && !isSubmitting) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <h2 className="text-3xl font-black mb-6">Oops, votre panier est vide.</h2>
          <button onClick={() => navigate('catalogue')} className="px-8 py-4 bg-black text-white rounded-full font-black">Retourner au catalogue</button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-in slide-in-from-bottom-12 duration-700">
        <div className="flex-1 px-8 py-12 md:px-20 lg:px-32 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
               <img src="https://front-office.statics.backmarket.com/3cad7f4e6c072b699e232744664711a51254c21a/img/header/Logo.svg" alt="Back Market" className="h-6" />
               <ChevronRight className="w-5 h-5 text-slate-300" />
               <h2 className="text-lg font-black text-slate-900 tracking-tight">Paiement Sécurisé</h2>
            </div>

            <nav className="flex gap-6 text-sm font-black mb-12">
              <button onClick={() => setCheckoutStep('info')} className={checkoutStep === 'info' ? 'text-black border-b-4 border-[#ccff00] pb-2' : 'text-slate-400 pb-2'}>1. Informations</button>
              <ChevronRight className="w-5 h-5 text-slate-200" />
              <button disabled className={checkoutStep === 'payment' ? 'text-black border-b-4 border-[#ccff00] pb-2' : 'text-slate-400 pb-2'}>2. Paiement</button>
            </nav>

            {checkoutStep === 'info' ? (
              <div className="space-y-10 animate-in fade-in">
                <section>
                  <h3 className="text-2xl font-black mb-6">Contact</h3>
                  <div className="space-y-2">
                    <input 
                      type="email" placeholder="E-mail" 
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className={`w-full p-5 border-4 ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-100'} rounded-2xl text-xl outline-none focus:border-black font-bold transition-all`} 
                    />
                    {errors.email && <p className="text-red-500 font-bold text-sm ml-2 animate-in slide-in-from-top-1">Veuillez entrer un email valide.</p>}
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-black mb-6">Adresse de livraison</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Prénom" value={formData.fname} onChange={e => setFormData({...formData, fname: e.target.value})} className={`w-full p-5 border-4 ${errors.fname ? 'border-red-400' : 'border-slate-100'} rounded-2xl text-xl outline-none focus:border-black font-bold`} />
                      <input type="text" placeholder="Nom" className="w-full p-5 border-4 border-slate-100 rounded-2xl text-xl outline-none focus:border-black font-bold" />
                    </div>
                    <input type="text" placeholder="Adresse" className="w-full p-5 border-4 border-slate-100 rounded-2xl text-xl outline-none focus:border-black font-bold" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Code Postal" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className={`w-full p-5 border-4 ${errors.zip ? 'border-red-400' : 'border-slate-100'} rounded-2xl text-xl outline-none focus:border-black font-bold`} />
                      <input type="text" placeholder="Ville" className="w-full p-5 border-4 border-slate-100 rounded-2xl text-xl outline-none focus:border-black font-bold" />
                    </div>
                  </div>
                </section>

                <button onClick={validateInfo} className="w-full bg-black text-white font-black py-6 rounded-2xl text-xl hover:bg-slate-800 transition-all active:scale-95">Continuer vers le paiement</button>
              </div>
            ) : (
              <div className="space-y-10 animate-in slide-in-from-right-8">
                <section>
                  <h3 className="text-2xl font-black mb-6">Carte Bancaire</h3>
                  <div className={`border-4 ${errors.card ? 'border-red-400' : 'border-slate-200'} rounded-3xl p-6 bg-slate-50 space-y-4`}>
                    <div className="relative">
                      <input type="text" placeholder="Numéro de carte" value={formData.card} onChange={e => setFormData({...formData, card: e.target.value})} className="w-full p-5 border-2 border-slate-200 rounded-xl text-xl outline-none focus:border-black font-bold bg-white" />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM / AA" className="w-full p-5 border-2 border-slate-200 rounded-xl text-xl outline-none focus:border-black font-bold bg-white" />
                      <input type="text" placeholder="CVC" className="w-full p-5 border-2 border-slate-200 rounded-xl text-xl outline-none focus:border-black font-bold bg-white" />
                    </div>
                    {errors.card && <p className="text-red-500 font-bold text-sm text-center pt-2 animate-pulse">Numéro de carte invalide.</p>}
                  </div>
                </section>

                <div className="bg-[#ccff00]/20 p-6 rounded-2xl border-2 border-[#ccff00] flex gap-4">
                  <ShieldCheck className="w-8 h-8 text-green-700 flex-shrink-0" />
                  <p className="text-green-900 font-black text-sm">Paiement crypté SSL 256-bits. Vos données sont sécurisées et ne sont pas conservées.</p>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                  <button onClick={handlePay} disabled={isSubmitting} className="w-full relative bg-black text-white font-black py-6 rounded-2xl text-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-80 flex items-center justify-center">
                    {isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : `Payer ${total} €`}
                  </button>
                  <button onClick={() => setCheckoutStep('info')} disabled={isSubmitting} className="text-slate-500 font-black text-sm hover:underline text-center">Revenir aux informations</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Mini Cart Summary */}
        <div className="w-full lg:w-[450px] bg-slate-50 border-l border-slate-200 px-8 py-12 hidden md:block">
          <div className="sticky top-12">
            <h3 className="text-xl font-black mb-8 border-b-2 border-slate-200 pb-4">Résumé</h3>
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl p-2 relative">
                    <img src={item.product.images[0]} className="w-full h-full object-contain" alt="" />
                    <span className="absolute -top-2 -right-2 bg-slate-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">{item.quantity}</span>
                  </div>
                  <div>
                    <p className="font-black text-sm leading-tight">{item.product.title}</p>
                    <p className="text-xs text-slate-500 font-bold">{item.variant.storage}</p>
                    <p className="font-black text-sm mt-1">{(item.product.price + item.variant.priceModifier) * item.quantity} €</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t-2 border-slate-200 font-bold text-slate-600">
               <div className="flex justify-between"><span>Sous-total</span><span>{total} €</span></div>
               <div className="flex justify-between"><span>Livraison</span><span className="text-green-600">Offerte</span></div>
               <div className="flex justify-between text-2xl font-black text-black pt-4 mt-4 border-t border-slate-200"><span>Total</span><span>{total} €</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center p-8 animate-in zoom-in duration-700">
      <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-xl ring-8 ring-green-50 animate-bounce">
        <Check className="w-16 h-16" strokeWidth={4} />
      </div>
      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center">Félicitations !</h1>
      <p className="text-xl md:text-2xl text-slate-500 mb-12 font-black italic text-center max-w-xl">
        Commande confirmée. Un email de suivi vient de vous être envoyé.
      </p>
      <div className="flex gap-6">
        <button onClick={() => navigate('home')} className="bg-black text-white px-8 py-4 rounded-full font-black text-xl hover:bg-slate-800 transition-all">Retour à l'accueil</button>
      </div>
    </div>
  );

  // Keep simplified versions of original screens for space constraint (Home, Assistance remain largely the same structural intent)
  const HomeScreen = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[500px] md:h-[600px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 z-0"><img src="https://images.unsplash.com/photo-1511296265581-c2450046447d?w=1600&q=80" className="w-full h-full object-cover opacity-50 mix-blend-overlay" alt="Senior tech"/></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#ccff00] text-black font-black text-xs px-4 py-1.5 rounded-full mb-6">SÉLECTION SÉNIOR</div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8">La technologie sans complications.</h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-200 font-medium">Des appareils testés, garantis et accompagnés d'un service client expert.</p>
            <button onClick={() => navigate('catalogue')} className="bg-white text-black font-black py-4 px-10 rounded-full text-xl hover:bg-slate-100 transition-all">Voir le catalogue</button>
          </div>
        </div>
      </section>
      
      {/* Abridged Product Grid for Home */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-black mb-12 text-center">Nos best-sellers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.slice(0,3).map(p => (
            <div key={p.id} onClick={() => navigate('product', p)} className="bg-slate-50 border-2 border-slate-100 rounded-[32px] p-8 cursor-pointer hover:border-black transition-all group">
              <div className="aspect-square bg-white rounded-2xl mb-6 p-6 flex items-center justify-center"><img src={p.images[0]} className="max-h-full mix-blend-multiply group-hover:scale-110 transition-transform" alt=""/></div>
              <h4 className="font-black text-2xl">{p.title}</h4>
              <p className="text-slate-500 font-bold mb-4">{p.price} €</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const AssistanceScreen = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center animate-in fade-in">
       <Headset className="w-24 h-24 text-[#ccff00] bg-black p-4 rounded-3xl mb-8" />
       <h1 className="text-5xl font-black mb-6">On ne vous lâche pas.</h1>
       <p className="text-xl text-slate-500 max-w-2xl font-bold mb-10">Une question technique ? Un doute sur une commande ? Nos conseillers basés en France sont là pour vous.</p>
       <a href={telLink} className="bg-black text-white px-10 py-5 rounded-full font-black text-2xl hover:scale-105 transition-transform flex items-center gap-4"><Phone /> Appeler le {demoPhoneNumber}</a>
    </div>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen selection:bg-[#ccff00] selection:text-black">
      {/* Global Load State overlay */}
      {isLoading && <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[200] flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-black" /></div>}
      
      <Toast />
      <CookieBanner />
      <CartDrawer />
      
      {currentScreen !== 'checkout' && currentScreen !== 'success' && <Header />}
      
      <main>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'catalogue' && <CatalogueScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
        {currentScreen === 'success' && <SuccessScreen />}
      </main>

      {/* Floating Accessibility Button */}
      {currentScreen !== 'checkout' && (
        <button onClick={handleActivateSerenity} className={`fixed bottom-6 left-6 z-[90] flex items-center gap-4 px-6 py-4 rounded-full shadow-2xl font-black border-2 transition-all hover:scale-105 ${serenityMode ? 'bg-black text-[#ccff00] border-black' : 'bg-white text-black border-slate-200'}`}>
          {serenityMode ? <X className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />} 
          <span className="hidden sm:inline">{serenityMode ? 'Quitter' : 'Mode Confort'}</span>
        </button>
      )}
    </div>
  );
}
