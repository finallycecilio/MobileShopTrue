import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Search, ShoppingCart, Heart, X, Plus, Minus, Trash2,
  Smartphone, Wifi, Battery, Headphones, Star, Eye, MessageCircle, Zap, Send,
  Package, ArrowRight, Sparkles, MapPin, Phone, Shield, Truck, Clock,
  Award, Users, Quote, CheckCircle, Store
} from "lucide-react";

const WA = "584148684463";
const SLOGAN = "Tu Conexión Digital";

const PRODUCTS = [
  { id:1, name:"iPhone 15 Pro Max", brand:"Apple", category:"Smartphones", price:1199, color:"#5E5CE6", description:"Chip A17 Pro, pantalla Super Retina XDR de 6.7\", cámara de 48MP con zoom óptico 5x y cuerpo de titanio. 256GB.", stock:8, specs:"256GB · Titanio · 6.7\"", badge:"Premium" },
  { id:2, name:"iPhone 13", brand:"Apple", category:"Smartphones", price:599, color:"#30D158", description:"Chip A15 Bionic, cámara dual 12MP, pantalla Super Retina XDR 6.1\" y hasta 19h de video. 128GB.", stock:12, specs:"128GB · 6.1\" · A15 Bionic", badge:null },
  { id:3, name:"iPhone 11", brand:"Apple", category:"Smartphones", price:399, color:"#FF375F", description:"Chip A13 Bionic, cámara dual y pantalla Liquid Retina HD 6.1\". Resistencia al agua IP68. 64GB.", stock:15, specs:"64GB · 6.1\" · A13 Bionic", badge:"Popular" },
  { id:4, name:"Galaxy S24 Ultra", brand:"Samsung", category:"Smartphones", price:1299, color:"#BF5AF2", description:"Galaxy AI integrada, S Pen incluido, cámara 200MP, pantalla Dynamic AMOLED 2X 6.8\" y Snapdragon 8 Gen 3.", stock:6, specs:"256GB · S Pen · 200MP", badge:"Premium" },
  { id:5, name:"Galaxy A54 5G", brand:"Samsung", category:"Smartphones", price:349, color:"#64D2FF", description:"Pantalla Super AMOLED 6.4\", cámara triple 50MP OIS, batería 5000mAh y resistencia IP67. 128GB.", stock:20, specs:"128GB · 5G · 5000mAh", badge:null },
  { id:6, name:"Redmi Note 13 Pro", brand:"Xiaomi", category:"Smartphones", price:279, color:"#FF9F0A", description:"Cámara 200MP, pantalla AMOLED 6.67\" a 120Hz, carga rápida 67W y Snapdragon 7s Gen 2.", stock:25, specs:"256GB · 200MP · 120Hz", badge:"Oferta" },
  { id:7, name:"Infinix Note 40 Pro", brand:"Infinix", category:"Smartphones", price:229, color:"#FFD60A", description:"Carga inalámbrica MagCharge, pantalla AMOLED 6.78\" a 120Hz, cámara 108MP y carga rápida 70W.", stock:18, specs:"256GB · 108MP · MagCharge", badge:null },
  { id:8, name:"TP-Link Archer C6", brand:"TP-Link", category:"Redes", price:49, color:"#00C7BE", description:"Router Wi-Fi AC1200 MU-MIMO doble banda. Hasta 1200Mbps. 4 antenas de alta ganancia.", stock:30, specs:"AC1200 · MU-MIMO · Dual Band", badge:null },
  { id:9, name:"TP-Link TL-WR841N", brand:"TP-Link", category:"Redes", price:19, color:"#00C7BE", description:"Router inalámbrico N300. Hasta 300Mbps. 2 antenas omnidireccionales. Configuración fácil.", stock:40, specs:"N300 · 2 Antenas · Easy Setup", badge:null },
  { id:10, name:"Anker PowerCore 20K", brand:"Anker", category:"Energía", price:39, color:"#32D74B", description:"20000mAh con PowerIQ 2.0. Carga 2 dispositivos. Indicador LED. MultiProtect.", stock:35, specs:"20000mAh · USB-C · Dual Port", badge:null },
  { id:11, name:"Auriculares BT Pro", brand:"Genérico", category:"Accesorios", price:29, color:"#AC8E68", description:"Bluetooth 5.3 con ANC, 30h de batería con estuche, resistencia IPX5.", stock:50, specs:"BT 5.3 · ANC · 30h", badge:null },
  { id:12, name:"Cable USB-C Premium", brand:"Genérico", category:"Accesorios", price:9, color:"#8E8E93", description:"USB-C a USB-C 1.5m, carga rápida 100W, 480Mbps. Trenzado de nylon.", stock:100, specs:"1.5m · 100W · Nylon", badge:null },
  { id:13, name:"iPhone 14 Pro", brand:"Apple", category:"Smartphones", price:899, color:"#5E5CE6", description:"Dynamic Island, chip A16 Bionic, cámara 48MP y pantalla Always-On 6.1\". 256GB.", stock:10, specs:"256GB · 48MP · Dynamic Island", badge:null },
  { id:14, name:"Galaxy Z Flip 5", brand:"Samsung", category:"Smartphones", price:999, color:"#FF2D55", description:"Plegable con Flex Window 3.4\", pantalla Dynamic AMOLED 2X 6.7\" y Snapdragon 8 Gen 2.", stock:5, specs:"256GB · Plegable · Flex Window", badge:"Nuevo" },
  { id:15, name:"Cargador GaN 65W", brand:"Genérico", category:"Energía", price:25, color:"#32D74B", description:"GaN ultra-compacto 65W, 2x USB-C + 1x USB-A. PD 3.0 y QC 4.0.", stock:45, specs:"65W · GaN · 3 Ports", badge:null },
  { id:16, name:"Funda MagSafe Premium", brand:"Genérico", category:"Accesorios", price:19, color:"#8E8E93", description:"Transparente MagSafe iPhone 14/15. Protección militar, anti-amarillamiento.", stock:60, specs:"MagSafe · Military · Crystal", badge:null },
  { id:17, name:"Modem 4G LTE TP-Link", brand:"TP-Link", category:"Redes", price:59, color:"#00C7BE", description:"4G LTE con Wi-Fi, hasta 150Mbps. Ranura SIM. Batería 2000mAh portátil.", stock:15, specs:"4G LTE · 150Mbps · Portable", badge:null },
  { id:18, name:"Soporte Magnético Auto", brand:"Genérico", category:"Accesorios", price:15, color:"#8E8E93", description:"MagSafe para auto con ventilación. Rotación 360°, sin herramientas.", stock:40, specs:"MagSafe · 360° · Vent Mount", badge:null },
];

