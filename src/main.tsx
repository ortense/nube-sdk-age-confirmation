import type { NubeSDK } from "@tiendanube/nube-sdk-types";
import { AgeConfirmationCheck } from "./components/AgeConfirmationCheck";
import { getMessages } from "./utils/lang";

export function App(nube: NubeSDK) {
	nube.on("checkout:ready", ({ store }) => {
		// get messages for the current language
		const { label, error } = getMessages(store.language);

		// informs the checkout that a validation will be performed
		nube.send("config:set", () => ({
			config: {
				has_cart_validation: true,
			},
		}));

		// initializes checkout with cart blocked
		nube.send("cart:validate", () => ({
			cart: { validation: { status: "fail", reason: error } },
		}));

		// render custom component
		nube.send("ui:slot:set", () => ({
			ui: {
				slots: {
					after_contact_form: (
						<AgeConfirmationCheck label={label} error={error} nube={nube} />
					),
				},
			},
		}));
	});
}
