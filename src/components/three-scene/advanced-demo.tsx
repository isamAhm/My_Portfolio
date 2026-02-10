import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import {
    OrbitControls,
    Text3D,
    Center,
    Float,
    MeshWobbleMaterial,
    Sparkles,
    useMatcapTexture
} from '@react-three/drei';
import * as THREE from 'three';

// Morphing geometry demonstration
function MorphingShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Morphing between different shapes using sin waves
            const geometry = meshRef.current.geometry as THREE.SphereGeometry;
            const position = geometry.attributes.position;

            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                const y = position.getY(i);
                const z = position.getZ(i);

                // Create morphing effect
                const offset = Math.sin(time + x * 2) * 0.1;
                position.setZ(i, z + offset);
            }

            position.needsUpdate = true;
            meshRef.current.rotation.y = time * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={[-3, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshWobbleMaterial
                color="#ff6b6b"
                attach="material"
                factor={0.6}
                speed={2}
                roughness={0}
                metalness={0.8}
            />
        </mesh>
    );
}

// Procedural animation with instanced meshes
function ProceduralAnimation() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 100;

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            for (let i = 0; i < count; i++) {
                const t = i / count;
                const angle = t * Math.PI * 2;
                const radius = 3 + Math.sin(time + t * 10) * 0.5;

                dummy.position.set(
                    Math.cos(angle + time) * radius,
                    Math.sin(time * 2 + i * 0.1) * 2,
                    Math.sin(angle + time) * radius
                );

                dummy.rotation.set(
                    time + i * 0.1,
                    time * 0.5 + i * 0.05,
                    0
                );

                const scale = 0.1 + Math.sin(time * 3 + i * 0.2) * 0.05;
                dummy.scale.setScalar(scale);

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }

            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[3, 0, 0]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#4ecdc4" metalness={0.8} roughness={0.2} />
        </instancedMesh>
    );
}

// 3D Text with matcap material
function ThreeDText() {
    const [matcap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Center position={[0, 2, 0]}>
                <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={0.5}
                    height={0.1}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Three.js Expert
                    <meshMatcapMaterial matcap={matcap} />
                </Text3D>
            </Center>
        </Float>
    );
}

// Particle system with physics simulation
function PhysicsParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 2000;

    const [positions, velocities] = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return [positions, velocities];
    }, []);

    useFrame(() => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < particleCount; i++) {
                // Simple physics simulation
                positions[i * 3] += velocities[i * 3];
                positions[i * 3 + 1] += velocities[i * 3 + 1];
                positions[i * 3 + 2] += velocities[i * 3 + 2];

                // Boundary checking
                if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
                size={0.02}
                color="#45b7d1"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Main demo scene
function DemoScene() {
    return (
        <>
            {/* Lighting setup */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.8}
                castShadow
            />

            {/* Demo components */}
            <ThreeDText />
            <MorphingShape />
            <ProceduralAnimation />
            <PhysicsParticles />

            {/* Sparkles for extra flair */}
            <Sparkles
                count={100}
                scale={[10, 10, 10]}
                size={2}
                speed={0.4}
                opacity={0.6}
                color="#ffffff"
            />

            {/* Controls */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
                maxDistance={20}
                minDistance={5}
            />
        </>
    );
}

// Main component
export function AdvancedThreeJSDemo() {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black">
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2">Advanced Three.js Techniques</h3>
                <ul className="text-sm space-y-1">
                    <li>• Morphing Geometry</li>
                    <li>• Instanced Rendering</li>
                    <li>• Physics Simulation</li>
                    <li>• 3D Typography</li>
                    <li>• Matcap Materials</li>
                    <li>• Procedural Animation</li>
                </ul>
            </div>

            <Canvas
                camera={{
                    position: [0, 0, 10],
                    fov: 75
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <DemoScene />
            </Canvas>
        </div>
    );
}