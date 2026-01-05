import { ThemeIcon } from "@mantine/core";
import type { ComponentProps } from "react";
import { SmartIcon, type SmartIconProps } from "./components/SmartIcon";

export function CardHeaderIcon(
	props: ComponentProps<typeof ThemeIcon> & SmartIconProps,
) {
	return (
		<ThemeIcon
			variant={props.variant ?? "light"}
			color={props.color}
		>
			<SmartIcon icon={props.icon} />
		</ThemeIcon>
	);
}