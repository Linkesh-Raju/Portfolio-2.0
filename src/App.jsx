import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, Loader, useScroll, Float, Sparkles } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Analytics } from '@vercel/analytics/react'

// --- CUSTOM SCI-FI CURSOR ---
function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (ringRef.current) {
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
          }
        }, 50) 
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[100] -ml-1 -mt-1 shadow-[0_0_10px_rgba(96,165,250,1)]"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-blue-500/50 rounded-full pointer-events-none z-[99] -ml-4 -mt-4 transition-transform duration-75 ease-out"
      />
    </>
  )
}

// --- ZONE 1: The Vision Node (Hologram Core) ---
function VisionNode({ position }) {
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const speed = hovered ? 3 : 1
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.5 * speed
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4 * speed
      ring1Ref.current.rotation.y += delta * 0.3 * speed
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.3 * speed
      ring2Ref.current.rotation.z += delta * 0.5 * speed
    }
  })

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Inner Glowing Core */}
      <mesh ref={coreRef} scale={1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={hovered ? 3 : 1.5} wireframe />
      </mesh>
      {/* Orbiting Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
      </mesh>
      {/* Orbiting Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

// --- ZONE 3: Forge-X Data Core (Gyroscopic Security) ---
function ForgeXCore({ position }) {
  const innerRef = useRef()
  const outerRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const speed = hovered ? 2.5 : 1
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.8 * speed
      innerRef.current.rotation.x += delta * 0.4 * speed
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.4 * speed
      outerRef.current.rotation.z += delta * 0.2 * speed
    }
  })

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => window.open('https://github.com/Linkesh-Raju/FORGE-X', '_blank')}>
      {/* Solid Bright Inner Octahedron */}
      <mesh ref={innerRef} scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={hovered ? 3 : 1.5} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Complex Outer Wireframe */}
      <mesh ref={outerRef} scale={1.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// --- ZONE 4: Air Writing Lens (Camera Aperture) ---
function AirWritingLens({ position }) {
  const lensRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const speed = hovered ? 4 : 1
    if (lensRef.current) lensRef.current.rotation.y += delta * 1.5 * speed
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.5 * speed
      ringRef.current.rotation.y -= delta * 0.2 * speed
    }
  })

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => window.open('https://github.com/Linkesh-Raju/Air-Writing-2.0', '_blank')}>
      {/* Inner Glowing Lens */}
      <mesh ref={lensRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={hovered ? 4 : 2} />
      </mesh>
      {/* Flat Rotating Aperture Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.05, 16, 100]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#a7f3d0" emissive="#a7f3d0" emissiveIntensity={1} wireframe />
      </mesh>
    </group>
  )
}

// --- ZONE 5: PharmaFlow Data Capsule (Holographic Container) ---
function PharmaFlowCapsule({ position }) {
  const coreRef = useRef()
  const shellRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const speed = hovered ? 3 : 1
    // Core spins one way
    if (coreRef.current) coreRef.current.rotation.y += delta * 1 * speed
    // Wireframe shell spins opposite on multiple axes
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.5 * speed
      shellRef.current.rotation.x += delta * 0.2 * speed
    }
    // Rings orbit chaotically
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.5 * speed
      ring1Ref.current.rotation.y += delta * 0.5 * speed
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 1.5 * speed
      ring2Ref.current.rotation.x += delta * 0.5 * speed
    }
  })

  return (
    <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => window.open('https://github.com/Linkesh-Raju/pharma-flow', '_blank')}>
      {/* Inner Glowing Data Pill */}
      <mesh ref={coreRef}>
        <capsuleGeometry args={[0.3, 1.2, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={hovered ? 4 : 2} />
      </mesh>
      {/* Outer Holographic Wireframe Shell */}
      <mesh ref={shellRef}>
        <capsuleGeometry args={[0.6, 1.4, 16, 32]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1} wireframe transparent opacity={0.6} />
      </mesh>
      {/* Orbital Scanner 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.0, 0.02, 16, 100]} />
        <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={2} />
      </mesh>
      {/* Orbital Scanner 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#bfdbfe" emissive="#bfdbfe" emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}

// --- MAIN SCENE ---
function Scene() {
  const scroll = useScroll()
  const interactiveMesh = useRef()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame((state) => {
    const offset = scroll.offset
    state.camera.position.z = 10 - offset * 60
    state.camera.position.x = Math.sin(offset * Math.PI * 2) * (isMobile ? 1 : 3)
    state.camera.lookAt(0, 0, state.camera.position.z - 15)

    const targetX = (state.pointer.x * Math.PI) / 8
    const targetY = (state.pointer.y * Math.PI) / 8

    if (interactiveMesh.current) {
      interactiveMesh.current.rotation.y = THREE.MathUtils.lerp(interactiveMesh.current.rotation.y, targetX, 0.05)
      interactiveMesh.current.rotation.x = THREE.MathUtils.lerp(interactiveMesh.current.rotation.x, -targetY, 0.05)
      interactiveMesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  const posRight = isMobile ? 0 : 5
  const posLeft = isMobile ? 0 : -5

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Sparkles count={800} scale={[20, 20, 60]} position={[0, 0, -20]} size={2} speed={0.4} opacity={0.5} color="#60a5fa" />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group ref={interactiveMesh} position={[isMobile ? 0 : 4, isMobile ? -3 : -1, 0]}>
          <VisionNode position={[0, 0, 0]} />
        </group>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <ForgeXCore position={[posRight, isMobile ? -3 : 0, -20]} />
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <AirWritingLens position={[posLeft, isMobile ? -3 : 0, -35]} />
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <PharmaFlowCapsule position={[posRight, isMobile ? -3 : 0, -50]} />
      </Float>

      {/* Razor Sharp Neon Bloom */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={2.5} />
      </EffectComposer>
    </group>
  )
}

// --- APP COMPONENT ---
export default function App() {
  const [ghData, setGhData] = useState({ repos: '...', followers: '...' })

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
    <div className="h-screen w-full bg-[#0f172a] overflow-hidden font-sans text-slate-200 cursor-none">
      
      <Analytics />
      <CustomCursor />
      
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
                <h1 
                  style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.02em' }} 
                  className="relative text-[16vw] md:text-[9vw] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl"
                >
                  LINKESH<br />RAJU
                </h1>
                <p className="relative text-blue-400 text-lg md:text-2xl font-mono mt-4 border-l-2 border-blue-500 pl-4 bg-black/30 backdrop-blur-sm p-2 rounded max-w-max pointer-events-auto cursor-none">
                  Full-Stack Engineer & AI Enthusiast
                </p>
              </div>
            </section>

            {/* Page 2: Arsenal */}
            <section className="h-screen w-screen flex flex-col justify-center items-end pr-[5vw] md:pr-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto cursor-none">
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
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl transition-colors duration-500 pointer-events-auto cursor-none">
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
                  onClick={() => window.open('https://github.com/Linkesh-Raju/FORGE-X', '_blank')}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all cursor-none"
                >
                  View Architecture ↗
                </button>
              </div>
            </section>

            {/* Page 4: Air Writing Card */}
            <section className="h-screen w-screen flex flex-col justify-center items-end pr-[5vw] md:pr-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl transition-colors duration-500 pointer-events-auto cursor-none">
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
                  onClick={() => window.open('https://github.com/Linkesh-Raju/Air-Writing-2.0', '_blank')}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-none"
                >
                  Watch Demo ↗
                </button>
              </div>
            </section>

            {/* Page 5: PharmaFlow */}
            <section className="h-screen w-screen flex flex-col justify-center items-start pl-[5vw] md:pl-[10vw] pointer-events-none">
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto cursor-none">
                 <div className="text-blue-400 font-mono text-xs md:text-sm mb-2">FULL-STACK DASHBOARD</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">PharmaFlow</h2>
                <p className="text-slate-300 text-base md:text-lg mb-6">
                  Comprehensive inventory management system featuring real-time data visualization and stock tracking.
                </p>
                 <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold tracking-wider">NEXT.JS</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold tracking-wider">POSTGRESQL</span>
                </div>
                <button
                  onClick={() => window.open('https://github.com/Linkesh-Raju/pharma-flow', '_blank')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-none"
                >
                  View Code ↗
                </button>
              </div>
            </section>

            {/* Page 6: Hire Me */}
            <section className="h-screen w-screen flex flex-col justify-center items-center px-[5vw] pointer-events-none">
              <div className="bg-black/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 md:p-12 w-full max-w-3xl shadow-2xl font-mono pointer-events-auto cursor-none">
                <div className="flex gap-2 mb-8 border-b border-slate-700/50 pb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>

                <div className="text-sm md:text-base space-y-2 mb-8">
                  <p className="text-slate-400">{">"} initializing_connection...</p>
                  <p className="text-slate-400">{">"} fetching_github_stats...</p>
                  <p className="text-slate-400">
                    {">"} public_repos: <span className="text-blue-400 font-bold">{ghData.repos}</span> | followers: <span className="text-blue-400 font-bold">{ghData.followers}</span>
                  </p>
                  <p className="text-emerald-400">{">"} connection_established. ready to build.</p>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-8 font-sans tracking-tight">
                  Let's engineer something great.
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
                  <a href="https://www.linkedin.com/in/linkesh-raju-157a28382/" target="_blank" rel="noreferrer" 
                     className="group relative px-6 py-4 bg-blue-600/10 border border-blue-500/50 text-blue-400 font-bold font-sans rounded hover:bg-blue-600 hover:text-white transition-all duration-300 text-center uppercase tracking-wider overflow-hidden hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 cursor-none">
                    <span className="relative z-10">LinkedIn Profile</span>
                  </a>

                  <a href="mailto:dev.linkeshraju@gmail.com" 
                     className="group relative px-6 py-4 bg-white/5 border border-white/30 text-white font-bold font-sans rounded hover:bg-white hover:text-black transition-all duration-300 text-center uppercase tracking-wider overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1 cursor-none">
                    <span className="relative z-10">Email Me</span>
                  </a>

                  <a href="https://github.com/linkesh-raju" target="_blank" rel="noreferrer" 
                     className="group relative px-6 py-4 bg-transparent border border-slate-600 text-slate-300 font-bold font-sans rounded hover:bg-slate-800 hover:text-white transition-all duration-300 text-center uppercase tracking-wider overflow-hidden hover:shadow-[0_0_20px_rgba(148,163,184,0.2)] hover:-translate-y-1 cursor-none">
                    <span className="relative z-10">GitHub</span>
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