import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for LUMÉ STUDIO, an elite, luxury contemporary wedding photography and cinema studio based in Mumbai, India, documenting destination weddings across India and worldwide.

Brand Tone:
Refined, discerning, warm, poetic yet concise, impeccably professional. Never use corporate slang or excessive robotic pleasantries. Speak like a luxury creative director or studio producer.

Studio Knowledge:
- Tagline & Essence: "Love, in its most honest light." Contemporary wedding photography for couples who want their celebration documented with intention, emotion, and a distinctly editorial eye without stiff, forced posing.
- Destinations: Mumbai, Goa, Rajasthan (Umaid Bhawan Palace Jodhpur, The Leela Palace Udaipur, Jaipur, Alila Fort), Alibaug, Kerala, and International (Lake Como, Tuscany, Bali, Dubai, French Riviera).
- Collections:
  1. THE SIGNATURE: ₹2,85,000 onwards (Three-day celebration coverage, two principal photographers, cinematic wedding film with audio vows, pre-wedding session, bespoke fine-art heirloom album, private online gallery).
  2. THE EDITORIAL: ₹1,65,000 onwards (Full-day wedding photography, two photographers, editorial portrait session, private online gallery, fine-art archival prints).
  3. THE INTIMATE: ₹95,000 onwards (Up to 8 hours coverage, lead photographer + assistant, private online gallery, full-resolution hand-finished photographs).
  Destination multi-day custom collections tailored on request.
- Style & Philosophy: Documenting celebrations as they actually unfold—from quiet morning rituals to the chaos of the dance floor. Natural, thoughtful, unobtrusive presence ("like invisible friends with cameras").
- Deliverables: Curated color-finished gallery delivered within 6 to 8 weeks; 40-50 high-res highlight stills delivered within 72 hours for immediate family sharing.
- Booking & Exclusivity: We accept a strictly limited number of weddings each year (around 18-22 celebrations) to give each couple undivided artistic focus.
- Direct Contact: ash2k21x@gmail.com | Phone / WhatsApp: +91 8638683167.

Guidance:
When users ask about availability, dates, or booking, encourage them to share their wedding date and destination via the "Check Your Date" interactive drawer on the site or via the direct WhatsApp button.
Keep responses concise (2-4 thoughtful sentences or brief bullet points).
`;

// AI Concierge Chat Route
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;
    const prompt = userMessage || (Array.isArray(messages) && messages[messages.length - 1]?.content) || '';

    if (!prompt) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const reply = response.text || "Thank you for reaching out to Lumé Studio. Our creative director would be delighted to review your wedding details. Please share your dates or reach us directly on WhatsApp at +91 8638683167.";
        return res.json({ reply });
      } catch (geminiError: any) {
        console.error('Gemini API Error:', geminiError?.message || geminiError);
        // Fall back gracefully to luxury studio response
      }
    }

    // Graceful intelligent studio fallback if API key isn't active or fails
    const lower = prompt.toLowerCase();
    let reply = "Thank you for considering Lumé Studio. We accept a limited number of celebrations each year to ensure every story receives our team's complete artistic dedication. Could you share your tentative wedding dates and destination?";

    if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('collection') || lower.includes('rate')) {
      reply = "Our curated collections begin at ₹95,000 for The Intimate (up to 8 hours), ₹1,65,000 for The Editorial (full day with two photographers), and ₹2,85,000 for The Signature (three-day full celebration with wedding film, pre-wedding session, and fine-art album). Custom destination collections are available upon request.";
    } else if (lower.includes('date') || lower.includes('available') || lower.includes('book') || lower.includes('availability')) {
      reply = "We document approximately 20 celebrations annually. To check availability for your specific dates, please use the 'Check Your Date' button above or connect with our studio producer directly on WhatsApp at +91 8638683167.";
    } else if (lower.includes('travel') || lower.includes('destination') || lower.includes('udaipur') || lower.includes('goa') || lower.includes('jodhpur') || lower.includes('como')) {
      reply = "Yes, we travel frequently throughout India—regularly documenting celebrations in Rajasthan (Umaid Bhawan, Udaipur palaces), Goa, Alibaug, and Delhi—as well as international destinations including Italy, Bali, and the UAE.";
    } else if (lower.includes('style') || lower.includes('posed') || lower.includes('film') || lower.includes('candid')) {
      reply = "Our style is documentary and editorial: quiet morning rituals, honest glances, and the untamed joy of the dance floor. We photograph naturally, stepping in only with subtle direction when it genuinely enhances the frame.";
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error('Server error in /api/chat:', error);
    return res.status(500).json({
      error: 'Unable to process inquiry at this moment.',
      reply: 'We are delighted you are considering Lumé Studio. Please connect with us directly via WhatsApp at +91 8638683167 or email ash2k21x@gmail.com.'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LUMÉ STUDIO server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
