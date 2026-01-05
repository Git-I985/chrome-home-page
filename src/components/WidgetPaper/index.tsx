import {
	createPolymorphicComponent,
	type DefaultMantineColor,
	Paper,
	type PaperProps,
} from "@mantine/core";
import { forwardRef } from "react";

export type WidgetPaperProps = PaperProps & {
	theme?: DefaultMantineColor;
};

const WidgetPaperInner = forwardRef<HTMLDivElement, WidgetPaperProps>(
	({ theme = "gray", ...others }, ref) => {
		return (
			<Paper
				ref={ref}
				w={"100%"}
				h={"100%"}
				radius={"lg"}
				py={"xs"}
				px={"xxs"}
				shadow={"xs"}
				withBorder
				{...others}
				style={{
					"--custom-var-widget-paper-theme": `var(--mantine-color-${theme}-light)`,
					borderColor: `var(--mantine-color-${theme}-light-hover)`,
					backgroundColor: `var(--custom-var-widget-paper-theme)`,
					...others.style,
				}}
			/>
		);
	},
);

export const WidgetPaper = createPolymorphicComponent<"div", WidgetPaperProps>(
	WidgetPaperInner,
);