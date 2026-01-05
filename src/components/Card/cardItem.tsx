import { Group, Text } from "@mantine/core";
import type { ReactNode } from "react";
import { SmartIcon, type SmartIconProps } from "../SmartIcon";
import styles from "./styles.module.scss";

export function CardItem(
	props: {
		content: ReactNode;
		href?: string;
	} & SmartIconProps,
) {
	return (
		<Text
			component={props.href ? "a" : "div"}
			href={props.href || "#"}
		>
			<Group
				py={"xxs"}
				px={"xs"}
				gap={"xs"}
				align={"center"}
				className={styles.link}
			>
				<SmartIcon icon={props.icon} />
				{props.content}
			</Group>
		</Text>
	);
}