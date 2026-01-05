import { Badge, Group } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { SmartIcon, type SmartIconProps } from "../SmartIcon";

export function WeatherBadge(props: PropsWithChildren & SmartIconProps) {
	return (
		<Badge
			size={"lg"}
			color={"gray"}
			variant={"light"}
			autoContrast
			style={{ textTransform: "none", cursor: "pointer" }}
		>
			<Group gap={"xxs"}>
				<SmartIcon icon={props.icon} />
				{props.children}
			</Group>
		</Badge>
	);
}