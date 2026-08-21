import { siteConfig } from "@/site-config";

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);

const railOptions: Intl.DateTimeFormatOptions = {
	day: "numeric",
	month: "short",
	year: "numeric",
};

const bylineOptions: Intl.DateTimeFormatOptions = {
	day: "numeric",
	month: "long",
	year: "numeric",
};

export function getFormattedDate(
	date: string | number | Date,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (typeof options !== "undefined") {
		return new Date(date).toLocaleDateString(siteConfig.date.locale, {
			...(siteConfig.date.options as Intl.DateTimeFormatOptions),
			...options,
		});
	}

	return dateFormat.format(new Date(date));
}

/** Short rail date: `5 Mar 2026`. */
export function formatRailDate(date: Date, locale = "en-US"): string {
	const formatted = new Intl.DateTimeFormat(locale, railOptions).format(date);

	return locale === "pt-BR" ? formatted.replaceAll(" de ", " ") : formatted;
}

/** Article byline date: `5 March 2026`. */
export function formatBylineDate(date: Date, locale = "en-GB"): string {
	return new Intl.DateTimeFormat(locale, bylineOptions).format(date);
}

/** Localize the text emitted by the `reading-time` package. */
export function formatReadingTime(readingTime: string, language: string): string {
	return language === "pt-BR" ? readingTime.replace(" min read", " min de leitura") : readingTime;
}
