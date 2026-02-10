import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader material for advanced effects
const WaveShaderMaterial = shaderMaterial(
    // Uniforms
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1),
        uColorA: new THREE.Color('#ff0080'),
        uColorB: new THREE.Color('#0080ff'),
    },
    // Vertex shader
    `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Create wave distortion
      float wave = sin(pos.x * 0.5 + uTime) * 0.1;
      wave += sin(pos.y * 0.3 + uTime * 1.2) * 0.05;
      wave += sin(pos.z * 0.8 + uTime * 0.8) * 0.08;
      
      pos.z += wave;
      
      // Mouse interaction
      float mouseInfluence = 1.0 - distance(uv, uMouse) * 2.0;
      mouseInfluence = max(0.0, mouseInfluence);
      pos.z += mouseInfluence * 0.3;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment shader
    `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create animated gradient
      float gradient = sin(uv.x * 3.14159 + uTime) * 0.5 + 0.5;
      gradient *= sin(uv.y * 3.14159 + uTime * 0.7) * 0.5 + 0.5;
      
      // Mouse interaction effect
      float mouseDistance = distance(uv, uMouse);
      float mouseEffect = 1.0 - smoothstep(0.0, 0.3, mouseDistance);
      
      // Color mixing
      vec3 color = mix(uColorA, uColorB, gradient);
      color += mouseEffect * 0.5;
      
      // Add some noise for texture
      float noise = fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
      color += noise * 0.1;
      
      // Fade edges
      float alpha = 1.0 - smoothstep(0.3, 0.7, length(uv - 0.5));
      
      gl_FragColor = vec4(color, alpha * 0.8);
    }
  `
);

// Extend the material to make it available in JSX
extend({ WaveShaderMaterial });

// TypeScript declaration for the custom material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            waveShaderMaterial: any;
        }
    }
}

export function ShaderPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
            materialRef.current.uMouse.set(
                (state.mouse.x + 1) / 2,
                (state.mouse.y + 1) / 2
            );
        }

        if (meshRef.current) {
            meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]}>
            <planeGeometry args={[20, 20, 64, 64]} />
            <waveShaderMaterial
                ref={materialRef}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// Advanced particle system with instanced rendering
export function InstancedParticles({ count = 1000 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            scale: Math.random() * 0.5 + 0.5,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
        }));
    }, [count]);

    useFrame((state) => {
        if (meshRef.current) {
            particles.forEach((particle, i) => {
                // Update particle positions
                particle.position.add(particle.velocity);

                // Boundary checking - wrap around
                ['x', 'y', 'z'].forEach((axis) => {
                    if (Math.abs(particle.position[axis as keyof THREE.Vector3]) > 20) {
                        particle.position[axis as keyof THREE.Vector3] *= -1;
                    }
                });

                // Set matrix for instanced rendering
                dummy.position.copy(particle.position);
                dummy.rotation.x += particle.rotationSpeed;
                dummy.rotation.y += particle.rotationSpeed * 0.7;
                dummy.scale.setScalar(particle.scale);
                dummy.updateMatrix();

                meshRef.current!.setMatrixAt(i, dummy.matrix);
            });

            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial
                color="#00ffaa"
                transparent
                opacity={0.6}
                emissive="#004422"
            />
        </instancedMesh>
    );
}