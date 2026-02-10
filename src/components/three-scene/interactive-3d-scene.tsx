import { useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Interactive particle system component
function ParticleField({ count = 3000 }) {
    const mesh = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const radius = Math.random() * 15 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const colorIntensity = Math.random();
        colors[i * 3] = colorIntensity * 0.8 + 0.2;
        colors[i * 3 + 1] = colorIntensity * 0.4 + 0.6;
        colors[i * 3 + 2] = colorIntensity * 1.0;
    }

    useFrame((state) => {
        if (mesh.current) {
            const time = state.clock.getElapsedTime();
            mesh.current.rotation.x = time * 0.1;
            mesh.current.rotation.y = time * 0.15;
            mesh.current.position.x = mouse.x * 2;
            mesh.current.position.y = mouse.y * 2;
        }
    });

    return (
        <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
            <bufferAttribute
                attach="geometry-attributes-color"
                args={[colors, 3]}
            />
        </Points>
    );
}

// Floating geometric shapes
function FloatingGeometry() {
    return (
        <>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-5, 3, -5]}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                        color="#00ff88"
                        wireframe
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </Float>

            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[5, -2, -8]}>
                    <octahedronGeometry args={[1.2]} />
                    <meshStandardMaterial
                        color="#ff0088"
                        wireframe
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            </Float>

            <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh position={[0, 4, -10]}>
                    <tetrahedronGeometry args={[1.5]} />
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

// Interactive sphere that follows mouse
function InteractiveSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (sphereRef.current) {
            const time = state.clock.getElapsedTime();

            sphereRef.current.position.x = THREE.MathUtils.lerp(
                sphereRef.current.position.x,
                mouse.x * 5,
                0.1
            );
            sphereRef.current.position.y = THREE.MathUtils.lerp(
                sphereRef.current.position.y,
                mouse.y * 5,
                0.1
            );

            const scale = 1 + Math.sin(time * 2) * 0.1;
            sphereRef.current.scale.setScalar(scale);

            sphereRef.current.rotation.x = time * 0.5;
            sphereRef.current.rotation.y = time * 0.3;
        }
    });

    return (
        <mesh ref={sphereRef} position={[0, 0, 0]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

// Main 3D Scene Component
export function Interactive3DScene() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{
                    position: [0, 0, 20],
                    fov: 60,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a3e)' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />

                <ParticleField count={3000} />
                <FloatingGeometry />
                <InteractiveSphere />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}