import { Badge } from "@mantine/core";
import styles from "./styles.module.scss";

export function CardItemBadge(props: any) {
	return (
		<Badge
			size={"sm"}
			component={"a"}
			className={styles.badge}
			color={"blue"}
			variant={"light"}
			{...props}
		/>
	);
}