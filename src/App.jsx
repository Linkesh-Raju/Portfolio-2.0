import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Loader } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react' 
import Scene from './components/Scene'

function App() {
  const [ghData, setGhData] = useState({ repos: '...', followers: '...' })

  // Fetch live GitHub data on load
  useEffect(() => {
    fetch('https://api.github.com/users/linkesh-raju')
      .then(res => res.json())
      .then(data => {
        if(data.public_repos !== undefined) {
          setGhData({ repos: data.public_repos, followers: data.followers })
        }
      })
      .catch(err => console.error('Failed to fetch GitHub data:', err))
  }, [])

  return (
    <div className="h-screen w-full bg-[#0f172a] overflow-hidden font-sans text-slate-200">
      
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-xl font-black tracking-widest text-white drop-shadow-md">LR.DEV</div>
        <div className="text-sm font-mono text-blue-400 drop-shadow-md bg-black/50 px-3 py-1 rounded">STATUS: OPEN TO ROLES</div>
      </header>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ScrollControls pages={6} damping={0.2}>
          
          <Suspense fallback={null}>
            <Scene />
          </Suspense>

          <Scroll html className="w-full">
            
            {/* Page 1: Hero */}
            <section className="h-screen w-screen flex flex-col justify-center items-start pl-[5vw] md:pl-[10vw] pointer-events-none">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full"></div>
                <h1 className="relative text-[15vw] md:text-[8vw] leading-none font-black text-white tracking-tighter drop-shadow-2xl">
                  LINKESH<br />RAJU
                </h1>
                <p className="relative text-blue-400 text-lg md:text-2xl font-mono mt-6 border-l-2 border-blue-500 pl-4 bg-black/30 backdrop-blur-sm p-2 rounded max-w-max pointer-events-auto">
                  Full-Stack Engineer & AI Enthusiast
                </p>
              </div>
            </section>

            {/* Page 2: Arsenal */}
            <section className="h-screen w-screen flex flex-col justify-center items-end pr-[5vw] md:pr-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-blue-500"></span> Technical Arsenal
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs md:text-sm font-mono text-slate-400 mb-3">LANGUAGES & CORE</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Java', 'JavaScript', 'Python', 'HTML/CSS', 'System Design'].map(tech => (
                        <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs md:text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-mono text-slate-400 mb-3">FRAMEWORKS & TOOLS</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Spring Boot', 'Next.js', 'PostgreSQL', 'AWS', 'MediaPipe', 'Git'].map(tech => (
                        <span key={tech} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-200 rounded-md text-xs md:text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Page 3: Forge-X Card */}
            <section className="h-screen w-screen flex flex-col justify-center items-start pl-[5vw] md:pl-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl transition-colors duration-500 pointer-events-auto">
                <div className="text-orange-400 font-mono text-xs md:text-sm mb-2">10-HOUR HACKATHON PROJECT</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Forge-X</h2>
                <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                  A highly scalable Public Complaint & Issue Tracking Portal. Engineered a robust backend architecture prioritizing data security and efficient routing.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-bold tracking-wider">SPRING SECURITY</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-bold tracking-wider">JWT</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-bold tracking-wider">JAVA</span>
                </div>
                <button 
                  onClick={() => window.open('https://github.com/linkesh-raju', '_blank')}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all"
                >
                  View Architecture ↗
                </button>
              </div>
            </section>

            {/* Page 4: Air Writing Card */}
            <section className="h-screen w-screen flex flex-col justify-center items-end pr-[5vw] md:pr-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl transition-colors duration-500 pointer-events-auto">
                <div className="text-emerald-400 font-mono text-xs md:text-sm mb-2">COMPUTER VISION RESEARCH</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Air Writing 2.0 HD</h2>
                <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                  Developed an interactive 3D spatial drawing application. Utilized real-time hand tracking through webcam feeds to translate physical gestures into digital canvas coordinates.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold tracking-wider">MEDIAPIPE</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold tracking-wider">OPENCV</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold tracking-wider">PYTHON</span>
                </div>
                <button 
                  onClick={() => window.open('https://github.com/linkesh-raju', '_blank')}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  Watch Demo ↗
                </button>
              </div>
            </section>

            {/* Page 5: PharmaFlow */}
            <section className="h-screen w-screen flex flex-col justify-center items-start pl-[5vw] md:pl-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto">
                 <div className="text-blue-400 font-mono text-xs md:text-sm mb-2">FULL-STACK DASHBOARD</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">PharmaFlow</h2>
                <p className="text-slate-300 text-base md:text-lg mb-6">
                  Comprehensive inventory management system featuring real-time data visualization and stock tracking.
                </p>
                 <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold tracking-wider">NEXT.JS</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold tracking-wider">POSTGRESQL</span>
                </div>
              </div>
            </section>

            {/* Page 6: Hire Me (Terminal with Live Data) */}
            <section className="h-screen w-screen flex flex-col justify-center items-center px-[5vw] pointer-events-none">
              <div className="bg-[#0a0a0a]/90 backdrop-blur-md border border-slate-700 rounded-xl p-6 md:p-8 w-full max-w-2xl shadow-2xl font-mono pointer-events-auto">
                <div className="flex gap-2 mb-6 border-b border-slate-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <p className="text-slate-400 mb-2">{">"} initializing_connection...</p>
                <p className="text-slate-400 mb-2">{">"} fetching_github_stats...</p>
                <p className="text-slate-400 mb-2">
                  {">"} public_repos: <span className="text-blue-400">{ghData.repos}</span> | followers: <span className="text-blue-400">{ghData.followers}</span>
                </p>
                <p className="text-green-400 mb-6">{">"} connection_established. ready to build.</p>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-sans">
                  Let's engineer something great.
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:dev.linkeshraju@gmail.com" className="px-6 py-3 bg-white text-black font-bold font-sans rounded hover:bg-slate-200 transition-colors text-center">
                    dev.linkeshraju@gmail.com
                  </a>
                  <a href="https://github.com/linkesh-raju" target="_blank" rel="noreferrer" className="px-6 py-3 border border-slate-600 text-white font-bold font-sans rounded hover:bg-white/10 transition-colors text-center">
                    GitHub Profile
                  </a>
                </div>
              </div>
            </section>

          </Scroll>
        </ScrollControls>
      </Canvas>

      <Loader 
        containerStyles={{ backgroundColor: '#0f172a' }} 
        innerStyles={{ backgroundColor: '#3b82f6', width: '300px' }} 
        barStyles={{ backgroundColor: '#60a5fa' }} 
        dataInterpolation={(p) => `Compiling Environment: ${p.toFixed(0)}%`} 
      />
      
    </div>
  )
}

export default App