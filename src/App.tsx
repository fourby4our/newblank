import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Music, 
  Globe, 
  DollarSign, 
  CheckCircle, 
  Calendar, 
  Shield, 
  Zap, 
  Mic2, 
  Instagram, 
  Mail,
  ChevronDown,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect, useRef, MouseEvent } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 bg-black/60 backdrop-blur-md border border-white/5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)] transform-gpu">
      <div className="px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 relative z-10">
          <div className="text-xl font-black italic tracking-[0.05em] text-white/90">fourby4our.</div>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <a href="#services" className="nav-link !text-[10px]">Services</a>
          <a href="#pricing" className="nav-link !text-[10px]">Pricing</a>
          <a href="#faq" className="nav-link !text-[10px]">FAQ</a>
        </div>
        
        <div className="hidden md:flex relative z-10">
          <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.1em] px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-400 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl transform-gpu"
          >
            <a href="#services" className="nav-link" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#pricing" className="nav-link" onClick={() => setIsOpen(false)}>Pricing</a>
            <a href="#faq" className="nav-link" onClick={() => setIsOpen(false)}>FAQ</a>
            <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className="bg-white text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest text-center block">Get Started</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ index, title, description }: { index: string, title: string, description: string }) => (
  <motion.div 
    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
    className="border-r border-soft p-10 flex flex-col justify-between transition-colors group min-h-[300px]"
  >
    <span className="text-xs font-mono text-zinc-600 group-hover:text-white transition-colors">{index}</span>
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold tracking-tight uppercase leading-none">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{description}</p>
      <div className="flex justify-end mt-4">
        <ArrowRight className="text-zinc-600 transition-transform group-hover:translate-x-1" size={20} />
      </div>
    </div>
  </motion.div>
);

const ServiceItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center gap-4 border border-soft p-5 hover:bg-white/5 transition-colors">
    <Icon className="text-white shrink-0" size={18} />
    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">{label}</span>
  </div>
);

