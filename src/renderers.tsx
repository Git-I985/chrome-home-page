import { ActionIcon, Grid, GridCol, Text, Tooltip } from "@mantine/core";
import { CardHeaderIcon } from "./CardHeaderIcon";
import { WidgetLayout } from "./components/Card";
import { CardItem } from "./components/Card/cardItem";
import { CardItemBadge } from "./components/Card/cardItemBadge";
import { CardItemBadgesList } from "./components/Card/cardItemBadgesList";
import { SmartIcon } from "./components/SmartIcon";
import { WeatherWidget } from "./components/Weather";
import { WidgetPaper } from "./components/WidgetPaper";
import type {
	LinksCardWidgetConfig,
	QuickLinksWidgetConfig,
	WidgetConfig,
} from "./model/types";
import { itemKey } from "./utils/utils";

function renderLinksCard(widget: LinksCardWidgetConfig) {
	return (
		<WidgetLayout
			theme={widget.theme ?? "gray"}
			slotTitle={widget.title}
			slotIcon={
				<CardHeaderIcon
					{...widget.headerIcon}
					color={widget.theme ?? "gray"}
				/>
			}
			slotItems={widget.items.map((item, i) => {
				const content = (
					<>
						{item.label}
						{item.badges?.length ? (
							<CardItemBadgesList>
								{item.badges?.map((b, i) => (
									<CardItemBadge
										key={b.href ? `href:${b.href}` : `badge:${b.label}:${i}`}
										href={b.href}
									>
										{b.label}
									</CardItemBadge>
								))}
							</CardItemBadgesList>
						) : null}
					</>
				);

				return (
					<CardItem
						key={itemKey(item, i)}
						content={content}
						href={item.href}
						icon={item.icon as never}
					/>
				);
			})}
		/>
	);
}

function renderWeatherCalendar() {
	return (
		<WidgetPaper
			px={"xs"}
			py={"xs"}
		>
			<WeatherWidget />
		</WidgetPaper>
	);
}

function renderQuickLinks(widget: QuickLinksWidgetConfig) {
	return (
		<WidgetPaper
			px={"md"}
			py={"xs"}
			theme={"indigo"}
		>
			<Grid gutter={"xs"}>
				{widget.links.map((link, index) => {
					const actionIcon = (
						<ActionIcon
							variant={link.variant ?? "light"}
							color={link.color}
							component={"a"}
							href={link.href}
							autoContrast
							size={"lg"}
							radius={"md"}
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
		</WidgetPaper>
	);
}

export function renderWidget(widget: WidgetConfig) {
	switch (widget.type) {
		case "weatherCalendar":
			return renderWeatherCalendar();
		case "linksCard":
			return renderLinksCard(widget);
		case "quickLinks":
			return renderQuickLinks(widget);
	}
}