const CATEGORIES = [
  { name:"Todos", icon: Sparkles }, { name:"Smartphones", icon: Smartphone },
  { name:"Redes", icon: Wifi }, { name:"Energía", icon: Battery }, { name:"Accesorios", icon: Headphones },
];

const TESTIMONIALS = [
  { name:"Carlos M.", text:"Excelente atención, compré mi iPhone 15 Pro y me dieron un precio increíble. 100% recomendados.", rating:5, avatar:"CM" },
  { name:"María G.", text:"La mejor tienda de Macrocentro. Siempre tienen lo último y los precios son muy competitivos.", rating:5, avatar:"MG" },
  { name:"José R.", text:"Compré un Galaxy S24 Ultra y accesorios. Todo original y con garantía. Volveré seguro.", rating:5, avatar:"JR" },
  { name:"Ana P.", text:"Me ayudaron a elegir el router perfecto para mi casa. Servicio personalizado y honesto.", rating:4, avatar:"AP" },
  { name:"Luis D.", text:"Llevo 2 años comprando aquí. Nunca me han fallado. Los mejores precios de la zona.", rating:5, avatar:"LD" },
];

const STATS = [
  { label:"Clientes Satisfechos", value:2500, suffix:"+", icon: Users },
  { label:"Años de Experiencia", value:5, suffix:"+", icon: Award },
  { label:"Productos Disponibles", value:200, suffix:"+", icon: Package },
  { label:"Entregas Exitosas", value:4800, suffix:"+", icon: Truck },
];

const HERO_SLIDES = [
  { title:"Tu próximo\nfavorito está aquí", subtitle:"Smartphones, accesorios y equipos de red con la mejor atención de Macrocentro 1", accent:"MobileShop · Tu Conexión Digital" },
  { title:"iPhone 15\nPro Max", subtitle:"Titanio. El más poderoso iPhone jamás creado. Disponible con los mejores precios.", accent:"Nuevo · Disponible Ahora" },
  { title:"Galaxy S24\nUltra", subtitle:"Galaxy AI integrada en cada pixel. El futuro ya está en tus manos.", accent:"Samsung · Galaxy AI" },
];

