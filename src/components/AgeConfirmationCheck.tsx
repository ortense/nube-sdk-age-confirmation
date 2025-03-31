import { Check } from "@tiendanube/nube-sdk-jsx";
import type { NubeSDK } from "@tiendanube/nube-sdk-types";

export type AgeConfirmationCheckProps = {
	nube: NubeSDK;
	label: string;
	error: string;
};
export function AgeConfirmationCheck({
	nube,
	label,
	error,
}: AgeConfirmationCheckProps) {
	return (
		<Check
			id="age-confirmation"
			label={label}
			name="age-confirmation"
			checked={false}
			onChange={(e) => {
				// update validation on checkbox value change
				if (e.value) {
					// allow checkout to proceed
					return nube.send("cart:validate", () => ({
						cart: { validation: { status: "success" } },
					}));
				}

				// block checkout if checkbox is not checked
				return nube.send("cart:validate", () => ({
					cart: { validation: { status: "fail", reason: error } },
				}));
			}}
		/>
	);
}
