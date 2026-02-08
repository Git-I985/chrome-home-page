import type { ActionIconProps, DefaultMantineColor } from "@mantine/core";
import type { ComponentProps } from "react";
import type { CardHeaderIcon } from "../CardHeaderIcon";
import type { SmartIconProps } from "../components/SmartIcon";

export type GridSpan = number | "auto" | "content";

export type SocialLink = Omit<ActionIconProps, "children"> & {
	href: string;
	content: { type: "icon"; value: SmartIconProps } | { type: "text"; value: string };
};

export type CardBadgeConfig = {
	label: string;
	href: string;
};

export type LinksCardItemConfig = {
	label: string;
	href?: string;
	icon?: SmartIconProps["icon"];
	badges?: CardBadgeConfig[];
};

export type WeatherCalendarWidgetConfig = {
	type: "weatherCalendar";
	span: GridSpan;
};

export type LinksCardWidgetConfig = {
	type: "linksCard";
	span: GridSpan;
	title: string;
	theme?: DefaultMantineColor;
	headerIcon?: Omit<ComponentProps<typeof CardHeaderIcon>, "color">;
	items: LinksCardItemConfig[];
};

export type WidgetConfig = WeatherCalendarWidgetConfig | LinksCardWidgetConfig;

export type WidgetsConfig = {
	version: number;
	widgets: WidgetConfig[];
};