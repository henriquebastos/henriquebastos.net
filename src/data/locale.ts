import type { LanguageAlternate, SiteLanguage } from "../types";
import { absoluteUrl } from "../utils/path";

interface MenuLink {
	path: string;
	title: string;
}

interface LocaleConfig {
	articleArchiveLabel: (count: number) => string;
	articleCountLabel: (count: number) => string;
	articlesLabel: string;
	articlesPath: string;
	description: string;
	feedPath: string;
	feedTitle: (siteTitle: string) => string;
	homePath: string;
	latestLabel: string;
	menuLinks: readonly MenuLink[];
	nextPageLabel: string;
	paginationLabel: string;
	previousPageLabel: string;
	primaryNavigationLabel: string;
	rssLabel: string;
	skipToContentLabel: string;
	themeCreditLabel: string;
	toggleThemeLabel: string;
}

export const siteLanguages = ["en-US", "pt-BR"] as const satisfies readonly SiteLanguage[];

export const localeConfig: Record<SiteLanguage, LocaleConfig> = {
	"en-US": {
		articleArchiveLabel: (count) => `View all ${count} ${count === 1 ? "post" : "posts"} →`,
		articleCountLabel: (count) => `${count} ${count === 1 ? "post" : "posts"}`,
		articlesLabel: "Writing",
		articlesPath: "/writing/",
		description: "25 years of Python. Then AI bit me. Now I'm drinking from the firehose.",
		feedPath: "/rss.xml",
		feedTitle: (siteTitle) => siteTitle,
		homePath: "/",
		latestLabel: "Latest",
		menuLinks: [
			{ path: "/", title: "Home" },
			{ path: "/writing/", title: "Writing" },
			{ path: "/about/", title: "About" },
			{ path: "/pt/", title: "PT" },
		],
		nextPageLabel: "Next →",
		paginationLabel: "Pagination",
		previousPageLabel: "← Previous",
		primaryNavigationLabel: "Primary navigation",
		rssLabel: "RSS feed",
		skipToContentLabel: "Skip to content",
		themeCreditLabel: "Powered by",
		toggleThemeLabel: "Toggle theme",
	},
	"pt-BR": {
		articleArchiveLabel: (count) =>
			count === 1 ? "Ver o artigo →" : `Ver todos os ${count} artigos →`,
		articleCountLabel: (count) => `${count} ${count === 1 ? "artigo" : "artigos"}`,
		articlesLabel: "Artigos",
		articlesPath: "/pt/artigos/",
		description:
			"Artigos e acervo em português de Henrique Bastos sobre software, IA, Python, Django, carreira e autonomia.",
		feedPath: "/pt/rss.xml",
		feedTitle: (siteTitle) => `${siteTitle} em Português`,
		homePath: "/pt/",
		latestLabel: "Mais recente",
		menuLinks: [
			{ path: "/pt/", title: "Início" },
			{ path: "/pt/artigos/", title: "Artigos" },
			{ path: "/pt/cursos/", title: "Cursos" },
			{ path: "/pt/palestras/", title: "Palestras" },
			{ path: "/", title: "EN" },
		],
		nextPageLabel: "Próxima →",
		paginationLabel: "Paginação",
		previousPageLabel: "← Anterior",
		primaryNavigationLabel: "Navegação principal",
		rssLabel: "Feed RSS",
		skipToContentLabel: "Pular para o conteúdo",
		themeCreditLabel: "Desenvolvido com",
		toggleThemeLabel: "Alternar tema",
	},
};

export function getLocaleConfig(language: SiteLanguage): LocaleConfig {
	return localeConfig[language];
}

export function getPageAlternates(
	page: "articles" | "home",
	site: URL | string | undefined,
): LanguageAlternate[] {
	const pathKey = page === "home" ? "homePath" : "articlesPath";

	return siteLanguages.map((language) => ({
		href: absoluteUrl(localeConfig[language][pathKey], site),
		lang: language,
	}));
}
