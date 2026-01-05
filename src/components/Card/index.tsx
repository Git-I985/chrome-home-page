import { Flex, Grid, GridCol, Title } from "@mantine/core";
import type { ReactElement, ReactNode } from "react";
import { WidgetPaper, type WidgetPaperProps } from "../WidgetPaper";

type ServiceLinksCardItem = ReactElement;

type WidgetLayoutProps = WidgetPaperProps & {
	slotTitle: ReactNode;
	slotIcon: ReactNode;
	slotItems: ServiceLinksCardItem[];
};

export function WidgetLayout(props: WidgetLayoutProps) {
	const { slotTitle, slotIcon, slotItems, ...paperProps } = props;

	return (
		<WidgetPaper {...paperProps}>
			<Flex
				direction={"column"}
				justify={"start"}
				gap={"xxs"}
			>
				<Title
					order={2}
					p={"xxs"}
					size={"xl"}
				>
					<Flex
						gap={"xxs"}
						align={"center"}
					>
						{slotIcon}
						{slotTitle}
					</Flex>
				</Title>
				<Grid
					type={"container"}
					breakpoints={{
						xs: "400px",
						sm: "600px",
						md: "800px",
						lg: "1000px",
						xl: "1200px",
					}}
					gutter={0}
				>
					{slotItems.map((i, index) => (
						<GridCol
							// biome-ignore lint/suspicious/noArrayIndexKey: <>
							key={index}
							span={{ base: 12, md: 6 }}
						>
							{i}
						</GridCol>
					))}
				</Grid>
			</Flex>
		</WidgetPaper>
	);
}