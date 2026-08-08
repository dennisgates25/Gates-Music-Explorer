import { MusicExplorer } from "./components/MusicExplorer";

export default function Home() {
  return <><section className="reference-stage" aria-label="Gates Music Explorer home"><div className="reference-canvas"><img src="/gates-music-explorer-reference.png" alt="Gates Music Explorer musical learning homepage" /><nav className="reference-hotspots" aria-label="Music Explorer navigation"><button className="hot-home" aria-label="Home" /><button className="hot-mission" aria-label="Start today's mission" />{Array.from({ length: 8 }, (_, index) => <button key={index} className={`hot-module hot-module-${index + 1}`} aria-label={`Explore music module ${index + 1}`} />)}</nav></div></section><div className="responsive-app"><MusicExplorer /></div></>;
}
