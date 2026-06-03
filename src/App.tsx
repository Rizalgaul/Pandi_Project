import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Droplets, MapPin, Instagram, Phone, Mail, ChevronRight, CheckCircle2, ShieldCheck, Leaf, ChevronDown, MessageSquare, Loader2, Play, Pause, Volume2, VolumeX, Cpu, Brain, Activity, Sparkles, RefreshCw } from 'lucide-react';

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
        <button 
          className="md:hidden p-3 -mr-3 flex items-center justify-center focus:outline-none transition-transform active:scale-95 text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-7 h-7 ${isScrolled ? 'text-brand-dark' : 'text-white'}`} />
          ) : (
            <Menu className={`w-7 h-7 ${isScrolled ? 'text-brand-dark' : 'text-white'}`} />
          )}
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
            <a 
              href="#kontak" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-blue text-white text-center py-3 rounded-xl font-bold"
            >
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
          src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=85&w=1920"
          alt="Majestic Mountain Waterfall Source"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-light-blue" />
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

const BrandVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Failed to play: ", err);
          setVideoError(true);
        });
      }
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-brand-light-blue via-white to-brand-light-blue relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-blue font-bold tracking-widest text-[#0077B6] text-xs sm:text-sm uppercase mb-3 block"
          >
            Mata Air Pegunungan Terlindungi
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight"
          >
            Saksikan Kemurnian Alami ELIF
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-dark/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            Dari lereng pegunungan vulkanik yang tinggi, terlindungi dari aktivitas luar untuk memberikan air mineral murni berkualitas tinggi langsung ke Anda.
          </motion.p>
        </div>

        {/* Video Card Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-brand-dark border-4 border-white aspect-video max-w-5xl mx-auto group flex items-center justify-center min-h-[220px] xs:min-h-[280px] sm:min-h-[380px]"
        >
          {/* Show fallback loop if video errors or fails to play */}
          {videoError ? (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#023E8A] via-[#0077B6] to-emerald-600 flex flex-col items-center justify-center p-8 text-center text-white">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              <Droplets className="w-16 h-16 text-cyan-200 animate-bounce mb-3" />
              <span className="font-bold text-lg md:text-xl">Aliran Alami Terbuka</span>
              <span className="text-xs text-white/70 max-w-xs mt-1">Saksikan ekosistem terlindungi menjaga kesegaran mata air alam kami murni setiap saat.</span>
              
              {/* Sound wave visual pattern */}
              <div className="flex gap-1.5 items-center justify-center mt-6 h-8">
                {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                  <span 
                    key={bar} 
                    className="w-1 bg-white/70 rounded-full animate-pulse" 
                    style={{ 
                      height: `${Math.sin(bar) * 16 + 20}px`,
                      animationDelay: `${bar * 0.15}s` 
                    }} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              src="https://assets.codepen.io/6093409/river.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
            />
          )}

          {/* Shadow Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Bottom Video Controls overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-center z-20">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/15 text-white select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
              <span className="text-[9px] sm:text-xs font-bold tracking-wider uppercase">
                Sinyal Live Mata Air
              </span>
            </div>

            {/* Media Playback toggles */}
            {!videoError && (
              <div className="flex gap-2">
                <button 
                  onClick={handlePlayPause}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-brand-dark hover:bg-white flex items-center justify-center shadow-lg transition-transform active:scale-90 outline-none"
                  aria-label={isPlaying ? "Jeda Video" : "Putar Video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-brand-dark text-brand-dark" /> : <Play className="w-4 h-4 fill-brand-dark text-brand-dark translate-x-0.5" />}
                </button>

                <button 
                  onClick={handleMuteUnmute}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/50 text-white border border-white/10 flex items-center justify-center shadow-lg transition-transform active:scale-90 outline-none"
                  aria-label={isMuted ? "Aktifkan Suara" : "Senyapkan Video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Small instructional footer */}
        <p className="text-xs text-brand-dark/50 italic mt-4 text-center">
          Video merupakan rekaman langsung (loop) aliran mata air pegunungan alami yang dilindungi dari ekosistem ELIF.
        </p>

        {/* Feature Grid representing steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 max-w-5xl mx-auto">
          {[
            {
              icon: <Droplets className="w-6 h-6 text-brand-blue" />,
              title: "Konservasi Mata Air",
              desc: "Mata air alami dilindungi dengan radius pengawasan ketat, menjaga ekosistem hutan dan batuan vulkanik asli."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
              title: "Filtrasi Alami & Higienis",
              desc: "Melalui proses higienis otomatis tanpa sentuhan tangan manusia, menjaga kesegaran tetap seperti di sumbernya."
            },
            {
              icon: <Leaf className="w-6 h-6 text-emerald-500" />,
              title: "Ramah Lingkungan",
              desc: "Komitmen kelestarian alam melalui penanaman pohon kembali serta botol PET yang 100% dapat didaur ulang."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm hover:bg-white p-6 rounded-2xl border border-brand-blue/5 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4"
            >
              <div className="p-3 bg-brand-light-blue rounded-xl h-fit">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-brand-dark text-base mb-1.5">{item.title}</h3>
                <p className="text-brand-dark/70 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background graphic details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-light-blue/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />
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
            className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl aspect-[4/3] xs:aspect-[16/10] sm:aspect-video lg:aspect-auto lg:h-[480px]"
          >
            <img
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"
              alt="Mountain Water Source"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 glass-card p-4 sm:p-6 rounded-2xl">
              <p className="text-brand-dark italic text-xs sm:text-sm md:text-base">"Elif bukan sekadar air mineral, Elif adalah komitmen kami untuk kesehatan dan masa depan."</p>
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
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=600',
      color: 'bg-brand-blue/10'
    },
    {
      size: '330ml',
      type: 'Botol Mini',
      desc: 'Ukuran pas untuk tas kerja atau bekal si kecil.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600',
      color: 'bg-brand-green/10',
      popular: true
    },
    {
      size: '600ml',
      type: 'Botol Personal',
      desc: 'Teman setia mobilitas tinggi sepanjang hari.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
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
              <div className="mb-6 rounded-2xl overflow-hidden aspect-[4/3] xs:aspect-[1.4/1] sm:aspect-square w-full">
                <img 
                  src={product.image} 
                  alt={product.size} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
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
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4">
             <div className="space-y-3 sm:space-y-4 pt-6 md:pt-12">
               <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" referrerPolicy="no-referrer" alt="Quality Check" className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-[160px] xs:h-[200px] sm:h-[250px] object-cover" />
               <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400" referrerPolicy="no-referrer" alt="Healthy Lifestyle" className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-[220px] xs:h-[280px] sm:h-[350px] object-cover" />
             </div>
              <div className="space-y-3 sm:space-y-4">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400" referrerPolicy="no-referrer" alt="Pure Mountain Spring" className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-[220px] xs:h-[280px] sm:h-[350px] object-cover" />
                <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400" referrerPolicy="no-referrer" alt="Eco Friendly Nature" className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-[160px] xs:h-[200px] sm:h-[250px] object-cover" />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HydrationCalculator = () => {
  const [weight, setWeight] = useState(60);
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [dailyIntake, setDailyIntake] = useState(2100);

  useEffect(() => {
    // Formula: Weight in kg * 35 ml
    let base = weight * 35;
    // Activity Factor
    if (activity === 'moderate') base += 350;
    if (activity === 'active') base += 700;
    setDailyIntake(Math.round(base));
  }, [weight, activity]);

  const recommended330ml = Math.ceil(dailyIntake / 330);
  const recommended600ml = Math.ceil(dailyIntake / 600);
  const recommended220ml = Math.ceil(dailyIntake / 220);

  return (
    <section className="py-24 bg-gradient-to-b from-brand-light-blue to-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-widest text-sm uppercase mb-4 block">Kalkulator Hidrasi Harian</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Berapa Kebutuhanku?</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">Tiap tubuh unik dan membutuhkan asupan hidrasi berbeda. Hitung rekomendasi konsumsi harian Anda &amp; produk ELIF yang paling sesuai.</p>
        </div>

        <div className="bg-white rounded-[28px] sm:rounded-[40px] shadow-xl border border-brand-blue/10 overflow-hidden grid lg:grid-cols-12 gap-0">
          {/* Inputs */}
          <div className="lg:col-span-7 p-5 xs:p-7 sm:p-10 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-8">Sesuaikan Parameter Tubuh Anda</h3>
              
              {/* Weight Slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-brand-dark/80">Berat Badan</span>
                  <span className="text-2xl font-bold text-brand-blue">{weight} <span className="text-sm font-normal text-brand-dark/60">kg</span></span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="120" 
                  value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-brand-light-blue rounded-lg appearance-none cursor-pointer accent-brand-blue" 
                />
                <div className="flex justify-between text-xs text-brand-dark/45 mt-2">
                  <span>30 kg</span>
                  <span>75 kg</span>
                  <span>120 kg</span>
                </div>
              </div>

              {/* Activity Level Buttons */}
              <div className="mb-10">
                <span className="block font-semibold text-brand-dark/80 mb-4">Tingkat Aktivitas</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'sedentary', label: 'Ringan', desc: 'Bekerja santai / duduk' },
                    { id: 'moderate', label: 'Sedang', desc: 'Berjalan / aktif harian' },
                    { id: 'active', label: 'Tinggi', desc: 'Olahraga teratur / aktif' }
                  ].map((act) => (
                    <button
                      key={act.id}
                      onClick={() => setActivity(act.id as any)}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border-2 transition-all duration-200 ${activity === act.id ? 'border-brand-blue bg-brand-light-blue/60 shadow-sm' : 'border-brand-dark/5 hover:border-brand-dark/10'} active:scale-[0.98] outline-none`}
                    >
                      <span className="block font-bold text-brand-dark text-sm sm:text-base">{act.label}</span>
                      <span className="block text-xs text-brand-dark/65 mt-1">{act.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-light-blue/50 border border-brand-blue/10">
              <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Droplets className="w-5 h-5 animate-bounce" />
              </div>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Asupan ini merupakan estimasi teruji medis untuk menjaga fungsionalitas metabolik &amp; mencegah dehidrasi ringan.
              </p>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0077B6] to-[#023E8A] p-5 xs:p-7 sm:p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Ambient glows inside cards */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 text-center lg:text-left">
              <span className="text-white/70 font-semibold tracking-wider text-xs uppercase mb-2 block">Rekomendasi Asupan Harian Anda</span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-8">
                <span className="text-5xl md:text-7xl font-sans font-black tracking-tight text-white">{dailyIntake}</span>
                <span className="text-2xl font-bold text-[#A0D2EB]">ml / hari</span>
              </div>

              <div className="space-y-6">
                <span className="block text-sm font-semibold tracking-wide text-white/80 uppercase">Pilihan Kombinasi ELIF</span>
                
                {/* Product 600ml Rec */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-lg text-brand-green shrink-0">
                    600ml
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-white/70">Kemasan Botol Besar</span>
                    <span className="font-bold text-lg">{recommended600ml} Botol <span className="font-normal text-sm text-white/85">per hari</span></span>
                  </div>
                </div>

                {/* Product 330ml Rec */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-lg text-brand-green shrink-0">
                    330ml
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-white/70">Kemasan Botol Mini</span>
                    <span className="font-bold text-lg">{recommended330ml} Botol <span className="font-normal text-sm text-white/85">per hari</span></span>
                  </div>
                </div>

                {/* Product 220ml Rec */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-lg text-brand-green shrink-0">
                    220ml
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-white/70">Kemasan Cup Gelas</span>
                    <span className="font-bold text-lg">{recommended220ml} Gelas <span className="font-normal text-sm text-white/85">per hari</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 relative z-10 pt-6 border-t border-white/10 text-center lg:text-left">
              <a href="#kontak" className="block sm:inline-block w-full sm:w-auto bg-brand-green hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-full text-base transition-all duration-300 shadow-lg hover:translate-y-[-2px] active:scale-[0.98] text-center">
                Pesan Paket Hidrasi Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstagramGallery = () => {
    const feeds = [
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400",
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
                        <img 
                          src={img} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" 
                        />
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

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Dari mana sumber mata air ELIF berasal?",
      a: "Air mineral ELIF disaring alami dari mata air pegunungan terpilih di kedalaman vulkanis terlindungi yang kaya akan mineral penting seperti kalsium, magnesium, dan silika."
    },
    {
      q: "Apakah botol ELIF bebas dari BPA (BPA Free)?",
      a: "Tentu saja! Semua lini kemasan ELIF (220ml, 330ml, dan 600ml) diproduksi menggunakan material PET food-grade premium ramah lingkungan yang 100% bebas dari kandungan senyawa kimia berbahaya (BPA Free)."
    },
    {
      q: "Apakah ELIF sudah bersertifikat halal, SNI, dan terdaftar BPOM?",
      a: "Ya, seluruh produk kami telah lolos uji kualitas super ketat dan mengantongi sertifikat SNI resmi, izin edar Badan Pengawas Obat dan Makanan (BPOM RI), serta sertifikasi Halal dari Kemenag/MUI."
    },
    {
      q: "Bagaimana cara menjadi distributor atau agen resmi ELIF?",
      a: "Sangat mudah! Anda dapat mengisi langsung formulir kemitraan pada bagian 'Kontak' di bawah ini atau klik tombol 'Daftar Jadi Distributor'. Tim perwakilan kami di regional Anda akan segera menghubungi Anda dengan paket komisi & skema menarik."
    },
    {
      q: "Berapa minimal pemesanan untuk delivery antar ke alamat rumah/kantor?",
      a: "Untuk pemesanan ritel/langsung dengan layanan gratis ongkir, minimal pembelian adalah 5 karton (bisa dicampur ukuran / kombinasi sesuai kebutuhan asupan mingguan Anda)."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-widest text-sm uppercase mb-4 block">Tanya Jawab</span>
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Pertanyaan Umum (FAQ)</h2>
          <p className="text-brand-dark/60">Info lengkap seputar kualitas, jaminan kebersihan, dan layanan pembelian ELIF.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-brand-blue bg-brand-light-blue/40 shadow-sm' : 'border-brand-dark/5 hover:border-brand-dark/10'}`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-lg text-brand-dark focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-brand-dark/70 leading-relaxed text-[15px]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WhatsAppFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const phone = "6281234567890"; // Ganti dengan nomor WhatsApp customer care Elif yang sesungguhnya
    const encodedText = encodeURIComponent(`Halo Tim Elif, saya tertarik dengan produk Elif For Life. \n\n${message}`);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl border border-brand-blue/10 p-6 mb-4 w-[320px] overflow-hidden"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-brand-dark/5">
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-dark text-sm">Customer Care ELIF</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-emerald-600 font-medium font-sans">Online • Siap Membantu</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto text-brand-dark/40 hover:text-brand-dark/80 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={sendWhatsApp} className="mt-4">
              <p className="text-xs text-brand-dark/60 mb-3 leading-relaxed">
                Ada pertanyaan cepat atau ingin langsung pesan? Tulis pesan Anda di bawah ini dan admin kami akan merespon segera.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan Anda..."
                rows={3}
                required
                className="w-full bg-brand-light-blue/60 border border-brand-blue/10 rounded-xl px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-blue transition-all"
              />
              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-emerald-500 text-white py-3 rounded-xl font-bold mt-3 text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-green/10"
              >
                <span>Mulai Chat WhatsApp</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-green text-white hover:bg-teal-500 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 relative focus:outline-none"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
          1
        </span>
      </button>
    </div>
  );
};

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate short loader for premium experience
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const phone = "6281234567890";
      const fullName = `${firstName} ${lastName}`.trim();
      const encodedText = encodeURIComponent(
        `Halo Tim Elif, saya mengirim form dari Landing Page.\n\n` +
        `• *Nama:* ${fullName}\n` +
        `• *Email:* ${email}\n` +
        `• *Pesan:* ${message}`
      );
      
      window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
      
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      
      // Hide success after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section id="kontak" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-blue rounded-[32px] sm:rounded-[50px] p-6 sm:p-10 md:p-16 text-white grid lg:grid-cols-2 gap-16 shadow-2xl relative overflow-hidden">
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
                <span>hello@elif.co.id</span>
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
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col justify-center items-center text-center p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Formulir Terkirim!</h3>
                <p className="text-white/80 leading-relaxed text-sm max-w-sm">
                  Mengalihkan Anda ke WhatsApp Customer Care resmi kami untuk konfirmasi & respons kilat...
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nama Depan</label>
                    <input 
                      type="text" 
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all text-white placeholder-white/50" 
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nama Belakang</label>
                    <input 
                      type="text" 
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all text-white placeholder-white/50" 
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all text-white placeholder-white/50" 
                    placeholder="email@contoh.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Pesan</label>
                  <textarea 
                    rows={4} 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-all text-white placeholder-white/50"
                    placeholder="Tulis pesan atau jumlah kebutuhan pesanan Anda..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-brand-blue py-4 rounded-xl font-bold hover:bg-brand-light-blue transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <span>Kirim Pesan &amp; Mulai WhatsApp</span>
                  )}
                </button>
              </form>
            )}
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
        <BrandVideo />
        <About />
        <Products />
        <Benefits />
        <HydrationCalculator />
        <InstagramGallery />
        <Distributors />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatingWidget />
    </div>
  );
}
