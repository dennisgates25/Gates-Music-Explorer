"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, ChevronDown, ChevronRight, Flame, Folder, Heart, Home, LockKeyhole, Map, Megaphone, Menu, Music2, Trophy, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge, Button, Card } from "./ui";

const nav = [
  ["🗺️", "My Journey"], ["🥁", "Rhythm Lab"], ["🎵", "Melody Studio"], ["🎧", "Listening HQ"],
  ["🎸", "Instruments"], ["🎹", "Create & Compose"], ["🌎", "World Music"], ["📜", "Music History"],
  ["🎮", "Games & Challenges"], ["🏆", "Awards"],
];

const modules = [
  { title: "Rhythm\nLab", art: "🥁", text: "Clap it, tap it,\nread it, feel it!", color: "#ff7200", dark: "#b93400" },
  { title: "Melody\nStudio", art: "🎶", text: "Notes come\nalive here!", color: "#44c83d", dark: "#087c2a" },
  { title: "Listening\nHQ", art: "🎧", text: "Listen closely.\nDiscover more!", color: "#0879ef", dark: "#123b9d" },
  { title: "Instruments\nZone", art: "🎸", text: "Explore sounds\nfrom around you!", color: "#742ee8", dark: "#3c168e" },
  { title: "Create &\nCompose", art: "🎹", text: "Make music.\nBe original.", color: "#ed2c92", dark: "#9c145c" },
  { title: "World\nMusic", art: "🌍", text: "Music from\nevery corner!", color: "#09b8c7", dark: "#086e9f" },
  { title: "Music\nHistory", art: "🧑🏻‍🎤", text: "Meet the legends.\nKnow their story.", color: "#ffb90b", dark: "#d36c00" },
  { title: "Games &\nChallenges", art: "🏆", text: "Play, challenge,\nand level up!", color: "#f04b17", dark: "#a91f12" },
];

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return <AnimatePresence><motion.aside initial={false} animate={{ x: open ? 0 : "-105%" }} className="sidebar">
    <button className="mobile-close" onClick={close} aria-label="Close navigation"><X /></button>
    <div className="brand"><span>Gates</span><b>MUSIC</b><strong>Explorer</strong><small>EXPLORE. LEARN. CREATE. PERFORM.</small></div>
    <nav>
      <button className="nav-active" onClick={close}><Home /> <span>Home</span></button>
      {nav.map(([icon, label]) => <button key={label} onClick={close}><i>{icon}</i><span>{label}</span></button>)}
    </nav>
    <Card className="badge-card"><div className="mascot">😎</div><div><small>You’ve got</small><b>12 Badges</b><small>Keep it up!</small></div><ChevronRight /></Card>
  </motion.aside></AnimatePresence>;
}

function TopNav({ onMenu }: { onMenu: () => void }) {
  const value = useMotionValue(0); const smooth = useSpring(value, { duration: 1200 }); const rounded = useTransform(smooth, Math.round);
  useEffect(() => { value.set(1250); }, [value]);
  return <header className="topnav"><button className="menu-btn" onClick={onMenu} aria-label="Open navigation"><Menu /></button><div className="top-spacer" />
    <Badge className="xp"><span>⭐</span><motion.b>{rounded}</motion.b> XP</Badge><span className="divider"/><Badge className="streak"><Flame /> <b>5</b> Day Streak</Badge>
    <button className="profile"><span className="avatar">🧑🏽‍🎤</span><span><b>Hi, Musician!</b><small>Level 7</small></span><ChevronDown /></button>
  </header>;
}

function Hero() {
  return <div className="hero"><div className="hero-copy"><motion.div className="floating-notes" animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 4 }}>♫ ✦ ♪</motion.div><h1>Your Music Journey<br/><em>Starts Here!</em></h1><p>Discover the world of music,<br/>one adventure at a time.</p><div className="sign"><b>Explore</b><b>Learn</b><b>Create</b><b>Perform</b></div><div className="road">〰</div><div className="music-school">𝄞</div></div>
    <Mission />
  </div>;
}

function Mission() {
  return <Card className="mission"><div className="mission-title"><span>🎯</span><h2>Today&apos;s Mission</h2></div><div className="mission-body"><ul><li>✅ <span>Warm-Up</span></li><li>✅ <span>Learn</span></li><li>✅ <span>Practice</span></li><li>🟡 <span>Create</span></li><li>🔒 <span>Show What You Know</span></li></ul><motion.div className="mission-kid" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🤘🏽<span>🎸</span></motion.div></div><div className="mission-footer"><div><b>🌟 Level 7</b><span>750 / 1,000 XP</span><div className="progress"><motion.i initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.4, delay: .2 }}/></div></div><Button>Start Mission <span>▶</span></Button></div></Card>;
}

function ModuleGrid() { return <section className="modules">{modules.map((m, i) => <Card key={m.title} className="module" ><div className="module-bg" style={{ background: `linear-gradient(155deg, ${m.color}, ${m.dark})` }} /><h3>{m.title.split("\n").map(x=><span key={x}>{x}</span>)}</h3><motion.div className="module-art" animate={{ y: [0, -8, 0], rotate: i % 2 ? [0, 3, 0] : [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3.2 + i * .18 }}>{m.art}</motion.div><p>{m.text.split("\n").map(x=><span key={x}>{x}<br/></span>)}</p><Button className="explore">Explore <ChevronRight /></Button></Card>)}</section> }

function LowerPanels() {
  return <section className="lower"><Card className="whats"><h2>⭐ What&apos;s New</h2>{[["🥁","Beat Builder 2.0","New drum loops and sounds!"],["🎼","Composer Quest","Help finish a famous melody!"],["🪘","World Music Spotlight","Explore the music of Africa!"]].map(x=><div className="news" key={x[1]}><span>{x[0]}</span><p><b>{x[1]}</b><small>{x[2]}</small></p><Badge>NEW!</Badge></div>)}</Card>
    <Card className="unlock"><div className="chest">🧰</div><div><h2>Unlock the Next Adventure!</h2><p>Complete your mission to earn XP and unlock<br/>cool rewards.</p><div className="journey"><i>✓</i><span/><i>✓</i><span/><i>➜</i><span/><i className="locked"><LockKeyhole /></i></div><b>2 more challenges to unlock<br/>your next area!</b></div><Button>View Journey Map <ChevronRight /></Button></Card>
    <Card className="quote"><h2>Music Quote of the Day</h2><blockquote>“ Where words fail,<br/>music speaks. ”</blockquote><small>– Hans Christian Andersen</small><div className="quote-girl">🎧<br/>👩🏾‍🦱</div></Card></section>;
}

function QuickLinks() { return <footer className="quick"><b>Quick Links <Zap /></b><button><Folder/> My Projects</button><button><Heart/> My Favorites</button><button><Trophy/> Leaderboard</button><button><Megaphone/> Teacher Announcements</button></footer> }

export function MusicExplorer() {
 const [open, setOpen] = useState(false);
 return <main className="app-shell"><Sidebar open={open} close={()=>setOpen(false)} /><div className="content"><TopNav onMenu={()=>setOpen(true)} /><Hero/><ModuleGrid/><LowerPanels/><QuickLinks/></div>{open&&<button className="backdrop" onClick={()=>setOpen(false)} aria-label="Close navigation"/>}</main>;
}
