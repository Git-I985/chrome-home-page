import type { WidgetConfig } from "../model/types";

export function widgetKey(w: WidgetConfig, index: number) {
	if (w.type === "linksCard") return `linksCard:${w.title}`;
	return `widget:${w.type}:${index}`;
}

export function itemKey(item: { href?: string; label: string }, index: number) {
	return item.href ? `href:${item.href}` : `label:${item.label}:${index}`;
}