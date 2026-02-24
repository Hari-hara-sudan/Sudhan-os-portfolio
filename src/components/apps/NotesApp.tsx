import { memo } from 'react';

const NotesApp = memo(() => (
  <div className="h-full flex">
    {/* Sidebar */}
    <div className="w-48 shrink-0 border-r border-black/10 p-3" style={{ background: 'hsl(45 80% 95%)' }}>
      <div className="text-[11px] font-semibold text-black/40 uppercase mb-2">Notes</div>
      <div className="text-[13px] text-black/80 bg-yellow-400/20 rounded-md px-2 py-1.5 font-medium mb-1">📝 About Me</div>
      <div className="text-[13px] text-black/50 px-2 py-1.5">🎓 Education</div>
      <div className="text-[13px] text-black/50 px-2 py-1.5">💼 Experience</div>
    </div>
    {/* Content */}
    <div className="flex-1 p-6 overflow-auto" style={{ background: 'hsl(45 60% 97%)' }}>
      <h1 className="text-2xl font-bold text-black/85 mb-1">Hariharasudan V</h1>
      <p className="text-sm text-black/50 mb-4">hariharasudhan2212@gmail.com • Kumbakonam, Tamil Nadu</p>

      <div className="space-y-4 text-sm text-black/70 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-black/80 mb-1">👋 About</h2>
          <p>B.Tech Computer Science student at Kalasalingam Academy of Research and Education (CGPA: 8.03, 2022–2026). Passionate about building full-stack applications, AI-powered tools, and mobile experiences.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-black/80 mb-1">🎓 Education</h2>
          <div className="pl-3 border-l-2 border-yellow-400/40 space-y-2">
            <div>
              <div className="font-medium text-black/75">Kalasalingam Academy of Research and Education</div>
              <div className="text-xs text-black/50">B.Tech CSE • 2022–2026 • CGPA: 8.03</div>
            </div>
            <div>
              <div className="font-medium text-black/75">DR. G.S. Kalyanasundaram Memorial School</div>
              <div className="text-xs text-black/50">XII Grade (CBSE) • 2021–2022</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-black/80 mb-1">💼 Experience</h2>
          <div className="pl-3 border-l-2 border-yellow-400/40">
            <div className="font-medium text-black/75">Rinex Technologies — Web Development Intern</div>
            <div className="text-xs text-black/50 mb-1">Jan 2024 – Mar 2024</div>
            <p className="text-xs text-black/60">Built responsive UIs with HTML, CSS, JavaScript. Gained experience in frontend frameworks and Git. Recognized by E-Cell, IIT Bhubaneswar.</p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-black/80 mb-1">🏆 Certifications</h2>
          <ul className="list-disc pl-5 text-xs text-black/60 space-y-1">
            <li>Vox Mentor — ICOIICS 2025 IEEE Conference Publication</li>
            <li>Cambridge English ESOL (A2) — University of Cambridge</li>
            <li>Oracle Certified Foundations Associate</li>
            <li>Programming with Python 3.X — Simplilearn</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
));

NotesApp.displayName = 'NotesApp';
export default NotesApp;
