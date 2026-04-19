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
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-soft">
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black italic tracking-tighter">fourby4our</div>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#services" className="nav-link text-white font-bold">Services</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className="bg-white text-black text-[11px] font-bold uppercase tracking-widest px-8 py-2.5 rounded-full hover:bg-zinc-200 transition-all inline-block">
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
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
            className="md:hidden bg-dark border-b border-soft px-12 py-8 flex flex-col gap-6"
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
    className={`p-10 border ${featured ? 'border-white bg-white/5' : 'border-soft'} flex flex-col`}
  >
    <div className="flex justify-between items-start mb-6">
      <h4 className="micro-caps">{title}</h4>
      {featured && <span className="text-[9px] font-bold px-2 py-0.5 border border-white uppercase tracking-tighter">Recommended</span>}
    </div>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-mono">{price}</span>
      <span className="text-zinc-500 text-[10px] uppercase tracking-widest leading-none">/ Release</span>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-zinc-400">
          <div className="w-1 h-1 bg-white/30 rounded-full" />
          {f}
        </li>
      ))}
    </ul>
    <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all text-center block ${featured ? 'bg-white text-black hover:bg-zinc-200' : 'bg-transparent border border-white text-white hover:bg-white/5'}`}>
      Choose Plan
    </a>
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
        <span className="font-bold text-xl uppercase tracking-tighter group-hover:text-zinc-400 transition-colors">{question}</span>
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
    <section className="py-40 px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 blur-[120px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-8 italic">CALCULATE<br /><span className="text-zinc-600 not-italic">YOUR IMPACT</span></h2>
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

              <div className="grid grid-cols-3 gap-4">
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
            <div className="glass-panel p-16 rounded-[40px] border-white/20 glow-white animate-float relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Music className="text-white/10" size={120} />
              </div>
              <h4 className="micro-caps mb-8">Average Platform Earnings</h4>
              <div className="flex flex-col gap-2">
                <motion.span 
                  key={avgEarnings}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[120px] font-black leading-none tracking-tighter italic"
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
      className="min-h-screen selection:bg-white selection:text-black bg-dark cursor-default"
    >
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          style={{ x: blobX, y: blobY }}
          className="absolute -top-40 -left-10 w-[800px] h-[800px] bg-zinc-800 rounded-full blur-[140px] opacity-20"
        ></motion.div>
        <motion.div 
          style={{ x: useTransform(blobX, v => v * -1.2), y: useTransform(blobY, v => v * -1.2) }}
          className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-zinc-900 rounded-full blur-[160px] opacity-10"
        ></motion.div>
        <motion.div 
          style={{ x: useTransform(blobX, v => v * 0.8), y: useTransform(blobY, v => v * 0.8) }}
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] opacity-10"
        ></motion.div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-12 gap-16"
          >
            <div className="lg:col-span-9">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="micro-caps mb-6"
              >
                The New Standard for Independent Artists
              </motion.p>
              <h1 className="text-display mb-12 select-none">
                <motion.span
                  style={{ x: titleX1, y: titleY1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block"
                >
                  DISTRIBUTE
                </motion.span>
                <br />
                <motion.span
                  style={{ x: titleX2, y: titleY2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-italic-zinc inline-block"
                >
                  BEYOND
                </motion.span>{" "}
                <motion.span
                  style={{ x: titleX1, y: titleY1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block"
                >
                  LIMITS
                </motion.span>
              </h1>
              <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="hidden md:block h-[1px] w-24 bg-white/20 origin-left"
                ></motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl font-light text-zinc-400 max-w-lg leading-relaxed"
                >
                  Keep <span className="text-white font-medium">100% of your earnings</span>. Reach 150+ digital platforms. Real-time royalty tracking for the modern era.
                </motion.p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex flex-wrap gap-6"
              >
                <a href="https://app.fourby4our.in" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-zinc-200 transition-all flex items-center gap-4 hover:scale-105 active:scale-95 glow-white">
                  Release Your Music <ArrowRight size={16} />
                </a>
                <button className="border border-white text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all active:scale-95">
                  Our Pricing
                </button>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end gap-12 pb-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="border-l-2 border-white/10 pl-8"
              >
                <h4 className="micro-caps">Global Reach</h4>
                <p className="text-4xl font-mono mt-3">150+</p>
                <p className="text-[10px] text-zinc-500 uppercase mt-2 tracking-widest">Digital Platforms</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="border-l-2 border-white/10 pl-8"
              >
                <h4 className="micro-caps">Royalties Paid</h4>
                <p className="text-4xl font-mono mt-3">100%</p>
                <p className="text-[10px] text-zinc-500 uppercase mt-2 tracking-widest">To Every Artist</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="border-y border-soft grid md:grid-cols-4 bg-white/[0.02]">
        <FeatureCard 
          index="01" 
          title="Streaming" 
          description="Direct path to Spotify, Apple Music, and Amazon without middlemen."
        />
        <FeatureCard 
          index="02" 
          title="Financials" 
          description="Detailed analytics and real-time royalty statements at your fingertips."
        />
        <FeatureCard 
          index="03" 
          title="Ownership" 
          description="Maintain full control of your masters and publishing rights indefinitely."
        />
        <FeatureCard 
          index="04" 
          title="Marketing" 
          description="Built-in tools for pre-save links and social collaborative promotion."
        />
      </section>

      <RoyaltyCalculator />

      {/* Why Section */}
      <section className="py-40 px-12 relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-soft" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <p className="micro-caps mb-6 text-brand font-bold tracking-[0.3em]">Excellence</p>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-10 italic">
                CRAFTED FOR THE<br />
                <span className="text-zinc-600 not-italic">INDEPENDENT</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                We believe distribution should be invisible. Powerful enough to handle global scale, yet simple enough for a bedroom producer.
              </p>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="grid grid-cols-2 lg:grid-cols-2 gap-px bg-soft border border-soft"
            >
              <ServiceItem icon={Mic2} label="CallerTune" />
              <ServiceItem icon={CheckCircle} label="Artist Channel" />
              <ServiceItem icon={Instagram} label="Profile Linking" />
              <ServiceItem icon={Mail} label="Priority Support" />
              <ServiceItem icon={Globe} label="Smart Links" />
              <ServiceItem icon={Shield} label="Content ID" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div>
              <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-6 italic">INVEST IN<br />YOUR SOUND</h2>
              <p className="text-zinc-500 uppercase text-[11px] tracking-[0.3em]">Flexible plans for every trajectory.</p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-4xl font-mono text-zinc-700">03</p>
              <p className="micro-caps">Pricing Tiers</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-soft border border-soft">
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
      <section id="faq" className="py-40 px-12 bg-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">THE PROTOCOL</h2>
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
      <footer className="py-32 px-12 border-t border-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-20 mb-32">
            <div className="md:col-span-6">
              <div className="text-4xl font-black italic tracking-tighter mb-8">fourby4our</div>
              <p className="text-zinc-500 max-w-sm text-sm leading-relaxed mb-10">
                Architecting the future of independent distribution. Built with precision for the modern creator economy.
              </p>
              <div className="flex gap-8">
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
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-soft text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
            <p>© 2026 fourby4our. all rights reserved.</p>
            <p>HQ • Bangalore, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
