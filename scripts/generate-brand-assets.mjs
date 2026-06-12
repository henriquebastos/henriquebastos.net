/**
 * Generates brand image assets from the HB monogram (traced from the
 * official logomarca; unit grid: glyph = 5u x 4u, u = stroke width).
 *
 * Outputs:
 *   public/icon.png        512x512 favicon/manifest source (white glyph on azul)
 *   public/social-card.png 1200x630 default Open Graph card
 *
 * Run: node scripts/generate-brand-assets.mjs
 */
import fs from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const AZUL = "#0099BC"; // brand color (Canva logomarca spec)
const ORANGE = "#FF9400"; // accent (profile picture background)
const INK_DARK = "#1E1B18"; // site dark background (warm charcoal)
const TEXT_LIGHT = "#F3EEE3";

/** Monogram glyph paths in a 500x400 viewBox (u = 100). */
const GLYPH = `
	<rect x="0" y="50" width="100" height="300"/>
	<rect x="0" y="150" width="200" height="100"/>
	<rect x="200" y="0" width="100" height="400"/>
	<path d="M400,50 h50 a50,50 0 0 1 0,100 h-50 z"/>
	<path d="M400,250 h50 a50,50 0 0 1 0,100 h-50 z"/>
`;

const monogram = (fill, x, y, width) =>
	`<g transform="translate(${x},${y}) scale(${width / 500})" fill="${fill}">${GLYPH}</g>`;

const render = (svg, file) => {
	const png = new Resvg(svg).render().asPng();
	fs.writeFileSync(file, png);
	console.log(`wrote ${file} (${png.length} bytes)`);
};

/* icon.png — white glyph on azul, same proportions as the GitHub org avatar */
{
	const size = 512;
	const glyphW = Math.round(size * 0.54);
	const glyphH = (glyphW * 400) / 500;
	const x = (size - glyphW) / 2;
	const y = (size - glyphH) / 2;
	render(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
			<rect width="${size}" height="${size}" fill="${AZUL}"/>
			${monogram("#ffffff", x, y, glyphW)}
		</svg>`,
		"public/icon.png",
	);
}

/* social-card.png — default OG image for non-post pages */
{
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
		<rect width="1200" height="630" fill="${INK_DARK}"/>
		${monogram("#2FB3D4", 80, 150, 200)}
		<rect x="80" y="388" width="64" height="6" fill="${ORANGE}"/>
		<text x="80" y="482" font-family="Inter" font-weight="700" font-size="64" letter-spacing="8" fill="${TEXT_LIGHT}">HENRIQUE BASTOS</text>
		<text x="1120" y="562" text-anchor="end" font-family="JetBrains Mono" font-size="24" fill="#2FB3D4">henriquebastos.net</text>
	</svg>`;
	const png = new Resvg(svg, {
		font: {
			fontFiles: [
				"src/assets/fonts/inter-bold.woff",
				"src/assets/fonts/jetbrainsmono-regular.ttf",
			],
			loadSystemFonts: false,
			defaultFontFamily: "Inter",
		},
	})
		.render()
		.asPng();
	fs.writeFileSync("public/social-card.png", png);
	console.log(`wrote public/social-card.png (${png.length} bytes)`);
}
