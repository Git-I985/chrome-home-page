import { Flex } from "@mantine/core";
import styles from "./styles.module.scss";

export function CardItemBadgesList(props: any) {
	return (
		<Flex
			{...props}
			gap={"xs"}
			className={styles.list}
			data-no-scrollbar
		/>
	);
}