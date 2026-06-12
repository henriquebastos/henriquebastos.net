import { siteConfig } from "@/site-config";

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);

const railFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "short",
	year: "numeric",
});

const bylineFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "long",
	year: "numeric",
});

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
export function formatRailDate(date: Date): string {
	return railFormatter.format(date);
}

/** Article byline date: `5 March 2026`. */
export function formatBylineDate(date: Date): string {
	return bylineFormatter.format(date);
}

