import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// 3D Skill Card Component
function SkillCard3D({
    position,
    title,
    color,
    index
}: {
    position: [number, number, number];
    title: string;
    color: string;
    index: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;
            meshRef.current.rotation.y = time * 0.2 + index;

            const targetScale = hovered ? 1.3 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.2}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <boxGeometry args={[2, 2.5, 0.1]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.9}
                    roughness={0.2}
                    metalness={0.8}
                />

                <Text
                    position={[0, 0, 0.06]}
                    fontSize={0.3}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {title}
                </Text>

                {hovered && (
                    <Html
                        distanceFactor={10}
                        position={[0, -1.5, 0]}
                        center
                    >
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm whitespace-nowrap shadow-lg">
                            {title} Expert
                        </div>
                    </Html>
                )}
            </mesh>
        </Float>
    );
}

// Animated background particles
function BackgroundParticles() {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const particleCount = 1500;
        const arr = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 50;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 50;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#4a90e2" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

// Floating geometric shapes
function FloatingShapes() {
    return (
        <>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-8, 4, -5]}>
                    <icosahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial
                        color="#00ff88"
                        wireframe
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </Float>

            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[8, -3, -5]}>
                    <octahedronGeometry args={[1]} />
                    <meshStandardMaterial
                        color="#ff0088"
                        wireframe
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            </Float>

            <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh position={[0, 5, -8]}>
                    <tetrahedronGeometry args={[1.2]} />
                    <meshStandardMaterial
                        color="#0088ff"
                        wireframe
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            </Float>
        </>
    );
}


// Main 3D Scene
function ThreeJSScene({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
    const controlsRef = useRef<any>(null);

    const skills = [
        { title: "Three.js", color: "#ff6b6b", position: [-4, 0, 0] as [number, number, number] },
        { title: "WebGL", color: "#4ecdc4", position: [0, 0, 0] as [number, number, number] },
        { title: "GLSL", color: "#45b7d1", position: [4, 0, 0] as [number, number, number] },
        { title: "R3F", color: "#96ceb4", position: [-2, -3, 0] as [number, number, number] },
        { title: "Drei", color: "#feca57", position: [2, -3, 0] as [number, number, number] },
    ];

    const MIN_DIST = 6;
    const MAX_DIST = 20;

    // Drive zoom via OrbitControls' own distance constraints — no camera fighting
    useFrame(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        const progress = scrollProgressRef.current;
        const targetDist = THREE.MathUtils.lerp(MAX_DIST, MIN_DIST, progress);
        const currentDist = controls.getDistance();
        const newDist = THREE.MathUtils.lerp(currentDist, targetDist, 0.06);

        // Clamp controls to the new distance so OrbitControls moves the camera itself
        controls.minDistance = newDist;
        controls.maxDistance = newDist;
        controls.update();

        // Restore real bounds after update so user can still drag
        controls.minDistance = MIN_DIST;
        controls.maxDistance = MAX_DIST;
    });

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

            <BackgroundParticles />
            <FloatingShapes />

            {skills.map((skill, index) => (
                <SkillCard3D
                    key={skill.title}
                    position={skill.position}
                    title={skill.title}
                    color={skill.color}
                    index={index}
                />
            ))}

            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
                autoRotate={true}
                autoRotateSpeed={0.5}
                maxDistance={MAX_DIST}
                minDistance={MIN_DIST}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
            />
        </>
    );
}

// Main component
export function ThreeJSSkillsSection() {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Track scroll progress through the section — stored in a ref to avoid re-renders
    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionH = rect.height;
            const viewportH = window.innerHeight;

            let progress = 0;
            if (rect.top <= 0 && rect.bottom >= viewportH) {
                // Section is filling the viewport — calculate how far through we are
                progress = Math.abs(rect.top) / (sectionH - viewportH);
            } else if (rect.top > 0) {
                progress = 0; // haven't reached it yet
            } else {
                progress = 1; // passed it
            }

            scrollProgressRef.current = Math.max(0, Math.min(1, progress));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // run once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 bg-transparent overflow-hidden min-h-screen pb-40" id="expertise">
            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="max-w-6xl mx-auto px-4 h-full flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center pt-0"
                    >
                        <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                            Expertise
                        </h2>
                        <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                            Advanced 3D web development and interactive experiences
                        </p>
                    </motion.div>
                    <div className="flex-1" />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center pb-8"
                    >
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Drag to rotate • Scroll to zoom • Hover over cards for details
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* 3D Canvas — only mounted when section is visible */}
            <div className="absolute inset-0 w-full h-full">
                {isVisible && (
                    <Canvas
                        camera={{ position: [0, 0, 20], fov: 60 }}
                        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                        style={{ background: 'transparent' }}
                        onCreated={({ gl }) => {
                            gl.domElement.style.touchAction = 'none';
                        }}
                    >
                        <ThreeJSScene scrollProgressRef={scrollProgressRef} />
                    </Canvas>
                )}
            </div>
        </section>
    );
}