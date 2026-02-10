import { ActionIcon, Grid, GridCol, Text, Tooltip } from "@mantine/core";
import { SOCIAL_LINKS } from "../../model/data";
import { SmartIcon } from "../SmartIcon";

export function SocialLinksBar() {
	return (
		<Grid gutter={"xs"}>
			{SOCIAL_LINKS.map((link, index) => {
				const actionIcon = (
					<ActionIcon
						variant={link.variant ?? "light"}
						color={link.color}
						component={"a"}
						href={link.href}
						autoContrast
						size={"lg"}
						{...(link.gradient ? { gradient: link.gradient } : {})}
					>
						{link.content.type === "icon" ? (
							<SmartIcon {...link.content.value} />
						) : (
							<Text
								fw={700}
								size={"xs"}
								tt={"lowercase"}
							>
								{link.content.value}
							</Text>
						)}
					</ActionIcon>
				);

				return (
					<GridCol
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						span={{ base: "content" }}
					>
						{link.label ? (
							<Tooltip
								label={link.label}
								variant="light"
								withArrow
								color={link.color}
								transitionProps={{
									enterDelay: 800,
									duration: 150,
									transition: "fade",
								}}
							>
								{actionIcon}
							</Tooltip>
						) : (
							actionIcon
						)}
					</GridCol>
				);
			})}
		</Grid>
	);
}