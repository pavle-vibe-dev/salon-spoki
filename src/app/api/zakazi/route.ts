import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "salonspoki@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, phone } = body;

    // ── Brzi zahtev za poziv (sa homepage-a) ──
    if (type === "poziv") {
      if (!name || !phone) {
        return NextResponse.json(
          { error: "Ime i telefon su obavezni." },
          { status: 400 }
        );
      }

      await resend.emails.send({
        from: "Spoki Salon <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject: "🐾 Spoki - Zahtev za poziv",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5ff; }
    .container { max-width: 480px; margin: 0 auto; padding: 2rem; }
    .header { background: #ff4917; border-radius: 16px 16px 0 0; padding: 1.5rem; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 1.3rem; }
    .body { background: #fff; border-radius: 0 0 16px 16px; padding: 2rem; }
    .row { padding: 0.5rem 0; }
    .label { color: #4b5264; font-size: 0.85rem; }
    .value { color: #000958; font-size: 1.1rem; font-weight: 700; }
    .footer { text-align: center; margin-top: 1.5rem; font-size: 0.8rem; color: #4b5264; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>📞 Zahtev za poziv</h1></div>
    <div class="body">
      <div class="row"><div class="label">Ime i prezime</div><div class="value">${name}</div></div>
      <div class="row"><div class="label">Broj telefona</div><div class="value">${phone}</div></div>
      <div class="footer"><p>Poslato sa spokisalon.rs</p></div>
    </div>
  </div>
</body>
</html>`,
      });

      return NextResponse.json({ success: true });
    }

    // ── Poruka sa kontakt strane ──
    if (type === "poruka") {
      const { name, phone, breed, message } = body;

      if (!name || !phone || !message) {
        return NextResponse.json(
          { error: "Ime, telefon i poruka su obavezni." },
          { status: 400 }
        );
      }

      await resend.emails.send({
        from: "Spoki Salon <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject: "🐾 Spoki - Nova poruka sa kontakt strane",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5ff; }
    .container { max-width: 520px; margin: 0 auto; padding: 2rem; }
    .header { background: #ff4917; border-radius: 16px 16px 0 0; padding: 1.5rem; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 1.3rem; }
    .body { background: #fff; border-radius: 0 0 16px 16px; padding: 2rem; }
    .row { padding: 0.5rem 0; }
    .label { color: #4b5264; font-size: 0.85rem; }
    .value { color: #000958; font-size: 1rem; font-weight: 700; }
    .message-box { background: #fafafe; border-radius: 12px; padding: 1rem; margin-top: 0.5rem; line-height: 1.6; color: #333; }
    .footer { text-align: center; margin-top: 1.5rem; font-size: 0.8rem; color: #4b5264; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>✉️ Nova poruka sa sajta</h1></div>
    <div class="body">
      <div class="row"><div class="label">Ime</div><div class="value">${name}</div></div>
      <div class="row"><div class="label">Telefon</div><div class="value">${phone}</div></div>
      ${breed ? `<div class="row"><div class="label">Rasa ljubimca</div><div class="value">${breed}</div></div>` : ""}
      <div class="row"><div class="label">Poruka</div><div class="message-box">${message}</div></div>
      <div class="footer"><p>Poslato sa spokisalon.rs</p></div>
    </div>
  </div>
</body>
</html>`,
      });

      return NextResponse.json({ success: true });
    }

    // ── Standardni zahtev za zakazivanje (sa /zakazivanje) ──
    const {
      dogName,
      dogBreed,
      email,
      date,
      notes,
      category,
      service,
    } = body;

    if (!dogBreed || !name || !phone || !date) {
      return NextResponse.json(
        { error: "Popunite sva obavezna polja." },
        { status: 400 }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background: #f5f5ff; }
    .container { max-width: 560px; margin: 0 auto; padding: 2rem; }
    .header { background: #ff4917; border-radius: 16px 16px 0 0; padding: 1.5rem 2rem; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 1.5rem; font-weight: 700; }
    .body { background: #fff; border-radius: 0 0 16px 16px; padding: 2rem; }
    .section { margin-bottom: 1.5rem; }
    .section h2 { color: #000958; font-size: 1rem; font-weight: 700; margin: 0 0 0.75rem; padding-bottom: 0.4rem; border-bottom: 2px solid #ff4917; }
    .row { display: flex; padding: 0.35rem 0; }
    .label { color: #4b5264; font-size: 0.85rem; width: 120px; flex-shrink: 0; }
    .value { color: #000958; font-size: 0.9rem; font-weight: 600; }
    .footer { text-align: center; margin-top: 1.5rem; font-size: 0.8rem; color: #4b5264; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>🐾 Nov zahtev za zakazivanje</h1></div>
    <div class="body">
      <div class="section">
        <h2>Podaci o psu</h2>
        <div class="row"><span class="label">Veličina:</span><span class="value">${category || "—"}</span></div>
        <div class="row"><span class="label">Ime psa:</span><span class="value">${dogName || "—"}</span></div>
        <div class="row"><span class="label">Rasa:</span><span class="value">${dogBreed}</span></div>
      </div>
      <div class="section">
        <h2>Usluga</h2>
        <div class="row"><span class="label">Tretman:</span><span class="value">${service || "—"}</span></div>
      </div>
      <div class="section">
        <h2>Termin</h2>
        <div class="row"><span class="label">Datum:</span><span class="value">${date}</span></div>
        <div class="row"><span class="label">Napomena:</span><span class="value">${notes || "—"}</span></div>
      </div>
      <div class="section">
        <h2>Kontakt</h2>
        <div class="row"><span class="label">Ime i prezime:</span><span class="value">${name}</span></div>
        <div class="row"><span class="label">Telefon:</span><span class="value">${phone}</span></div>
        ${email ? `<div class="row"><span class="label">Email:</span><span class="value">${email}</span></div>` : ""}
      </div>
      <div class="footer"><p>Poslato sa spokisalon.rs</p></div>
    </div>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Spoki Salon <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: "🐾 Nov zahtev za zakazivanje | Spoki Salon",
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Greška pri slanju zahteva:", error);
    return NextResponse.json(
      { error: "Došlo je do greške. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
