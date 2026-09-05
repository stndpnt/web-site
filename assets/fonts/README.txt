StandPoint — self-hosted webfonts
=================================
Families and weights are exactly those the site uses; nothing else is bundled.

Manrope (SIL Open Font License 1.1 — see LICENSE-Manrope-OFL.txt)
  Manrope-Regular.ttf    400
  Manrope-Medium.ttf     500
  Manrope-SemiBold.ttf   600
  Manrope-Bold.ttf       700
  Manrope-ExtraBold.ttf  800
  Source: official Manrope release (github.com/sharanda/manrope). The release
  ships TTF only, so these are TTF rather than WOFF2. Running the files through
  woff2_compress and changing the filenames in assets/css/fonts.css is the only
  step needed to move to WOFF2 later.

Inter (SIL Open Font License 1.1)
  Inter-Regular.woff2    400
  Inter-Medium.woff2     500
  Inter-SemiBold.woff2   600

JetBrains Mono (SIL Open Font License 1.1 — see LICENSE-JetBrainsMono-OFL.txt)
  JetBrainsMono-Regular.woff2  400
  JetBrainsMono-Medium.woff2   500

All files carry Latin + Cyrillic coverage (unsubsetted originals), so Cyrillic
project titles render from the local files too.

@font-face declarations: assets/css/fonts.css (single shared stylesheet).
