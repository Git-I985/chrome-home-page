import { Icon } from "@iconify/react";
import { type ComponentProps, isValidElement, type ReactElement } from "react";

export type SmartIconProps = {
	icon?: ReactElement | ComponentProps<typeof Icon> | string;
};

export function SmartIcon(props: SmartIconProps) {
	return !props.icon ? null : isValidElement(props.icon) ? (
		props.icon
	) : typeof props.icon === "string" ? (
		<Icon icon={props.icon} />
	) : (
		<Icon {...(props.icon as ComponentProps<typeof Icon>)} />
	);
}