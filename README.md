# CLIP — Minimal Explainer

Local Remotion preview for the 13:55 narration in `audio.wav`.

## Preview

The preview server is already running:

**http://localhost:3002/CLIP**

To restart it:

```bash
npm install
npm run studio -- --port 3002
```

Then open the composition named **CLIP**.

The composition is 1920×1080, 30 fps, 25,072 frames (13:56).

## 2K render in Colab

Open **[render_2k_colab.ipynb](https://colab.research.google.com/github/lroe/multimodal-neurons/blob/main/render_2k_colab.ipynb)** in Colab.

- Renders **2560 × 1440** with Remotion.
- Writes the final MP4, 600-frame chunks, still, poster, logs, and render state to **Google Drive**. The notebook asks for Drive access before writing.
- Chunks are copied to Drive as they finish, so a disconnected runtime can resume.
- The renderer is `scripts/render-2k.mjs`; it streams real frame/encode/copy progress.
- `skill.md` is not tracked in this repo.

## What is in the piece

- 41 scenes synced to word-level Whisper timestamps.
- Dracula-dark palette, hand-drawn vector linework, centered compositions.
- Sparse on-screen concept labels only; no subtitles or caption bars.
- Real source images are used only as small evidence cards: high-resolution Halle Berry portrait/sketch, Obama portrait, Jesus/Trump neuron views, the Spider-Man feature visualization, the apple + iPod attack, and the dog + pizza-label attack.
- The creator-supplied chalk animal/brain sheet, pastel object sheet, expression face sheet, technical-attack sheet, and hero/cat-mask/apple sheet are cropped into individual icons in `public/source/icons/` and used as small cards.
- Source-image and generated-asset credits are in `public/source/CREDITS.md`.

## Main files

- `src/Video.tsx` — scene order and exact durations
- `src/timings.ts` — corrected word-level timestamps
- `src/scenes/` — all scene components
- `src/components/drawings.tsx` — sketch primitives
- `public/audio.wav` — narration
- `public/source/` — approved source images
- `render_2k_colab.ipynb` — 2560×1440 Colab render
- `scripts/render-2k.mjs` — resumable chunk renderer used by the notebook
