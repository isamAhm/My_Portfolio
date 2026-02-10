import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Float,
    MeshDistortMaterial,
    Sphere,
    Html
} from '@react-three/drei';
import * as THREE from 'three';

// Particle field
function ParticleField({ count = 2000 }) {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#4a90e2"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Skill sphere
function SkillSphere({ position, skill, color }: {
    position: [number, number, number];
    skill: string;
    color: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time) * 0.2;
            meshRef.current.rotation.x = time * 0.3;
            meshRef.current.rotation.y = time * 0.2;

            const targetScale = hovered ? 1.2 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <Sphere args={[0.8, 32, 32]}>
                    <MeshDistortMaterial
                        color={color}
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </Sphere>

                {hovered && (
                    <Html distanceFactor={10}>
                        <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm whitespace-nowrap">
                            {skill}
                        </div>
                    </Html>
                )}
            </mesh>
        </Float>
    );
}

// Floating shapes
function FloatingShapes() {
    return (
        <>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-5, 3, -5]}>
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
                <mesh position={[5, -2, -5]}>
                    <octahedronGeometry args={[1]} />
                    <meshStandardMaterial
                        color="#ff0088"
                        wireframe
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            </Float>
        </>
    );
}

// Main scene
function Scene() {
    const skills = [
        { name: "Three.js", color: "#ff6b6b", position: [-3, 2, 0] as [number, number, number] },
        { name: "WebGL", color: "#4ecdc4", position: [3, -1, 0] as [number, number, number] },
        { name: "GLSL", color: "#45b7d1", position: [0, 0, 2] as [number, number, number] },
        { name: "React", color: "#96ceb4", position: [-2, -2, -2] as [number, number, number] },
        { name: "TypeScript", color: "#feca57", position: [2, 2, -2] as [number, number, number] },
    ];

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />

            <ParticleField count={1500} />
            <FloatingShapes />

            {skills.map((skill) => (
                <SkillSphere
                    key={skill.name}
                    position={skill.position}
                    skill={skill.name}
                    color={skill.color}
                />
            ))}

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.3}
                maxDistance={20}
                minDistance={5}
            />
        </>
    );
}

export function Portfolio3DShowcase() {
    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="absolute bottom-4 left-4 z-10 bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm text-sm">
                <div className="font-bold">Three.js Portfolio Showcase</div>
                <div className="text-xs opacity-70 mt-1">
                    Drag to rotate • Scroll to zoom • Hover over spheres
                </div>
            </div>

            <div className="w-full h-full">
                <Canvas
                    camera={{
                        position: [0, 0, 12],
                        fov: 75,
                        near: 0.1,
                        far: 1000
                    }}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: "high-performance"
                    }}
                >
                    <Scene />
                </Canvas>
            </div>
        </div>
    );
}