import { CardHeaderIcon } from "./CardHeaderIcon";
import { WidgetLayout } from "./components/Card";
import { CardItem } from "./components/Card/cardItem";
import { CardItemBadge } from "./components/Card/cardItemBadge";
import { CardItemBadgesList } from "./components/Card/cardItemBadgesList";
import { WeatherWidget } from "./components/Weather";
import { WidgetPaper } from "./components/WidgetPaper";
import type { LinksCardWidgetConfig, WidgetConfig } from "./model/types";
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
			px={"md"}
			py={"md"}
		>
			<WeatherWidget />
		</WidgetPaper>
	);
}

export function renderWidget(widget: WidgetConfig) {
	switch (widget.type) {
		case "weatherCalendar":
			return renderWeatherCalendar();
		case "linksCard":
			return renderLinksCard(widget);
	}
}