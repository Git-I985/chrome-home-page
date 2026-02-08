import type { SocialLink, WidgetsConfig } from "./types";

export const WIDGETS_CONFIG: WidgetsConfig = {
	version: 1,
	widgets: [
		{
			type: "weatherCalendar",
			span: 8,
		},
		{
			type: "linksCard",
			span: 3,
			title: "Everyday",
			theme: "orange",
			headerIcon: { icon: "solar:pen-bold-duotone", variant: "light" },
			items: [
				{
					label: "Gmail",
					href: "https://mail.google.com/mail/u/0/#inbox",
					icon: { icon: "mdi:email-outline" },
				},
				{
					label: "ChatGPT",
					href: "https://chatgpt.com/",
					icon: { icon: "streamline-logos:openai-logo" },
				},
			],
		},
		// ....
	],
};

export const SOCIAL_LINKS: SocialLink[] = [
	{
		variant: "light",
		color: "red",
		href: "https://www.youtube.com/",
		content: { type: "icon", value: { icon: "mdi:youtube" } },
	},
];

export const DEFAULT_WEATHER_TIMEZONE = "Europe/Poland";

export const weatherLocation = {
	lat: 0,
	long: 0,
};