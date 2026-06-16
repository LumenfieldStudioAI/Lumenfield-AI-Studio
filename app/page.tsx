"use client";
import Link from "next/link";
import { type ReactNode, useState, useEffect } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const M = "#e8006f";
const ML = "#ff4da6";
const MD = "#9c004a";
const BG = "#050505";
const S1 = "#0f0f0f";
const S2 = "#161616";
const B1 = "#1f1f1f";
const B2 = "#2a2a2a";
const T1 = "#ffffff";
const T2 = "#a0a0a0";
const T3 = "#555555";

type Page =
  | "explore" | "cinema" | "audio" | "image" | "video" | "marketing"
  | "influencer" | "canvas" | "apps" | "library" | "login"
  | "pricing" | "mcp" | "collab" | "supercomputer" | "plugins";

type Mega = "image" | "video" | "audio" | null;
type CatalogItem = {
  title: string;
  desc: string;
  icon: string;
  badge?: "NEW" | "TOP" | "EXCLUSIVE";
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const IMG_F: CatalogItem[] = [
  {title:"Create Image",        desc:"Generate AI images",                              icon:"▧"},
  {title:"Cinematic Cameras",   desc:"Image generation with camera controls",           icon:"▣", badge:"TOP"},
  {title:"Canvas",              desc:"Visual ideation meets repeatable AI workflows",   icon:"⌘", badge:"NEW"},
  {title:"Moodboard",           desc:"Turn your references into a focused moodboard",   icon:"〰"},
  {title:"Soul ID Character",   desc:"Create unique reusable characters",               icon:"◎"},
  {title:"AI Influencer",       desc:"Create and manage your AI influencer",            icon:"✦"},
  {title:"Photodump",           desc:"Generate your aesthetic",                         icon:"▤", badge:"NEW"},
  {title:"Relight",             desc:"Adjust lighting position, color, and brightness", icon:"☼"},
  {title:"Inpaint",             desc:"Select an area, describe the change",             icon:"✐"},
  {title:"Image Upscale",       desc:"Enhance image quality",                           icon:"↗"},
  {title:"Face Swap",           desc:"Create realistic face swaps",                     icon:"▢"},
  {title:"Character Swap",      desc:"Create realistic character swaps",                icon:"♙"},
  {title:"Draw to Edit",        desc:"From sketch to picture",                          icon:"⌁"},
  {title:"Fashion Factory",     desc:"Create fashion sets",                             icon:"▣"},
];
const IMG_M: CatalogItem[] = [
  {title:"Lumenfield Soul 2.0",    desc:"Next generation ultra-realistic fashion visuals", icon:"∿", badge:"TOP"},
  {title:"Lumenfield Soul Cinema", desc:"Cinematic film-grade aesthetic",                  icon:"∿"},
  {title:"Lumenfield Popcorn",     desc:"Storyboard, edit, create",                        icon:"▱"},
  {title:"GPT Image 2",            desc:"4K images with near-perfect text rendering",       icon:"◌", badge:"NEW"},
  {title:"Recraft V4.1",           desc:"Photorealistic and expressive image generation",   icon:"◒", badge:"NEW"},
  {title:"Nano Banana 2",          desc:"Pro quality at Flash speed",                       icon:"⌁"},
  {title:"Nano Banana Pro",        desc:"Best 4K image model ever",                         icon:"⌁", badge:"TOP"},
  {title:"Seedream 5.0 Lite",      desc:"Intelligent visual reasoning",                     icon:"▥"},
  {title:"GPT Image 1.5",          desc:"True-color precision rendering",                   icon:"◎"},
  {title:"Grok Imagine",           desc:"Versatile image styles by xAI",                    icon:"◓"},
  {title:"FLUX.2",                 desc:"Speed-optimized detail",                           icon:"△"},
  {title:"Reve",                   desc:"Advanced image editing model",                     icon:"✣"},
  {title:"Z-Image",                desc:"Instant lifelike portraits",                       icon:"♜"},
  {title:"Topaz",                  desc:"High-resolution upscaler",                         icon:"▪"},
];
const VID_F: CatalogItem[] = [
  {title:"Create Video",     desc:"Generate AI videos",                         icon:"▯"},
  {title:"Cinema Studio",    desc:"Cinematic video with AI director",           icon:"▦", badge:"TOP"},
  {title:"Canvas",           desc:"Visual ideation meets repeatable workflows", icon:"⌘", badge:"NEW"},
  {title:"Mixed Media",      desc:"Create mixed media projects",                icon:"▧"},
  {title:"Edit Video",       desc:"Edit scenes, shots, elements",               icon:"▷"},
  {title:"Click to Ad",      desc:"Turn product URLs into video ads",           icon:"⌲"},
  {title:"Sora 2 Trends",    desc:"Turn ideas into viral videos",               icon:"✿"},
  {title:"Lipsync Studio",   desc:"Create talking clips",                       icon:"♩"},
  {title:"Draw to Video",    desc:"Sketch turns into a cinema",                 icon:"✐"},
  {title:"Sketch to Video",  desc:"From sketch to video with Sora 2",           icon:"〰"},
  {title:"UGC Factory",      desc:"Build UGC video with avatar",                icon:"▤"},
  {title:"Video Upscale",    desc:"Enhance video quality",                      icon:"↙"},
  {title:"Lumenfield Animate",desc:"Video smart replacement",                   icon:"☼"},
  {title:"Vibe Motion",      desc:"Create professional motion graphics",        icon:"▯"},
  {title:"Recast Studio",    desc:"Swap characters in videos",                  icon:"♭"},
];
const VID_M: CatalogItem[] = [
  {title:"Seedance 2.0",         desc:"Most advanced video model",                         icon:"▥", badge:"TOP"},
  {title:"Kling 3.0",            desc:"Cinematic videos with audio",                       icon:"◓", badge:"TOP"},
  {title:"Kling Motion Control", desc:"Transfer motion from video to image",               icon:"◓"},
  {title:"Kling O1 Edit",        desc:"Advanced video editing",                            icon:"◓"},
  {title:"Sora 2",               desc:"OpenAI's most advanced video model",                icon:"✿"},
  {title:"Google Veo 3.1 Lite",  desc:"Fast video generation by Google",                   icon:"G"},
  {title:"Google Veo 3.1",       desc:"Advanced AI video with sound",                      icon:"G"},
  {title:"HappyHorse",           desc:"Alibaba's ranked video and audio model",            icon:"〰"},
  {title:"Grok Imagine Video",   desc:"Cinematic videos with synchronized audio",          icon:"◒", badge:"NEW"},
  {title:"Wan 2.7",              desc:"AI video generation with first and end frame control",icon:"♜"},
  {title:"Minimax Hailuo 2.3",   desc:"Fastest high-dynamic video",                        icon:"≋"},
  {title:"Seedance 1.5 Pro",     desc:"Pro-grade audio-visual sync",                       icon:"▥"},
  {title:"Lumenfield DOP",       desc:"VFX and camera control",                            icon:"∿"},
];
const AUD_F: CatalogItem[] = [
  {title:"Voiceover",          desc:"Create expressive narration",             icon:"▌"},
  {title:"Change Voice",       desc:"Transform voice tone and identity",       icon:"≋"},
  {title:"Translation",        desc:"Localize voices across languages",        icon:"文"},
  {title:"Text to Speech",     desc:"Studio quality speech generation",        icon:"T"},
  {title:"Audio Localization", desc:"Match speech to markets and platforms",   icon:"◎"},
  {title:"Lipsync Audio",      desc:"Prepare audio for talking clips",         icon:"♩"},
];
const AUD_M: CatalogItem[] = [
  {title:"Eleven v3",             desc:"Expressive AI voice with emotion control", icon:"▌", badge:"TOP"},
  {title:"MiniMax Speech 2.8 HD", desc:"Studio-quality text-to-speech",            icon:"≋", badge:"NEW"},
  {title:"Seed Speech",           desc:"Multilingual text-to-speech",              icon:"▥"},
  {title:"VibeVoice",             desc:"Long-form expressive voice synthesis",     icon:"V"},
  {title:"Calm Narrator",         desc:"Clean narration for explainers",           icon:"◎"},
  {title:"Studio Voice Pro",      desc:"Premium voiceover production",             icon:"✦"},
];

const CMODELS = [
  { name:"Cinema Studio 3.5", tag:"NEW",       desc:"AI director · camera selection · style presets", group:"Cinematic" },
  { name:"Cinema Studio 3.0", tag:"",          desc:"Enhanced camera and speed ramp control",          group:"Cinematic" },
  { name:"Cinema Studio 2.5", tag:"",          desc:"Camera movements with start frame",               group:"Cinematic" },
  { name:"Seedance 2.0",      tag:"NEW",       desc:"720p · 4s–15s · ByteDance",                      group:"Featured"  },
  { name:"Seedance 2.0 Fast", tag:"NEW",       desc:"720p · fast render",                             group:"Featured"  },
  { name:"Kling 3.0",         tag:"EXCLUSIVE", desc:"4K · 3s–15s",                                    group:"Featured"  },
  { name:"Kling 3.0 MC",      tag:"",          desc:"1080p · motion control · 3s–30s",                group:"Featured"  },
  { name:"HappyHorse",        tag:"NEW",       desc:"1080p · 3s–15s",                                 group:"Featured"  },
];

const PRESETS = ["BASEBALL GAME","DRIFT RACING","CGI BREAKDOWN","STORM GIANT","ZOMBIE DANCE","RED CARPET","NEON CITY","OFFICE CCTV","DRAGON FANTASY","CLOUD SURF","ON FIRE","MUKBANG"];
const LSTEPS  = ["Analyzing prompt…","Selecting model…","Composing camera motion…","Rendering preview…"];

const UGC_T   = ["UGC","Product Demo","Founder Story","Testimonial","Unboxing","Problem / Solution","Luxury Ad","Meme Ad","Stop Scrolling","Before / After","Storytelling","Shock Factor"];
const HOOKS   = ["Strong Hook","Question Hook","Pain Point","Before / After","Shocking Claim","Social Proof","Fast Benefit","Problem Solution","Review","Unboxing"];
const SETS    = ["Home","Studio","Street","Office","Gym","Luxury Apartment","Store","Outdoor","Car","Beach","Bedroom","Kitchen","Restaurant"];
const AVTS    = ["Male","Female","Influencer","Fitness Coach","Business Owner","Tech Reviewer","Beauty Creator"];
const PLATS   = ["TikTok","Instagram","YouTube","Facebook"];
const VOCS    = ["Calm & Clear","Energetic","Professional","Friendly","Authoritative","Warm"];
const CTAS    = ["Shop Now","Learn More","Get Started","Order Today","Try for Free","Book a Call","Download Now"];
const AIENGS  = ["Runway Gen-4.5","Seedance 2.0 · Coming soon","Kling 3.0 · Coming soon","Google Veo 3.1 · Coming soon","OpenAI GPT-4.1 · Coming soon","ElevenLabs · Coming soon"];

const CHAR_T  = ["Human","Ant","Bee","Octopus","Crocodile","Alien","Beetle","Elf","Mantis"];
const GENS    = ["Female","Male","Trans man","Trans woman","Non-binary"];
const ETHS    = ["African","Asian","European","Indian","Middle Eastern","Mixed"];
const SKINS   = ["black","dark brown","white","purple","tan","olive","grey","green","metallic","iridescent"];
const EYES    = ["Black","Purple","Green","White","Brown","Deep Brown","Blue","Amber","Red","Grey"];
const HAIRS   = ["Short","Long","Curly","Bald","Braided","Wavy","Cyber Cut","Editorial"];
const MATS    = ["Human Skin","Scales","Fur","Metallic","Amphibian Skin","Iridescent","Soft Porcelain"];
const PATS    = ["Solid","Stripes","Spots","Chess Pattern","Visible Veins","Gradient Glow","Freckles"];

const APPS_D: Record<string,{name:string;desc:string;icon:string}[]> = {
  "Professional":       [{name:"Virality Predictor",desc:"Predict viral potential",icon:"📊"},{name:"Similarity Score",desc:"Visual likeness",icon:"🔍"},{name:"Expand Image",desc:"AI outpainting",icon:"↔"},{name:"Angles 2.0",desc:"Multi-angle shots",icon:"📐"},{name:"Shots",desc:"Cinematic composer",icon:"🎬"}],
  "Enhance & Style":    [{name:"Skin Enhancer",desc:"AI skin retouching",icon:"✨"},{name:"AI Stylist",desc:"Fashion recommendations",icon:"👗"},{name:"Relight",desc:"Pro lighting adj.",icon:"💡"},{name:"Outfit Swap",desc:"Virtual outfit",icon:"🔄"},{name:"Style Snap",desc:"Snap & style",icon:"📸"}],
  "Face & Identity":    [{name:"Face Swap",desc:"Seamless face replace",icon:"🎭"},{name:"Headshot Gen",desc:"Pro headshots",icon:"🖼"},{name:"Character Swap",desc:"Full character replace",icon:"🔀"},{name:"Recast",desc:"Scene character swap",icon:"🎬"},{name:"Video Face Swap",desc:"Video face swap",icon:"📹"}],
  "Video Editing":      [{name:"ClipCut",desc:"Auto edit viral clips",icon:"✂️"},{name:"Urban Cuts",desc:"Street-style video edits",icon:"🏙️"},{name:"Video Background Remover",desc:"Remove backgrounds from clips",icon:"▧"},{name:"Breakdown",desc:"Turn scenes into edit steps",icon:"🧩"},{name:"Japanese Show",desc:"Fast-paced show template",icon:"📺"}],
  "Ads & Products":     [{name:"Click to Ad",desc:"URL to video ad",icon:"🎯"},{name:"Billboard Ad",desc:"Billboard creator",icon:"🏙"},{name:"Bullet Time",desc:"Matrix bullet time",icon:"⚡"},{name:"Truck Ad",desc:"Vehicle ad creator",icon:"🚛"},{name:"UGC Factory",desc:"UGC content gen",icon:"📱"}],
  "Games & Characters": [{name:"Game Dump",desc:"Game-style scenes",icon:"🎮"},{name:"Nano Strike",desc:"Action sequences",icon:"⚔"},{name:"Nano Theft",desc:"Heist cinematic",icon:"🎰"},{name:"Simlife",desc:"Life simulation",icon:"🌍"},{name:"Plushies",desc:"Cute characters",icon:"🧸"}],
  "Extras":             [{name:"AI Meme Generator",desc:"Create memes from prompts",icon:"😄"},{name:"Background Remover",desc:"Clean transparent cutouts",icon:"◌"},{name:"Micro-Beasts",desc:"Tiny creature concepts",icon:"🔬"},{name:"Signboard",desc:"Text and sign mockups",icon:"🪧"},{name:"Paint App",desc:"Sketch into polished art",icon:"🎨"}],
  "Trending Templates": [{name:"On Fire",desc:"High-energy viral look",icon:"🔥"},{name:"Skibidi",desc:"Fast meme template",icon:"🎛️"},{name:"Mukbang",desc:"Food creator format",icon:"🍜"},{name:"Cloud Surf",desc:"Dreamlike motion shot",icon:"☁️"},{name:"Idol",desc:"Music star portrait style",icon:"🎤"}],
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#050505;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#050505}
::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
button,input,textarea,select{font-family:inherit}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.9}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(232,0,111,.3)}50%{box-shadow:0 0 50px rgba(232,0,111,.7)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.fu{animation:fadeUp .5s ease both}
.fi{animation:fadeIn .3s ease both}
.bm{background:#e8006f;color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.bm:hover{background:#ff4da6;transform:translateY(-1px);box-shadow:0 8px 28px rgba(232,0,111,.4)}
.bm:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}
.bg{background:transparent;color:#a0a0a0;border:1px solid #2a2a2a;border-radius:8px;padding:11px 24px;font-size:13px;cursor:pointer;transition:all .2s}
.bg:hover{border-color:#555;color:#fff}
.card{background:#0f0f0f;border:1px solid #1f1f1f;border-radius:12px;transition:all .2s}
.card:hover{border-color:#2a2a2a;transform:translateY(-2px)}
.inp{background:#161616;border:1px solid #1f1f1f;border-radius:8px;color:#fff;padding:10px 14px;font-size:13px;outline:none;transition:border-color .2s;width:100%}
.inp:focus{border-color:#e8006f}
.inp::placeholder{color:#555}
.sel{background:#161616;border:1px solid #1f1f1f;border-radius:7px;color:#fff;padding:8px 10px;font-size:12px;outline:none;cursor:pointer}
.sb{display:block;width:100%;text-align:left;background:none;border:none;color:#555;font-size:12px;padding:8px 12px;border-radius:7px;cursor:pointer;transition:all .15s}
.sb:hover{background:#161616;color:#a0a0a0}
.chip{display:inline-flex;align-items:center;background:#161616;border:1px solid #1f1f1f;border-radius:6px;padding:5px 10px;font-size:11px;color:#a0a0a0;cursor:pointer;transition:all .15s;white-space:nowrap}
.chip:hover,.chip.on{border-color:#e8006f;color:#ff4da6;background:rgba(232,0,111,.08)}
.uz{border:1px dashed #2a2a2a;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all .2s;background:#0f0f0f}
.uz:hover{border-color:#e8006f;background:rgba(232,0,111,.04)}
.nl{background:none;border:none;color:#555;font-size:12px;font-weight:500;padding:6px 10px;border-radius:6px;cursor:pointer;transition:color .15s;white-space:nowrap;display:flex;align-items:center;gap:5px}
.nl:hover,.nl.on{color:#fff}
.sk{background:linear-gradient(90deg,#0f0f0f 25%,#161616 50%,#0f0f0f 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:8px}
.tn{background:rgba(16,185,129,.15);color:#10b981;border:1px solid rgba(16,185,129,.3);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.tx{background:rgba(232,0,111,.15);color:#ff4da6;border:1px solid rgba(232,0,111,.3);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.mc{display:inline-flex;align-items:center;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:6px;padding:6px 12px;font-size:11px;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap}
.mc:hover,.mc.on{border-color:#e8006f;color:#ff4da6;background:rgba(232,0,111,.08)}
.pc{display:flex;align-items:center;gap:6px;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:8px;padding:8px 14px;font-size:12px;color:#888;cursor:pointer;transition:all .15s;font-weight:600}
.pc:hover,.pc.on{border-color:#e8006f;color:#fff;background:rgba(232,0,111,.1)}
.megaRow{display:grid;grid-template-columns:48px 1fr;gap:12px;align-items:center;width:100%;min-height:48px;background:transparent;border:0;border-radius:12px;padding:0;cursor:pointer;text-align:left;transition:background .16s,transform .16s}
.megaRow:hover{background:rgba(255,255,255,.035);transform:translateX(3px)}
.megaIcon{position:relative;width:48px;height:48px;border-radius:10px;background:#1b1d21;border:1px solid rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:900;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}
.megaRow:hover .megaIcon{border-color:rgba(232,0,111,.45);box-shadow:0 0 22px rgba(232,0,111,.18),inset 0 1px 0 rgba(255,255,255,.06)}
.megaBadge{position:absolute;left:6px;top:-8px;z-index:2}
.megaTitle{display:block;color:#fff;font-size:14px;font-weight:800;line-height:1.15;margin-bottom:5px}
.megaDesc{display:block;color:#8f8f8f;font-size:13px;line-height:1.25}
@media (max-width:760px){.megaRow{grid-template-columns:42px 1fr}.megaIcon{width:42px;height:42px}.megaTitle{font-size:13px}.megaDesc{font-size:12px}}
`;

// ─── MICRO COMPONENTS ────────────────────────────────────────────────────────
const Lbl = ({s}:{s:string}) => (
  <span style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:1}}>{s}</span>
);
const Hr = () => <div style={{height:1,background:B1,margin:"6px 0"}}/>;

function UZ({label,h=80}:{label:string;h?:number}) {
  const [hov,setHov] = useState(false);
  return (
    <div className="uz" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{height:h,flex:1,minWidth:100}}>
      <div style={{fontSize:20,color:hov?M:T3}}>+</div>
      <span style={{fontSize:10,color:hov?ML:T3,fontWeight:500}}>{label}</span>
    </div>
  );
}

function Sel({label,opts,val,set}:{label:string;opts:string[];val:string;set:(v:string)=>void}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <Lbl s={label}/>
      <select className="sel" value={val} onChange={e=>set(e.target.value)}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Logo({sz=28}:{sz?:number}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:sz,height:sz,borderRadius:7,background:`linear-gradient(135deg,${M},${MD})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:sz*.5,color:"#fff",flexShrink:0}}>L</div>
      <span style={{fontWeight:800,fontSize:Math.max(12,sz*.42),letterSpacing:-.5,whiteSpace:"nowrap",background:`linear-gradient(90deg,${T1} 0%,${T1} 42%,${M} 43%,${ML} 62%,${T3} 63%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Lumenfield AI Studio</span>
    </div>
  );
}

function Badge({label}:{label?: string}) {
  if (!label) return null;
  const bg = label === "TOP" ? M : label === "EXCLUSIVE" ? "#2563eb" : "#ccff00";
  const fg = label === "NEW" ? "#050505" : "#fff";
  return (
    <span style={{background:bg,color:fg,border:`1px solid ${label==="NEW"?"rgba(204,255,0,.45)":"rgba(255,255,255,.18)"}`,borderRadius:5,padding:"2px 6px",fontSize:9,fontWeight:900,lineHeight:1,letterSpacing:.3,transform:"rotate(-5deg)",boxShadow:`0 0 18px ${bg}55`}}>
      {label}
    </span>
  );
}

function MegaRow({item,onClick}:{item: CatalogItem; onClick:()=>void}) {
  return (
    <button onClick={onClick} className="megaRow">
      <span className="megaIcon">
        {item.badge && <span className="megaBadge"><Badge label={item.badge}/></span>}
        {item.icon}
      </span>
      <span style={{minWidth:0}}>
        <span className="megaTitle">{item.title}</span>
        <span className="megaDesc">{item.desc}</span>
      </span>
    </button>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({cur,go}:{cur:Page;go:(p:Page)=>void}) {
  const [mega,setMega] = useState<Mega>(null);

  const items = [
    {l:"Explore",        p:"explore"       as Page},
    {l:"Image",          m:"image"         as Mega},
    {l:"Video",          m:"video"         as Mega},
    {l:"Audio",          m:"audio"         as Mega},
    {l:"Supercomputer",  p:"supercomputer" as Page, badge:"NEW",   bc:"#10b981"},
    {l:"MCP & CLI",      p:"mcp"           as Page, badge:"NEW",   bc:"#10b981"},
    {l:"Collab",         p:"collab"        as Page},
    {l:"Plugins",        p:"plugins"       as Page, badge:"NEW",   bc:"#10b981"},
    {l:"Marketing Studio",p:"marketing"   as Page},
    {l:"Cinema Studio",  p:"cinema"        as Page},
    {l:"AI Influencer",  p:"influencer"    as Page},
    {l:"Canvas",         p:"canvas"        as Page},
    {l:"Apps",           p:"apps"          as Page},
    {l:"Pricing",        p:"pricing"       as Page, badge:"30% OFF",bc:M},
  ];

  const src: Record<Exclude<Mega, null>, {f: CatalogItem[]; m: CatalogItem[]; page: Page}> = {
    image: {f:IMG_F, m:IMG_M, page:"image"},
    video: {f:VID_F, m:VID_M, page:"video"},
    audio: {f:AUD_F, m:AUD_M, page:"audio"},
  };

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:900,background:"rgba(5,5,5,.96)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${B1}`,height:57,display:"flex",alignItems:"center",padding:"0 20px",gap:4}}
      onMouseLeave={()=>setMega(null)}>
      <button onClick={()=>{go("explore");setMega(null);}} style={{background:"none",border:"none",cursor:"pointer",marginRight:16,flexShrink:0}}>
        <Logo/>
      </button>
      <div style={{display:"flex",alignItems:"center",gap:2,flex:1,overflowX:"auto"}}>
        {items.map(it=>(
          <button key={it.l}
            className={`nl${it.p===cur?" on":""}`}
            onMouseEnter={()=>setMega((it as {m?:Mega}).m??null)}
            onClick={()=>{if(it.p){go(it.p);setMega(null);}}}
          >
            {it.l}
            {(it as {badge?:string;bc?:string}).badge&&(
              <span style={{background:(it as {bc?:string}).bc||M,color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:4,letterSpacing:.8,textTransform:"uppercase"}}>
                {(it as {badge?:string}).badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexShrink:0}}>
        <Link href="/sign-in" className="bg" style={{padding:"7px 16px",fontSize:12}}>Log in</Link>
        <Link href="/sign-up" className="bm" style={{padding:"7px 16px",fontSize:12}}>Sign up</Link>
      </div>
      {mega&&(()=>{
        const d = src[mega];
        return (
          <div style={{position:"absolute",top:57,left:8,width:"min(770px,calc(100vw - 16px))",maxHeight:"calc(100vh - 74px)",overflow:"auto",background:"rgba(22,22,22,.96)",backdropFilter:"blur(24px)",border:`1px solid ${B1}`,borderRadius:24,padding:"18px 18px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,zIndex:1000,boxShadow:"0 28px 90px rgba(0,0,0,.7), 0 0 0 1px rgba(232,0,111,.04)",animation:"fadeUp .18s ease both"}}>
            <div>
              <div style={{fontSize:13,color:T3,margin:"0 0 10px"}}>Features</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {d.f.map(f=><MegaRow key={f.title} item={f} onClick={()=>{go(d.page);setMega(null);}}/>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:13,color:T3,margin:"0 0 10px"}}>Models</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {d.m.map(m=><MegaRow key={m.title} item={m} onClick={()=>{go(d.page);setMega(null);}}/>)}
              </div>
            </div>
          </div>
        );
      })()}
    </nav>
  );
}

// ─── EXPLORE ─────────────────────────────────────────────────────────────────
function ExplorePage({go}:{go:(p:Page)=>void}) {
  const [tick,setTick] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(x=>x+1),2600);return()=>clearInterval(t);},[]);
  const words = ["image","video","audio","ads","characters","content"];
  const cards = [
    {n:"Cinema Studio 3.5",d:"AI director · camera control",i:"🎥",p:"cinema" as Page,a:M},
    {n:"Seedance 2.0",     d:"720p cinematic video",        i:"⚡",p:"cinema" as Page,a:"#6366f1"},
    {n:"Marketing Studio", d:"Product ads in seconds",      i:"📱",p:"marketing" as Page,a:M},
    {n:"AI Influencer",    d:"Build virtual creators",      i:"🤖",p:"influencer" as Page,a:"#10b981"},
    {n:"Lumenfield Visual Pro", d:"Photorealistic images",  i:"🎨",p:"image" as Page,a:"#f59e0b"},
    {n:"Audio Studio",     d:"Voices in 30+ languages",     i:"🎙",p:"audio" as Page,a:"#06b6d4"},
    {n:"Canvas",           d:"AI visual workspace",         i:"🖼",p:"canvas" as Page,a:"#8b5cf6"},
  ];
  const showcase = [
    {n:"Lumenfield Games", d:"Build playable concepts, art, sounds and characters from one creative brief.", p:"supercomputer" as Page, bg:"linear-gradient(135deg,#111827,#2a1020 48%,#050505)", glow:"#7dd3fc"},
    {n:"DaVinci Resolve Plugin", d:"Generate, reframe and upscale footage directly inside your editing workflow.", p:"plugins" as Page, bg:"linear-gradient(135deg,#f8fafc,#e5e7eb)", light:true, glow:M},
    {n:"Introducing Recraft 4.1", d:"Crisp vectors, refined aesthetics and controlled visual styles for campaigns.", p:"image" as Page, bg:"conic-gradient(from 120deg,#ccff00,#ff9f1c,#e8006f,#2563eb,#ccff00)", glow:"#ff4da6"},
    {n:"Lumenfield Mod", d:"Create game worlds, props and cinematic scenes directly from prompts.", p:"apps" as Page, bg:"linear-gradient(135deg,#6ee7b7,#60a5fa 55%,#8b5cf6)", glow:"#60a5fa"},
  ];
  const productCards = [
    {n:"MCP & CLI", d:"Turn your favorite AI assistant into a creative engine.", i:"</>", p:"mcp" as Page, b:"NEW"},
    {n:"Marketing Studio", d:"Turn any product into a complete video ad campaign.", i:"▣", p:"marketing" as Page, b:"TRENDING"},
    {n:"Cinema Studio 3.5", d:"Create cinematic shots with camera and model control.", i:"▥", p:"cinema" as Page, b:"TOP"},
    {n:"Lumenfield Canvas", d:"Generate images, videos and ideas on one board.", i:"⌘", p:"canvas" as Page, b:"NEW"},
    {n:"AI Influencer", d:"Build reusable virtual characters and creators.", i:"✦", p:"influencer" as Page, b:"TRENDING"},
    {n:"Original Series", d:"Plan episodic AI stories, scenes and character arcs.", i:"▤", p:"apps" as Page, b:"NEW"},
  ];
  const platformFeatures = [
    {n:"Cinema Studio", d:"Professional filmmaking workspace with camera direction, model selection and scene controls.", i:"▥", p:"cinema" as Page},
    {n:"Lumenfield Soul", d:"Create consistent characters, fashion visuals and reusable identities for campaigns.", i:"∿", p:"image" as Page},
    {n:"AI Video", d:"Generate cinematic clips with Runway, Kling, Veo, Seedance and future provider adapters.", i:"▶", p:"video" as Page},
    {n:"Lip Sync & Avatars", d:"Build talking clips, UGC presenters and voice-led character content.", i:"♩", p:"audio" as Page},
    {n:"Canvas & Editing", d:"Plan boards, edit images, relight scenes, upscale assets and organize references.", i:"⌘", p:"canvas" as Page},
    {n:"Supercomputer", d:"Route one creative prompt into video, image, audio, marketing and automation workflows.", i:"✣", p:"supercomputer" as Page},
  ];
  const pricePreview = [
    {n:"Starter", price:"$19", d:"For creators testing ideas.", f:["1,000 credits","Core image and video tools","Library access"], p:"pricing" as Page},
    {n:"Pro", price:"$49", d:"For daily creative production.", f:["5,000 credits","Cinema Studio access","Priority generation"], p:"pricing" as Page, hot:true},
    {n:"Enterprise", price:"Custom", d:"For teams and studios.", f:["Team workspace","Custom API access","Dedicated support"], p:"pricing" as Page},
  ];
  const gallery = ["Cinematic Scene","Portrait System","Product Visual","Video Clip","Editorial Story","Style Transfer"];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG,overflowX:"hidden"}}>
      {/* HERO */}
      <section style={{position:"relative",padding:"100px 48px 80px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${M},transparent)`,animation:"scan 7s linear infinite",opacity:.35}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"48px 48px",opacity:.2,maskImage:"radial-gradient(ellipse 80% 60% at 50% 50%,black,transparent)"}}/>
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:350,background:`radial-gradient(ellipse,rgba(232,0,111,.1),transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"clamp(80px,16vw,220px)",fontWeight:900,color:"transparent",WebkitTextStroke:`1px ${B2}`,letterSpacing:-8,lineHeight:1,userSelect:"none",pointerEvents:"none",whiteSpace:"nowrap"}}>LUMENFIELD</div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${B2}`,borderRadius:20,padding:"5px 14px",fontSize:11,color:T3,background:S1,marginBottom:32}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:M,animation:"pulse 2s ease-in-out infinite"}}/>
            The AI Creative Command Center
          </div>
          <h1 style={{fontSize:"clamp(38px,6vw,82px)",fontWeight:900,color:T1,letterSpacing:-3,lineHeight:1.02,marginBottom:20,maxWidth:820,margin:"0 auto 20px"}}>
            Create stunning{" "}
            <span style={{color:M,display:"inline-block",minWidth:180,transition:"all .3s"}}>{words[tick%words.length]}</span>
            <br/>with one command.
          </h1>
          <p style={{color:T2,fontSize:16,maxWidth:480,margin:"0 auto 36px",lineHeight:1.65}}>All models. All modalities. One platform built for creators who move fast.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="bm" onClick={()=>go("cinema")} style={{padding:"14px 34px",fontSize:14,animation:"glow 3s ease-in-out infinite"}}>Launch Studio →</button>
            <button className="bg" onClick={()=>go("apps")} style={{padding:"14px 34px",fontSize:14}}>Explore Apps</button>
          </div>
          <div style={{display:"flex",gap:48,justifyContent:"center",marginTop:56,flexWrap:"wrap"}}>
            {[["2M+","Creators"],["50+","AI Models"],["10B+","Frames rendered"],["99.9%","Uptime"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:24,fontWeight:800,color:T1,letterSpacing:-1}}>{n}</div>
                <div style={{fontSize:11,color:T3,marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* EXPLORE HUB */}
      <section style={{padding:"0 28px 26px",maxWidth:1440,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:14,marginBottom:18}}>
          {showcase.map((s,i)=>(
            <button key={s.n} onClick={()=>go(s.p)} className="card"
              style={{minHeight:210,overflow:"hidden",padding:0,textAlign:"left",cursor:"pointer",borderRadius:14,background:S1,border:`1px solid ${B1}`,boxShadow:"0 16px 40px rgba(0,0,0,.22)"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 24px 70px ${s.glow}33`;e.currentTarget.style.borderColor=`${s.glow}66`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.22)";e.currentTarget.style.borderColor=B1;}}
            >
              <div style={{height:136,background:s.bg,position:"relative",borderRadius:"14px 14px 0 0",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:30,borderRadius:22,background:s.light?"rgba(255,255,255,.55)":"rgba(255,255,255,.08)",backdropFilter:"blur(12px)"}}/>
                <div style={{position:"absolute",left:38+i*18,top:28,width:110,height:110,borderRadius:"50%",background:`radial-gradient(circle,${s.light?"#fff":s.glow},transparent 65%)`,filter:"blur(6px)",opacity:s.light ? .65 : .45}}/>
                <div style={{position:"absolute",right:18,bottom:14,width:72,height:72,borderRadius:18,background:`linear-gradient(135deg,${M},${ML})`,transform:`rotate(${i%2?8:-8}deg)`,opacity:i===1 ? .12 : .8}}/>
              </div>
              <div style={{padding:"16px 16px 18px"}}>
                <div style={{color:s.light?"#fff":T1,fontSize:15,fontWeight:900,textTransform:"uppercase",letterSpacing:-.3,marginBottom:8}}>{s.n}</div>
                <div style={{color:T2,fontSize:13,lineHeight:1.45}}>{s.d}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"minmax(260px, .9fr) 1.6fr",gap:14,background:"rgba(18,20,25,.72)",border:`1px solid ${B1}`,borderRadius:24,padding:14,backdropFilter:"blur(20px)",boxShadow:"0 24px 80px rgba(0,0,0,.26)"}}>
          <button onClick={()=>go("supercomputer")} className="card"
            style={{minHeight:300,padding:26,textAlign:"left",cursor:"pointer",borderRadius:18,position:"relative",overflow:"hidden",background:`linear-gradient(135deg,rgba(232,0,111,.18),rgba(18,20,25,.95) 54%,rgba(232,0,111,.1))`,border:`1px solid ${M}44`}}>
            <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"54px 54px",opacity:.28}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
                <h3 style={{fontSize:26,fontWeight:950,letterSpacing:-1,textTransform:"uppercase"}}>Supercomputer</h3>
                <Badge label="NEW"/>
              </div>
              <p style={{color:T2,fontSize:15,lineHeight:1.55,maxWidth:260,marginBottom:32}}>Agents, automation, skills, connectors and AI workflows in one command center.</p>
              <span style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:"#050505",borderRadius:10,padding:"12px 18px",fontSize:13,fontWeight:900}}>Try now ↗</span>
            </div>
            {[0,1,2].map(i=><span key={i} style={{position:"absolute",right:44+i*52,bottom:34+i*42,width:78,height:78,borderRadius:18,background:`linear-gradient(135deg,#ccff00,${M})`,transform:`rotate(${12+i*17}deg)`,boxShadow:`0 20px 50px ${M}33`}}/>)}
          </button>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:12}}>
            {productCards.map(p=>(
              <button key={p.n} onClick={()=>go(p.p)} className="card"
                style={{padding:22,minHeight:140,textAlign:"left",cursor:"pointer",borderRadius:14,background:S1,border:`1px solid ${B1}`,position:"relative",overflow:"hidden"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${M}66`;e.currentTarget.style.background=`linear-gradient(135deg,${S1},rgba(232,0,111,.08))`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=B1;e.currentTarget.style.background=S1;}}
              >
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:26}}>
                  <span style={{width:42,height:42,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:S2,color:T1,fontWeight:900}}>{p.i}</span>
                  <Badge label={p.b}/>
                </div>
                <div style={{color:T1,fontSize:15,fontWeight:850,marginBottom:8}}>{p.n}</div>
                <div style={{color:T3,fontSize:12,lineHeight:1.45}}>{p.d}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURED */}
      <section style={{padding:"0 48px 64px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <Lbl s="Featured Tools"/>
          <button className="bg" onClick={()=>go("apps")} style={{padding:"5px 14px",fontSize:11}}>View all →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(168px,1fr))",gap:10}}>
          {cards.map(c=>(
            <button key={c.n} onClick={()=>go(c.p)} className="card"
              style={{padding:"20px 16px",textAlign:"left",cursor:"pointer",background:S1,border:`1px solid ${B1}`}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=c.a;(e.currentTarget as HTMLButtonElement).style.background=`${c.a}08`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=B1;(e.currentTarget as HTMLButtonElement).style.background=S1;}}
            >
              <div style={{fontSize:26,marginBottom:10}}>{c.i}</div>
              <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:4}}>{c.n}</div>
              <div style={{color:T3,fontSize:11}}>{c.d}</div>
            </button>
          ))}
        </div>
      </section>
      {/* PRESETS */}
      <section style={{padding:"0 48px 80px",maxWidth:1280,margin:"0 auto"}}>
        <Lbl s="Viral Presets"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginTop:16}}>
          {PRESETS.map(p=>(
            <button key={p} onClick={()=>go("cinema")}
              style={{background:S1,border:`1px solid ${B1}`,borderRadius:8,padding:"14px 10px",color:T3,fontSize:10,fontWeight:800,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=`${M}10`;(e.currentTarget as HTMLButtonElement).style.color=ML;(e.currentTarget as HTMLButtonElement).style.borderColor=`${M}50`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=S1;(e.currentTarget as HTMLButtonElement).style.color=T3;(e.currentTarget as HTMLButtonElement).style.borderColor=B1;}}
            >{p}</button>
          ))}
        </div>
      </section>
      {/* PLATFORM */}
      <section style={{padding:"0 48px 72px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <Lbl s="Platform"/>
          <h2 style={{fontSize:"clamp(26px,4vw,48px)",fontWeight:900,letterSpacing:-1.8,marginTop:10,marginBottom:10}}>Everything you need to create</h2>
          <p style={{color:T2,fontSize:15,lineHeight:1.65,maxWidth:680,margin:"0 auto"}}>From photorealistic images to cinematic videos, Lumenfield AI Studio brings premium AI models, studio tools and automation into one original creative command center.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          {platformFeatures.map((f,i)=>(
            <button key={f.n} onClick={()=>go(f.p)} className="card"
              style={{padding:24,minHeight:170,textAlign:"left",cursor:"pointer",borderRadius:18,background:`linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015)),${S1}`,border:`1px solid ${B1}`,position:"relative",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=`${M}66`;e.currentTarget.style.boxShadow=`0 24px 60px rgba(232,0,111,.16)`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=B1;e.currentTarget.style.boxShadow="none";}}
            >
              <div style={{position:"absolute",right:-30,top:-30,width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${i%2?ML:M}22,transparent 68%)`}}/>
              <div style={{width:48,height:48,borderRadius:14,background:`linear-gradient(135deg,${M},${MD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,marginBottom:18,boxShadow:`0 16px 38px ${M}22`}}>{f.i}</div>
              <h3 style={{fontSize:17,fontWeight:900,letterSpacing:-.4,marginBottom:8}}>{f.n}</h3>
              <p style={{color:T2,fontSize:13,lineHeight:1.55}}>{f.d}</p>
            </button>
          ))}
        </div>
      </section>
      {/* PRICING PREVIEW */}
      <section style={{padding:"0 48px 72px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:20,marginBottom:22,flexWrap:"wrap"}}>
          <div>
            <Lbl s="Pricing"/>
            <h2 style={{fontSize:"clamp(24px,3vw,40px)",fontWeight:900,letterSpacing:-1.4,marginTop:8}}>Simple creative power</h2>
          </div>
          <button className="bg" onClick={()=>go("pricing")} style={{padding:"10px 18px"}}>View full pricing →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
          {pricePreview.map(plan=>(
            <button key={plan.n} onClick={()=>go(plan.p)} className="card"
              style={{padding:24,textAlign:"left",cursor:"pointer",borderRadius:18,background:plan.hot?`linear-gradient(180deg,rgba(232,0,111,.14),rgba(18,20,25,.88))`:S1,border:`1px solid ${plan.hot?M:B1}`,position:"relative",overflow:"hidden"}}
            >
              {plan.hot&&<span style={{position:"absolute",top:16,right:16}}><Badge label="TOP"/></span>}
              <div style={{fontSize:18,fontWeight:900,marginBottom:10}}>{plan.n}</div>
              <div style={{fontSize:36,fontWeight:950,letterSpacing:-1.6,marginBottom:8}}>{plan.price}<span style={{fontSize:13,color:T3,fontWeight:600}}>{plan.price==="Custom"?"":" /mo"}</span></div>
              <p style={{color:T2,fontSize:13,lineHeight:1.5,marginBottom:18}}>{plan.d}</p>
              <div style={{display:"grid",gap:8}}>
                {plan.f.map(x=><span key={x} style={{color:T2,fontSize:12}}>✓ {x}</span>)}
              </div>
            </button>
          ))}
        </div>
      </section>
      {/* GALLERY */}
      <section style={{padding:"0 48px 80px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <Lbl s="Gallery"/>
          <h2 style={{fontSize:"clamp(24px,3vw,40px)",fontWeight:900,letterSpacing:-1.4,marginTop:8}}>What is possible with Lumenfield AI Studio</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
          {gallery.map((g,i)=>(
            <button key={g} onClick={()=>go(i%2?"image":"cinema")} className="card"
              style={{height:150,borderRadius:18,cursor:"pointer",border:`1px solid ${B1}`,background:`linear-gradient(135deg,rgba(232,0,111,${.14+i*.015}),rgba(255,77,166,.05)),radial-gradient(circle at ${20+i*13}% ${20+i*9}%,rgba(255,255,255,.22),transparent 25%),${S1}`,color:T1,fontSize:14,fontWeight:900,display:"flex",alignItems:"end",padding:18,textAlign:"left"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor=`${M}66`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=B1;}}
            >{g}</button>
          ))}
        </div>
      </section>
      <AIStudioWorkspace/>
      <AIEngineRoadmap/>
      <WorkflowControlRoom/>

      {/* CTA */}
      <section style={{margin:"0 auto 80px",background:S1,border:`1px solid ${B1}`,borderRadius:16,padding:"52px",textAlign:"center",position:"relative",overflow:"hidden",maxWidth:1184}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${M},transparent)`}}/>
        <h2 style={{fontSize:"clamp(22px,3vw,42px)",fontWeight:800,letterSpacing:-1.5,marginBottom:12}}>Ready to generate the impossible?</h2>
        <p style={{color:T2,fontSize:14,marginBottom:28}}>Join 2 million creators. No credit card required.</p>
        <button className="bm" onClick={()=>go("login")} style={{padding:"14px 36px",fontSize:14}}>Start for free →</button>
      </section>
    </div>
  );
}

// ─── AI STUDIO WORKSPACE ─────────────────────────────────────────────────────
function AIStudioWorkspace() {
  type WorkspaceMode = "supercomputer" | "cinema";
  type StudioTask = {
    id: string;
    prompt: string;
    model: string;
    status: "queued" | "running" | "completed" | "failed";
    createdAt: string;
    videoUrl?: string;
    error?: string;
  };

  const [active,setActive] = useState<WorkspaceMode>("supercomputer");
  const [prompt,setPrompt] = useState("");
  const [model,setModel] = useState("Runway Gen-4.5");
  const [ratio,setRatio] = useState("1280:720");
  const [duration,setDuration] = useState<5 | 10>(5);
  const [plusOpen,setPlusOpen] = useState(false);
  const [status,setStatus] = useState("Ready");
  const [preview,setPreview] = useState("");
  const [tasks,setTasks] = useState<StudioTask[]>([]);
  const [working,setWorking] = useState(false);

  const models = [
    {n:"Runway Gen-4.5", live:true},
    {n:"Runway Gen-4 Turbo · Coming soon", live:false},
    {n:"Google Veo 3.1 · Coming soon", live:false},
    {n:"Kling 3.0 · Coming soon", live:false},
    {n:"Seedance 2.0 · Coming soon", live:false},
  ];
  const attach = ["Upload image","Image","Video","Product photo","Character","Audio"];
  const modes = [
    {id:"supercomputer" as const, label:"Supercomputer"},
    {id:"cinema" as const, label:"Cinema Studio"},
  ];

  const updateTask = (id:string, patch:Partial<StudioTask>) => {
    setTasks(prev=>prev.map(t=>t.id===id ? {...t,...patch} : t));
  };

  const startGeneration = async () => {
    if (!prompt.trim()) {
      setStatus("Prompt required");
      return;
    }
    const id = `${Date.now()}`;
    const createdAt = new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
    const nextTask: StudioTask = {id,prompt:prompt.trim(),model,status:"queued",createdAt};
    setTasks(prev=>[nextTask,...prev].slice(0,8));
    setPreview("");
    setWorking(true);

    if (model !== "Runway Gen-4.5") {
      const message = `${model} is coming soon. Runway Gen-4.5 is active now.`;
      setStatus(message);
      updateTask(id,{status:"failed",error:message});
      setWorking(false);
      return;
    }

    try {
      setStatus("Starting Runway generation...");
      const start = await fetch("/api/generate-video", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt:prompt.trim(), ratio, duration}),
      });
      const startData = await start.json() as {ok?:boolean; taskId?:string; status?:string; error?:string};
      if (!start.ok || !startData.taskId) throw new Error(startData.error || "Runway task could not start.");

      updateTask(id,{status:"running"});
      setStatus(`Runway task ${startData.status || "queued"}`);

      for (let attempt=1; attempt<=72; attempt++) {
        await new Promise(r=>setTimeout(r,5000));
        const check = await fetch(`/api/check-video?taskId=${encodeURIComponent(startData.taskId)}`, {cache:"no-store"});
        const data = await check.json() as {ok?:boolean; status?:string; output?:unknown; failure?:unknown; error?:string};
        if (!check.ok) throw new Error(data.error || "Runway status could not be checked.");

        const nextStatus = String(data.status || "running");
        setStatus(`Rendering: ${nextStatus}`);
        const lower = nextStatus.toLowerCase();
        if (lower.includes("fail") || data.failure) throw new Error("Runway generation failed.");

        if (lower.includes("succeed") || lower.includes("complete")) {
          const output = Array.isArray(data.output) ? data.output : data.output ? [data.output] : [];
          const url = output.find((item): item is string => typeof item === "string" && item.startsWith("http"));
          if (!url) throw new Error("Video completed, but no video URL was returned.");
          setPreview(url);
          updateTask(id,{status:"completed",videoUrl:url});
          setStatus("Completed");
          setWorking(false);
          return;
        }
      }
      throw new Error("Video is still rendering. Open history and try again in a moment.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed.";
      setStatus(message);
      updateTask(id,{status:"failed",error:message});
      setWorking(false);
    }
  };

  return (
    <section id="studio-workspace" style={{maxWidth:1280,margin:"0 auto 56px",padding:"0 16px"}}>
      <div style={{display:"flex",alignItems:"end",justifyContent:"space-between",gap:16,marginBottom:18,flexWrap:"wrap"}}>
        <div>
          <Lbl s="Live workspace"/>
          <h2 style={{fontSize:"clamp(26px,4vw,48px)",fontWeight:950,letterSpacing:-1.6,marginTop:8}}>Lumenfield AI Studio</h2>
          <p style={{color:T2,fontSize:14,lineHeight:1.7,maxWidth:620,marginTop:8}}>A real creative workspace with Runway video generation, task history, preview and model routing.</p>
        </div>
        <div style={{display:"flex",gap:8,background:S1,border:`1px solid ${B1}`,borderRadius:14,padding:5}}>
          {modes.map(m=>(
            <button key={m.id} onClick={()=>setActive(m.id)} className={active===m.id?"bm":"bg"} style={{padding:"9px 16px",fontSize:12,borderRadius:10}}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"250px minmax(0,1fr)",minHeight:720,border:`1px solid ${B1}`,borderRadius:26,overflow:"hidden",background:"#08090b",boxShadow:"0 30px 110px rgba(0,0,0,.42)"}}>
        <aside style={{background:"#111216",borderRight:`1px solid ${B1}`,padding:16,display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 10px 16px"}}>
            <Logo sz={34}/>
            <div>
              <div style={{color:T1,fontSize:13,fontWeight:900}}>Lumenfield</div>
              <div style={{color:T3,fontSize:10}}>AI Studio</div>
            </div>
          </div>
          {["New task","Search","Marketplace  NEW","My Generations","Projects","New project"].map(item=>(
            <button key={item} className="sb" style={{fontSize:13,padding:"10px 12px",color:item.includes("NEW")?ML:T2}}>
              {item}
            </button>
          ))}
          <div style={{flex:1}}/>
          <button className="bm" style={{fontSize:12,padding:"10px 12px"}}>Pricing</button>
          <button className="bg" style={{fontSize:12,padding:"10px 12px"}}>Log in</button>
        </aside>

        <div style={{display:"grid",gridTemplateRows:"minmax(0,1fr) auto",minWidth:0}}>
          <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 300px",minHeight:0}}>
            <main style={{position:"relative",overflow:"auto",padding:24,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"36px 36px"}}>
              {active==="supercomputer" ? (
                <div style={{minHeight:450,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",position:"relative"}}>
                  <div style={{position:"absolute",inset:"12% 10%",background:`radial-gradient(circle at 50% 50%,${M}33,transparent 35%),radial-gradient(circle at 30% 35%,rgba(199,255,0,.14),transparent 24%)`,filter:"blur(4px)"}}/>
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{width:150,height:150,borderRadius:"50%",margin:"0 auto 28px",background:`radial-gradient(circle, #c7ff00 0%, ${M} 42%, transparent 68%)`,boxShadow:`0 0 90px ${M}66`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <div style={{width:72,height:72,borderRadius:"50%",background:"#c7ff00",boxShadow:"0 0 44px rgba(199,255,0,.95)"}}/>
                    </div>
                    {[
                      ["14%","24%"],["78%","18%"],["18%","74%"],["82%","70%"],["50%","14%"],
                    ].map(([l,t],i)=>(
                      <div key={i} style={{position:"absolute",left:l,top:t,width:10,height:10,borderRadius:"50%",background:i%2?M:"#c7ff00",boxShadow:`0 0 20px ${i%2?M:"#c7ff00"}`}}/>
                    ))}
                    <h3 style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:950,letterSpacing:-1.5}}>Supercomputer memory</h3>
                    <p style={{color:T2,fontSize:15,marginTop:10}}>Learning from every generation.</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,marginBottom:16,flexWrap:"wrap"}}>
                    <div>
                      <h3 style={{fontSize:32,fontWeight:950,letterSpacing:-1.2}}>Cinema Studio</h3>
                      <p style={{color:T2,fontSize:14,marginTop:6}}>Create cinematic AI videos from prompts, references and product shots.</p>
                    </div>
                    <span className="tn">Runway active</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:16}}>
                    <div className="card" style={{padding:16}}>
                      <Lbl s="Aspect ratio"/>
                      <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
                        {[["16:9","1280:720"],["9:16","720:1280"],["1:1","1280:720"]].map(([label,value])=>(
                          <button key={label} onClick={()=>setRatio(value)} className={ratio===value?"bm":"bg"} style={{fontSize:12,padding:"8px 12px"}}>{label}</button>
                        ))}
                      </div>
                    </div>
                    <div className="card" style={{padding:16}}>
                      <Lbl s="Duration"/>
                      <div style={{display:"flex",gap:8,marginTop:10}}>
                        {([5,10] as const).map(d=>(
                          <button key={d} onClick={()=>setDuration(d)} className={duration===d?"bm":"bg"} style={{fontSize:12,padding:"8px 12px"}}>{d}s</button>
                        ))}
                      </div>
                    </div>
                    <UZ label="Start Frame" h={96}/>
                    <UZ label="End Frame" h={96}/>
                  </div>
                  <div className="card" style={{minHeight:300,padding:18,display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(circle at 50% 30%,rgba(232,0,111,.18),transparent 34%),#0b0c0f"}}>
                    {preview ? (
                      <video src={preview} controls playsInline style={{width:"100%",maxHeight:420,borderRadius:14,background:"#000"}}/>
                    ) : (
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:42,marginBottom:10}}>▶</div>
                        <div style={{fontSize:18,fontWeight:900}}>Video preview</div>
                        <div style={{color:T3,fontSize:12,marginTop:6}}>Your generated Runway result will appear here.</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </main>

            <aside style={{borderLeft:`1px solid ${B1}`,background:S1,padding:16,overflow:"auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <h3 style={{fontSize:15,fontWeight:900}}>Generation history</h3>
                <span style={{fontSize:11,color:T3}}>{tasks.length} tasks</span>
              </div>
              <div style={{display:"grid",gap:10}}>
                {tasks.length===0&&(
                  <div className="card" style={{padding:16,textAlign:"center",color:T3,fontSize:12,lineHeight:1.6}}>
                    Your generations will appear here.
                  </div>
                )}
                {tasks.map(t=>(
                  <div key={t.id} className="card" style={{padding:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:10,marginBottom:7}}>
                      <span style={{color:T1,fontSize:12,fontWeight:800}}>{t.model}</span>
                      <span style={{fontSize:10,color:t.status==="completed"?"#c7ff00":t.status==="failed"?ML:T3,textTransform:"uppercase",fontWeight:900}}>{t.status}</span>
                    </div>
                    <div style={{color:T2,fontSize:11,lineHeight:1.45,marginBottom:8}}>{t.prompt.length>78?t.prompt.slice(0,78)+"...":t.prompt}</div>
                    <div style={{color:T3,fontSize:10,marginBottom:t.videoUrl?8:0}}>{t.createdAt}</div>
                    {t.videoUrl&&<video src={t.videoUrl} controls playsInline style={{width:"100%",borderRadius:8,background:"#000",marginTop:6}}/>}
                    {t.error&&<div style={{color:ML,fontSize:10,lineHeight:1.4,marginTop:6}}>{t.error}</div>}
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div style={{borderTop:`1px solid ${B1}`,background:"#111216",padding:16}}>
            <div style={{display:"grid",gridTemplateColumns:"auto minmax(0,1fr) 220px auto",gap:10,alignItems:"end"}}>
              <div style={{position:"relative"}}>
                <button onClick={()=>setPlusOpen(v=>!v)} className="bg" style={{width:44,height:44,padding:0,borderRadius:14,fontSize:20}}>+</button>
                {plusOpen&&(
                  <div style={{position:"absolute",bottom:"115%",left:0,width:180,background:S1,border:`1px solid ${B1}`,borderRadius:12,padding:8,boxShadow:"0 20px 60px rgba(0,0,0,.65)",zIndex:20}}>
                    {attach.map(a=><button key={a} onClick={()=>setPlusOpen(false)} className="sb" style={{color:T2}}>{a}</button>)}
                  </div>
                )}
              </div>
              <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} rows={2} placeholder="Make a cinematic product video from this idea..." style={{resize:"none",minHeight:58,lineHeight:1.5}}/>
              <select className="sel" value={model} onChange={e=>setModel(e.target.value)} style={{height:44}}>
                {models.map(m=><option key={m.n} value={m.n}>{m.n}{m.live?"":" — Coming soon"}</option>)}
              </select>
              <button className="bm" onClick={startGeneration} disabled={working} style={{height:44,minWidth:124}}>
                {working?"Generating...":"Generate"}
              </button>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,marginTop:10,flexWrap:"wrap"}}>
              <div style={{color:status==="Prompt required" || status.toLowerCase().includes("failed") || status.toLowerCase().includes("secret") ? ML : T3,fontSize:12}}>{status}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span className="chip">Ratio: {ratio==="720:1280"?"9:16":"16:9"}</span>
                <span className="chip">Duration: {duration}s</span>
                <span className="chip">Functional: Runway Gen-4.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIEngineRoadmap() {
  const engines = [
    {i:"🎬",t:"Video Engine",d:"Runway Gen-4.5 active now. Kling, Veo and Seedance adapters prepared as staged providers.",s:"ACTIVE"},
    {i:"🖼",t:"Image Engine",d:"Unified image route for prompt, reference, inpaint, upscale and product photography workflows.",s:"READY"},
    {i:"🎙",t:"Audio Engine",d:"Voiceover, translation, lipsync audio and studio narration can run behind protected server routes.",s:"NEXT"},
    {i:"📣",t:"Marketing Engine",d:"Product URL intake, hook generation, UGC scripts, avatar selection and ad variation builder.",s:"READY"},
    {i:"👤",t:"Influencer Engine",d:"Character builder, identity memory, reusable style profiles and campaign-ready talent cards.",s:"READY"},
    {i:"💳",t:"Credits & Payments",d:"Stripe-ready credit logic with protected paid calls and server-side secret handling.",s:"PLANNED"},
  ];
  const routes = [
    "/api/generate-video",
    "/api/check-video",
    "/api/generate/image",
    "/api/generate/audio",
    "/api/generate/marketing",
    "/api/generate/influencer",
  ];
  const stack = ["Next.js App Router","TypeScript-safe UI","Server API routes","Runway API secret protected","Generation history","Future Stripe credits"];
  return (
    <section style={{maxWidth:1280,margin:"0 auto 56px",padding:"0 16px"}}>
      <div style={{background:`linear-gradient(135deg,rgba(232,0,111,.12),rgba(255,77,166,.04) 42%,rgba(255,255,255,.02))`,border:`1px solid ${B1}`,borderRadius:26,padding:"28px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${M}55 1px, transparent 1px)`,backgroundSize:"22px 22px",opacity:.16}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"end",justifyContent:"space-between",gap:18,flexWrap:"wrap",marginBottom:22}}>
            <div>
              <Lbl s="AI engine layer"/>
              <h2 style={{fontSize:"clamp(24px,4vw,44px)",fontWeight:950,letterSpacing:-1.4,marginTop:8}}>Lumenfield AI Studio production backend map</h2>
              <p style={{color:T2,fontSize:14,lineHeight:1.7,maxWidth:680,marginTop:8}}>A safe, original architecture for routing image, video, audio, marketing and influencer generation through protected server routes.</p>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {stack.map(s=><span key={s} className="chip" style={{cursor:"default"}}>{s}</span>)}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.35fr) minmax(280px,.65fr)",gap:18}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
              {engines.map(e=>(
                <div key={e.t} className="card" style={{padding:18,minHeight:164,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",right:-18,top:-18,width:92,height:92,borderRadius:"50%",background:`${M}18`,filter:"blur(8px)"}}/>
                  <div style={{position:"relative"}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",marginBottom:14}}>
                      <div style={{width:42,height:42,borderRadius:13,background:S2,border:`1px solid ${B1}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{e.i}</div>
                      <span className={e.s==="ACTIVE"?"tn":"tx"}>{e.s}</span>
                    </div>
                    <div style={{color:T1,fontSize:14,fontWeight:900,marginBottom:7}}>{e.t}</div>
                    <div style={{color:T3,fontSize:12,lineHeight:1.65}}>{e.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{padding:20,background:"rgba(5,5,5,.72)",backdropFilter:"blur(18px)"}}>
              <Lbl s="Protected routes"/>
              <div style={{display:"grid",gap:8,marginTop:14}}>
                {routes.map(r=>(
                  <div key={r} style={{display:"flex",alignItems:"center",gap:10,background:S2,border:`1px solid ${B1}`,borderRadius:10,padding:"10px 12px"}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:M,boxShadow:`0 0 16px ${M}`}}/>
                    <code style={{color:T2,fontSize:12,wordBreak:"break-all"}}>{r}</code>
                  </div>
                ))}
              </div>
              <div style={{marginTop:18,padding:14,borderRadius:14,background:`${M}12`,border:`1px solid ${M}33`}}>
                <div style={{color:ML,fontSize:12,fontWeight:900,marginBottom:6}}>Security rule</div>
                <p style={{color:T2,fontSize:12,lineHeight:1.6}}>API keys stay server-side. Client buttons call Lumenfield AI Studio routes, and paid provider calls run only through protected backend endpoints.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowControlRoom() {
  const phases = [
    {n:"1",t:"Analyze",d:"Prompt, product URL, image, video or brand material enters the workspace.",i:"⌕"},
    {n:"2",t:"Route",d:"Lumenfield AI Studio selects the best studio, model, aspect ratio and creative path.",i:"⇄"},
    {n:"3",t:"Render",d:"Runway and future engines process the job behind protected server routes.",i:"▶"},
    {n:"4",t:"Deliver",d:"Outputs move into history, library, campaign cards and reusable workflows.",i:"✓"},
  ];
  const queue = [
    {t:"9:16 product ad",s:"Rendering",p:"68%",c:M},
    {t:"AI influencer intro",s:"Queued",p:"12%",c:ML},
    {t:"Voiceover draft",s:"Ready",p:"100%",c:"#c7ff00"},
    {t:"Image upscale",s:"Review",p:"92%",c:"#60a5fa"},
  ];
  const scenes = [
    {t:"Hook shot",d:"Close product reveal, fast push-in, magenta rim light",g:"linear-gradient(135deg,#2a0014,#e8006f)"},
    {t:"Creator proof",d:"UGC angle, handheld camera, natural desk setup",g:"linear-gradient(135deg,#111827,#6d28d9)"},
    {t:"Offer frame",d:"Animated typography, brand colors, final CTA",g:"linear-gradient(135deg,#020617,#0ea5e9)"},
  ];
  const featureMap = [
    "Video analysis checklist",
    "Design adaptation layer",
    "Page and feature map",
    "One-screen deep dive",
    "Generate queue",
    "Reusable prompt presets",
    "Asset history",
    "Model status badges",
  ];
  return (
    <section style={{maxWidth:1280,margin:"0 auto 56px",padding:"0 16px"}}>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,.9fr) minmax(0,1.1fr)",gap:18}}>
        <div className="card" style={{padding:24,borderRadius:24,background:"linear-gradient(180deg,#111216,#08090b)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"34px 34px",opacity:.35}}/>
          <div style={{position:"relative",zIndex:1}}>
            <Lbl s="Workflow control room"/>
            <h2 style={{fontSize:"clamp(24px,3.5vw,42px)",fontWeight:950,letterSpacing:-1.4,marginTop:8,lineHeight:1.04}}>From idea to production asset in one controlled flow.</h2>
            <p style={{color:T2,fontSize:14,lineHeight:1.7,marginTop:12,maxWidth:560}}>This keeps the current Lumenfield AI Studio format but adds the professional studio workflow: analysis, routing, rendering, history and delivery.</p>
            <div style={{display:"grid",gap:10,marginTop:22}}>
              {phases.map(p=>(
                <div key={p.t} style={{display:"grid",gridTemplateColumns:"46px 1fr auto",gap:12,alignItems:"center",background:S1,border:`1px solid ${B1}`,borderRadius:14,padding:12}}>
                  <div style={{width:46,height:46,borderRadius:14,background:`${M}18`,border:`1px solid ${M}33`,display:"flex",alignItems:"center",justifyContent:"center",color:ML,fontWeight:950}}>{p.i}</div>
                  <div>
                    <div style={{color:T1,fontSize:13,fontWeight:900}}>{p.t}</div>
                    <div style={{color:T3,fontSize:11,lineHeight:1.5,marginTop:2}}>{p.d}</div>
                  </div>
                  <span style={{width:26,height:26,borderRadius:"50%",background:M,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:950}}>{p.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateRows:"auto auto",gap:18}}>
          <div className="card" style={{padding:20,borderRadius:24,background:S1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,marginBottom:14}}>
              <div>
                <Lbl s="Live queue"/>
                <h3 style={{color:T1,fontSize:20,fontWeight:950,marginTop:5}}>Generation timeline</h3>
              </div>
              <span className="tn">LIVE</span>
            </div>
            <div style={{display:"grid",gap:10}}>
              {queue.map(q=>(
                <div key={q.t} style={{background:S2,border:`1px solid ${B1}`,borderRadius:14,padding:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:8}}>
                    <span style={{color:T1,fontWeight:850}}>{q.t}</span>
                    <span style={{color:q.c,fontWeight:900}}>{q.s}</span>
                  </div>
                  <div style={{height:6,background:BG,borderRadius:999,overflow:"hidden"}}>
                    <div style={{height:"100%",width:q.p,background:`linear-gradient(90deg,${q.c},${ML})`,borderRadius:999}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
            {scenes.map(s=>(
              <div key={s.t} className="card" style={{minHeight:178,borderRadius:20,overflow:"hidden",position:"relative",background:s.g}}>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,.08))"}}/>
                <div style={{position:"absolute",left:14,right:14,bottom:14}}>
                  <div style={{color:T1,fontSize:13,fontWeight:950}}>{s.t}</div>
                  <div style={{color:"rgba(255,255,255,.68)",fontSize:11,lineHeight:1.45,marginTop:5}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:18,padding:18,borderRadius:22,display:"flex",gap:10,alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
        <div>
          <Lbl s="1 + 2 + 3 + 4 checklist"/>
          <div style={{color:T1,fontSize:16,fontWeight:950,marginTop:5}}>Video review, design adaptation, feature map and deep-dive planning are now represented in the interface.</div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {featureMap.map(f=><span key={f} className="chip" style={{cursor:"default"}}>{f}</span>)}
        </div>
      </div>
    </section>
  );
}

// ─── CINEMA STUDIO ────────────────────────────────────────────────────────────
function CinemaPage() {
  const [prompt,setPrompt]     = useState("");
  const [model,setModel]       = useState("Cinema Studio 3.5");
  const [mOpen,setMOpen]       = useState(false);
  const [aspect,setAspect]     = useState("16:9");
  const [res,setRes]           = useState("1080p");
  const [dur,setDur]           = useState("8s");
  const [cam,setCam]           = useState("Dolly In");
  const [spd,setSpd]           = useState("Auto");
  const [loading,setLoading]   = useState(false);
  const [step,setStep]         = useState(0);
  const [results,setResults]   = useState<number[]>([]);
  const [videoUrl,setVideoUrl] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [apiError,setApiError] = useState("");
  const [mode,setMode]         = useState<"image"|"video">("image");

  const gen = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResults([]); setVideoUrl(""); setImageUrl(""); setApiError(""); setStep(0);
    try {
      const duration = dur === "12s" || dur === "15s" ? 10 : 5;
      const modelId = mode === "video" ? "cs35" : "flux-2";
      setStep(1);
      const response = await fetch("/api/studio-generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          modelId,
          params: {aspect_ratio: aspect, duration, resolution: res},
          prompt,
        }),
      });
      const data = await response.json() as {ok?:boolean; type?:string; url?:string; error?:string};
      setStep(LSTEPS.length);
      if (!response.ok || !data.url) throw new Error(data.error || "Generation did not return a media URL.");
      if (data.type === "video") setVideoUrl(data.url);
      else setImageUrl(data.url);
      setResults([1]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  const vbgs = ["linear-gradient(135deg,#0d0019,#1a003a)","linear-gradient(135deg,#000d1a,#001f3f)","linear-gradient(135deg,#190000,#3a0018)"];

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      {/* Sidebar */}
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,background:BG}}>
        <div style={{padding:"6px 10px 2px"}}><Logo sz={20}/></div>
        <div style={{padding:"4px 12px 8px",fontSize:10,color:M,fontWeight:700,letterSpacing:.5}}>Cinema Studio</div>
        <Hr/>
        {["Home","My Elements","My Favorites","Community Feed","Projects"].map(s=><button key={s} className="sb">{s}</button>)}
        <div style={{flex:1}}/>
        <Hr/>
        <button className="bm" style={{fontSize:11,padding:"8px 12px",marginBottom:6}}>+ New Project</button>
        <button style={{background:"none",border:`1px solid ${B2}`,borderRadius:7,color:T3,fontSize:10,padding:"7px 12px",cursor:"pointer"}}>💎 Pricing — 30% OFF</button>
      </aside>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Workspace */}
        <div style={{flex:1,background:BG,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"40px 40px",display:"flex",alignItems:"center",justifyContent:"center",padding:40,overflow:"auto"}}>
          {!loading&&results.length===0&&!apiError&&(
            <div style={{textAlign:"center"}} className="fu">
              <div style={{fontSize:"clamp(18px,4vw,52px)",fontWeight:900,color:B2,letterSpacing:-2,lineHeight:1,marginBottom:4,WebkitTextStroke:`1px ${B1}`}}>CREATE YOUR FIRST PROJECT.</div>
              <div style={{fontSize:"clamp(18px,4vw,52px)",fontWeight:900,background:`linear-gradient(90deg,${M},${ML})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-2,lineHeight:1}}>GENERATE THE IMPOSSIBLE.</div>
              <p style={{color:T3,fontSize:13,marginTop:16}}>Type a prompt below and click Generate →</p>
            </div>
          )}
          {!loading&&apiError&&results.length===0&&(
            <div className="fi" style={{maxWidth:520,textAlign:"center",background:S1,border:`1px solid ${M}66`,borderRadius:14,padding:24}}>
              <div style={{color:ML,fontSize:13,fontWeight:900,marginBottom:8}}>FAL connection needs attention</div>
              <div style={{color:T2,fontSize:12,lineHeight:1.7}}>{apiError}</div>
              <div style={{color:T3,fontSize:11,marginTop:12}}>Check `FAL_KEY` in Vercel Environment Variables, then redeploy. If image works but video says Forbidden, the selected FAL video model is not enabled for that account.</div>
            </div>
          )}
          {loading&&(
            <div style={{textAlign:"center",width:280}} className="fi">
              <div style={{marginBottom:24}}>
                {LSTEPS.map((s,i)=>(
                  <div key={s} style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:12,color:i<step?T2:B2,fontSize:13,transition:"color .3s"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",border:`1.5px solid ${i<step?M:B2}`,background:i<step?M:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",transition:"all .3s",flexShrink:0}}>{i<step?"✓":""}</div>
                    {s}
                  </div>
                ))}
              </div>
              <div style={{height:2,background:B1,borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",background:`linear-gradient(90deg,${M},${ML})`,borderRadius:2,width:`${(step/LSTEPS.length)*100}%`,transition:"width .6s ease"}}/>
              </div>
            </div>
          )}
          {results.length>0&&(
            <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}} className="fi">
              {apiError&&(
                <div style={{width:"100%",maxWidth:760,background:`${M}12`,border:`1px solid ${M}55`,borderRadius:10,padding:"12px 14px",color:ML,fontSize:12,fontWeight:700,lineHeight:1.6}}>
                  {apiError}<br/><span style={{color:T3,fontWeight:500}}>Demo previews are shown below so the studio stays usable.</span>
                </div>
              )}
              {results.map((_,i)=>(
                <div key={i} style={{width:240,height:152,background:vbgs[i],borderRadius:10,border:`1px solid ${B1}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform .2s"}}
                  onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
                >
                  {videoUrl&&i===0 ? (
                    <video src={videoUrl} controls playsInline style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",background:"#000"}}/>
                  ) : imageUrl&&i===0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt="Generated result" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",background:"#000"}}/>
                  ) : (
                    <>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.6),transparent)"}}/>
                      <button style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",background:"rgba(232,0,111,.8)",border:"none",color:"#fff",fontSize:13,cursor:"pointer"}}>▶</button>
                    </>
                  )}
                  <div style={{position:"absolute",bottom:10,left:12}}>
                    <div style={{color:T1,fontSize:10,fontWeight:700}}>{model}</div>
                    <div style={{color:T3,fontSize:9}}>{videoUrl&&i===0?"FAL video · ":imageUrl&&i===0?"FAL image · ":null}{aspect} · {dur} · {res}</div>
                  </div>
                  <div style={{position:"absolute",top:10,right:10,background:M,color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4}}>NEW</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Composer */}
        <div style={{background:S1,borderTop:`1px solid ${B1}`,padding:"14px 16px"}}>
          <div style={{display:"flex",gap:0,marginBottom:12,background:BG,borderRadius:7,padding:3,width:"fit-content",border:`1px solid ${B1}`}}>
            {(["image","video"] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{background:mode===m?S2:"none",border:"none",color:mode===m?T1:T3,padding:"5px 16px",borderRadius:5,fontSize:12,cursor:"pointer",fontWeight:mode===m?700:400,textTransform:"capitalize",transition:"all .15s"}}>{m}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:1,minWidth:240}}>
              <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)}
                placeholder="Describe your scene — a futuristic city at dusk, golden hour, slow dolly in…"
                rows={2} style={{resize:"none",lineHeight:1.5}}/>
            </div>
            {/* Model dropdown */}
            <div style={{position:"relative"}}>
              <button onClick={()=>setMOpen(!mOpen)}
                style={{background:S2,border:`1px solid ${B1}`,borderRadius:8,color:T1,padding:"9px 12px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600,transition:"border-color .15s"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=M)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=B1)}
              >
                <span style={{width:6,height:6,borderRadius:"50%",background:M}}/>
                {model.length>20?model.slice(0,18)+"…":model}
                <span style={{color:T3,fontSize:9}}>▾</span>
              </button>
              {mOpen&&(
                <div style={{position:"absolute",bottom:"110%",left:0,background:S1,border:`1px solid ${B1}`,borderRadius:10,width:300,zIndex:200,boxShadow:"0 24px 64px rgba(0,0,0,.8)",overflow:"hidden"}}>
                  {["Cinematic","Featured"].map(grp=>(
                    <div key={grp}>
                      <div style={{padding:"10px 14px 4px",fontSize:9,color:T3,textTransform:"uppercase",letterSpacing:1,borderTop:grp==="Featured"?`1px solid ${B1}`:"none",marginTop:grp==="Featured"?4:0}}>{grp}</div>
                      {CMODELS.filter(m=>m.group===grp).map(m=>(
                        <button key={m.name} onClick={()=>{setModel(m.name);setMOpen(false);}}
                          style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",background:"none",border:"none",padding:"9px 14px",cursor:"pointer",textAlign:"left",transition:"background .12s"}}
                          onMouseEnter={e=>(e.currentTarget.style.background=S2)}
                          onMouseLeave={e=>(e.currentTarget.style.background="none")}
                        >
                          <div>
                            <div style={{color:T1,fontSize:12,fontWeight:600}}>{m.name}</div>
                            <div style={{color:T3,fontSize:10,marginTop:1}}>{m.desc}</div>
                          </div>
                          {m.tag&&<span className={m.tag==="NEW"?"tn":"tx"}>{m.tag}</span>}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Sel label="Aspect"   opts={["16:9","9:16","1:1","4:5"]}                               val={aspect} set={setAspect}/>
            <Sel label="Res"      opts={["720p","1080p","4K"]}                                     val={res}    set={setRes}/>
            <Sel label="Duration" opts={["4s","8s","12s","15s"]}                                   val={dur}    set={setDur}/>
            <Sel label="Camera"   opts={["Dolly In","Orbit","Push In","Crane","Handheld","Static"]} val={cam}    set={setCam}/>
            <Sel label="Speed"    opts={["Auto","Slow","Medium","Fast"]}                            val={spd}    set={setSpd}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:10,alignItems:"stretch",flexWrap:"wrap"}}>
            <UZ label="Start Frame" h={52}/>
            <UZ label="End Frame" h={52}/>
            <div style={{flex:1}}/>
            <button className="bm" onClick={gen} disabled={loading}
              style={{padding:"0 36px",minWidth:130,animation:!loading&&results.length===0?"glow 2.5s ease-in-out infinite":"none"}}>
              {loading?"Generating…":"Generate →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AUDIO ───────────────────────────────────────────────────────────────────
function AudioPage() {
  const [aMode,setAMode]   = useState("Voiceover");
  const [aModel,setAModel] = useState("Eleven v3");
  const [text,setText]     = useState("");
  const [loading,setLoading] = useState(false);
  const [wf,setWf]         = useState<number[]>([]);
  const models = [
    {n:"Eleven v3",             d:"Expressive AI voice · emotion control"},
    {n:"MiniMax Speech 2.8 HD", d:"Studio-quality text-to-speech"},
    {n:"Seed Speech",           d:"ByteDance multilingual voice"},
    {n:"VibeVoice",             d:"Long-form expressive synthesis"},
    {n:"Calm Narrator",         d:"Smooth narration & audiobook"},
    {n:"Studio Voice Pro",      d:"Broadcast-grade synthesis"},
  ];
  const gen = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,2200));
    setLoading(false);
    setWf(Array.from({length:52},()=>Math.random()*80+10));
  };
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:4,background:BG}}>
        {["My Generations","Narration Project","Ad Voiceover","Demo Reel"].map(p=><button key={p} className="sb">{p}</button>)}
        <div style={{flex:1}}/>
        <button className="bm" style={{width:"100%",fontSize:11,padding:"8px 12px"}}>+ New Project</button>
      </aside>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:BG,backgroundImage:`radial-gradient(ellipse 50% 40% at 50% 50%,rgba(232,0,111,.05),transparent)`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:80,left:0,right:0,display:"flex",justifyContent:"center",gap:2,opacity:.04}}>
            {Array.from({length:100},(_,i)=><div key={i} style={{width:2,borderRadius:2,height:`${44+Math.sin(i*.35)*34+((i*17)%23)}px`,background:M}}/>)}
          </div>
          <div style={{textAlign:"center",zIndex:1}} className="fu">
            <Lbl s="Audio Studio"/>
            <h1 style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:900,letterSpacing:-2,marginBottom:10,marginTop:12,lineHeight:1.05}}>Ready to give your<br/>scene a voice?</h1>
            <p style={{color:T3,fontSize:13}}>Type your script · select a voice · generate</p>
          </div>
          {wf.length>0&&(
            <div className="fi" style={{marginTop:36,background:S1,border:`1px solid ${B1}`,borderRadius:12,padding:"16px 20px",display:"flex",gap:2,alignItems:"center",zIndex:1}}>
              <button style={{width:34,height:34,borderRadius:"50%",background:M,border:"none",color:"#fff",fontSize:13,cursor:"pointer",flexShrink:0,marginRight:10}}>▶</button>
              {wf.map((h,i)=><div key={i} style={{width:2.5,borderRadius:2,height:`${h*.6}px`,background:`linear-gradient(to top,${M},${ML})`,transition:"height .3s"}}/>)}
              <span style={{color:T3,fontSize:10,marginLeft:10,flexShrink:0}}>0:0{Math.ceil(text.split(" ").length/2.5)} · {aModel}</span>
            </div>
          )}
        </div>
        <div style={{background:S1,borderTop:`1px solid ${B1}`,padding:"16px 20px",display:"flex",gap:14,alignItems:"flex-end",flexWrap:"wrap"}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Lbl s="Mode"/>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {["Voiceover","Change Voice","Translate"].map(m=>(
                <button key={m} onClick={()=>setAMode(m)} style={{background:aMode===m?`${M}18`:S2,border:`1px solid ${aMode===m?M:B1}`,color:aMode===m?ML:T3,borderRadius:7,padding:"6px 12px",fontSize:11,cursor:"pointer",fontWeight:aMode===m?700:400,transition:"all .15s"}}>{m}</button>
              ))}
            </div>
          </div>
          <div style={{flex:1,minWidth:200}}>
            <Lbl s="Script"/>
            <textarea className="inp" value={text} onChange={e=>setText(e.target.value)} placeholder="Type your narration or script here…" rows={4} style={{resize:"none",marginTop:6,lineHeight:1.5}}/>
          </div>
          <div style={{minWidth:195}}>
            <Lbl s="Voice Model"/>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:6}}>
              {models.map(m=>(
                <button key={m.n} onClick={()=>setAModel(m.n)} style={{background:aModel===m.n?`${M}12`:"transparent",border:`1px solid ${aModel===m.n?M:B1}`,borderRadius:7,padding:"6px 10px",textAlign:"left",cursor:"pointer",transition:"all .15s"}}>
                  <div style={{color:aModel===m.n?ML:T1,fontSize:11,fontWeight:600}}>{m.n}</div>
                  <div style={{color:T3,fontSize:9,marginTop:1}}>{m.d}</div>
                </button>
              ))}
            </div>
          </div>
          <button className="bm" onClick={gen} disabled={loading} style={{padding:"12px 28px",alignSelf:"flex-end"}}>{loading?"Generating…":"Generate Voice"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MARKETING STUDIO ────────────────────────────────────────────────────────
function MarketingPage() {
  const [prompt,setPrompt]     = useState("");
  const [pUrl,setPUrl]         = useState("");
  const [pName,setPName]       = useState("");
  const [ugc,setUgc]           = useState("UGC");
  const [hook,setHook]         = useState("Strong Hook");
  const [setting,setSetting]   = useState("Home");
  const [avatar,setAvatar]     = useState("Female");
  const [voice,setVoice]       = useState("Calm & Clear");
  const [cta,setCta]           = useState("Shop Now");
  const [engine,setEngine]     = useState("Runway Gen-4.5");
  const [plats,setPlats]       = useState<string[]>(["TikTok"]);
  const [tab,setTab]           = useState<"product"|"app">("product");
  const [loading,setLoading]   = useState(false);
  const [results,setResults]   = useState<number[]>([]);
  const [urlLoad,setUrlLoad]   = useState(false);

  const togglePlat = (p:string) => setPlats(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);

  const fetchUrl = async () => {
    if (!pUrl.trim()) return;
    setUrlLoad(true);
    await new Promise(r=>setTimeout(r,1400));
    setUrlLoad(false);
    setPName("Premium Fitness Tracker Pro");
    setPrompt("A professional fitness influencer unboxes the Premium Fitness Tracker Pro, highlighting its sleek design and health features.");
  };

  const gen = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResults([]);
    await new Promise(r=>setTimeout(r,3000));
    setLoading(false); setResults([1,2,3]);
  };

  const adBgs = [`linear-gradient(160deg,${MD},${M},#ff6bb5)`,"linear-gradient(160deg,#1a0030,#4a0080,#8000ff)","linear-gradient(160deg,#001a30,#003f80,#0080ff)"];
  const pIcons: Record<string,string> = {TikTok:"🎵",Instagram:"📸",YouTube:"▶️",Facebook:"👤"};
  const modelPower = [
    {name:"Runway Gen-4.5", role:"Active video route", note:"Connected through protected server routes", icon:"▶"},
    {name:"Lumenfield Soul · Coming soon", role:"Character consistency", note:"Will keep avatars and brand faces stable", icon:"∿"},
    {name:"Flux Creative · Coming soon", role:"Product stills", note:"Will generate clean campaign visuals", icon:"△"},
    {name:"Kling Motion · Coming soon", role:"Cinematic video", note:"Will add camera movement and sound-ready timing", icon:"◓"},
    {name:"Seedance 2.0 · Coming soon", role:"Fast social ads", note:"Will build short clips for TikTok and Reels", icon:"▥"},
    {name:"Voice Studio · Coming soon", role:"Voiceover layer", note:"Will prepare narration and translated versions", icon:"≋"},
  ];

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,background:BG}}>
        <div style={{fontSize:12,color:T1,fontWeight:700,padding:"6px 10px",marginBottom:2}}>Marketing Studio</div>
        <div style={{fontSize:10,color:M,fontWeight:600,padding:"0 12px 8px",letterSpacing:.3}}>Product Ad Generator</div>
        <Hr/>
        {["Compose","My Projects","URL to Ad","Ad Reference","All Generations"].map(s=><button key={s} className="sb">{s}</button>)}
        <div style={{flex:1}}/>
        <Hr/>
        <button className="bm" style={{width:"100%",marginTop:8,fontSize:11,padding:"8px 12px"}}>+ New Project</button>
      </aside>
      <div style={{flex:1,overflow:"auto"}}>
        {/* Hero */}
        <div style={{padding:"28px 40px 24px",borderBottom:`1px solid ${B1}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${M},transparent)`}}/>
          <Lbl s="Lumenfield Marketing Studio"/>
          <h1 style={{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,letterSpacing:-1.5,marginTop:8,lineHeight:1.05}}>TURN ANY PRODUCT INTO A VIDEO AD</h1>
          <p style={{color:T3,fontSize:13,marginTop:6}}>Upload product · choose style · get 9:16 ads in seconds</p>
          <div style={{display:"flex",gap:0,marginTop:16,background:BG,borderRadius:7,padding:3,width:"fit-content",border:`1px solid ${B1}`}}>
            {(["product","app"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?S2:"none",border:"none",color:tab===t?T1:T3,padding:"5px 18px",borderRadius:5,fontSize:12,cursor:"pointer",textTransform:"capitalize",fontWeight:tab===t?700:400,transition:"all .15s"}}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"24px 40px",maxWidth:920}}>
          {/* URL */}
          <div style={{marginBottom:18}}>
            <Lbl s="Product URL — auto-fills product info"/>
            <div style={{display:"flex",gap:8,marginTop:6}}>
              <input className="inp" value={pUrl} onChange={e=>setPUrl(e.target.value)} placeholder="https://yourstore.com/product/..." style={{flex:1}}/>
              <button onClick={fetchUrl} disabled={urlLoad} style={{background:S2,border:`1px solid ${B1}`,color:urlLoad?T3:ML,borderRadius:8,padding:"0 16px",fontSize:12,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>
                {urlLoad?"Fetching…":"Fetch →"}
              </button>
            </div>
            {pName&&(
              <div style={{marginTop:6,padding:"6px 10px",background:`${M}10`,border:`1px solid ${M}30`,borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:M,fontSize:11}}>✓</span>
                <span style={{color:T2,fontSize:11}}>Fetched: <strong style={{color:T1}}>{pName}</strong></span>
              </div>
            )}
          </div>
          {/* Prompt */}
          <div style={{marginBottom:16}}>
            <Lbl s="Ad Description"/>
            <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe what happens in the ad…" rows={3} style={{resize:"none",marginTop:6,lineHeight:1.5}}/>
          </div>
          {/* Controls */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:16}}>
            <Sel label="Ad Type"    opts={UGC_T} val={ugc}     set={setUgc}/>
            <Sel label="Hook Style" opts={HOOKS} val={hook}    set={setHook}/>
            <Sel label="Setting"    opts={SETS}  val={setting} set={setSetting}/>
            <Sel label="Avatar"     opts={AVTS}  val={avatar}  set={setAvatar}/>
            <Sel label="Voice"      opts={VOCS}  val={voice}   set={setVoice}/>
            <Sel label="CTA"        opts={CTAS}  val={cta}     set={setCta}/>
          </div>
          {/* AI Engine */}
          <div style={{marginBottom:16}}>
            <Lbl s="AI Engine"/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
              {AIENGS.map(e=><button key={e} className={`mc${engine===e?" on":""}`} onClick={()=>setEngine(e)}>{e}</button>)}
            </div>
          </div>
          <div style={{marginBottom:18}}>
            <Lbl s="Production engine stack"/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:10,marginTop:8}}>
              {modelPower.map((m,i)=>(
                <button key={m.name} onClick={()=>setEngine(m.name)} className="card" style={{padding:"14px 14px",textAlign:"left",cursor:"pointer",background:engine===m.name?`linear-gradient(145deg,${M}18,${S1})`:S1,border:`1px solid ${engine===m.name?`${M}80`:B1}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                    <span style={{width:34,height:34,borderRadius:9,display:"grid",placeItems:"center",background:S2,color:ML,fontWeight:900,fontSize:16}}>{m.icon}</span>
                    <span style={{color:T1,fontSize:12,fontWeight:800}}>{m.name}</span>
                  </div>
                  <div style={{color:ML,fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:.7,marginBottom:4}}>{m.role}</div>
                  <div style={{color:T3,fontSize:11,lineHeight:1.45}}>{m.note}</div>
                </button>
              ))}
            </div>
          </div>
          {/* Platform */}
          <div style={{marginBottom:16}}>
            <Lbl s="Platform"/>
            <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
              {PLATS.map(p=>(
                <button key={p} className={`pc${plats.includes(p)?" on":""}`} onClick={()=>togglePlat(p)}>
                  <span>{pIcons[p]}</span>{p}
                  {plats.includes(p)&&<span style={{color:M,fontSize:10}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          {/* Upload + Generate */}
          <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"stretch"}}>
            <UZ label="Product / Image" h={60}/>
            <UZ label="Avatar / Influencer" h={60}/>
            <div style={{flex:1}}/>
            <button className="bm" onClick={gen} disabled={loading} style={{padding:"0 32px",minHeight:48,fontSize:13,animation:!loading&&results.length===0?"glow 2.5s ease-in-out infinite":"none"}}>
              {loading?"Generating Ad…":"Generate Ad →"}
            </button>
          </div>
          {loading&&<div style={{display:"flex",gap:12}}>{[1,2,3].map(i=><div key={i} className="sk" style={{width:150,height:266,borderRadius:12,animationDelay:`${i*.15}s`}}/>)}</div>}
          {results.length>0&&(
            <div className="fi">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <Lbl s={`${results.length} ads · ${plats.join(", ")}`}/>
                <button className="bg" style={{padding:"5px 14px",fontSize:11}}>Export All</button>
              </div>
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                {results.map((_,i)=>(
                  <div key={i} style={{width:150,height:266,borderRadius:12,background:adBgs[i],border:`1px solid ${B2}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform .2s"}}
                    onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.03)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
                  >
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
                    <button style={{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,.2)",border:"none",color:"#fff",fontSize:14,cursor:"pointer"}}>▶</button>
                    <div style={{position:"absolute",top:8,left:8}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4}}>{plats[i%plats.length]}</span></div>
                    <div style={{position:"absolute",bottom:10,left:10}}>
                      <div style={{color:"#fff",fontSize:10,fontWeight:700}}>{ugc}</div>
                      <div style={{color:"rgba(255,255,255,.5)",fontSize:9}}>{hook} · 9:16 · 15s</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MCP & CLI ───────────────────────────────────────────────────────────────
function McpPage() {
  const clients = [
    {name:"ChatGPT", desc:"Plan prompts, request image/video jobs and save outputs.", status:"Coming soon", icon:"◎"},
    {name:"Claude", desc:"Use Lumenfield AI Studio tools inside long creative planning sessions.", status:"Coming soon", icon:"◇"},
    {name:"Gemini", desc:"Route research, scripts and production briefs to studio actions.", status:"Coming soon", icon:"G"},
    {name:"Cursor", desc:"Generate assets from inside development workflows.", status:"Coming soon", icon:"⌁"},
    {name:"VS Code Agent", desc:"Create media tasks while building campaigns and sites.", status:"Coming soon", icon:"</>"},
    {name:"OpenCode", desc:"Connect custom agents to the Lumenfield AI Studio production layer.", status:"Coming soon", icon:"⌘"},
  ];
  const commands = [
    "npm install -g @lumenfield/cli",
    "lumenfield auth login",
    "lumenfield models list --type video",
    'lumenfield generate image --prompt "magenta cinematic product shot"',
    'lumenfield generate video --prompt "slow orbit around a luxury bottle"',
  ];
  const tools = [
    {i:"▶",t:"Video Generator",d:"Send a prompt to the active protected generation route."},
    {i:"▧",t:"Image Generator",d:"Create campaign visuals and product shots from one command."},
    {i:"📣",t:"Marketing Brief",d:"Turn URLs, hooks and CTAs into ad concepts."},
    {i:"∿",t:"Character Memory",d:"Prepare consistent influencer and character references."},
    {i:"▣",t:"Asset Library",d:"Store generated files in one reusable workspace."},
    {i:"🔒",t:"Server-Side Keys",d:"Provider keys stay protected in backend routes only."},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"56px 32px 80px",maxWidth:1220,margin:"0 auto"}}>
        <div className="fu" style={{display:"grid",gridTemplateColumns:"minmax(0,1.05fr) minmax(320px,.95fr)",gap:18,alignItems:"stretch"}}>
          <div style={{background:`radial-gradient(circle at 15% 10%,rgba(232,0,111,.22),transparent 34%),linear-gradient(145deg,#0f0f0f,#070707)`,border:`1px solid ${B1}`,borderRadius:24,padding:"38px 34px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)",backgroundSize:"34px 34px",opacity:.32}}/>
            <div style={{position:"relative"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${B2}`,borderRadius:999,padding:"7px 14px",fontSize:11,color:T2,background:"rgba(255,255,255,.04)",marginBottom:24}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:M,boxShadow:`0 0 20px ${M}`}}/>Developer Tools
              </div>
              <h1 style={{fontSize:"clamp(38px,6vw,82px)",fontWeight:950,letterSpacing:-3.2,lineHeight:.94,marginBottom:18}}>
                MCP & CLI<br/><span style={{background:`linear-gradient(90deg,${M},${ML})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>creative engine.</span>
              </h1>
              <p style={{color:T2,fontSize:16,lineHeight:1.75,maxWidth:650,marginBottom:28}}>
                Connect Lumenfield AI Studio to agents, code editors and automation tools. Keep provider keys protected while agents request image, video, marketing and asset tasks through one workspace.
              </p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {["MCP server","CLI commands","Protected API routes","Coming soon connectors"].map(x=>(
                  <span key={x} className="chip on" style={{background:"rgba(232,0,111,.08)"}}>{x}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{background:"rgba(15,15,15,.78)",border:`1px solid ${B1}`,borderRadius:24,padding:22,backdropFilter:"blur(20px)"}}>
            <Lbl s="Connection Flow"/>
            <div style={{display:"grid",gap:12,marginTop:16}}>
              {["AI assistant or editor","Lumenfield AI Studio connector","Protected server route","Generated asset in Library"].map((step,i)=>(
                <div key={step} style={{display:"grid",gridTemplateColumns:"42px 1fr",gap:12,alignItems:"center"}}>
                  <div style={{width:42,height:42,borderRadius:12,background:i===1?`linear-gradient(135deg,${M},${MD})`:S2,border:`1px solid ${B1}`,display:"grid",placeItems:"center",fontWeight:900}}>{i+1}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:850,color:T1}}>{step}</div>
                    <div style={{fontSize:12,color:T3,marginTop:3}}>{i===2?"Keys stay server-side. No secret is exposed in the browser.":"Ready for staged rollout inside Lumenfield AI Studio."}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="bm" style={{width:"100%",marginTop:20}}>Open connector setup</button>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"minmax(280px,.85fr) minmax(0,1.15fr)",gap:18,marginTop:18}}>
          <div style={{background:S1,border:`1px solid ${B1}`,borderRadius:22,padding:22}}>
            <Lbl s="CLI Quickstart"/>
            <div style={{background:"#070707",border:`1px solid ${B1}`,borderRadius:16,padding:18,marginTop:16,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",overflowX:"auto"}}>
              {commands.map((cmd,i)=>(
                <div key={cmd} style={{color:i<2?ML:T2,fontSize:13,lineHeight:1.9,whiteSpace:"nowrap"}}><span style={{color:T3}}>$ </span>{cmd}</div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
              <button className="bm">Copy setup</button>
              <button className="bg">View docs</button>
            </div>
          </div>
          <div style={{background:S1,border:`1px solid ${B1}`,borderRadius:22,padding:22}}>
            <Lbl s="MCP Config"/>
            <div style={{background:"#070707",border:`1px solid ${B1}`,borderRadius:16,padding:18,marginTop:16,fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",overflowX:"auto"}}>
              <div style={{color:T2,fontSize:13,lineHeight:1.8}}>{"{"}</div>
              <div style={{color:T2,fontSize:13,lineHeight:1.8,paddingLeft:18}}>&quot;mcpServers&quot;: {"{"}</div>
              <div style={{color:T2,fontSize:13,lineHeight:1.8,paddingLeft:36}}>&quot;lumenfield&quot;: {"{"}</div>
              <div style={{color:ML,fontSize:13,lineHeight:1.8,paddingLeft:54}}>&quot;command&quot;: &quot;npx&quot;,</div>
              <div style={{color:ML,fontSize:13,lineHeight:1.8,paddingLeft:54}}>&quot;args&quot;: [&quot;@lumenfield/mcp&quot;],</div>
              <div style={{color:ML,fontSize:13,lineHeight:1.8,paddingLeft:54}}>&quot;env&quot;: {"{"} &quot;LUMENFIELD_API_KEY&quot;: &quot;server-side&quot; {"}"}</div>
              <div style={{color:T2,fontSize:13,lineHeight:1.8,paddingLeft:36}}>{"}"}</div>
              <div style={{color:T2,fontSize:13,lineHeight:1.8,paddingLeft:18}}>{"}"}</div>
              <div style={{color:T2,fontSize:13,lineHeight:1.8}}>{"}"}</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:32}}>
          <Lbl s="Featured Connectors"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,marginTop:14}}>
            {clients.map(c=>(
              <button key={c.name} className="card" style={{padding:16,textAlign:"left",cursor:"pointer",background:"rgba(18,20,25,.82)"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:18}}>
                  <div style={{width:42,height:42,borderRadius:12,background:S2,border:`1px solid ${B1}`,display:"grid",placeItems:"center",fontWeight:900,color:T1}}>{c.icon}</div>
                  <span className="tx">{c.status}</span>
                </div>
                <div style={{color:T1,fontSize:15,fontWeight:850,marginBottom:6}}>{c.name}</div>
                <div style={{color:T3,fontSize:12,lineHeight:1.55,minHeight:38}}>{c.desc}</div>
                <div style={{marginTop:14,color:ML,fontSize:12,fontWeight:800}}>Configure →</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{marginTop:32}}>
          <Lbl s="Lumenfield Agent Tools"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginTop:14}}>
            {tools.map(f=>(
              <div key={f.t} className="card" style={{padding:"18px 16px"}}>
                <div style={{fontSize:24,marginBottom:10}}>{f.i}</div>
                <div style={{color:T1,fontSize:13,fontWeight:850,marginBottom:5}}>{f.t}</div>
                <div style={{color:T3,fontSize:12,lineHeight:1.55}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:32,background:`linear-gradient(135deg,rgba(232,0,111,.18),rgba(255,77,166,.05))`,border:`1px solid rgba(232,0,111,.26)`,borderRadius:22,padding:24,display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <div>
            <div style={{color:T1,fontSize:20,fontWeight:900}}>Current active route</div>
            <div style={{color:T2,fontSize:13,marginTop:6}}>The studio keeps using protected backend calls. No provider secret is exposed in the browser.</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <span className="chip on">POST /api/studio-generate</span>
            <span className="chip">POST /api/generate-video</span>
            <span className="chip">GET /api/check-video</span>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            div[style*="grid-template-columns: minmax(0px, 1.05fr)"] { grid-template-columns: 1fr !important; }
            div[style*="grid-template-columns: minmax(280px, 0.85fr)"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── COLLAB ──────────────────────────────────────────────────────────────────
function CollabPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"80px 48px",maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:20}}>🤝</div>
        <h1 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:900,letterSpacing:-2,marginBottom:16}}>Create together.<br/><span style={{color:M}}>In real time.</span></h1>
        <p style={{color:T2,fontSize:16,lineHeight:1.7,marginBottom:40,maxWidth:500,margin:"0 auto 40px"}}>Invite your team, share projects, leave comments, and collaborate on AI-generated content.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,maxWidth:700,margin:"0 auto 40px",textAlign:"left"}}>
          {[{i:"👥",t:"Team Workspace",d:"Shared projects & assets"},{i:"💬",t:"Comments",d:"Leave feedback on any frame"},{i:"🔗",t:"Share Links",d:"One-click shareable URLs"},{i:"📋",t:"Review Mode",d:"Approve or request changes"},{i:"🏷",t:"Version History",d:"Track every iteration"},{i:"🔔",t:"Notifications",d:"Stay in the loop"}].map(f=>(
            <div key={f.t} className="card" style={{padding:"18px 16px"}}>
              <div style={{fontSize:22,marginBottom:8}}>{f.i}</div>
              <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:3}}>{f.t}</div>
              <div style={{color:T3,fontSize:11}}>{f.d}</div>
            </div>
          ))}
        </div>
        <button className="bm" style={{padding:"13px 32px",fontSize:14}}>Invite Team →</button>
      </div>
    </div>
  );
}

// ─── SUPERCOMPUTER ────────────────────────────────────────────────────────────
function SuperPage() {
  const [prompt,setPrompt] = useState("");
  const [tab,setTab] = useState("Marketplace");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("");
  const marketplace = [
    {i:"🎬",t:"Video Generator",d:"Turn one prompt into ready-to-edit cinematic footage.",tag:"Try in chat"},
    {i:"🖼",t:"Image Generator",d:"Create campaign images, product shots and style frames.",tag:"Try in chat"},
    {i:"📣",t:"Ad Creative",d:"Build ad hooks, scripts, cuts and platform variants.",tag:"Install"},
    {i:"🧠",t:"Memory Agent",d:"Remember brand rules, characters and reusable workflows.",tag:"New"},
    {i:"🛍",t:"Product Agent",d:"Read product details and generate shopping content.",tag:"Beta"},
    {i:"⚙",t:"Workflow Builder",d:"Connect models, tools, files and studio actions.",tag:"New"},
  ];
  const tabCards: Record<string,{i:string;t:string;d:string}[]> = {
    Memory: [
      {i:"🧠",t:"Brand Memory",d:"Save tone, colors, products and rules for future generations."},
      {i:"👤",t:"Character Memory",d:"Keep Lumenfield Soul identities consistent across campaigns."},
      {i:"📁",t:"Project Memory",d:"Reuse successful prompts, model choices and asset references."},
    ],
    Gaming: [
      {i:"🎮",t:"Game Concepts",d:"Build playable concepts with art, sound and characters."},
      {i:"🧱",t:"World Builder",d:"Generate props, scenes and prompt-ready environments."},
      {i:"⚡",t:"Interactive Ads",d:"Turn products into mini experiences and viral demos."},
    ],
    Office: [
      {i:"📊",t:"Pitch Decks",d:"Create investor and client-ready creative presentations."},
      {i:"📝",t:"Campaign Briefs",d:"Turn rough ideas into structured production briefs."},
      {i:"📅",t:"Content Calendar",d:"Plan launches, posts, hooks and deliverables."},
    ],
    Marketplace: marketplace.map(m=>({i:m.i,t:m.t,d:m.d})),
  };
  const quick = ["Cinematic trailer","Social media ad","Unboxing video","Product showcase","Virtual try-on","Animated infographic"];
  const run = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResult("");
    await new Promise(r=>setTimeout(r,2000));
    setLoading(false);
    setResult("✓ Task queued · Cinema Studio · Marketing Studio · Audio Studio · 3 agents activated");
  };
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG,display:"grid",gridTemplateColumns:"220px minmax(0,1fr) 320px"}}>
      <aside style={{borderRight:`1px solid ${B1}`,background:S1,padding:"16px 12px",display:"flex",flexDirection:"column",gap:8,minHeight:"calc(100vh - 57px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:S2,border:`1px solid ${B1}`,borderRadius:10}}>
          <Logo sz={26}/>
          <div>
            <div style={{fontSize:12,fontWeight:900,color:T1}}>Supercomputer</div>
            <div style={{fontSize:10,color:T3}}>Creative agents</div>
          </div>
        </div>
        <button className="sb">＋ New task</button>
        <button className="sb">⌕ Search</button>
        <button className="sb">▣ Marketplace <span className="tn" style={{marginLeft:6}}>NEW</span></button>
        <Hr/>
        <Lbl s="Tasks"/>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",color:T3}}>
          <div>
            <div style={{width:62,height:52,borderRadius:14,background:S2,border:`1px solid ${B1}`,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>＋</div>
            <div style={{fontSize:13,color:T1,fontWeight:800}}>No tasks yet</div>
            <div style={{fontSize:11,marginTop:4}}>Create one to get started</div>
          </div>
        </div>
        <button className="bm" style={{padding:"10px 12px",fontSize:12}}>Pricing <span style={{fontSize:10,marginLeft:6}}>30% OFF</span></button>
        <button className="bg" style={{padding:"10px 12px",fontSize:12}}>Log in</button>
      </aside>

      <main style={{minWidth:0,overflow:"auto"}}>
        <section style={{minHeight:560,margin:22,border:`1px solid ${B1}`,borderRadius:24,background:`radial-gradient(circle at 50% 80%,${M}55,transparent 36%),linear-gradient(180deg,#141416 0%,#11120f 45%,#3b001d 100%)`,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"70px 32px"}}>
          <div style={{position:"absolute",inset:0,opacity:.28,backgroundImage:`radial-gradient(${ML} 1px, transparent 1px)`,backgroundSize:"18px 18px"}}/>
          <button style={{position:"absolute",top:18,right:18,background:"rgba(0,0,0,.35)",border:`1px solid ${B1}`,borderRadius:999,color:T2,padding:"8px 14px",fontSize:12,fontWeight:700}}>⌘ Shortcuts</button>
          <div style={{position:"relative",zIndex:1,width:"min(780px,100%)"}} className="fu">
            <div style={{width:74,height:74,borderRadius:18,margin:"0 auto 26px",background:`linear-gradient(135deg,${ML},${M},${MD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,fontWeight:950,color:"#fff",boxShadow:`0 22px 70px ${M}55`}}>L</div>
            <h1 style={{fontSize:"clamp(28px,5vw,62px)",fontWeight:950,letterSpacing:-2.3,marginBottom:12}}>SUPERCOMPUTER FOR CREATIVE WORK</h1>
            <p style={{color:T2,fontSize:15,marginBottom:34,lineHeight:1.65}}>Turn a simple chat into production-ready content at scale.</p>
            <div style={{background:"rgba(10,10,10,.82)",border:`1px solid ${M}55`,borderRadius:20,padding:16,boxShadow:"0 28px 80px rgba(0,0,0,.7)",backdropFilter:"blur(18px)"}}>
              <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Create a cinematic trailer for my brand..." rows={2} style={{resize:"none",lineHeight:1.55,marginBottom:12,fontSize:14,border:"none",background:"transparent"}}/>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                {["＋","⌘","🎙","⚙"].map(x=><button key={x} className="bg" style={{width:34,height:34,padding:0,borderRadius:10}}>{x}</button>)}
                <button className="bg" style={{fontSize:12}}>Google Gemini 3.5 Flash ▾</button>
                <div style={{flex:1}}/>
                <button className="bg" style={{fontSize:12}}>Ask ▾</button>
                <button onClick={run} disabled={loading} style={{width:42,height:42,borderRadius:"50%",border:"none",background:M,color:"#fff",fontWeight:950,cursor:loading?"wait":"pointer",boxShadow:`0 0 34px ${M}88`}}>{loading?"…":"↑"}</button>
              </div>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:18}}>
              {quick.map(q=><button key={q} onClick={()=>setPrompt(q)} className="bg" style={{fontSize:11,padding:"7px 12px"}}>{q}</button>)}
            </div>
            {result&&<div className="fi" style={{marginTop:14,padding:"10px 16px",background:`${M}18`,border:`1px solid ${M}55`,borderRadius:8,color:ML,fontSize:12,fontWeight:700}}>{result}</div>}
          </div>
        </section>

        <section style={{padding:"14px 28px 48px"}}>
          <div style={{display:"flex",alignItems:"end",justifyContent:"space-between",gap:16,marginBottom:18,flexWrap:"wrap"}}>
            <div>
              <Lbl s="Supercomputer modules"/>
              <h2 style={{fontSize:"clamp(22px,3vw,38px)",fontWeight:950,letterSpacing:-1.5,marginTop:8}}>What can the Supercomputer do?</h2>
              <p style={{color:T3,fontSize:13,marginTop:6}}>Videos, ads, product shots, avatars, voice generation and automation.</p>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {Object.keys(tabCards).map(t=><button key={t} onClick={()=>setTab(t)} className={tab===t?"bm":"bg"} style={{padding:"8px 14px",fontSize:12}}>{t}</button>)}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:12}}>
            {tabCards[tab].map(item=>(
              <div key={item.t} className="card" style={{padding:"18px 16px",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=M;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=B1;}}
              >
                <div style={{width:38,height:38,borderRadius:12,background:S2,border:`1px solid ${B1}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:12}}>{item.i}</div>
                <div style={{color:T1,fontSize:13,fontWeight:850,marginBottom:5}}>{item.t}</div>
                <div style={{color:T3,fontSize:11,lineHeight:1.55,marginBottom:12}}>{item.d}</div>
                <button className="bg" style={{fontSize:11,padding:"7px 12px"}}>Try →</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside style={{borderLeft:`1px solid ${B1}`,background:S1,padding:"18px 14px",overflow:"auto",minHeight:"calc(100vh - 57px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h3 style={{fontSize:16,fontWeight:900}}>Marketplace</h3>
          <span className="tn">LIVE</span>
        </div>
        <input className="inp" placeholder="Search agents, tools..." style={{height:38,fontSize:12,marginBottom:14}}/>
        <div style={{display:"grid",gap:10}}>
          {marketplace.map(m=>(
            <button key={m.t} style={{textAlign:"left",background:S2,border:`1px solid ${B1}`,borderRadius:14,padding:12,cursor:"pointer",transition:"all .18s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=B1;e.currentTarget.style.transform="translateY(0)";}}
            >
              <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${M}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{m.i}</div>
                <div>
                  <div style={{color:T1,fontSize:12,fontWeight:850}}>{m.t}</div>
                  <span style={{fontSize:9,color:ML,fontWeight:800,textTransform:"uppercase"}}>{m.tag}</span>
                </div>
              </div>
              <div style={{color:T3,fontSize:11,lineHeight:1.5}}>{m.d}</div>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

// ─── PLUGINS ─────────────────────────────────────────────────────────────────
function PluginsPage() {
  const [active,setActive] = useState("Premiere Pro");
  const plugins = ["Premiere Pro","After Effects","DaVinci Resolve","Figma","Photoshop"];
  const features = ["Generate AI Video","Generate AI Image","Reframe","Remove Background","Draw to Edit","Upscale"];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"60px 48px 40px",borderBottom:`1px solid ${B1}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${M},transparent)`}}/>
        <Lbl s="Plugins"/>
        <h1 style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:900,letterSpacing:-1.5,marginTop:10,lineHeight:1.05}}>
          Lumenfield AI Studio is now inside<br/><span style={{color:M}}>{active}</span>
        </h1>
        <p style={{color:T2,fontSize:15,marginTop:12,maxWidth:520,lineHeight:1.65}}>Generate, edit, reframe, upscale and remove backgrounds directly inside your {active} timeline.</p>
        <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
          <button className="bm" style={{padding:"11px 24px"}}>⬇ Download for macOS</button>
          <button className="bg" style={{padding:"11px 24px"}}>⬇ Download for Windows</button>
        </div>
      </div>
      <div style={{borderBottom:`1px solid ${B1}`,padding:"0 48px",display:"flex",gap:4,overflowX:"auto"}}>
        {plugins.map(p=>(
          <button key={p} onClick={()=>setActive(p)} style={{background:"none",border:"none",color:active===p?T1:T3,fontSize:13,padding:"14px 16px",cursor:"pointer",borderBottom:`2px solid ${active===p?M:"transparent"}`,fontWeight:active===p?700:400,transition:"all .15s",whiteSpace:"nowrap"}}>{p}</button>
        ))}
      </div>
      <div style={{padding:"40px 48px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{marginBottom:40}}>
          <Lbl s="Setup — 3 steps"/>
          <div style={{display:"flex",gap:12,marginTop:16,flexWrap:"wrap"}}>
            {[{n:"1",t:"Download",d:"Get the .dmg or .exe installer"},{n:"2",t:"Install",d:"Follow the on-screen instructions"},{n:"3",t:`Open ${active}`,d:"Find Lumenfield AI Studio under Window → Extensions"}].map(s=>(
              <div key={s.n} style={{flex:1,minWidth:180,background:S1,border:`1px solid ${B1}`,borderRadius:10,padding:"18px 16px"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:M,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",marginBottom:10}}>{s.n}</div>
                <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:4}}>{s.t}</div>
                <div style={{color:T3,fontSize:11}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:40}}>
          <Lbl s="Features"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginTop:16}}>
            {features.map(f=>(
              <div key={f} className="card" style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:M,fontSize:14}}>✓</span>
                <span style={{color:T1,fontSize:12,fontWeight:600}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:40}}>
          <Lbl s="Compatibility"/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
            {["Adobe Premiere Pro 2024+","Adobe After Effects 2024+","macOS Apple Silicon / Intel","Windows 10 / 11 64-bit"].map(c=>(
              <div key={c} style={{background:S2,border:`1px solid ${B1}`,borderRadius:6,padding:"6px 12px",fontSize:11,color:T2}}>{c}</div>
            ))}
          </div>
        </div>
        <div>
          <Lbl s="FAQ"/>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:16}}>
            {[["How do I install on macOS?","Download the .dmg, open it, drag Lumenfield AI Studio to Applications. Restart Premiere Pro."],["How do I install on Windows?","Run the .exe as administrator and follow the prompts. Restart your Adobe app."],["Which Adobe versions are supported?","Premiere Pro 2024+ and After Effects 2024+."],["Do I need internet?","Yes, Lumenfield AI Studio requires internet for AI generation."],["Do I need a subscription?","Yes, you need an active Lumenfield AI Studio account with credits."]].map(([q,a])=>(
              <div key={q} style={{background:S1,border:`1px solid ${B1}`,borderRadius:10,padding:"14px 16px"}}>
                <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:6}}>{q}</div>
                <div style={{color:T3,fontSize:11,lineHeight:1.6}}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI INFLUENCER ────────────────────────────────────────────────────────────
function InfluencerOptionGrid({
  field,
  label,
  opts,
  sel,
  up,
}: {
  field: string;
  label: string;
  opts: string[];
  sel: Record<string,string>;
  up: (k:string,v:string) => void;
}) {
  return (
    <div style={{marginBottom:18}}>
      <div style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {opts.map(o=><button key={o} onClick={()=>up(field,o)} style={{background:sel[field]===o?`${M}18`:S2,border:`1px solid ${sel[field]===o?M:B1}`,color:sel[field]===o?ML:T3,borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer",transition:"all .12s"}}>{o}</button>)}
      </div>
    </div>
  );
}

function InfluencerPage() {
  const [sel,setSel] = useState<Record<string,string>>({char:"Human",gender:"Female",eth:"African",skin:"dark brown",eyes:"Brown",age:"Adult",hair:"Short",material:"Human Skin",pattern:"Solid"});
  const [loading,setLoading] = useState(false);
  const [done,setDone] = useState(false);
  const up = (k:string,v:string) => setSel(s=>({...s,[k]:v}));
  const gen = async () => { setLoading(true); await new Promise(r=>setTimeout(r,2400)); setLoading(false); setDone(true); };
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:160,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:6,background:BG}}>
        <Lbl s="My Influencers"/>
        <div style={{height:8}}/>
        {["Aurora V","Kai X","Nova One","Zara M"].map(n=>(
          <div key={n} style={{background:S1,borderRadius:8,padding:8,border:`1px solid ${B1}`,cursor:"pointer"}}>
            <div style={{width:"100%",aspectRatio:"1",borderRadius:6,background:S2,marginBottom:5}}/>
            <div style={{color:T3,fontSize:10,textAlign:"center"}}>{n}</div>
          </div>
        ))}
        <button style={{background:"none",border:`1px dashed ${B2}`,color:T3,borderRadius:8,padding:"8px",fontSize:10,cursor:"pointer",marginTop:4,transition:"all .15s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.color=ML;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=B2;e.currentTarget.style.color=T3;}}
        >+ Create New</button>
      </aside>
      <div style={{width:268,flexShrink:0,borderRight:`1px solid ${B1}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,background:`radial-gradient(ellipse at center,${M}04,transparent)`}}>
        <div style={{width:196,height:256,borderRadius:16,background:done?`linear-gradient(160deg,#0d0019,#1a003a)`:S1,border:`1px solid ${done?M:B1}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",transition:"all .4s"}}>
          {loading&&<div style={{textAlign:"center"}}><div style={{width:28,height:28,border:`2px solid ${M}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 8px"}}/><div style={{color:T3,fontSize:11}}>Generating…</div></div>}
          {done&&!loading&&<><div style={{width:72,height:92,borderRadius:36,background:`linear-gradient(160deg,${M},${ML})`,position:"absolute",top:"18%"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(to top,#0d0019,transparent)"}}/><div style={{position:"absolute",bottom:14,color:T1,fontSize:11,textAlign:"center"}}><div style={{fontWeight:700}}>Lumenfield Character</div><div style={{color:T3,fontSize:9}}>{sel.char} · {sel.gender} · {sel.hair}</div></div></>}
          {!done&&!loading&&<div style={{color:T3,fontSize:11,textAlign:"center"}}>Preview<br/>appears here</div>}
        </div>
        <button className="bm" onClick={gen} disabled={loading} style={{marginTop:16,width:"100%",padding:"11px",animation:!loading&&!done?"glow 2.5s ease-in-out infinite":"none"}}>{loading?"Generating…":done?"Regenerate →":"Generate Influencer →"}</button>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"24px 28px"}}>
        <h2 style={{color:T1,fontSize:15,fontWeight:800,marginBottom:20,letterSpacing:-.3}}>Build Your AI Influencer</h2>
        <InfluencerOptionGrid label="Character Type" field="char"   opts={CHAR_T} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Gender"         field="gender" opts={GENS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Ethnicity"      field="eth"    opts={ETHS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Skin Color"     field="skin"   opts={SKINS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Eye Color"      field="eyes"   opts={EYES} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Age"            field="age"    opts={["Adult","Mature","Senior"]} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Hair Style"     field="hair"   opts={HAIRS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Face Skin Material" field="material" opts={MATS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Surface Pattern" field="pattern" opts={PATS} sel={sel} up={up}/>
        <div style={{marginTop:22,padding:16,border:`1px solid ${B1}`,borderRadius:12,background:`linear-gradient(145deg,${M}10,${S1})`}}>
          <div style={{fontSize:10,color:ML,fontWeight:800,textTransform:"uppercase",letterSpacing:.9,marginBottom:8}}>Character prompt summary</div>
          <div style={{color:T2,fontSize:12,lineHeight:1.7}}>
            {sel.age} {sel.gender.toLowerCase()} {sel.char.toLowerCase()} influencer with {sel.skin} skin, {sel.eyes.toLowerCase()} eyes, {sel.hair.toLowerCase()} hair, {sel.material.toLowerCase()} material and {sel.pattern.toLowerCase()} surface pattern.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CANVAS ──────────────────────────────────────────────────────────────────
function CanvasPage() {
  const [created,setCreated] = useState(false);
  return (
    <div style={{height:"100vh",paddingTop:57,background:"#020202",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#1a2a4a 1px,transparent 1px)",backgroundSize:"28px 28px",opacity:.4}}/>
      {[{top:"15%",left:"8%",w:130,h:88,bg:"linear-gradient(135deg,#0d1a2e,#1e3a5f)"},{top:"22%",right:"10%",w:110,h:70,bg:`linear-gradient(135deg,${MD},#1a003a)`},{top:"62%",left:"6%",w:100,h:76,bg:"linear-gradient(135deg,#0a1a28,#1a3a4f)"},{top:"70%",right:"14%",w:90,h:60,bg:"linear-gradient(135deg,#1a0d00,#3a1a00)"}].map((c,i)=>(
        <div key={i} style={{position:"absolute",top:c.top,left:c.left as string|undefined,right:c.right as string|undefined,width:c.w,height:c.h,background:c.bg,borderRadius:10,border:`1px solid ${B1}`,opacity:.65}}/>
      ))}
      <div style={{position:"absolute",top:"18%",right:"22%",background:"#fff",color:"#111",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>That&apos;s stunning! 🎉</div>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",zIndex:10}}>
        <div style={{border:`2px solid ${M}40`,borderRadius:14,padding:"22px 36px",background:"rgba(5,5,5,.9)",backdropFilter:"blur(10px)",marginBottom:20}}>
          <div style={{fontSize:"clamp(12px,2vw,18px)",fontWeight:900,color:M,letterSpacing:.5}}>GENERATE STUNNING MEDIA WITH AI CANVAS</div>
        </div>
        {!created?(
          <div style={{background:"rgba(10,10,10,.96)",border:`1px solid ${B1}`,borderRadius:14,padding:"28px 44px",backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:32,marginBottom:10}}>🖼</div>
            <div style={{color:T1,fontSize:14,fontWeight:700,marginBottom:5}}>No Boards Yet</div>
            <div style={{color:T3,fontSize:12,marginBottom:20}}>Make images, videos, and ideas in one place</div>
            <button className="bm" onClick={()=>setCreated(true)}>Create Canvas</button>
          </div>
        ):(
          <div style={{color:M,fontSize:14,fontWeight:700}}>✓ Canvas created!</div>
        )}
      </div>
      <div style={{position:"absolute",bottom:72,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8}}>
        {["Long Video","Seedance 2.0","Extend Video","Storyboard","Product Board","Character Builder"].map(t=>(
          <div key={t} style={{background:"rgba(10,10,10,.88)",border:`1px solid ${B1}`,borderRadius:7,padding:"7px 12px",fontSize:10,color:"#3a7abf",cursor:"pointer",whiteSpace:"nowrap",backdropFilter:"blur(8px)",transition:"all .15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.color=ML;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=B1;e.currentTarget.style.color="#3a7abf";}}
          >{t}</div>
        ))}
      </div>
      <div style={{position:"absolute",bottom:20,right:20,background:S1,border:`1px solid ${B1}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 24px rgba(0,0,0,.6)"}}>
        <div><div style={{color:"#f59e0b",fontSize:11,fontWeight:700}}>Credits running low!</div><div style={{color:T3,fontSize:10}}>Over 90% already used</div></div>
        <button className="bm" style={{padding:"6px 14px",fontSize:11}}>Upgrade</button>
      </div>
    </div>
  );
}

// ─── APPS ────────────────────────────────────────────────────────────────────
function AppsPage({go}:{go:(p:Page)=>void}) {
  const cats = Object.keys(APPS_D);
  const [cat,setCat] = useState("Professional");
  const acc:Record<string,string> = {"Professional":"#6366f1","Enhance & Style":"#10b981","Face & Identity":M,"Ads & Products":"#f59e0b","Games & Characters":"#8b5cf6"};
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"32px 40px 0"}}>
        <h1 style={{color:T1,fontSize:26,fontWeight:900,letterSpacing:-1,marginBottom:6}}>AI Apps</h1>
        <p style={{color:T3,fontSize:13,marginBottom:24}}>Creative tools powered by the latest models.</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:32,paddingBottom:20,borderBottom:`1px solid ${B1}`}}>
          {["All",...cats].map(c=><button key={c} className={`chip${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </div>
      <div style={{padding:"0 40px 60px"}}>
        {(cat==="All"?cats:[cat]).map(grp=>(
          <div key={grp} style={{marginBottom:36}}>
            {cat==="All"&&<div style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>{grp}</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
              {(APPS_D[grp]??[]).map(app=>(
                <div key={app.name} className="card" style={{padding:0,overflow:"hidden"}}>
                  <div style={{height:90,background:`${acc[grp]||M}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,borderBottom:`1px solid ${B1}`}}>{app.icon}</div>
                  <div style={{padding:"12px 14px"}}>
                    <div style={{display:"inline-block",fontSize:8,color:acc[grp]||M,border:`1px solid ${acc[grp]||M}40`,borderRadius:4,padding:"1px 6px",marginBottom:5,textTransform:"uppercase"}}>{grp}</div>
                    <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:3}}>{app.name}</div>
                    <div style={{color:T3,fontSize:11,marginBottom:10}}>{app.desc}</div>
                    <button onClick={()=>go("cinema")} style={{width:"100%",background:`${acc[grp]||M}12`,border:`1px solid ${acc[grp]||M}40`,color:acc[grp]||M,borderRadius:6,padding:"6px 0",fontSize:11,cursor:"pointer",fontWeight:700,transition:"all .15s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background=acc[grp]||M;e.currentTarget.style.color="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background=`${acc[grp]||M}12`;e.currentTarget.style.color=acc[grp]||M;}}
                    >Try Now →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LIBRARY ─────────────────────────────────────────────────────────────────
function LibraryPage({go}:{go:(p:Page)=>void}) {
  const [f,setF] = useState("Video");
  const [view,setView] = useState<"grid"|"list">("grid");
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG,padding:"72px 40px 40px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <h1 style={{color:T1,fontSize:22,fontWeight:900,letterSpacing:-.5}}>My Library</h1>
        <div style={{display:"flex",gap:6}}>
          {(["grid","list"] as const).map(v=><button key={v} onClick={()=>setView(v)} style={{background:view===v?S2:"transparent",border:`1px solid ${B1}`,color:view===v?T1:T3,borderRadius:6,padding:"6px 12px",fontSize:11,cursor:"pointer"}}>{v==="grid"?"⊞":"≡"} {v}</button>)}
        </div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:36}}>
        {["Image","Video","Audio","Marketing Studio","Characters","Lipsync","Canvas Boards"].map(x=><button key={x} className={`chip${f===x?" on":""}`} onClick={()=>setF(x)}>{x}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 0",textAlign:"center"}}>
        <div style={{fontSize:48,opacity:.1,marginBottom:16}}>🎬</div>
        <div style={{color:T2,fontSize:16,fontWeight:700,marginBottom:6}}>Your creations will appear here.</div>
        <div style={{color:T3,fontSize:13,marginBottom:28}}>Let&apos;s make magic ✨</div>
        <button className="bm" onClick={()=>go("cinema")} style={{padding:"12px 28px"}}>Start Generating →</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({go}:{go:(p:Page)=>void}) {
  const tabs = ["Lumenfield Visual Pro","Kling 3.0","Lumenfield Soul","Cinema App","SeedMotion 2.0","VeoStyle 3.1"];
  const [tab,setTab] = useState(0);
  const bgs = [`linear-gradient(160deg,#1a0030,${MD},#0d0019)`,"linear-gradient(160deg,#001020,#003060,#001020)","linear-gradient(160deg,#200010,#600030,#200010)","linear-gradient(160deg,#001020,#002040,#001020)","linear-gradient(160deg,#102000,#205000,#102000)","linear-gradient(160deg,#001020,#003030,#001020)"];
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <div style={{width:"42%",minWidth:340,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 56px",borderRight:`1px solid ${B1}`}}>
        <div style={{marginBottom:36}}><Logo sz={32}/></div>
        <h1 style={{color:T1,fontSize:26,fontWeight:900,letterSpacing:-1,marginBottom:6}}>Welcome back</h1>
        <p style={{color:T3,fontSize:13,marginBottom:28,lineHeight:1.5}}>Sign in to access your studio, generations, and projects.</p>
        <button className="bg" onClick={()=>go("explore")} style={{marginBottom:12,width:"100%"}}>Back to Explore</button>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {[{icon:"G",label:"Continue with Google",bg:"#fff",fg:"#1a1a1a",border:"#e0e0e0"},{icon:"⌘",label:"Continue with Apple",bg:"#111",fg:"#fff",border:B2},{icon:"M",label:"Continue with Microsoft",bg:"#0078d4",fg:"#fff",border:"#0078d4"},{icon:"✉",label:"Continue with Email",bg:S1,fg:T2,border:B2}].map(b=>(
            <button key={b.label} style={{background:b.bg,border:`1px solid ${b.border}`,color:b.fg,borderRadius:9,padding:"11px 18px",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:12,fontWeight:600,transition:"opacity .15s"}}
              onMouseEnter={e=>(e.currentTarget.style.opacity=".85")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
            ><span style={{fontSize:15,width:18,textAlign:"center"}}>{b.icon}</span>{b.label}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0"}}>
          <div style={{flex:1,height:1,background:B1}}/><span style={{color:T3,fontSize:11}}>or SSO</span><div style={{flex:1,height:1,background:B1}}/>
        </div>
        <p style={{color:T3,fontSize:10,lineHeight:1.7}}>By continuing you agree to our Terms of Service and Privacy Policy. Lumenfield AI Studio is an original, independently built platform.</p>
      </div>
      <div style={{flex:1,background:bgs[tab],position:"relative",transition:"background .5s ease",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
        <div style={{position:"absolute",top:"38%",left:"50%",transform:"translate(-50%,-50%)",userSelect:"none"}}>
          <div style={{fontSize:"clamp(60px,10vw,140px)",fontWeight:900,color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,.06)",letterSpacing:-6}}>LUMENFIELD</div>
        </div>
        <div style={{position:"absolute",bottom:28,left:0,right:0,display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap",padding:"0 16px"}}>
          {tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?M:"rgba(255,255,255,.1)",border:`1px solid ${tab===i?M:"rgba(255,255,255,.2)"}`,color:"#fff",borderRadius:20,padding:"5px 14px",fontSize:11,cursor:"pointer",fontWeight:tab===i?700:400,backdropFilter:"blur(8px)",transition:"all .2s"}}>{t}</button>)}
        </div>
      </div>
    </div>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingPage() {
  const plans = [
    {name:"Starter",price:"Free",period:"",    desc:"Explore Lumenfield AI Studio", hl:false, features:["50 credits/month","720p output","Standard models","Community access"]},
    {name:"Pro",    price:"$29", period:"/mo", desc:"For creators & professionals", hl:true,  badge:"MOST POPULAR", features:["1,000 credits/month","4K output","All models","Cinema Studio 3.5","Priority queue","API access"]},
    {name:"Ultra",  price:"$79", period:"/mo", desc:"For studios & power users",    hl:false, features:["5,000 credits/month","Unlimited 4K","All models + early access","Dedicated queue","White-label","Team seats (5)"]},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{textAlign:"center",padding:"72px 48px 48px"}}>
        <div style={{display:"inline-block",background:`${M}15`,border:`1px solid ${M}40`,borderRadius:20,padding:"4px 14px",fontSize:11,color:ML,marginBottom:20,fontWeight:700,letterSpacing:.5}}>🎉 30% OFF — Limited Time</div>
        <h1 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:900,letterSpacing:-2.5,marginBottom:10}}>Simple, transparent pricing</h1>
        <p style={{color:T3,fontSize:15}}>Scale from hobbyist to studio. Cancel anytime.</p>
      </div>
      <div style={{display:"flex",gap:18,justifyContent:"center",flexWrap:"wrap",padding:"0 40px 80px",maxWidth:1000,margin:"0 auto"}}>
        {plans.map(plan=>(
          <div key={plan.name} style={{background:plan.hl?`linear-gradient(160deg,${M}10,${MD}08)`:S1,border:`1px solid ${plan.hl?M:B1}`,borderRadius:14,padding:"30px 26px",flex:1,minWidth:240,maxWidth:300,position:"relative",boxShadow:plan.hl?`0 0 40px ${M}20`:"none"}}>
            {(plan as {badge?:string}).badge&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:M,color:"#fff",fontSize:9,fontWeight:800,letterSpacing:1,padding:"3px 12px",borderRadius:10}}>{(plan as {badge?:string}).badge}</div>}
            <div style={{color:T3,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6}}>{plan.name}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:2,marginBottom:4}}>
              <span style={{color:T1,fontSize:38,fontWeight:900,letterSpacing:-1.5}}>{plan.price}</span>
              <span style={{color:T3,fontSize:12}}>{plan.period}</span>
            </div>
            <div style={{color:T3,fontSize:12,marginBottom:22}}>{plan.desc}</div>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:26}}>
              {plan.features.map(f=>(
                <div key={f} style={{display:"flex",gap:9,alignItems:"flex-start"}}>
                  <span style={{color:M,fontSize:11,marginTop:1,flexShrink:0}}>✓</span>
                  <span style={{color:T2,fontSize:12}}>{f}</span>
                </div>
              ))}
            </div>
            <button className={plan.hl?"bm":"bg"} style={{width:"100%",padding:"11px"}}>{plan.price==="Free"?"Get Started":`Upgrade to ${plan.name}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── IMAGE STUDIO ─────────────────────────────────────────────────────────────
function ImagePage() {
  const [prompt,setPrompt] = useState("");
  const [model,setModel]   = useState("Nano Banana Pro");
  const [loading,setLoading] = useState(false);
  const [imgs,setImgs]     = useState<number[]>([]);
  const [generatedUrl,setGeneratedUrl] = useState<string>("");
  const modelNames = IMG_M.map(m=>m.title);

  const gen = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImgs([]);
    setGeneratedUrl("");

    try {
      const modelMap: Record<string,string> = {
        "Nano Banana Pro":"nano-banana-pro",
        "Nano Banana 2":"nano-banana-2",
        "GPT Image 2":"gpt-image-2",
        "FLUX.2":"flux-2",
        "Recraft V4.1":"recraft",
        "Seedream 5.0 Lite":"seedream-5-lite",
        "Grok Imagine":"grok-image",
      };
      const modelId = modelMap[model] ?? "flux-2";
      const res = await fetch("/api/studio-generate", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({modelId,prompt}),
      });
      const data = await res.json() as {url?:string;error?:string};
      if (data.url) { setGeneratedUrl(data.url); setImgs([1]); }
    } catch {
      setImgs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:180,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:4,background:BG}}>
        <Lbl s="Tools"/>
        <div style={{height:8}}/>
        {["Text in Image","Inpaint","Relight","Face Swap","Upscale","Product Image"].map(t=><button key={t} className="sb">{t}</button>)}
      </aside>
      <div style={{flex:1,padding:"28px 36px",overflow:"auto"}}>
        <h2 style={{color:T1,fontSize:20,fontWeight:900,letterSpacing:-.5,marginBottom:20}}>Image Studio</h2>
        <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:1,minWidth:240}}><textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe the image you want to create…" rows={2} style={{resize:"none"}}/></div>
          <Sel label="Model" opts={modelNames} val={model} set={setModel}/>
          <button className="bm" onClick={gen} disabled={loading} style={{padding:"10px 24px"}}>{loading?"Generating…":"Generate"}</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {loading&&Array.from({length:4}).map((_,i)=><div key={i} className="sk" style={{aspectRatio:"1",borderRadius:10,animationDelay:`${i*.12}s`}}/>)}
          {generatedUrl && (
            <div style={{aspectRatio:"1",borderRadius:12,overflow:"hidden",border:`1px solid ${B1}`,background:S1,cursor:"pointer",transition:"transform .2s"}}
              onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >
              <img
                src={generatedUrl}
                alt="Generated"
                style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Lumenfield() {
  const [page,setPage] = useState<Page>("explore");
  const pages: Record<Page, ReactNode> = {
    explore:       <ExplorePage     go={setPage}/>,
    cinema:        <CinemaPage/>,
    audio:         <AudioPage/>,
    image:         <ImagePage/>,
    video:         <CinemaPage/>,
    marketing:     <MarketingPage/>,
    influencer:    <InfluencerPage/>,
    canvas:        <CanvasPage/>,
    apps:          <AppsPage        go={setPage}/>,
    library:       <LibraryPage     go={setPage}/>,
    login:         <LoginPage       go={setPage}/>,
    pricing:       <PricingPage/>,
    mcp:           <McpPage/>,
    collab:        <CollabPage/>,
    supercomputer: <SuperPage/>,
    plugins:       <PluginsPage/>,
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <Nav cur={page} go={setPage}/>
      <main>{pages[page]}</main>
    </>
  );
}

