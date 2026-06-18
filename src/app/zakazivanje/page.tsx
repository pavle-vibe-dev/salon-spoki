"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categoryNames: Record<number, string> = {
  1: "Mali (1-9 kg)",
  2: "Srednji (10-19 kg)",
  3: "Veliki (20-29 kg)",
  4: "Extra veliki (30-39 kg)",
};

const serviceNames: Record<string, string> = {
  kompletan: "Kompletan tretman",
  kupanje: "Kupanje",
  furminiranje: "Furminiranje",
};

const bundleData = [
  {
    id: 1, image: "/images/dog-categ-1.png", name: "Mali", dogCategory: "1 - 9 kg", color: "#ff4917",
  },
  {
    id: 2, image: "/images/dog-categ-2.png", name: "Srednji", dogCategory: "10 - 19 kg", color: "#fbb040",
  },
  {
    id: 3, image: "/images/dog-categ-3.png", name: "Veliki", dogCategory: "20 - 29 kg", color: "#3f7a8e",
  },
  {
    id: 4, image: "/images/dog-categ-4.png", name: "Extra veliki", dogCategory: "30 - 39 kg", color: "#512772",
  },
];

const serviceOptions = [
  { id: "kompletan", name: "Kompletan tretman" },
  { id: "kupanje", name: "Kupanje" },
  { id: "furminiranje", name: "Furminiranje" },
];

