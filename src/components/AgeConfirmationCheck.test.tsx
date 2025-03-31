import { describe, it, expect, vi, beforeEach } from "vitest";
import { AgeConfirmationCheck } from "./AgeConfirmationCheck";
import type {
	NubeSDK,
	NubeComponentCheck,
	NubeSDKState,
} from "@tiendanube/nube-sdk-types";

// Mock do componente Check
vi.mock("@tiendanube/nube-sdk-jsx", () => ({
	Check: vi.fn().mockImplementation(({ onChange, label }) => ({
		type: "check",
		id: "age-confirmation",
		label,
		name: "age-confirmation",
		checked: false,
		onChange,
	})),
}));

describe("AgeConfirmationCheck", () => {
	const mockNube = {
		send: vi.fn(),
	} as unknown as NubeSDK;

	const defaultProps = {
		nube: mockNube,
		label: "Tenho mais de 18 anos",
		error: "Produto apenas para maiores de 18 anos",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders with correct props", () => {
		const component = (
			<AgeConfirmationCheck {...defaultProps} />
		) as unknown as NubeComponentCheck;
		expect(component).toEqual({
			type: "check",
			id: "age-confirmation",
			label: defaultProps.label,
			name: "age-confirmation",
			checked: false,
			onChange: expect.any(Function),
		});
	});

	it("sends success validation when checkbox is checked", () => {
		const component = (
			<AgeConfirmationCheck {...defaultProps} />
		) as unknown as NubeComponentCheck;
		const onChange = component.onChange;

		if (onChange) {
			onChange({
				type: "change",
				state: {} as NubeSDKState,
				value: true,
			});
		}

		expect(mockNube.send).toHaveBeenCalledWith(
			"cart:validate",
			expect.any(Function),
		);
		expect(
			(mockNube.send as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1](),
		).toEqual({
			cart: { validation: { status: "success" } },
		});
	});

	it("sends fail validation when checkbox is unchecked", () => {
		const component = (
			<AgeConfirmationCheck {...defaultProps} />
		) as unknown as NubeComponentCheck;
		const onChange = component.onChange;

		if (onChange) {
			// check the checkbox
			onChange({
				type: "change",
				state: {} as NubeSDKState,
				value: true,
			});
			// uncheck the checkbox
			onChange({
				type: "change",
				state: {} as NubeSDKState,
				value: false,
			});
		}

		expect(mockNube.send).toHaveBeenCalledTimes(2);
		expect(
			(mockNube.send as unknown as ReturnType<typeof vi.fn>).mock.calls[1][1](),
		).toEqual({
			cart: { validation: { status: "fail", reason: defaultProps.error } },
		});
	});
});
