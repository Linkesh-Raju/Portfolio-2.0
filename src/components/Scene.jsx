import { useScroll, Float, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// --- ZONE 1: The Vision Node ---
function VisionNode({ position }) {
  const nodeRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    nodeRef.current.rotation.y += delta * (hovered ? 1.0 : 0.3)
    nodeRef.current.rotation.z += delta * (hovered ? 0.8 : 0.2)
  })

  return (
    <group 
      position={position} 
      ref={nodeRef}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
    >
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.9} emissive="#1d4ed8" emissiveIntensity={0.8} />
      </mesh>
      <mesh scale={1.6}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// --- ZONE 3: Forge-X Data Core ---
function ForgeXCore({ position }) {
  const coreRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    coreRef.current.rotation.y += delta * (hovered ? 1.5 : 0.5)
    coreRef.current.rotation.x += delta * (hovered ? 0.8 : 0.2)
  })

  return (
    <group 
      ref={coreRef} 
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={() => window.open('https://github.com/linkesh-raju', '_blank')}
    >
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ea580c" metalness={0.8} roughness={0.2} emissive="#c2410c" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

// --- ZONE 4: Air Writing Computer Vision Lens ---
function AirWritingLens({ position }) {
  const lensRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    lensRef.current.rotation.x -= delta * (hovered ? 1.0 : 0.3)
    lensRef.current.rotation.y -= delta * (hovered ? 1.2 : 0.4)
  })

  return (
    <group 
      ref={lensRef} 
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={() => window.open('https://github.com/linkesh-raju', '_blank')}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#34d399" wireframe />
      </mesh>
      <mesh>
        <torusGeometry args={[1.2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#10b981" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

// --- ZONE 5: PharmaFlow Data Capsule ---
function PharmaFlowCapsule({ position }) {
  const capsuleRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    capsuleRef.current.rotation.y += delta * (hovered ? 1.5 : 0.5)
    capsuleRef.current.rotation.z += delta * (hovered ? 0.8 : 0.2)
  })

  return (
    <group 
      ref={capsuleRef} 
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={() => window.open('https://github.com/linkesh-raju', '_blank')}
    >
      <mesh scale={1.2}>
        <capsuleGeometry args={[0.8, 1.5, 4, 16]} />
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <capsuleGeometry args={[0.6, 1.5, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

// --- MAIN SCENE ---
export default function Scene() {
  const scroll = useScroll()
  const interactiveMesh = useRef() 
  const [isMobile, setIsMobile] = useState(false)

  // Mobile Detection hook
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize() 
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame((state) => {
    const offset = scroll.offset 
    state.camera.position.z = 10 - offset * 60
    // Reduce the side-to-side sway on mobile
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

  // Dynamic X and Y positioning based on screen size
  const posRight = isMobile ? 0 : 5
  const posLeft = isMobile ? 0 : -5

  return (
    <group>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[0, 0, 5]} intensity={3} color="#60a5fa" />

      <Sparkles count={800} scale={[20, 20, 60]} position={[0, 0, -20]} size={2} speed={0.4} opacity={0.3} color="#60a5fa" />

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

      {/* Post-Processing Bloom Effect */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
      </EffectComposer>
    </group>
  )
}