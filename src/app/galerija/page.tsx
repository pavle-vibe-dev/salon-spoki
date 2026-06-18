"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const images = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/galerija-pas${i + 1}.jpg`,
  alt: `Galerija ${i + 1}`,
}));

export default function GalerijaPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const open = useCallback((idx: number) => setLightboxIdx(idx), []);
  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null)),
    []
  );
  const next = useCallback(
    () => setLightboxIdx((prev) => (prev !== null ? (prev + 1) % images.length : null)),
    []
  );

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-body)", padding: "6rem 0 4rem" }}
      >
        <div className="section-container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 700,
              color: "var(--color-blue)",
              marginBottom: "1rem",
            }}
          >
            Galerija naših radova
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "var(--color-blue-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Pogledajte kako izgledaju naši zadovoljni klijenti nakon tretmana u Spoki salonu.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ backgroundColor: "#ffffff", padding: "2rem 0 6rem" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {images.map((img, idx) => (
              <motion.button
                key={img.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: idx * 0.08 }}
                onClick={() => open(idx)}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border-none outline-none"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-center mt-14"
          >
            <Link
              href="/zakazivanje"
              className="btn"
              style={{
                fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                fontWeight: 600,
              }}
            >
              Zakažite tretman za vašeg psa
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-5 right-5 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Zatvori"
          >
            <X size={36} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Prethodna"
          >
            <ChevronLeft size={44} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Sledeća"
          >
            <ChevronRight size={44} />
          </button>

          <motion.div
            key={lightboxIdx}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-[90vw] h-[80vh] max-w-[900px] max-h-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIdx].src}
              alt={images[lightboxIdx].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </motion.div>

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg font-medium"
            style={{ fontFamily: "var(--font-fredoka), Fredoka, sans-serif" }}
          >
            {lightboxIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
