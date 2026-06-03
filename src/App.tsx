import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Droplets, MapPin, Instagram, Phone, Mail, ChevronRight, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';

// --- Components ---

interface ElifLogoProps {
  className?: string;
  dark?: boolean;
  variant?: 'full' | 'compact' | 'large';
}

const ElifLogo = ({ className = '', dark = false, variant = 'full' }: ElifLogoProps) => {
  const textColor = dark ? 'text-white' : 'text-[#356290]';
  const subtitleColor = dark ? 'text-white/80' : 'text-[#4895EF]';
  
  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <div className="flex flex-col leading-none">
        <div className="relative flex items-center col">
          <span 
            className={`font-serif italic font-black ${textColor} transition-colors duration-300`}
            style={{ 
              fontSize: variant === 'compact' ? '28px' : variant === 'large' ? '54px' : '34px',
              fontFamily: '"Outfit", "Georgia", "Playfair Display", serif',
              letterSpacing: '-0.02em'
            }}
          >
            E
            <span className="relative inline-block" style={{ marginLeft: '-0.04em', marginRight: '-0.01em' }}>l</span>
            <span className="relative inline-block" style={{ marginLeft: '-0.01em', marginRight: '-0.01em' }}>
              ı
              <span 
                className="absolute bg-[#DF2020] rounded-full shadow-sm"
                style={{ 
                  width: variant === 'compact' ? '7px' : variant === 'large' ? '12px' : '8px', 
                  height: variant === 'compact' ? '7px' : variant === 'large' ? '12px' : '8px',
                  top: variant === 'compact' ? '1px' : variant === 'large' ? '4px' : '2px',
                  left: '50%',
                  transform: 'translateX(-50%)' 
                }} 
              />
            </span>
            <span style={{ marginLeft: '-0.01em' }}>f</span>
          </span>
          <span className={`text-[10px] font-bold self-start mt-1.5 ml-0.5 ${dark ? 'text-white/60' : 'text-[#356290]/70'}`}>
            ®
          </span>
        </div>
        <span 
          className={`font-sans tracking-[0.2em] font-bold uppercase ${subtitleColor} transition-colors duration-300`}
          style={{ 
            fontSize: variant === 'compact' ? '7px' : variant === 'large' ? '13px' : '9px',
            marginTop: variant === 'compact' ? '-3px' : variant === 'large' ? '-6px' : '-4px',
            paddingLeft: '2px'
          }}
        >
          Air Mineral
        </span>
      </div>
    </div>
  );
};

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] z-[100] bg-transparent pointer-events-none">
      <motion.div 
        className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-[#59C3E1] origin-left"
        style={{ width: `${scrollProgress}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#tentang' },
    { name: 'Produk', href: '#produk' },
    { name: 'Keunggulan', href: '#keunggulan' },
    { name: 'Distributor', href: '#distributor' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 focus:outline-none">
          <ElifLogo dark={!isScrolled} variant="compact" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-brand-green transition-colors ${isScrolled ? 'text-brand-dark' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#kontak" className="bg-brand-blue hover:bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-brand-blue/20">
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-brand-dark' : 'text-white'} /> : <Menu className={isScrolled ? 'text-brand-dark' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-brand-dark hover:text-brand-blue"
              >
                {link.name}
              </a>
            ))}
            <a href="#kontak" className="bg-brand-blue text-white text-center py-3 rounded-xl font-bold">
              Pesan Sekarang
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1920"
          alt="Fresh Water Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/30 to-brand-light-blue" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/20 backdrop-blur-md border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-widest mb-6">
            Murni Dari Alam, Untuk Kehidupan
          </span>
          <div className="flex flex-col items-center justify-center mb-8">
            {/* Elegant large wordmark inspired by the actual logo */}
            <div className="flex items-center select-none mb-1">
              <span 
                className="font-serif italic font-black text-white drop-shadow-[0_4px_12px_rgba(3,62,138,0.4)]"
                style={{ 
                  fontSize: 'clamp(55px, 11vw, 105px)',
                  letterSpacing: '-0.02em',
                  fontFamily: '"Outfit", "Georgia", "Playfair Display", serif'
                }}
              >
                E
                <span className="relative inline-block" style={{ marginLeft: '-0.04em', marginRight: '-0.01em' }}>l</span>
                <span className="relative inline-block" style={{ marginLeft: '-0.01em', marginRight: '-0.01em' }}>
                  ı
                  <span 
                    className="absolute bg-[#DF2020] rounded-full shadow-md animate-pulse"
                    style={{ 
                      width: 'clamp(14px, 3.2vw, 24px)', 
                      height: 'clamp(14px, 3.2vw, 24px)',
                      top: 'clamp(4px, 1vw, 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)' 
                    }} 
                  />
                </span>
                <span style={{ marginLeft: '-0.01em' }}>f</span>
              </span>
              <span className="text-xl md:text-3xl font-bold self-start mt-2 md:mt-4 ml-1 text-white/95 drop-shadow">
                ®
              </span>
            </div>
            {/* "Air Mineral" in sleek cyan/light blue label matching the logo */}
            <span className="font-sans tracking-[0.25em] font-extrabold text-sm md:text-xl text-[#A0D2EB] uppercase leading-none drop-shadow-sm mb-4">
              Air Mineral
            </span>
            {/* "Elif for Life" signature brush cursive script logo segment */}
            <div 
              className="text-3xl md:text-5xl font-extrabold italic tracking-wide text-gradient font-display drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] mt-2"
              style={{
                background: 'linear-gradient(to right, #59C3E1, #B2F7EF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Elif for Life
            </div>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
            Menghadirkan kemurnian air mineral pegunungan pilihan untuk menjaga hidrasi dan daya tahan tubuh lestari Anda setiap hari.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#produk" className="bg-white text-brand-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-light-blue transition-all flex items-center justify-center gap-2 group shadow-xl">
              Lihat Produk <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#tentang" className="bg-transparent border-2 border-white/30 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center">
              Kenali Elif
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] text-brand-light-blue fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,147.3,126,211.53,118.31c50.58-6,98.69-24.16,146.56-42H321.39Z"></path>
        </svg>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="tentang" className="py-24 bg-brand-light-blue">
      <div className="max-w-7xl mx-auto px-6 lg:flex items-center gap-16">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
              alt="Mountain Water Source"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-2xl">
              <p className="text-brand-dark italic">"Elif bukan sekadar air mineral, Elif adalah komitmen kami untuk kesehatan dan masa depan."</p>
            </div>
          </motion.div>
        </div>
        <div className="lg:w-1/2">
          <span className="text-brand-blue font-bold tracking-widest text-sm uppercase mb-4 block">Tentang ELIF Life</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-brand-dark leading-tight">Membawa Kesegaran Pegunungan ke Genggaman Anda</h2>
          <p className="text-lg text-brand-dark/70 mb-6 leading-relaxed">
            ELIF FOR LIFE berawal dari keinginan sederhana untuk memberikan akses air bersih dan berkualitas bagi semua orang. Kami mengambil air langsung dari mata air pegunungan yang terlindungi.
          </p>
          <p className="text-lg text-brand-dark/70 mb-10 leading-relaxed">
            Melalui proses filtrasi modern yang menjaga kandungan mineral alami tetap utuh, ELIF menghadirkan air yang ringan dikonsumsi dengan pH seimbang yang baik untuk metabolisme tubuh.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-green w-6 h-6" />
              <span className="font-semibold">Murni 100%</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-green w-6 h-6" />
              <span className="font-semibold">Bebas BPA</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-green w-6 h-6" />
              <span className="font-semibold">Tersertifikasi SNI</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-brand-green w-6 h-6" />
              <span className="font-semibold">Izin BPOM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const productList = [
    {
      size: '220ml',
      type: 'Gelas / Cup',
      desc: 'Praktis untuk berbagai acara formal maupun santai.',
      image: 'https://images.unsplash.com/photo-1550586678-f7225f03c44b?auto=format&fit=crop&q=80&w=400',
      color: 'bg-brand-blue/10'
    },
    {
      size: '330ml',
      type: 'Botol Mini',
      desc: 'Ukuran pas untuk tas kerja atau bekal si kecil.',
      image: 'https://images.unsplash.com/photo-1616118132261-dd520faac584?auto=format&fit=crop&q=80&w=400',
      color: 'bg-brand-green/10',
      popular: true
    },
    {
      size: '600ml',
      type: 'Botol Personal',
      desc: 'Teman setia mobilitas tinggi sepanjang hari.',
      image: 'https://images.unsplash.com/photo-1523362628744-0c1fd9f930d4?auto=format&fit=crop&q=80&w=400',
      color: 'bg-brand-dark/10'
    },
  ];

  return (
    <section id="produk" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Varian Produk ELIF</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">Tersedia dalam berbagai ukuran yang dirancang untuk menemani setiap aktivitas harian Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {productList.map((product, idx) => (
            <motion.div
              key={product.size}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl p-8 border border-brand-dark/5 transition-all hover:shadow-2xl hover:-translate-y-2 group overflow-hidden ${product.color}`}
            >
              {product.popular && (
                <div className="absolute top-4 right-4 bg-brand-green text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                  Terpopuler
                </div>
              )}
              <div className="mb-6 rounded-2xl overflow-hidden aspect-square">
                <img src={product.image} alt={product.size} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-3xl font-bold mb-1">{product.size}</h3>
              <p className="text-brand-blue font-bold mb-4 uppercase tracking-wider text-xs">{product.type}</p>
              <p className="text-brand-dark/70 mb-8">{product.desc}</p>
              <a href="#kontak" className="inline-flex items-center gap-2 font-bold text-brand-dark hover:text-brand-blue transition-colors">
                Info Pemesanan <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const reasons = [
    {
      title: 'Kualitas Mineral',
      desc: 'Terjaga keseimbangan mineralnya untuk memenuhi kebutuhan elektrolit tubuh.',
      icon: <ShieldCheck className="w-8 h-8 text-brand-blue" />,
    },
    {
      title: 'Tanpa Tersentuh Tangan',
      desc: 'Proses pengemasan otomatis yang menjamin kehigienisan setiap tetesan air.',
      icon: <Droplets className="w-8 h-8 text-brand-blue" />,
    },
    {
      title: 'Ramah Lingkungan',
      desc: 'Botol plastik kami 100% dapat didaur ulang untuk mendukung bumi yang lebih hijau.',
      icon: <Leaf className="w-8 h-8 text-brand-blue" />,
    },
  ];

  return (
    <section id="keunggulan" className="py-24 bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 py-20 pr-20 opacity-10 blur-2xl">
        <div className="w-64 h-64 bg-brand-blue rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Kenapa Harus <span className="text-brand-blue">ELIF FOR LIFE?</span></h2>
            <p className="text-xl text-white/70 mb-12">Kami percaya bahwa air adalah sumber kehidupan. Kualitas air yang Anda minum menentukan kualitas hidup Anda.</p>
            
            <div className="space-y-8">
              {reasons.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.title} 
                  className="flex gap-6 items-start"
                >
                  <div className="bg-white p-4 rounded-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
             <div className="space-y-4 pt-12">
               <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl w-full h-[250px] object-cover" />
               <img src="https://images.unsplash.com/photo-1582213708182-3c2fb185831d?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl w-full h-[350px] object-cover" />
             </div>
             <div className="space-y-4">
               <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl w-full h-[350px] object-cover" />
               <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl w-full h-[250px] object-cover" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstagramGallery = () => {
    const feeds = [
        "https://images.unsplash.com/photo-1559839734-2b71f1e3c7e?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1596461404969-9ae70f183051?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1450192732951-5a4153094896?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1523362628744-0c1fd9f930d4?auto=format&fit=crop&q=80&w=400",
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                <div className="flex justify-center mb-6">
                    <Instagram className="w-12 h-12 text-pink-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Mari Berbagi Kesegaran</h2>
                <p className="text-brand-dark/50">Follow US @elif_forlife untuk tips kesehatan dan update terbaru.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {feeds.map((img, i) => (
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        key={i} 
                        className="relative group aspect-square overflow-hidden"
                    >
                        <img src={img} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Instagram className="text-white w-8 h-8" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

const Distributors = () => {
  const regions = [
    { name: 'Jawa Barat', cities: ['Bandung', 'Bekasi', 'Bogor', 'Depok'] },
    { name: 'DKI Jakarta', cities: ['Jakarta Selatan', 'Jakarta Timur', 'Jakarta Barat'] },
    { name: 'Banten', cities: ['Tangerang', 'Tangerang Selatan', 'Cilegon'] },
    { name: 'Jawa Tengah', cities: ['Semarang', 'Solo', 'Yogyakarta'] },
  ];

  return (
    <section id="distributor" className="py-24 bg-brand-light-blue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4">Temukan Distributor Kami</h2>
            <p className="text-brand-dark/60 text-lg">ELIF telah hadir di berbagai wilayah untuk mempermudah akses kesehatan Anda.</p>
          </div>
          <a href="#" className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-brand-dark transition-all">
            Daftar Jadi Distributor <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region) => (
            <div key={region.name} className="bg-white p-8 rounded-3xl border border-brand-dark/5 shadow-sm">
              <h4 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {region.name}
              </h4>
              <ul className="space-y-3">
                {region.cities.map(city => (
                  <li key={city} className="text-brand-dark/70 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green" /> {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="kontak" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-blue rounded-[50px] p-8 md:p-16 text-white grid lg:grid-cols-2 gap-16 shadow-2xl relative overflow-hidden">
          {/* Decals */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Siap Berkolaborasi?</h2>
            <p className="text-xl text-white/80 mb-12">Kontak kami untuk kerjasama distribusi, pemesanan partai besar, atau sekadar bertanya mengenai produk kami.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <span>+62 (021) 500-ELIF</span>
              </div>
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <span>hello@elif.life</span>
              </div>
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span>Kawasan Industri Sentul, Jawa Barat</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nama Depan</label>
                  <input type="text" className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Nama Belakang</label>
                  <input type="text" className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Pesan</label>
                <textarea rows={4} className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all"></textarea>
              </div>
              <button className="w-full bg-white text-brand-blue py-4 rounded-xl font-bold hover:bg-brand-light-blue transition-all">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-brand-dark/5 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <a href="#" className="flex items-center gap-2 focus:outline-none">
                <ElifLogo dark={false} variant="compact" />
            </a>
            
            <div className="flex gap-8 text-sm font-medium text-brand-dark/60">
                <a href="#" className="hover:text-brand-blue">Home</a>
                <a href="#" className="hover:text-brand-blue">Privacy Policy</a>
                <a href="#" className="hover:text-brand-blue">Terms of Service</a>
            </div>
            
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-brand-light-blue rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-brand-light-blue rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                </a>
            </div>
        </div>
        <div className="text-center text-brand-dark/40 text-sm">
            © {new Date().getFullYear()} PT. ELIF SUMBER KEHIDUPAN. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Benefits />
        <InstagramGallery />
        <Distributors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
