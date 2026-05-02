"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BallVisual =
  | { type: "image"; url: string }
  | { type: "color"; color: string };

type FlyingBallData = {
  id: string;
  visual: BallVisual;
  start: Vector3;
  gravity: number,
  velocity: Vector3;
  duration: number;
  rotationSpeed: Vector3;
  size: number;
  createdAt: number;
};

type PingPongBackgroundProps = {
  colorHexes?: string[];
  solidColorFraction?: number;

  minSpawnDelayMs?: number;
  maxSpawnDelayMs?: number;

  minSpeed?: number;
  maxSpeed?: number;

  minSize?: number;
  maxSize?: number;

  gravity?: number;
  minLaunchAngleDeg?: number;
  maxLaunchAngleDeg?: number;

  minRotationSpeed?: number;
  maxRotationSpeed?: number;

  edgePadding?: number;
  maxBalls?: number;
};

const DEFAULT_COLORS = ["#ffffff", "#9b87f5", "#1EAEDB", "#ff719a"];

export default function PingPongBackground(props: PingPongBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 6]} intensity={2} />
        <pointLight position={[0, 0, 5]} intensity={100} />
        <FlyingBallSystem {...props} />
      </Canvas>
    </div>
  );
}

function FlyingBallSystem({
  colorHexes = DEFAULT_COLORS,
  solidColorFraction = 0.5,
  minSpawnDelayMs = 900,
  maxSpawnDelayMs = 2600,
  minSpeed = 5,
  maxSpeed = 15,
  minSize = 0.45,
  maxSize = 0.8,
  gravity = 6,
  minLaunchAngleDeg = 30,
  maxLaunchAngleDeg = 60,
  minRotationSpeed = 0.5,
  maxRotationSpeed = 3,
  edgePadding = 2,
  maxBalls = 8,
}: PingPongBackgroundProps) {
  const [balls, setBalls] = useState<FlyingBallData[]>([]);
  const nextSpawnAtRef = useRef(0);
  const ballsRef = useRef<FlyingBallData[]>([]);
  const { viewport } = useThree();

  useEffect(() => {
    ballsRef.current = balls;
  }, [balls]);

  useFrame(({ clock }) => {
    const now = clock.elapsedTime;

    const aliveBalls = ballsRef.current.filter(
      (ball) => now - ball.createdAt < ball.duration + 0.25
    );

    const removedAny = aliveBalls.length !== ballsRef.current.length;

    if (now >= nextSpawnAtRef.current && aliveBalls.length < maxBalls) {
      const newBall = createBall({
        now,
        viewport,
        colorHexes,
        solidColorFraction,
        minSpeed,
        maxSpeed,
        minSize,
        maxSize,
        gravity,
        minLaunchAngleDeg,
        maxLaunchAngleDeg,
        minRotationSpeed,
        maxRotationSpeed,
        edgePadding,
      });

      aliveBalls.push(newBall);

      nextSpawnAtRef.current =
        now + randomBetween(minSpawnDelayMs, maxSpawnDelayMs) / 1000;
    }

    if (removedAny || aliveBalls.length !== ballsRef.current.length) {
      ballsRef.current = aliveBalls;
      setBalls(aliveBalls);
    }
  });

  return (
    <>
      {balls.map((ball) => (
        <FlyingBall key={ball.id} ball={ball} />
      ))}
    </>
  );
}

