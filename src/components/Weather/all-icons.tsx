import { Flex, Grid, GridCol } from "@mantine/core";
import { weatherCodes } from "../../api/weatherCodes";

export function AllWeatherIcons() {
	return (
		<Grid>
			{Object.values(weatherCodes).map((c) => (
				<Flex
					key={c.toString()}
					component={GridCol}
					span={4}
					align={"center"}
				>
					<img
						src={c.day.image}
						style={{ width: "50px", height: "auto" }}
						alt={""}
					/>
					{c.day.description}
					<img
						src={c.night.image}
						style={{ width: "50px", height: "auto" }}
						alt={""}
					/>
					{c.night.description}
				</Flex>
			))}
		</Grid>
	);
}