"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Kontakt() {
  const [form, setForm] = useState({ name: "", phone: "", breed: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg("Ime i telefon su obavezna polja.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/zakazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "poruka" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Došlo je do greške.");
      }

      setStatus("success");
      setForm({ name: "", phone: "", breed: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Došlo je do greške.");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--color-body)",
          padding: "8rem 0 4rem",
        }}
      >
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "1rem",
                lineHeight: 1.05,
              }}
            >
              Kontaktirajte nas
            </h1>
            <p
              style={{
                color: "var(--color-blue-secondary)",
                fontSize: "1.1rem",
                maxWidth: "640px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Imate pitanje ili želite da zakažete termin? Javite nam se putem forme,
              telefona ili nas posetite — tu smo za vas i vašeg ljubimca.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two-column layout */}
      <section style={{ backgroundColor: "#ffffff", padding: "2rem 0 6rem" }}>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ── LEFT: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "2rem",
              }}
            >
              Pošaljite nam poruku
            </h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex flex-col items-center justify-center rounded-2xl p-10 text-center"
                  style={{ backgroundColor: "#f0fdf4", border: "1.5px solid #86efac" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <CheckCircle size={28} color="#fff" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                      fontSize: "1.4rem",
                      color: "#166534",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    Hvala Vam!
                  </h3>
                  <p style={{ color: "#15803d", fontSize: "0.95rem", maxWidth: "360px", margin: 0 }}>
                    Vaša poruka je uspešno poslata. Kontaktiraćemo Vas uskoro.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <input
                    type="text"
                    placeholder="Ime vlasnika *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      border: `1.5px solid ${errorMsg && !form.name.trim() ? "#ef4444" : "#e0e0eb"}`,
                      color: "var(--color-blue)",
                      backgroundColor: "#fafafe",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#FF4E11"; e.target.style.backgroundColor = "#ffffff"; }}
                    onBlur={(e) => {
                      if (status !== "error") {
                        e.target.style.borderColor = form.name.trim() ? "#e0e0eb" : "#e0e0eb";
                      }
                      e.target.style.backgroundColor = "#fafafe";
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Broj telefona *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      border: `1.5px solid ${errorMsg && !form.phone.trim() ? "#ef4444" : "#e0e0eb"}`,
                      color: "var(--color-blue)",
                      backgroundColor: "#fafafe",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#FF4E11"; e.target.style.backgroundColor = "#ffffff"; }}
                    onBlur={(e) => {
                      if (status !== "error") {
                        e.target.style.borderColor = form.phone.trim() ? "#e0e0eb" : "#e0e0eb";
                      }
                      e.target.style.backgroundColor = "#fafafe";
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Rasa ljubimca (opciono)"
                    value={form.breed}
                    onChange={(e) => setForm({ ...form, breed: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      border: "1.5px solid #e0e0eb",
                      color: "var(--color-blue)",
                      backgroundColor: "#fafafe",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#FF4E11"; e.target.style.backgroundColor = "#ffffff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e0e0eb"; e.target.style.backgroundColor = "#fafafe"; }}
                  />
                  <textarea
                    placeholder="Vaša poruka *"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      border: "1.5px solid #e0e0eb",
                      color: "var(--color-blue)",
                      backgroundColor: "#fafafe",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#FF4E11"; e.target.style.backgroundColor = "#ffffff"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e0e0eb"; e.target.style.backgroundColor = "#fafafe"; }}
                  />

                  {errorMsg && (
                    <p className="text-sm m-0" style={{ color: "#ef4444" }}>{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60"
                    style={{ backgroundColor: "#FF4E11" }}
                    onMouseEnter={(e) => {
                      if (status !== "sending") {
                        e.currentTarget.style.backgroundColor = "#e04000";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF4E11";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {status === "sending" ? (
                      <>Slanje...</>
                    ) : (
                      <><Send size={16} /> Pošalji poruku</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Info & Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  fontWeight: 700,
                  color: "var(--color-blue)",
                  marginBottom: "1.5rem",
                }}
              >
                Gde se nalazimo?
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3" style={{ color: "var(--color-blue-secondary)" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,73,23,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-orange)",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-blue)" }}>Adresa</span>
                    <p className="text-sm m-0">Novi Banovci</p>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ color: "var(--color-blue-secondary)" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,73,23,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-orange)",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-blue)" }}>Telefon</span>
                    <a href="tel:+381677661703" className="text-sm block m-0 transition-colors" style={{ color: "var(--color-blue-secondary)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-orange)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-blue-secondary)"; }}
                    >
                      067 766 17 03
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ color: "var(--color-blue-secondary)" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,73,23,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-orange)",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-blue)" }}>Email</span>
                    <a href="mailto:salonspoki@gmail.com" className="text-sm block m-0 transition-colors" style={{ color: "var(--color-blue-secondary)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-orange)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-blue-secondary)"; }}
                    >
                      salonspoki@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ color: "var(--color-blue-secondary)" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,73,23,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-orange)",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-blue)" }}>Radno vreme</span>
                    <p className="text-sm m-0">Pon–Sub: 09:00 – 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.0!3d44.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b7a0ce5dbdac7%3A0xcb6058da5a3f2a02!2z0J3QvtCy0Lgg0JHQsNC90L7QstGG0Lg!5e0!3m2!1ssr!2srs!4v1"
              width="100%"
              height="300"
              className="rounded-2xl shadow-lg border-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacija salona Spoki - Novi Banovci"
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
}