export default function ZakazivanjePage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dogName: "",
    dogBreed: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    notes: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedService) return;
    setIsSending(true);
    try {
      const res = await fetch("/api/zakazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: categoryNames[selectedCategory] ?? `ID: ${selectedCategory}`,
          service: serviceNames[selectedService] ?? selectedService,
        }),
      });
      if (!res.ok) throw new Error("API error");
      setIsSent(true);
    } catch {
      alert("Došlo je do greške pri slanju. Pokušajte ponovo.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "#f5f5ff",
          padding: "6rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        <div className="section-container">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--color-blue)",
              marginBottom: "0.75rem",
            }}
          >
            Zakažite termin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            style={{ color: "var(--color-blue-secondary)", fontSize: "1.1rem" }}
          >
            Popunite formu i mi ćemo Vas kontaktirati radi potvrde termina.
          </motion.p>
        </div>
      </section>

      {/* Multi-step form */}
      <section style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem 6rem" }}>
        <div className="section-container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                      backgroundColor: step >= s ? "var(--color-orange)" : "#e0e0ec",
                      color: step >= s ? "#ffffff" : "var(--color-blue-secondary)",
                      transition: "all 0.3s",
                    }}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      style={{
                        width: 40,
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: step > s ? "var(--color-orange)" : "#e0e0ec",
                        transition: "all 0.3s",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Choose dog size */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                    fontWeight: 700,
                    color: "var(--color-blue)",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  Koliko je veliki Vaš pas?
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--color-blue-secondary)",
                    marginBottom: "2.5rem",
                  }}
                >
                  Izaberite kategoriju Vašeg psa
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-10">
                  {bundleData.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="flex flex-col items-center gap-3 transition-all duration-200"
                        style={{ cursor: "pointer", border: "none", background: "none", outline: "none" }}
                      >
                        <div
                          style={{
                            width: 130,
                            height: 130,
                            borderRadius: "50%",
                            backgroundColor: isActive ? cat.color : "#f0f0f8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                            boxShadow: isActive ? `0 0 0 4px ${cat.color}44, 0 8px 24px ${cat.color}33` : "0 4px 12px rgba(0,9,88,0.08)",
                            transform: isActive ? "scale(1.05)" : "scale(1)",
                          }}
                        >
                          <div style={{ width: "75%", height: "75%", position: "relative" }}>
                            <img
                              src={cat.image}
                              alt={cat.name}
                              style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            color: isActive ? cat.color : "var(--color-blue)",
                            transition: "color 0.2s",
                          }}
                        >
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => selectedCategory && setStep(2)}
                    disabled={!selectedCategory}
                    className="btn"
                    style={{
                      opacity: selectedCategory ? 1 : 0.5,
                      cursor: selectedCategory ? "pointer" : "not-allowed",
                      fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                      fontWeight: 600,
                      paddingInline: "3rem",
                    }}
                  >
                    Nastavi
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Choose service */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                    fontWeight: 700,
                    color: "var(--color-blue)",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  Izaberite uslugu
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--color-blue-secondary)",
                    marginBottom: "2.5rem",
                  }}
                >
                  Odaberite željeni tretman za Vašeg ljubimca
                </p>

                <div className="flex flex-col gap-4 mb-10">
                  {serviceOptions.map((svc) => {
                    const isActive = selectedService === svc.id;
                    return (
                      <button
                        key={svc.id}
                        onClick={() => setSelectedService(svc.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "1.25rem 1.5rem",
                          borderRadius: "16px",
                          border: `2px solid ${isActive ? "var(--color-orange)" : "#e5e5ef"}`,
                          backgroundColor: isActive ? "rgba(255,73,23,0.06)" : "#ffffff",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          color: isActive ? "var(--color-orange)" : "var(--color-blue)",
                          textAlign: "left",
                          width: "100%",
                          outline: "none",
                        }}
                      >
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            border: `3px solid ${isActive ? "var(--color-orange)" : "#c5c5d5"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {isActive && (
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: "var(--color-orange)",
                              }}
                            />
                          )}
                        </div>
                        {svc.name}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "var(--color-blue-secondary)",
                      padding: "0.75rem 1.5rem",
                    }}
                  >
                    ← Nazad
                  </button>
                  <button
                    onClick={() => selectedService && setStep(3)}
                    disabled={!selectedService}
                    className="btn"
                    style={{
                      opacity: selectedService ? 1 : 0.5,
                      cursor: selectedService ? "pointer" : "not-allowed",
                      fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                      fontWeight: 600,
                      paddingInline: "3rem",
                    }}
                  >
                    Nastavi
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact & date */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                    fontWeight: 700,
                    color: "var(--color-blue)",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  Vaši podaci
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--color-blue-secondary)",
                    marginBottom: "2.5rem",
                  }}
                >
                  Ostavite nam kontakt i željeni termin
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    maxWidth: "450px",
                    margin: "0 auto",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ime psa (opciono)"
                    className="input-control"
                    style={{ width: "100%" }}
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Rasa psa"
                    className="input-control"
                    style={{ width: "100%" }}
                    value={formData.dogBreed}
                    onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Ime i prezime"
                    className="input-control"
                    style={{ width: "100%" }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Broj telefona"
                    className="input-control"
                    style={{ width: "100%" }}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email adresa (opciono)"
                    className="input-control"
                    style={{ width: "100%" }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input
                    type="date"
                    className="input-control"
                    style={{ width: "100%" }}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Dodatne napomene (opciono)"
                    className="input-control"
                    style={{ width: "100%", minHeight: 100, resize: "vertical" }}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />

                  {isSent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        textAlign: "center",
                        padding: "2rem 0",
                      }}
                    >
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          background: "rgba(255,73,23,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 256 256" fill="var(--color-orange)">
                          <path d="M229.66 77.66l-128 128a8 8 0 01-11.32 0l-56-56a8 8 0 0111.32-11.32L96 188.69 218.34 66.34a8 8 0 0111.32 11.32z" />
                        </svg>
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                          color: "var(--color-blue)",
                          margin: "0 0 0.5rem",
                        }}
                      >
                        Zahtev uspešno poslat!
                      </h3>
                      <p style={{ color: "var(--color-blue-secondary)", margin: 0 }}>
                        Kontaktiraćemo Vas radi potvrde termina.
                      </p>
                    </motion.div>
                  ) : (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setStep(2)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "var(--color-blue-secondary)",
                        padding: "0.75rem 1.5rem",
                      }}
                    >
                      ← Nazad
                    </button>
                    <button
                      className="btn"
                      onClick={handleSubmit}
                      disabled={isSending}
                      style={{
                        fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                        fontWeight: 600,
                        paddingInline: "3rem",
                        opacity: isSending ? 0.6 : 1,
                        cursor: isSending ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSending ? "Slanje..." : "Pošalji zahtev"}
                    </button>
                  </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