const PlanCard = ({ title, price, features, featured = false }: { title: string, price: string, features: string[], featured?: boolean }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl ${featured ? 'animated-border glow-brand' : 'border border-soft'} bg-dark flex flex-col p-px transform-gpu`}
    >
      <div className={`p-10 h-full flex flex-col bg-dark/90 backdrop-blur-md rounded-2xl ${featured ? '' : ''}`}>
        <div className="flex justify-between items-start mb-6">
          <h4 className="micro-caps">{title}</h4>
          {featured && <span className="text-[10px] font-bold px-3 py-1 bg-brand/10 text-brand rounded-full uppercase tracking-tighter border border-brand/20">Recommended</span>}
        </div>
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl font-black font-mono tracking-tighter">{price}</span>
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest leading-none">/ Release</span>
        </div>
        <ul className="space-y-4 mb-10 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-zinc-400 font-medium font-mono">
              <div className={`w-1.5 h-1.5 ${featured ? 'bg-brand' : 'bg-white/30'} rounded-sm`} />
              {f}
            </li>
          ))}
        </ul>
        <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all text-center block rounded-xl ${featured ? 'bg-brand text-black hover:bg-orange-500 shadow-lg shadow-brand/20' : 'bg-transparent border border-white/20 text-white hover:bg-white/5'}`}>
          Choose Plan
        </a>
      </div>
    </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-soft">
      <button 
        className="w-full py-8 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg md:text-xl uppercase tracking-tighter group-hover:text-zinc-400 transition-colors pr-6">{question}</span>
        <ChevronDown className={`transition-transform duration-300 text-zinc-600 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-8 text-zinc-400 text-sm leading-relaxed max-w-2xl">{answer}</p>
      </motion.div>
    </div>
  );
};

const RoyaltyCalculator = () => {
  const [streams, setStreams] = useState(100000);
  const platforms = [
    { name: 'Spotify', rate: 70 / 1000, icon: Music },
    { name: 'Apple Music', rate: 200 / 1000, icon: Music },
    { name: 'YouTube Music', rate: 30 / 1000, icon: Music },
  ];

  const avgEarnings = platforms.reduce((acc, p) => acc + (streams * p.rate), 0) / platforms.length;

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 blur-[120px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(40px,9vw,80px)] font-black uppercase tracking-tighter leading-[0.9] mb-8 italic">CALCULATE<br /><span className="text-outline not-italic">YOUR IMPACT</span></h2>
            <p className="text-zinc-400 text-lg max-w-md mb-12">Estimate your global reach and earnings across major streaming platforms. Direct, transparent, and accurate.</p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="micro-caps">Monthly Streams</span>
                  <span className="font-mono text-xl">{streams.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="10000000" 
                  step="10000"
                  value={streams} 
                  onChange={(e) => setStreams(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {platforms.map((p) => (
                  <div key={p.name} className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <p.icon className="text-brand" size={16} />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{p.name}</span>
                    </div>
                    <p className="text-2xl font-mono tracking-tighter">₹{(streams * p.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-full flex flex-col justify-center"
          >
            <div className="glass-panel p-8 md:p-16 rounded-[40px] border-white/20 glow-white animate-float relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Music className="text-white/10" size={120} />
              </div>
              <h4 className="micro-caps mb-8">Average Platform Earnings</h4>
              <div className="flex flex-col gap-2">
                <motion.span 
                  key={avgEarnings}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[clamp(48px,11vw,120px)] font-black leading-none tracking-tighter italic block w-full truncate"
                >
                  ₹{avgEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </motion.span>
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-zinc-600" />
                  <p className="text-zinc-500 uppercase text-[11px] tracking-[0.4em]">100% Retained</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax for Title
  const titleX1 = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const titleY1 = useTransform(smoothMouseY, [-500, 500], [-15, 15]);

  const titleX2 = useTransform(smoothMouseX, [-500, 500], [30, -30]);
  const titleY2 = useTransform(smoothMouseY, [-500, 500], [15, -15]);

  // Parallax for Background Blobs
  const blobX = useTransform(smoothMouseX, [-500, 500], [50, -50]);
  const blobY = useTransform(smoothMouseY, [-500, 500], [50, -50]);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen selection:bg-white selection:text-black bg-dark cursor-default overflow-x-hidden"
    >
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 select-none transform-gpu" />
        <div className="absolute inset-0 scanline opacity-[0.10] transform-gpu" />
        <motion.div 
          style={{ x: blobX, y: blobY }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#1a1a1a] rounded-full blur-[100px] opacity-30 transform-gpu"
        ></motion.div>
        <motion.div 
          style={{ x: useTransform(blobX, v => v * -1.5), y: useTransform(blobY, v => v * -1.5) }}
          className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-brand/5 rounded-full blur-[120px] opacity-30 transform-gpu"
        ></motion.div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-12 gap-16"
          >
            <div className="lg:col-span-9 relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/[0.05] bg-white/[0.02] backdrop-blur-md mb-10 shadow-xl"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="micro-caps tracking-[0.25em] text-zinc-400">The New Standard</span>
              </motion.div>
              <div className="mb-14 select-none relative -ml-1 md:-ml-2">
                <motion.div
                  style={{ x: titleX1, y: titleY1 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-display block text-gradient drop-shadow-2xl"
                >
                  DISTRIBUTE
                </motion.div>
                <motion.div
                  style={{ x: titleX2, y: titleY2 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-display block text-brand-gradient flex items-center gap-4 md:gap-8"
                >
                  BEYOND <div className="h-2 w-24 md:h-3 md:w-48 bg-brand/30 rounded-full" />
                </motion.div>
                <motion.div
                  style={{ x: titleX1, y: titleY1 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-display block text-outline opacity-60 ml-[5%]"
                >
                  LIMITS
                </motion.div>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-20">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="hidden md:block h-[1px] w-24 bg-white/20 origin-left"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="text-xl md:text-2xl font-light text-zinc-400 max-w-lg leading-relaxed"
                >
                  Keep <span className="text-white font-medium">100% of your earnings</span>. Reach 150+ digital platforms. Real-time royalty tracking for the modern era.
                </motion.p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 md:gap-6 relative z-20"
              >
                <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 md:px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.25em] rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] glow-white shadow-2xl">
                  Release Your Music <ArrowRight size={16} className="text-brand" />
                </a>
                <button className="border border-white/10 bg-white/[0.03] backdrop-blur-md text-white px-8 md:px-10 py-5 text-[10px] font-extrabold uppercase tracking-[0.25em] rounded-full hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98] w-full sm:w-auto shadow-2xl">
                  Our Pricing
                </button>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end gap-8 md:gap-12 pb-4 mt-12 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, x: 20, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: 0.9, type: "spring", damping: 15 }}
                className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl backdrop-blur-xl shadow-2xl"
              >
                <h4 className="micro-caps">Global Scale</h4>
                <p className="text-5xl font-mono mt-4 font-black">150<span className="text-brand">+</span></p>
                <p className="text-[9px] text-zinc-500 uppercase mt-2 tracking-[0.2em]">Platforms Reached</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: 1.0, type: "spring", damping: 15 }}
                className="bg-brand/10 border border-brand/20 p-6 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand blur-3xl opacity-30" />
                <h4 className="micro-caps text-brand">Royalties</h4>
                <p className="text-5xl font-mono mt-4 font-black text-white">100<span className="text-brand">%</span></p>
                <p className="text-[9px] text-zinc-500 uppercase mt-2 tracking-[0.2em]">Always Yours</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 md:py-40 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1: Large Span */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-8 p-12 lg:p-16 flex flex-col justify-between premium-card min-h-[450px] group transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full group-hover:bg-brand/10 transition-all duration-1000 -z-10" />
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-full bg-white/[0.03] border border-white/5 text-zinc-400 group-hover:text-brand transition-colors duration-500">
                   <Globe size={20} />
                </div>
                <span className="micro-caps text-zinc-500">01 // Streaming</span>
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Global <span className="text-outline">Scale</span></h3>
                <p className="text-zinc-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">Direct path to Spotify, Apple Music, and Amazon without middlemen. Experience zero-latency distribution that reaches ears worldwide.</p>
              </div>
            </motion.div>

            {/* Feature 2: High block */}
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-4 p-10 flex flex-col justify-between premium-card group transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8 text-zinc-500 group-hover:text-white transition-colors duration-500">
                <Zap size={24} />
                <span className="micro-caps">02 // Analytics</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Real-Time<br/>Data</h3>
                <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500 text-sm">Detailed analytics and real-time royalty statements streamed directly to your pocket. Nothing hidden.</p>
              </div>
            </motion.div>

            {/* Feature 3: Bottom Left */}
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-5 p-10 flex flex-col justify-between premium-card min-h-[350px] group transition-all duration-500"
            >
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 blur-[60px] rounded-full group-hover:bg-white/10 transition-all duration-700 -z-10" />
               <div className="flex items-center gap-4 mb-8 text-zinc-500 group-hover:text-white transition-colors duration-500">
                <Shield size={24} />
                <span className="micro-caps">03 // Legal</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-400 group-hover:text-white transition-colors duration-500">Total Ownership</h3>
                <p className="text-zinc-500 text-base font-light">Maintain full control of your masters and publishing rights indefinitely. Your art remains yours.</p>
              </div>
            </motion.div>

            {/* Feature 4: Bottom Right */}
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-7 p-12 flex flex-col justify-between premium-card min-h-[350px] group transition-all duration-500"
            >
               <div className="flex items-center gap-4 mb-8 text-zinc-500 group-hover:text-white transition-colors duration-500">
                <Instagram size={24} />
                <span className="micro-caps">04 // Marketing</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-brand-gradient">Collaborative Growth</h3>
                <p className="text-zinc-500 text-lg font-light max-w-sm">Built-in tools for pre-save links, social mapping, and collaborative multi-platform promotion campaigns.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RoyaltyCalculator />

      {/* Why Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start mb-20 md:mb-32">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <p className="micro-caps mb-8 text-brand font-bold tracking-[0.3em]">Excellence</p>
              <h2 className="text-[clamp(44px,8vw,72px)] font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12">
                CRAFTED FOR THE<br />
                <span className="text-outline italic">INDEPENDENT</span>
              </h2>
              <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-md">
                We believe distribution should be invisible. Powerful enough to handle global scale, yet simple enough for a bedroom producer.
              </p>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="premium-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-brand/10 border border-brand/20 rounded-xl text-brand"><Mic2 size={24} /></div>
                <span className="font-mono text-sm font-bold uppercase tracking-tight text-white/80">CallerTune</span>
              </div>
              <div className="premium-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400"><CheckCircle size={24} /></div>
                <span className="font-mono text-sm font-bold uppercase tracking-tight text-white/80">Artist Channel</span>
              </div>
              <div className="premium-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400"><Instagram size={24} /></div>
                <span className="font-mono text-sm font-bold uppercase tracking-tight text-white/80">Profile Linking</span>
              </div>
              <div className="premium-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400"><Mail size={24} /></div>
                <span className="font-mono text-sm font-bold uppercase tracking-tight text-white/80">Priority Support</span>
              </div>
              <div className="premium-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400"><Globe size={24} /></div>
                <span className="font-mono text-sm font-bold uppercase tracking-tight text-white/80">Smart Links</span>
              </div>
              <div className="premium-card p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-zinc-400"><Shield size={24} /></div>
                <span className="font-mono text-sm font-bold uppercase tracking-tight text-white/80">Content ID</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-40 px-6 md:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div>
              <h2 className="text-[clamp(40px,9vw,80px)] font-black uppercase tracking-tighter leading-[0.9] mb-6 italic">INVEST IN<br />YOUR SOUND</h2>
              <p className="text-zinc-500 uppercase text-[11px] tracking-[0.3em]">Flexible plans for every trajectory.</p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-4xl font-mono text-zinc-700">03</p>
              <p className="micro-caps">Pricing Tiers</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            <PlanCard 
              title="Single" 
              price="₹249" 
              features={['1 Audio Song', 'Unlimited Stores', 'CallerTune Support', 'Lyrics Distribution']} 
            />
            <PlanCard 
              title="EP / Project" 
              price="₹499" 
              features={['2-6 Songs', 'Custom Release Date', 'Content ID (Optional)', 'Standard Support']} 
              featured
            />
            <PlanCard 
              title="6-Month" 
              price="₹999" 
              features={['Unlimited Singles', 'Unlimited EPs', 'Priority Approval', 'Mail Support']} 
            />
            <PlanCard 
              title="1-Year" 
              price="₹1,499" 
              features={['Unlimited Everything', 'OAC Verification', 'IG Collab Posts', 'Dedicated Manager']} 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-40 px-6 md:px-12 bg-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-[clamp(36px,8vw,64px)] font-black italic uppercase tracking-tighter mb-4 leading-none">THE PROTOCOL</h2>
            <p className="micro-caps">Commonly Asked Questions</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-soft"
          >
            <FAQItem 
              question="How long does it take for my music to go live?" 
              answer="Standard approval takes 2-3 business days. Most platforms like Spotify and Apple Music go live within 5-7 days of approval. We recommend submitting 3 weeks in advance for official playlists." 
            />
            <FAQItem 
              question="Which platforms will my music be distributed to?" 
              answer="We distribute to 150+ platforms including Spotify, Apple Music, JioSaavn, Gaana, Wynk, Instagram, TikTok, Amazon Music, and more." 
            />
            <FAQItem 
              question="How do I get paid for my streams?" 
              answer="Earnings are credited directly to your fourby4our dashboard. You can withdraw your 100% royalties via Bank Transfer or UPI once you hit the minimum threshold." 
            />
            <FAQItem 
              question="Can I change my release date after submission?" 
              answer="Yes, as long as the content hasn't been delivered to stores yet. Contact our support team immediately for modifications." 
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 md:py-32 px-6 md:px-12 border-t border-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 mb-20 md:mb-32">
            <div className="md:col-span-6">
              <div className="text-4xl font-black italic tracking-tighter mb-8">fourby4our</div>
              <p className="text-zinc-500 max-w-sm text-sm leading-relaxed mb-10">
                Architecting the future of independent distribution. Built with precision for the modern creator economy.
              </p>
              <div className="flex flex-wrap gap-6 md:gap-8">
                <a href="https://instagram.com/fourby4our" target="_blank" rel="noopener noreferrer" className="nav-link">Instagram</a>
                <a href="#" className="nav-link">WhatsApp</a>
                <a href="mailto:contact@fourby4our.in" className="nav-link">Contact</a>
              </div>
            </div>
            <div className="md:col-span-6 grid grid-cols-2 gap-12">
              <div>
                <h5 className="micro-caps mb-8 text-white">Registry</h5>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <li><a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                </ul>
              </div>
              <div>
                <h5 className="micro-caps mb-8 text-white">Legal</h5>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Royalties</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center pt-12 border-t border-soft text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
            <p>© 2026 fourby4our. all rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
