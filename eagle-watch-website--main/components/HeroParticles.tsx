"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet field of drifting points behind the hero copy — evokes a radar /
 * sensor-grid feel without turning into a screensaver. Skipped entirely for
 * users who prefer reduced motion, and paused whenever the tab is hidden.
 */
export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (!container || prefersReduced) return;

    let renderer: any, scene: any, camera: any, points: any, frameId: number;
    let visible = true;
    let destroyed = false;

    (async () => {
      const THREE = await import("three");
      if (destroyed || !container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.z = 18;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // Keep particle count light — this is atmosphere, not a data-viz.
      const isMobile = width < 768;
      const count = isMobile ? 90 : 220;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 26;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x3e7bfa,
        size: 0.055,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const clock = new THREE.Clock();
      const animate = () => {
        if (!visible || destroyed) return;
        const t = clock.getElapsedTime();
        points.rotation.y = t * 0.02;
        points.rotation.x = Math.sin(t * 0.05) * 0.05;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const onVisibility = () => {
        visible = document.visibilityState === "visible";
        if (visible) animate();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      (container as any).__cleanup = () => {
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
      };
    })();

    return () => {
      destroyed = true;
      visible = false;
      if (frameId) cancelAnimationFrame(frameId);
      if (container && (container as any).__cleanup) (container as any).__cleanup();
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-70"
    />
  );
}