/* ── Helper Components ── */
function ProductImage({ product, size = 200, style = {} }) {
  const CatIcon = CATEGORIES.find(c => c.name === product.category)?.icon || Smartphone;
  return (
    <div style={{ width:"100%", height:size, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", background:`linear-gradient(135deg, ${product.color}15, ${product.color}08, transparent)`, overflow:"hidden", ...style }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", width:size*0.7, height:size*0.7, borderRadius:"50%", transform:"translate(-50%,-50%)", background:`radial-gradient(circle, ${product.color}18, transparent 70%)` }} />
      <CatIcon size={size*0.2} color={product.color} style={{ opacity:0.65, marginBottom:6, position:"relative" }} />
      <span style={{ fontSize:10, fontWeight:700, color:product.color, opacity:0.75, letterSpacing:"0.1em", textTransform:"uppercase", position:"relative" }}>{product.brand}</span>
      <span style={{ fontSize:8, color:"var(--text-dim)", marginTop:2, position:"relative" }}>{product.specs?.split("·")[0]}</span>
    </div>
  );
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) {
      particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*1.8+0.4, dx:(Math.random()-0.5)*0.35, dy:(Math.random()-0.5)*0.35, o:Math.random()*0.4+0.08 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,201,255,${p.o})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,201,255,${0.06*(1-d/110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
}

function AnimCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = performance.now();
        const anim = (now) => {
          const p = Math.min((now - s) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function Countdown() {
  const [t, setT] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    const target = new Date(); target.setDate(target.getDate() + 3); target.setHours(23, 59, 59);
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      setT({ d:Math.floor(diff/864e5), h:Math.floor(diff%864e5/36e5), m:Math.floor(diff%36e5/6e4), s:Math.floor(diff%6e4/1e3) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const B = ({ v, l }) => (
    <div style={{ textAlign:"center" }}>
      <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:10, padding:"6px 10px", minWidth:44, fontSize:22, fontWeight:800, fontFamily:"'Space Mono',monospace", color:"white", border:"1px solid rgba(255,255,255,0.08)" }}>{String(v).padStart(2, "0")}</div>
      <span style={{ fontSize:9, color:"rgba(255,255,255,0.5)", marginTop:3, display:"block", letterSpacing:"0.1em" }}>{l}</span>
    </div>
  );
  const Sep = () => <span style={{ color:"rgba(255,255,255,0.25)", fontSize:20, fontWeight:700, paddingBottom:14 }}>:</span>;
  return (
    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
      <B v={t.d} l="DÍAS" /><Sep /><B v={t.h} l="HRS" /><Sep /><B v={t.m} l="MIN" /><Sep /><B v={t.s} l="SEG" />
    </div>
  );
}

/* ── Styles ── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
:root{--bg-deep:#050A15;--bg-card:#0E1832;--bg-elevated:#132040;--cyan:#00C9FF;--cyan-dim:#0090B8;--purple:#7B2FBE;--pink:#FF2DAA;--text-primary:#F0F4FF;--text-secondary:#8A96B8;--text-dim:#3E4A68;--glass-border:rgba(0,201,255,0.1);--neu-dark:rgba(3,5,12,0.7);--neu-light:rgba(25,45,80,0.3)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Outfit',sans-serif;background:var(--bg-deep);color:var(--text-primary);overflow-x:hidden}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(0,201,255,0.3)}50%{box-shadow:0 0 40px rgba(0,201,255,0.6)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
@keyframes waPulse{0%,100%{transform:scale(1);box-shadow:0 4px 25px rgba(37,211,102,0.4)}50%{transform:scale(1.08);box-shadow:0 6px 35px rgba(37,211,102,0.6)}}
.animated-bg{position:fixed;inset:0;z-index:0;background:linear-gradient(-45deg,#050A15,#0A1128,#0D1535,#0F0F2E,#0A1128,#050A15);background-size:400% 400%;animation:gradientShift 25s ease infinite}
.animated-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 20%,rgba(0,201,255,0.04) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(123,47,190,0.04) 0%,transparent 60%)}
.neu-card{background:linear-gradient(145deg,var(--bg-card),var(--bg-elevated));border:1px solid var(--glass-border);border-radius:20px;box-shadow:8px 8px 24px var(--neu-dark),-4px -4px 12px var(--neu-light);transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.1)}
.neu-card:hover{transform:translateY(-6px);box-shadow:12px 12px 32px var(--neu-dark),-6px -6px 20px var(--neu-light),0 0 40px rgba(0,201,255,0.06);border-color:rgba(0,201,255,0.25)}
.neu-btn{background:linear-gradient(145deg,var(--bg-elevated),var(--bg-card));border:1px solid var(--glass-border);border-radius:14px;box-shadow:4px 4px 10px var(--neu-dark),-2px -2px 6px var(--neu-light);color:var(--text-primary);cursor:pointer;transition:all 0.3s ease;font-family:'Outfit',sans-serif}
.neu-btn:hover{box-shadow:2px 2px 5px var(--neu-dark),-1px -1px 3px var(--neu-light);transform:translateY(1px)}
.btn-accent{background:linear-gradient(135deg,var(--cyan),var(--cyan-dim));border:none;color:#050A15;font-weight:700;border-radius:14px;cursor:pointer;box-shadow:0 4px 20px rgba(0,201,255,0.3);font-family:'Outfit',sans-serif;transition:all 0.3s ease}
.btn-accent:hover{box-shadow:0 6px 30px rgba(0,201,255,0.5);transform:translateY(-2px)}
.wa-btn{background:linear-gradient(135deg,#25D366,#128C7E);border:none;color:white;font-weight:600;border-radius:14px;cursor:pointer;box-shadow:0 4px 15px rgba(37,211,102,0.3);transition:all 0.3s ease;font-family:'Outfit',sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.wa-btn:hover{box-shadow:0 6px 25px rgba(37,211,102,0.5);transform:translateY(-2px)}
.glass-panel{background:rgba(10,17,40,0.85);backdrop-filter:blur(30px) saturate(1.4);border:1px solid rgba(0,201,255,0.12);border-radius:24px;box-shadow:0 25px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.04)}
.skeleton{background:linear-gradient(90deg,var(--bg-card) 25%,var(--bg-elevated) 50%,var(--bg-card) 75%);background-size:200% 100%;animation:shimmer 1.8s infinite;border-radius:12px}
.badge-count{position:absolute;top:-6px;right:-6px;background:linear-gradient(135deg,var(--cyan),var(--pink));color:white;font-size:10px;font-weight:800;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,201,255,0.4)}
.logo-glow{text-shadow:0 0 25px rgba(0,201,255,0.35),0 0 60px rgba(0,201,255,0.1)}
.pill-active{background:linear-gradient(135deg,rgba(0,201,255,0.18),rgba(123,47,190,0.12))!important;border-color:rgba(0,201,255,0.45)!important;box-shadow:0 0 22px rgba(0,201,255,0.12),inset 0 0 16px rgba(0,201,255,0.04)!important}
.price-tag{font-family:'Space Mono',monospace;color:var(--cyan);text-shadow:0 0 15px rgba(0,201,255,0.25)}
.fade-up{animation:fadeUp 0.5s ease both}
.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
`;

/* ── Product Card ── */
function ProductCard({ product, onView, onAddCart, onToggleFav, isFav, delay }) {
  const bc = { Premium:"linear-gradient(135deg,#5E5CE6,#BF5AF2)", Nuevo:"linear-gradient(135deg,#00C9FF,#0090B8)", Popular:"linear-gradient(135deg,#FF375F,#FF2DAA)", Oferta:"linear-gradient(135deg,#FF9F0A,#FFD60A)" };
  return (
    <div className="neu-card fade-up" style={{ padding:0, overflow:"hidden", display:"flex", flexDirection:"column", animationDelay:`${delay}ms` }}>
      <div style={{ position:"relative", cursor:"pointer" }} onClick={() => onView(product)}>
        <ProductImage product={product} size={200} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,var(--bg-card),transparent 50%)", pointerEvents:"none" }} />
        {product.badge && <span style={{ position:"absolute", top:12, left:12, zIndex:2, padding:"4px 12px", borderRadius:8, fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", background:bc[product.badge]||bc.Nuevo, color:"white" }}>{product.badge}</span>}
        <button onClick={e => { e.stopPropagation(); onToggleFav(product.id); }} style={{ position:"absolute", top:12, right:12, zIndex:2, background:"rgba(10,17,40,0.55)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <Heart size={16} fill={isFav ? "#FF2DAA" : "none"} color={isFav ? "#FF2DAA" : "#6B7A99"} />
        </button>
        {product.stock <= 5 && <span style={{ position:"absolute", bottom:12, left:12, zIndex:2, background:"rgba(255,45,95,0.15)", color:"#FF375F", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:8, border:"1px solid rgba(255,45,95,0.2)" }}>Quedan {product.stock}</span>}
      </div>
      <div style={{ padding:"14px 18px 18px", display:"flex", flexDirection:"column", flex:1 }}>
        <span style={{ color:"var(--text-dim)", fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>{product.brand}</span>
        <h3 style={{ fontSize:15, fontWeight:700, margin:"3px 0 2px", lineHeight:1.3 }}>{product.name}</h3>
        <span style={{ color:"var(--text-secondary)", fontSize:11, marginBottom:12 }}>{product.specs}</span>
        <div style={{ marginTop:"auto" }}>
          <span className="price-tag" style={{ fontSize:24, fontWeight:700, display:"block", marginBottom:12 }}>${product.price}</span>
          <div style={{ display:"flex", gap:8 }}>
            <button className="neu-btn" onClick={() => onView(product)} style={{ flex:1, padding:"10px 0", fontSize:12, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}><Eye size={14} /> Detalles</button>
            <button className="btn-accent" onClick={() => onAddCart(product)} style={{ flex:1, padding:"10px 0", fontSize:12, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}><ShoppingCart size={14} /> Añadir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product Modal ── */
function ProductModal({ product, onClose, onAddCart }) {
  if (!product) return null;
  const waMsg = encodeURIComponent("Hola MobileShop! Estoy interesado en el *" + product.name + "* ($" + product.price + ") que vi en su catálogo de Macrocentro 1. ¿Está disponible?");
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(3,5,12,0.8)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div className="glass-panel" onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:560, maxHeight:"90vh", overflow:"auto", animation:"scaleIn 0.35s ease" }}>
        <div style={{ position:"relative" }}>
          <ProductImage product={product} size={280} style={{ borderRadius:"24px 24px 0 0" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,17,40,0.95) 0%,transparent 60%)", borderRadius:"24px 24px 0 0" }} />
          <button onClick={onClose} style={{ position:"absolute", top:16, right:16, background:"rgba(10,17,40,0.6)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"white" }}><X size={20} /></button>
          <div style={{ position:"absolute", bottom:20, left:24, right:24 }}>
            <span style={{ color:product.color, fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>{product.brand}</span>
            <h2 style={{ fontSize:26, fontWeight:800, margin:"4px 0", lineHeight:1.15 }}>{product.name}</h2>
          </div>
        </div>
        <div style={{ padding:"24px 28px 28px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, flexWrap:"wrap" }}>
            <span className="price-tag" style={{ fontSize:34, fontWeight:800 }}>${product.price}</span>
            <span style={{ background:product.stock > 10 ? "rgba(50,215,75,0.12)" : "rgba(255,55,95,0.12)", color:product.stock > 10 ? "#32D74B" : "#FF375F", padding:"5px 14px", borderRadius:10, fontSize:12, fontWeight:600 }}>{product.stock > 10 ? "En Stock" : "Solo " + product.stock + " disponibles"}</span>
          </div>
          <p style={{ color:"var(--text-secondary)", fontSize:14, lineHeight:1.7, marginBottom:24 }}>{product.description}</p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button className="btn-accent" onClick={() => { onAddCart(product); onClose(); }} style={{ flex:1, minWidth:160, padding:"14px 24px", fontSize:15, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><ShoppingCart size={18} /> Añadir al Carrito</button>
            <a href={"https://wa.me/" + WA + "?text=" + waMsg} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ flex:1, minWidth:160, padding:"14px 24px", fontSize:15, justifyContent:"center" }}><MessageCircle size={18} /> Consultar Disponibilidad</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Cart Sidebar ── */
function CartSidebar({ cart, onClose, onUpdateQty, onRemove, isOpen }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const checkout = () => {
    if (!cart.length) return;
    const lines = cart.map(i => "- " + i.name + " (x" + i.qty + ") - $" + (i.price * i.qty).toFixed(2)).join("\n");
    const msg = encodeURIComponent("Hola MobileShop! Estoy interesado en estos productos de Macrocentro 1:\n\n" + lines + "\n\nTotal: $" + total.toFixed(2) + "\n\nPodemos concretar?");
    window.open("https://wa.me/" + WA + "?text=" + msg, "_blank");
  };
  return (
    <>
      {isOpen && <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(3,5,12,0.7)", backdropFilter:"blur(4px)" }} />}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:"min(400px,88vw)", zIndex:201, background:"linear-gradient(180deg,#0D1530,#0A1128)", borderLeft:"1px solid var(--glass-border)", boxShadow:"-20px 0 60px rgba(0,0,0,0.5)", transform:isOpen ? "translateX(0)" : "translateX(100%)", transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px 20px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--glass-border)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <ShoppingCart size={20} color="var(--cyan)" />
            <h3 style={{ fontSize:18, fontWeight:700 }}>Tu Carrito</h3>
            {count > 0 && <span style={{ background:"var(--cyan)", color:"#050A15", fontSize:11, fontWeight:800, padding:"2px 9px", borderRadius:20 }}>{count}</span>}
          </div>
          <button onClick={onClose} className="neu-btn" style={{ width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}><X size={16} /></button>
        </div>
        <div style={{ flex:1, overflow:"auto", padding:"12px 20px" }} className="scrollbar-hide">
          {!cart.length ? (
            <div style={{ textAlign:"center", padding:"50px 16px", color:"var(--text-dim)" }}>
              <Package size={44} style={{ margin:"0 auto 14px", opacity:0.35 }} />
              <p style={{ fontSize:15, fontWeight:500 }}>Tu carrito está vacío</p>
              <p style={{ fontSize:12, marginTop:6 }}>Explora nuestro catálogo</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display:"flex", gap:12, padding:"14px 0", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ width:56, height:56, borderRadius:12, overflow:"hidden", border:"1px solid var(--glass-border)", flexShrink:0 }}>
                <ProductImage product={item} size={56} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <h4 style={{ fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</h4>
                <span className="price-tag" style={{ fontSize:15, fontWeight:700 }}>${(item.price * item.qty).toFixed(2)}</span>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
                  <button className="neu-btn" onClick={() => onUpdateQty(item.id, -1)} style={{ width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", padding:0, borderRadius:9 }}><Minus size={12} /></button>
                  <span style={{ fontSize:13, fontWeight:700, minWidth:18, textAlign:"center" }}>{item.qty}</span>
                  <button className="neu-btn" onClick={() => onUpdateQty(item.id, 1)} style={{ width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", padding:0, borderRadius:9 }}><Plus size={12} /></button>
                  <button onClick={() => onRemove(item.id)} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", color:"#FF375F", opacity:0.6 }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding:"18px 20px 22px", borderTop:"1px solid var(--glass-border)", background:"rgba(10,17,40,0.4)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
              <span style={{ fontSize:15, color:"var(--text-secondary)" }}>Total</span>
              <span className="price-tag" style={{ fontSize:26, fontWeight:800 }}>${total.toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="wa-btn" style={{ width:"100%", padding:"14px", fontSize:15, borderRadius:14, justifyContent:"center" }}>
              <Send size={16} /> Finalizar Pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════════════ */
export default function MobileShop() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [toast, setToast] = useState(null);
  const [tIdx, setTIdx] = useState(0);
  const catalogRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoading(false), 1000); }, []);
  useEffect(() => { const t = setInterval(() => setHeroIdx(i => (i+1) % HERO_SLIDES.length), 5500); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setTIdx(i => (i+1) % TESTIMONIALS.length), 4500); return () => clearInterval(t); }, []);

  const showToast = useCallback(m => { setToast(m); setTimeout(() => setToast(null), 2200); }, []);
  const filtered = useMemo(() => PRODUCTS.filter(p => (category === "Todos" || p.category === category) && (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))), [category, search]);
  const addToCart = p => { setCart(prev => { const ex = prev.find(i => i.id === p.id); return ex ? prev.map(i => i.id === p.id ? {...i, qty:i.qty+1} : i) : [...prev, {...p, qty:1}]; }); showToast(p.name + " añadido al carrito"); };
  const updateQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? {...i, qty:Math.max(1, i.qty+d)} : i));
  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));
  const toggleFav = id => setFavorites(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const slide = HERO_SLIDES[heroIdx];
  const waGeneral = encodeURIComponent("Hola MobileShop! Vi su catálogo online y me gustaría más información.");
  const waOfertas = encodeURIComponent("Hola! Vi las ofertas en su catálogo, qué descuentos tienen disponibles?");

  return (
    <div style={{ position:"relative", minHeight:"100vh" }}>
      <style>{css}</style>
      <div className="animated-bg" />

      {/* Toast */}
      {toast && <div style={{ position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)", zIndex:300, background:"linear-gradient(135deg,rgba(0,201,255,0.18),rgba(123,47,190,0.12))", backdropFilter:"blur(20px)", border:"1px solid rgba(0,201,255,0.25)", padding:"11px 26px", borderRadius:14, fontSize:13, fontWeight:600, animation:"fadeUp 0.3s ease", display:"flex", alignItems:"center", gap:8 }}><CheckCircle size={16} color="var(--cyan)" /> {toast}</div>}

      {/* Floating WhatsApp */}
      <a href={"https://wa.me/" + WA + "?text=" + waGeneral} target="_blank" rel="noopener noreferrer" style={{ position:"fixed", bottom:24, right:24, zIndex:90, width:60, height:60, borderRadius:20, background:"linear-gradient(135deg,#25D366,#128C7E)", display:"flex", alignItems:"center", justifyContent:"center", animation:"waPulse 2.5s ease infinite", textDecoration:"none", border:"none" }}>
        <MessageCircle size={28} color="white" fill="white" />
      </a>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ═══ HEADER ═══ */}
        <header style={{ position:"sticky", top:0, zIndex:50, background:"rgba(5,10,21,0.82)", backdropFilter:"blur(24px) saturate(1.5)", borderBottom:"1px solid var(--glass-border)", padding:"10px 20px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
              <div style={{ width:40, height:40, borderRadius:14, background:"linear-gradient(135deg,var(--cyan),var(--purple))", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(0,201,255,0.25)" }}><Smartphone size={20} color="#050A15" /></div>
              <div>
                <span className="logo-glow" style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.02em", display:"block", lineHeight:1.1 }}>Mobile<span style={{ color:"var(--cyan)" }}>Shop</span></span>
                <span style={{ fontSize:9, color:"var(--text-dim)", letterSpacing:"0.15em", fontWeight:600, textTransform:"uppercase" }}>{SLOGAN}</span>
              </div>
            </div>
            <div style={{ flex:1, maxWidth:380, minWidth:180 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, background:"linear-gradient(145deg,var(--bg-card),var(--bg-elevated))", border:"1px solid " + (searchFocused ? "rgba(0,201,255,0.35)" : "var(--glass-border)"), borderRadius:12, padding:"9px 14px", boxShadow:searchFocused ? "0 0 20px rgba(0,201,255,0.08)" : "3px 3px 8px var(--neu-dark)", transition:"all 0.3s" }}>
                <Search size={16} color={searchFocused ? "var(--cyan)" : "var(--text-dim)"} />
                <input value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} placeholder="Buscar productos..." style={{ flex:1, background:"none", border:"none", outline:"none", color:"var(--text-primary)", fontSize:13, fontFamily:"'Outfit',sans-serif" }} />
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4, color:"var(--text-dim)", fontSize:11 }}><MapPin size={13} /><span>Macrocentro 1</span></div>
              <button className="neu-btn" style={{ position:"relative", width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}><Heart size={18} color="var(--text-secondary)" />{favorites.size > 0 && <span className="badge-count">{favorites.size}</span>}</button>
              <button onClick={() => setCartOpen(true)} className="neu-btn" style={{ position:"relative", width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}><ShoppingCart size={18} color="var(--text-secondary)" />{cartCount > 0 && <span className="badge-count">{cartCount}</span>}</button>
            </div>
          </div>
        </header>

        {/* ═══ PROMO BANNER ═══ */}
        <div style={{ background:"linear-gradient(135deg,#FF375F,#FF2DAA,#BF5AF2)", padding:"14px 20px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 80% 50%,rgba(255,255,255,0.1),transparent 60%)" }} />
          <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", gap:20, flexWrap:"wrap", position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Zap size={20} color="white" />
              <span style={{ fontSize:15, fontWeight:700, color:"white" }}>OFERTAS ESPECIALES</span>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.8)" }}>Termina en:</span>
            </div>
            <Countdown />
            <a href={"https://wa.me/" + WA + "?text=" + waOfertas} target="_blank" rel="noopener noreferrer" style={{ background:"rgba(255,255,255,0.2)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:10, padding:"8px 18px", color:"white", fontWeight:700, fontSize:13, textDecoration:"none", fontFamily:"'Outfit',sans-serif" }}>Ver Ofertas</a>
          </div>
        </div>

        {/* ═══ HERO ═══ */}
        <section style={{ position:"relative", minHeight:420, display:"flex", alignItems:"center", padding:"50px 20px", overflow:"hidden" }}>
          <Particles />
          <div style={{ position:"absolute", top:-120, right:-120, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,201,255,0.06),transparent 70%)", animation:"float 8s ease infinite" }} />
          <div style={{ position:"absolute", bottom:-100, left:-100, width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(123,47,190,0.06),transparent 70%)", animation:"float 6s ease infinite 2s" }} />
          <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:40, flexWrap:"wrap", position:"relative" }}>
            <div style={{ flex:1, minWidth:280 }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, color:"var(--cyan)", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16, background:"rgba(0,201,255,0.07)", padding:"6px 14px", borderRadius:8, border:"1px solid rgba(0,201,255,0.12)" }}>
                <Sparkles size={14} /> {slide.accent}
              </span>
              <h1 key={heroIdx} style={{ fontSize:"clamp(32px,5.5vw,60px)", fontWeight:900, lineHeight:1.05, marginBottom:18, whiteSpace:"pre-line", animation:"fadeUp 0.6s ease" }}>{slide.title}</h1>
              <p style={{ fontSize:17, color:"var(--text-secondary)", lineHeight:1.6, maxWidth:460, marginBottom:28, animation:"fadeUp 0.6s ease 0.1s both" }}>{slide.subtitle}</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s ease 0.2s both" }}>
                <button onClick={() => catalogRef.current?.scrollIntoView({ behavior:"smooth" })} className="btn-accent" style={{ padding:"15px 30px", fontSize:15, fontWeight:700, display:"flex", alignItems:"center", gap:10 }}>Explorar Catálogo <ArrowRight size={18} /></button>
                <a href={"https://wa.me/" + WA} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ padding:"15px 26px", fontSize:15, justifyContent:"center" }}><Phone size={16} /> Contáctanos</a>
              </div>
            </div>
            <div style={{ position:"relative", width:260, height:300, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute", inset:20, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,201,255,0.1),transparent 70%)", animation:"pulseGlow 3s ease infinite" }} />
              <div style={{ width:210, height:250, borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.5)", border:"1px solid var(--glass-border)", animation:"float 4s ease infinite" }}>
                <ProductImage product={PRODUCTS[heroIdx % 3]} size={250} />
              </div>
            </div>
          </div>
          <div style={{ position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} style={{ width:i === heroIdx ? 30 : 10, height:10, borderRadius:5, border:"none", cursor:"pointer", background:i === heroIdx ? "var(--cyan)" : "rgba(255,255,255,0.12)", transition:"all 0.4s", boxShadow:i === heroIdx ? "0 0 12px rgba(0,201,255,0.4)" : "none" }} />
            ))}
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section style={{ padding:"40px 20px", borderTop:"1px solid var(--glass-border)", borderBottom:"1px solid var(--glass-border)", background:"rgba(10,17,40,0.3)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:24 }}>
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ textAlign:"center", padding:"20px 16px" }}>
                  <Icon size={28} color="var(--cyan)" style={{ margin:"0 auto 10px", opacity:0.7 }} />
                  <div className="price-tag" style={{ fontSize:36, fontWeight:900, marginBottom:4 }}>
                    <AnimCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <span style={{ color:"var(--text-secondary)", fontSize:13, fontWeight:500 }}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ CATEGORIES ═══ */}
        <section ref={catalogRef} style={{ padding:"32px 20px 24px", maxWidth:1280, margin:"0 auto" }}>
          <h2 style={{ fontSize:22, fontWeight:800, marginBottom:16 }}>Nuestro Catálogo</h2>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:6 }} className="scrollbar-hide">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const active = category === cat.name;
              return (
                <button key={cat.name} onClick={() => setCategory(cat.name)} className={"neu-btn" + (active ? " pill-active" : "")} style={{ padding:"11px 20px", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:7, whiteSpace:"nowrap", flexShrink:0 }}>
                  <Icon size={16} color={active ? "var(--cyan)" : "var(--text-secondary)"} /> {cat.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* ═══ PRODUCT GRID ═══ */}
        <section style={{ padding:"0 20px 60px", maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <span style={{ color:"var(--text-dim)", fontSize:13 }}>{filtered.length} producto{filtered.length !== 1 ? "s" : ""}</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:22 }}>
            {loading ? Array.from({ length:8 }).map((_, i) => (
              <div key={i} className="neu-card" style={{ padding:0, overflow:"hidden" }}>
                <div className="skeleton" style={{ height:200, borderRadius:"20px 20px 0 0" }} />
                <div style={{ padding:"14px 18px 18px" }}>
                  <div className="skeleton" style={{ height:12, width:"50%", marginBottom:8 }} />
                  <div className="skeleton" style={{ height:18, width:"75%", marginBottom:12 }} />
                  <div className="skeleton" style={{ height:26, width:"35%", marginBottom:14 }} />
                  <div className="skeleton" style={{ height:40 }} />
                </div>
              </div>
            )) : filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 50} onView={setSelectedProduct} onAddCart={addToCart} onToggleFav={toggleFav} isFav={favorites.has(p.id)} />
            ))}
          </div>
          {!loading && !filtered.length && (
            <div style={{ textAlign:"center", padding:"70px 20px", color:"var(--text-dim)" }}>
              <Search size={44} style={{ margin:"0 auto 14px", opacity:0.3 }} />
              <p style={{ fontSize:17, fontWeight:500 }}>No se encontraron productos</p>
            </div>
          )}
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section style={{ padding:"60px 20px", background:"rgba(10,17,40,0.3)", borderTop:"1px solid var(--glass-border)" }}>
          <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
            <span style={{ color:"var(--cyan)", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>Testimonios</span>
            <h2 style={{ fontSize:26, fontWeight:800, margin:"8px 0 32px" }}>Lo que dicen nuestros clientes</h2>
            <div className="glass-panel" style={{ padding:"32px 28px", position:"relative" }}>
              <Quote size={32} color="var(--cyan)" style={{ opacity:0.2, position:"absolute", top:16, left:20 }} />
              <div key={tIdx} style={{ animation:"fadeUp 0.4s ease" }}>
                <p style={{ fontSize:16, lineHeight:1.7, color:"var(--text-secondary)", marginBottom:20, fontStyle:"italic" }}>"{TESTIMONIALS[tIdx].text}"</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:14, background:"linear-gradient(135deg,var(--cyan),var(--purple))", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:14, color:"#050A15" }}>{TESTIMONIALS[tIdx].avatar}</div>
                  <div style={{ textAlign:"left" }}>
                    <span style={{ fontWeight:700, fontSize:14, display:"block" }}>{TESTIMONIALS[tIdx].name}</span>
                    <div style={{ display:"flex", gap:2 }}>{Array.from({ length:TESTIMONIALS[tIdx].rating }).map((_, i) => <Star key={i} size={12} fill="#FFD60A" color="#FFD60A" />)}</div>
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:20 }}>
                {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setTIdx(i)} style={{ width:8, height:8, borderRadius:4, border:"none", cursor:"pointer", background:i === tIdx ? "var(--cyan)" : "rgba(255,255,255,0.1)", transition:"all 0.3s" }} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHY US ═══ */}
        <section style={{ padding:"60px 20px", maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <span style={{ color:"var(--cyan)", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>¿Por qué elegirnos?</span>
            <h2 style={{ fontSize:26, fontWeight:800, margin:"8px 0" }}>La mejor experiencia de compra</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
            {[
              { icon:Shield, title:"Productos Originales", desc:"100% originales con garantía de fábrica en todos nuestros equipos." },
              { icon:Truck, title:"Entrega Rápida", desc:"Recibe tu pedido en tiempo récord. Envíos a todo el país." },
              { icon:Award, title:"Mejor Precio", desc:"Precios competitivos. Si lo consigues más barato, igualamos la oferta." },
              { icon:Clock, title:"Soporte 24/7", desc:"Atención personalizada por WhatsApp en cualquier momento." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="neu-card" style={{ padding:"28px 22px", textAlign:"center" }}>
                  <div style={{ width:52, height:52, borderRadius:16, background:"rgba(0,201,255,0.08)", border:"1px solid rgba(0,201,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                    <Icon size={24} color="var(--cyan)" />
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{item.title}</h3>
                  <p style={{ color:"var(--text-secondary)", fontSize:13, lineHeight:1.6 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ LOCATION ═══ */}
        <section style={{ padding:"60px 20px", background:"rgba(10,17,40,0.3)", borderTop:"1px solid var(--glass-border)" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <span style={{ color:"var(--cyan)", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>Ubicación</span>
              <h2 style={{ fontSize:26, fontWeight:800, margin:"8px 0" }}>Visítanos en Macrocentro 1</h2>
              <p style={{ color:"var(--text-secondary)", fontSize:14 }}>Estamos en 2 locales dentro del Centro Comercial</p>
            </div>
            <div className="glass-panel" style={{ overflow:"hidden" }}>
              <div style={{ background:"linear-gradient(135deg,var(--bg-card),var(--bg-elevated))", height:220, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <div style={{ position:"absolute", inset:0, opacity:0.15, background:"repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(0,201,255,0.05) 30px,rgba(0,201,255,0.05) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,201,255,0.05) 30px,rgba(0,201,255,0.05) 31px)" }} />
                <div style={{ textAlign:"center", position:"relative" }}>
                  <MapPin size={48} color="var(--cyan)" style={{ margin:"0 auto 12px", animation:"float 3s ease infinite" }} />
                  <p style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>Centro Comercial Macrocentro 1</p>
                  <p style={{ color:"var(--text-secondary)", fontSize:13 }}>2 Locales disponibles para atenderte</p>
                </div>
              </div>
              <div style={{ padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Store size={18} color="var(--cyan)" />
                  <span style={{ fontSize:14, fontWeight:600 }}>Lun - Sáb 9:00 AM - 7:00 PM</span>
                </div>
                <a href={"https://wa.me/" + WA + "?text=" + encodeURIComponent("Hola! Quisiera saber la ubicación exacta de su local en Macrocentro 1.")} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ padding:"10px 20px", fontSize:13 }}><MapPin size={14} /> ¿Cómo llegar?</a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ borderTop:"1px solid var(--glass-border)", padding:"36px 20px", background:"rgba(5,10,21,0.5)", backdropFilter:"blur(10px)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:28, justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ width:34, height:34, borderRadius:12, background:"linear-gradient(135deg,var(--cyan),var(--purple))", display:"flex", alignItems:"center", justifyContent:"center" }}><Smartphone size={16} color="#050A15" /></div>
                <div>
                  <span style={{ fontSize:16, fontWeight:800 }}>Mobile<span style={{ color:"var(--cyan)" }}>Shop</span></span>
                  <span style={{ display:"block", fontSize:9, color:"var(--text-dim)", letterSpacing:"0.12em" }}>{SLOGAN}</span>
                </div>
              </div>
              <p style={{ color:"var(--text-dim)", fontSize:12, display:"flex", alignItems:"center", gap:5 }}><MapPin size={12} /> Centro Comercial Macrocentro 1 — 2 Locales</p>
            </div>
            <a href={"https://wa.me/" + WA} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ padding:"11px 22px", fontSize:13 }}><MessageCircle size={15} /> Escríbenos por WhatsApp</a>
          </div>
          <div style={{ maxWidth:1280, margin:"20px auto 0", paddingTop:16, borderTop:"1px solid rgba(255,255,255,0.03)", textAlign:"center" }}>
            <p style={{ color:"var(--text-dim)", fontSize:11 }}>© 2026 MobileShop — {SLOGAN}. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>

      {/* Modals */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddCart={addToCart} />}
      <CartSidebar cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeFromCart} />
    </div>
  );
}
