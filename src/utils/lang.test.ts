import { describe, it, expect } from "vitest";
import { getMessages } from "./lang";

describe("getMessages", () => {
	it("should return the messages for the given language", () => {
		const messages = getMessages("pt");
		expect(messages).toEqual({
			label: "Tenho mais de 18 anos",
			error: "Produto apenas para maiores de 18 anos",
		});
	});

	it("should return the default messages if the language is not supported", () => {
		const messages = getMessages("fr");
		expect(messages).toEqual({
			label: "Tenho mais de 18 anos",
			error: "Produto apenas para maiores de 18 anos",
		});
	});
});
