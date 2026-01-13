import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./styles/global.scss";

import {
	ColorSchemeScript,
	Container,
	Grid,
	GridCol,
	MantineProvider,
} from "@mantine/core";
import { createRoot } from "react-dom/client";
import { WIDGETS_CONFIG } from "./model/data";
import type { WidgetsConfig } from "./model/types";
import { QueryProvider } from "./Providers/QueryProvider";
import { renderWidget } from "./renderers";
import { theme } from "./styles/theme";
import { widgetKey } from "./utils/utils";

export function WidgetsGrid(props: { config: WidgetsConfig }) {
	return (
		<Grid
			grow
			gutter={"xs"}
			w={"100%"}
		>
			{props.config.widgets.map((w, i) => (
				<GridCol
					key={widgetKey(w, i)}
					span={{ xs: 12, sm: 6, md: 4, lg: w.span }}
				>
					{renderWidget(w)}
				</GridCol>
			))}
		</Grid>
	);
}

export function App() {
	return (
		<QueryProvider>
			<ColorSchemeScript defaultColorScheme="auto" />
			<MantineProvider
				theme={theme}
				defaultColorScheme={"auto"}
			>
				<Container
					w={"100%"}
					mih={"100vh"}
					size={"xl"}
					py={"xl"}
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<WidgetsGrid config={WIDGETS_CONFIG} />
				</Container>
			</MantineProvider>
		</QueryProvider>
	);
}

const container = document.body;
if (!container) {
	throw new Error("No react app container");
}

const root = createRoot(container);

root.render(<App />);

export { useClock } from "./hooks/useClock";
export { weatherLocation } from "./model/data";