'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Bubbles({ count = 35 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: ((i * 37) % 100) / 100 * 5 - 2.5,
      y: ((i * 53) % 100) / 100 * 4 - 2,
      z: ((i * 71) % 100) / 100 * 5 - 2.5,
      speed: 0.25 + ((i * 19) % 10) * 0.04,
      scale: 0.02 + ((i * 13) % 7) * 0.008,
    }));
  }, [count]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    particles.forEach((p, idx) => {
      p.y += p.speed * delta;
      if (p.y > 2.2) {
        p.y = -2.0;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(idx, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color="#7DD3FC"
        transparent
        opacity={0.45}
        roughness={0.1}
      />
    </instancedMesh>
  );
}

function DetailedProceduralRov({
  focusPart,
}: {
  focusPart: 'all' | 'frame' | 'thruster' | 'gripper';
}) {
  const propLeftRef = useRef<THREE.Mesh>(null);
  const propRightRef = useRef<THREE.Mesh>(null);
  const propTopRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (propLeftRef.current) propLeftRef.current.rotation.z += delta * 15;
    if (propRightRef.current) propRightRef.current.rotation.z -= delta * 15;
    if (propTopRef.current) propTopRef.current.rotation.y += delta * 12;
  });

  const isFrameHighlighted = focusPart === 'all' || focusPart === 'frame';
  const isThrusterHighlighted = focusPart === 'all' || focusPart === 'thruster';
  const isGripperHighlighted = focusPart === 'all' || focusPart === 'gripper';

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.45}>
      <group rotation={[0.14, -0.58, 0]} scale={0.92}>
        {/* Upper Buoyancy Block (ROV Safety Orange) */}
        <mesh position={[0, 0.34, -0.05]} castShadow>
          <boxGeometry args={[1.38, 0.36, 1.85]} />
          <meshStandardMaterial
            color={isFrameHighlighted ? '#FF5A1F' : '#9A3412'}
            roughness={0.32}
            metalness={0.2}
          />
        </mesh>

        {/* Side Roll-Cage / Bumper Rails */}
        {[-0.74, 0.74].map((xRail, idx) => (
          <group key={idx} position={[xRail, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.09, 0.72, 1.96]} />
              <meshStandardMaterial
                color={isFrameHighlighted ? '#FF5A1F' : '#7C2D12'}
                roughness={0.35}
                metalness={0.25}
              />
            </mesh>
            {/* Bottom Skid Foot */}
            <mesh position={[0, -0.38, 0]}>
              <boxGeometry args={[0.14, 0.07, 1.85]} />
              <meshStandardMaterial
                color="#0F172A"
                roughness={0.5}
                metalness={0.6}
              />
            </mesh>
          </group>
        ))}

        {/* Inner Electronics Enclosure & Deep-Sea Accent */}
        <mesh position={[0, -0.08, -0.08]}>
          <boxGeometry args={[1.18, 0.44, 1.55]} />
          <meshStandardMaterial
            color="#0B2239"
            roughness={0.45}
            metalness={0.65}
          />
        </mesh>

        {/* Front Camera Dome & LED Lights */}
        <group position={[0, 0.05, 0.96]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry
              args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
            />
            <meshPhysicalMaterial
              color="#7DD3FC"
              transparent
              opacity={0.6}
              roughness={0.08}
              metalness={0.1}
              transmission={0.65}
            />
          </mesh>
          {/* Left & Right Underwater LEDs */}
          {[-0.45, 0.45].map((ledX, idx) => (
            <mesh key={idx} position={[ledX, 0.04, -0.04]}>
              <sphereGeometry args={[0.065, 16, 16]} />
              <meshStandardMaterial
                color="#E0F2FE"
                emissive="#38BDF8"
                emissiveIntensity={1.6}
              />
            </mesh>
          ))}
        </group>

        {/* Vertical Thruster Top Shroud */}
        <group position={[0, 0.56, -0.1]}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.24, 0.16, 24, 1, true]} />
            <meshStandardMaterial
              color={isThrusterHighlighted ? '#1E293B' : '#0F172A'}
              side={THREE.DoubleSide}
              metalness={0.75}
              roughness={0.25}
            />
          </mesh>
          <mesh ref={propTopRef}>
            <boxGeometry args={[0.36, 0.04, 0.08]} />
            <meshStandardMaterial
              color={isThrusterHighlighted ? '#38BDF8' : '#475569'}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Left & Right Horizontal Thrusters */}
        {[-0.92, 0.92].map((xThruster, idx) => (
          <group key={idx} position={[xThruster, -0.02, -0.42]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.23, 0.23, 0.42, 24, 1, true]} />
              <meshStandardMaterial
                color={isThrusterHighlighted ? '#334155' : '#0F172A'}
                side={THREE.DoubleSide}
                metalness={0.75}
                roughness={0.25}
              />
            </mesh>
            <mesh ref={idx === 0 ? propLeftRef : propRightRef}>
              <boxGeometry args={[0.34, 0.065, 0.045]} />
              <meshStandardMaterial
                color={isThrusterHighlighted ? '#38BDF8' : '#475569'}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* Front Manipulator / Gripper Arm */}
        <group position={[0.42, -0.22, 1.05]}>
          <mesh position={[0, 0, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.52, 16]} />
            <meshStandardMaterial
              color={isGripperHighlighted ? '#FF5A1F' : '#7C2D12'}
              metalness={0.35}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0.08, 0.04, 0.52]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.045, 0.05, 0.24]} />
            <meshStandardMaterial
              color={isGripperHighlighted ? '#E2E8F0' : '#64748B'}
              metalness={0.75}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0.08, -0.04, 0.52]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.045, 0.05, 0.24]} />
            <meshStandardMaterial
              color={isGripperHighlighted ? '#E2E8F0' : '#64748B'}
              metalness={0.75}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function RovViewer3D() {
  const [focusPart, setFocusPart] = useState<
    'all' | 'frame' | 'thruster' | 'gripper'
  >('all');

  const descriptions: Record<'all' | 'frame' | 'thruster' | 'gripper', string> = {
    all: 'Drag untuk memutar 360° • Scroll untuk zoom • Pilih bagian di bawah untuk menyorot komponen.',
    frame: 'Chassis & Buoyancy: Rangka pelindung oranye & blok apung utama ROV.',
    thruster: 'Thruster System: Pendorong horizontal & vertikal untuk manuver bawah air.',
    gripper: 'Manipulator Gripper: Lengan capit depan untuk misi pengambilan objek.',
  };

  return (
    <div className="space-y-2.5">
      <div className="h-64 w-full rounded-2xl border border-cyan-400/25 bg-gradient-to-b from-[#071C30] to-[#030B14] overflow-hidden relative">
        <Canvas camera={{ position: [2.8, 1.55, 3.25], fov: 40 }} dpr={[1, 2]}>
          <color attach="background" args={['#040E18']} />
          <fog attach="fog" args={['#040E18', 6, 14]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 6, 4]} intensity={1.9} color="#BAE6FD" />
          <pointLight position={[-3, 2, -3]} intensity={1.3} color="#FF5A1F" />
          <Bubbles count={35} />
          <DetailedProceduralRov focusPart={focusPart} />
          <OrbitControls enablePan={false} minDistance={2.2} maxDistance={6.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ['all', 'Semua'],
            ['frame', 'Frame ROV'],
            ['thruster', 'Thruster'],
            ['gripper', 'Gripper'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFocusPart(key)}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition cursor-pointer ${focusPart === key
                ? 'bg-[#FF5A1F] text-white border-[#FF5A1F]'
                : 'bg-[#06131F] text-slate-300 border-slate-800 hover:border-cyan-400/40'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-cyan-200/85 min-h-[16px]">
        {descriptions[focusPart]}
      </p>
    </div>
  );
}