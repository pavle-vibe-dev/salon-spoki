"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categories = [
  {
    id: 1,
    name: "Mali psi",
    weight: "1 – 9 kg",
    image: "/images/dog-categ-1.png",
    color: "#ff4917",
    description:
      "Ovi mališani su ukras svakog doma, ali njihova dlaka i koža zahtevaju posebnu pažnju. Često su skloni mršenju iza ušiju i na šapama, pa je redovno kupanje i feniranje ključno za njihovo zdravlje i lep izgled.",
    breeds:
      "Maltezer, Pomeranac (Boo), Jorkširski terijer (Jorki), Ši-cu, Pudla (Toy i patuljasta), Čivava, Mops, Francuski buldog, Pekinezer, Patuljasti šnaucer, Bišon.",
  },
  {
    id: 2,
    name: "Srednji psi",
    weight: "10 – 19 kg",
    image: "/images/dog-categ-2.png",
    color: "#fbb040",
    description:
      "Srednji psi su uglavnom veoma aktivni istraživači, što znači — mnogo više šetnje, ali i više blata i čičkova u dlaci! Njihov tretman obuhvata temeljno raščešljavanje, uklanjanje poddlake i precizno šišanje kako bi ostali uredni i zaštićeni tokom svih avantura.",
    breeds:
      "Koker španijel, Korgi, Srednja pudla, Bigl, Engleski buldog, Vižla, Šetlandski ovčar (Šelti), Basenji, Boston terijer, Lagoto Romanjolo.",
  },
  {
    id: 3,
    name: "Veliki psi",
    weight: "20 – 29 kg",
    image: "/images/dog-categ-3.png",
    color: "#3f7a8e",
    description:
      "Veliki psi znače i veliku količinu dlake, posebno u periodima linjanja. Za njih je ključan tretman dubinskog kupanja i profesionalnog izduvavanja (furminiranja) poddlake, kako bi se smanjilo linjanje u kući i omogućilo koži da diše pod gustom dlakom.",
    breeds:
      "Zlatni retriver, Labrador retriver, Nemački ovčar, Standardna (kraljevska) pudla, Bokser, Samojed, Sibirski haski, Border koli, Dalmatinac, Čau-čau.",
  },
  {
    id: 4,
    name: "Extra veliki psi",
    weight: "30 – 39 kg+",
    image: "/images/dog-categ-4.png",
    color: "#512772",
    description:
      "Naši 'nežni džinovi'! Nega ekstra velikih pasa zahteva posebnu opremu, strpljenje i stručnost. Fokus kod ovih rasa je na detaljnom furminiranju mrtve dlake, nezi masivnih šapa i noktiju, kao i održavanju higijene dugodlakih regija.",
    breeds:
      "Bernski planinski pas, Rotvajler, Kane Korso, Akita (Američka i Japanska), Njufaundlend, Alaski malamut, Doberman, Šarplaninac, Bernardinac.",
  },
];

export default function VodicZaVelicine() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--color-body)",
          padding: "6rem 0 4rem",
        }}
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
            Detaljan vodič kroz veličine i rase pasa
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
            Niste sigurni u koju kategoriju spada Vaš ljubimac? Pogledajte naš detaljan pregled rasa i
            pronađite idealan tretman.
          </motion.p>
        </div>
      </section>

      {/* Category cards */}
      <section style={{ backgroundColor: "#ffffff", padding: "2rem 0 6rem" }}>
        <div className="section-container">
          <div className="flex flex-col gap-12">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: idx * 0.1 }}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
                  gap: "2.5rem",
                  alignItems: "center",
                  padding: "2.5rem",
                  borderLeft: idx % 2 === 0 ? `5px solid ${cat.color}` : "none",
                  borderRight: idx % 2 !== 0 ? `5px solid ${cat.color}` : "none",
                  flexWrap: "wrap",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    flex: "0 0 auto",
                    width: "clamp(120px, 20vw, 180px)",
                    height: "clamp(120px, 20vw, 180px)",
                    borderRadius: "50%",
                    backgroundColor: `${cat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "75%",
                      height: "75%",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 20vw, 180px"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: "1 1 300px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                        color: cat.color,
                        margin: 0,
                      }}
                    >
                      {cat.name}
                    </h2>
                    <span
                      style={{
                        fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "var(--color-blue-secondary)",
                      }}
                    >
                      {cat.weight}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--color-blue-secondary)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      marginBottom: "1rem",
                    }}
                  >
                    {cat.description}
                  </p>
                  <div
                    style={{
                      backgroundColor: `${cat.color}0d`,
                      borderRadius: "12px",
                      padding: "1rem 1.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: cat.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Rase:
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "var(--color-blue-secondary)", lineHeight: 1.6 }}>
                      {cat.breeds}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "var(--color-body)",
          padding: "5rem 0",
          textAlign: "center",
        }}
      >
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-passion-one), "Passion One", sans-serif',
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "var(--color-blue)",
                marginBottom: "0.75rem",
              }}
            >
              Pronašli ste kategoriju Vašeg ljubimca?
            </h2>
            <p
              style={{
                color: "var(--color-blue-secondary)",
                fontSize: "1.05rem",
                marginBottom: "2rem",
              }}
            >
              Zakažite tretman i prepustite se stručnoj nezi.
            </p>
            <Link
              href="/zakazivanje"
              className="btn"
              style={{
                fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                paddingInline: "3rem",
                height: "60px",
              }}
            >
              ZAKAŽITE TRETMAN
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