function createBall({
  now,
  viewport,
  colorHexes,
  solidColorFraction,
  minSpeed,
  maxSpeed,
  minSize,
  maxSize,
  gravity,
  minLaunchAngleDeg,
  maxLaunchAngleDeg,
  minRotationSpeed,
  maxRotationSpeed,
  edgePadding,
}: {
  now: number;
  viewport: { width: number; height: number };
  colorHexes: string[];
  solidColorFraction: number;
  minSpeed: number;
  maxSpeed: number;
  minSize: number;
  maxSize: number;
  gravity: number;
  minLaunchAngleDeg: number;
  maxLaunchAngleDeg: number;
  minRotationSpeed: number;
  maxRotationSpeed: number;
  edgePadding: number;
}): FlyingBallData {
  const fromLeft = Math.random() > 0.5;

  const visibleHalfWidth = viewport.width / 2;
  const visibleHalfHeight = viewport.height / 2;

  const startX = fromLeft
    ? -visibleHalfWidth - edgePadding
    : visibleHalfWidth + edgePadding;

  const endX = fromLeft
    ? visibleHalfWidth + edgePadding
    : -visibleHalfWidth - edgePadding;

  const startY = randomBetween(-visibleHalfHeight * 0.65, visibleHalfHeight * 1);
  const z = randomBetween(-1, 2);
  const endZ = z + randomBetween(-1, 1);

  const speed = randomBetween(minSpeed, maxSpeed);
  const direction = fromLeft ? 1 : -1;

  const distanceX = Math.abs(endX - startX);

  const angleDeg = randomBetween(minLaunchAngleDeg, maxLaunchAngleDeg);
  const angleRad = THREE.MathUtils.degToRad(angleDeg);

  const duration = distanceX / (Math.cos(angleRad) * speed);

  const vx = Math.cos(angleRad) * speed * direction;
  const vy = Math.sin(angleRad) * speed;
  const vz = (endZ - z) / duration;

  return {
    id: crypto.randomUUID(),
    visual: chooseVisual(colorHexes, solidColorFraction),
    start: new Vector3(startX, startY, z),
    velocity: new Vector3(vx, vy, vz),
    gravity,
    duration,
    size: randomBetween(minSize, maxSize),
    createdAt: now,
    rotationSpeed: new Vector3(
      randomSigned(minRotationSpeed, maxRotationSpeed),
      randomSigned(minRotationSpeed, maxRotationSpeed),
      randomSigned(minRotationSpeed, maxRotationSpeed)
    ),
  };
}

function FlyingBall({ ball }: { ball: FlyingBallData }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useBallMaterial(ball.visual);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const elapsed = clock.elapsedTime - ball.createdAt;
    const t = Math.min(elapsed, ball.duration);

    const x = ball.start.x + ball.velocity.x * t;
    const y =
      ball.start.y +
      ball.velocity.y * t -
      0.5 * ball.gravity * t * t;
    const z = ball.start.z + ball.velocity.z * t;

    meshRef.current.position.set(x, y, z);

    meshRef.current.rotation.x += ball.rotationSpeed.x * 0.01;
    meshRef.current.rotation.y += ball.rotationSpeed.y * 0.01;
    meshRef.current.rotation.z += ball.rotationSpeed.z * 0.01;
  });

  if (!material) return null;

  return (
    <mesh ref={meshRef} scale={ball.size}>
      <sphereGeometry args={[1, 48, 48]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function useBallMaterial(visual: BallVisual) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (visual.type !== "image") return;

    let cancelled = false;
    let objectUrl: string | null = null;

    async function loadTexture() {
      try {
        const url = (visual as { type: "image", url: string}).url
        const res = await fetch(url, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Image fetch failed: ${res.status}`);
        }

        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);

        const loadedTexture = await new THREE.TextureLoader().loadAsync(
          objectUrl
        );

        loadedTexture.colorSpace = THREE.SRGBColorSpace;

        if (!cancelled) {
          setTexture(loadedTexture);
        } else {
          loadedTexture.dispose();
        }
      } catch (err) {
        console.error("Failed to load ball texture:", err);
        if (!cancelled) setTexture(null);
      }
    }

    loadTexture();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [visual]);

  return useMemo(() => {
    if (visual.type === "color") {
      return new THREE.MeshStandardMaterial({
        color: visual.color,
        roughness: 0.55,
        metalness: 0,
      });
    }

    if (!texture) return null;

    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.55,
      metalness: 0,
    });
  }, [visual, texture]);
}

function chooseVisual(
  colorHexes: string[],
  solidColorFraction: number
): BallVisual {
  const useColor =
    colorHexes.length > 0 && Math.random() < solidColorFraction;

  if (useColor) {
    return {
      type: "color",
      color: randomItem(colorHexes),
    };
  }

  return {
    type: "image",
    url: `/api/bpl/ball?cb=${crypto.randomUUID()}`,
  };
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomSigned(min: number, max: number) {
  const value = randomBetween(min, max);
  return Math.random() > 0.5 ? value : -value;
}

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

