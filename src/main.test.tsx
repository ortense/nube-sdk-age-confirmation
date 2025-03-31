import { describe, it, expect, vi, beforeEach } from "vitest";
import { App } from "./main";
import type { NubeSDK } from "@tiendanube/nube-sdk-types";

// Mock AgeConfirmationCheck
vi.mock("./components/AgeConfirmationCheck", () => ({
	AgeConfirmationCheck: vi
		.fn()
		.mockImplementation(({ label, error, nube }) => ({
			type: "AgeConfirmationCheck",
			props: { label, error, nube },
		})),
}));

// Mock getMessages
vi.mock("./utils/lang", () => ({
	getMessages: vi.fn().mockImplementation(() => ({
		label: "Tenho mais de 18 anos",
		error: "Produto apenas para maiores de 18 anos",
	})),
}));

describe("App", () => {
	const nube = {
		send: vi.fn(),
		on: vi.fn(),
		getStore: vi.fn().mockReturnValue({
			language: "pt",
		}),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("executes the app without crashing", () => {
		expect(() => App(nube as unknown as NubeSDK)).not.toThrow();
	});

	it("configures the checkout when ready event is triggered", () => {
		App(nube as unknown as NubeSDK);

		const checkoutReadyCallback = nube.on.mock.calls[0][1];
		checkoutReadyCallback({ store: { language: "pt" } });

		const configSetCall = nube.send.mock.calls.find(
			(call) => call[0] === "config:set",
		);
		expect(configSetCall).toBeDefined();
		if (configSetCall) {
			expect(configSetCall[1]()).toEqual({
				config: {
					has_cart_validation: true,
				},
			});
		}
	});

	it("registers the checkout:ready event handler", () => {
		App(nube as unknown as NubeSDK);

		expect(nube.on).toHaveBeenCalledWith(
			"checkout:ready",
			expect.any(Function),
		);
	});

	it("renders AgeConfirmationCheck with correct props", () => {
		App(nube as unknown as NubeSDK);

		const checkoutReadyCallback = nube.on.mock.calls[0][1];
		checkoutReadyCallback({ store: { language: "pt" } });

		const uiSlotCall = nube.send.mock.calls.find(
			(call) => call[0] === "ui:slot:set",
		);
		expect(uiSlotCall).toBeDefined();
		if (uiSlotCall) {
			const component = uiSlotCall[1]().ui.slots.after_contact_form;
			expect(component.type).toBe("AgeConfirmationCheck");
			expect(component.props.label).toBe("Tenho mais de 18 anos");
			expect(component.props.error).toBe(
				"Produto apenas para maiores de 18 anos",
			);
			expect(component.props.nube).toBe(nube);
		}
	});
});
