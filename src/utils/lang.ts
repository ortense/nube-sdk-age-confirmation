export type Messages = {
	label: string;
	error: string;
};

export type Lang = "pt" | "es" | "en";

export const messages: Record<Lang, Messages> = {
	pt: {
		label: "Tenho mais de 18 anos",
		error: "Produto apenas para maiores de 18 anos",
	},

	es: {
		label: "Tengo más de 18 años",
		error: "Producto solo para mayores de 18 años.",
	},

	en: {
		label: "I am over 18 years old",
		error: "Product for over 18s only",
	},
};

export function getMessages(lang: string): Messages {
	return lang in messages ? messages[lang as Lang] : messages.pt;
}
