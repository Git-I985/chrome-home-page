import { Flex, Group, Skeleton, Stack, Text } from "@mantine/core";
import { range } from "lodash-es";
import { useWeatherData } from "../../api/useWeatherData";
import { weatherCodes } from "../../api/weatherCodes";
import { useClock } from "../../hooks/useClock";
import { CALENDAR_LINK, WEATHER_LINK, weatherLocation } from "../../model/data";
import { degreesToCompass } from "../../utils/degrees-to-compas";
import { SmartIcon } from "../SmartIcon";
import styles from "./styles.module.scss";
import { WeatherBadge } from "./weatherBadge";

function WeatherSkeleton() {
	return (
		<>
			<Group>
				<Skeleton
					height={28}
					width={186}
					radius="md"
				/>
			</Group>
			<Group>
				{range(7).map((i) => (
					<Skeleton
						height={24}
						width={140}
						radius="xl"
						key={i}
					/>
				))}
			</Group>
		</>
	);
}

function DateTime() {
	const { date, time } = useClock();
	return (
		<Text
			component={"a"}
			href={CALENDAR_LINK}
			className={styles.hoverable}
		>
			<Stack gap={"xxs"}>
				<Group
					gap={"xxs"}
					align={"center"}
				>
					{date}
				</Group>
				<Text
					lh={"var(--mantine-line-height-xxs)"}
					size={"xxl"}
					w={"165px"}
				>
					{time}
				</Text>
			</Stack>
		</Text>
	);
}

export function WeatherWidget() {
	const { data, isPending, error } = useWeatherData({
		latitude: weatherLocation.lat,
		longitude: weatherLocation.lon,
	});

	return (
		<Stack gap={"sm"}>
			<DateTime />
			{!data || isPending || error ? (
				<WeatherSkeleton />
			) : (
				<Text
					component={"a"}
					href={WEATHER_LINK}
					className={styles.hoverable}
				>
					<Stack gap={"sm"}>
						<Group>
							<Text size={"xl"}>{data?.current.temperature_2m}&deg;</Text>
							<Group gap={"0"}>
								<img
									src={
										weatherCodes[
											data?.current
												?.weather_code as unknown as keyof typeof weatherCodes
										][data?.current.is_day ? "day" : "night"].image
									}
									alt={
										weatherCodes[
											data?.current
												?.weather_code as unknown as keyof typeof weatherCodes
										][data?.current.is_day ? "day" : "night"].description
									}
									width={32}
								/>
								Feels like {data?.current.apparent_temperature}&deg;
							</Group>
						</Group>
						<Flex
							gap="xs"
							align="center"
							wrap={"wrap"}
						>
							<WeatherBadge
								icon={{
									icon: "mdi:drop",
									color: "var(--mantine-color-blue-5)",
								}}
							>
								{data?.current.relative_humidity_2m}% (dew at{" "}
								{data?.current.dew_point_2m}&deg;)
							</WeatherBadge>
							<WeatherBadge
								icon={{
									icon: "tabler:wind",
									color: "var(--mantine-color-blue-5)",
								}}
							>
								{data?.current.wind_speed_10m} m/s (up to{" "}
								{data?.current.wind_gusts_10m} m/s){" "}
								<SmartIcon icon={"mdi:compass-outline"} />
								{degreesToCompass(data?.current.wind_direction_10m)}{" "}
							</WeatherBadge>
							<WeatherBadge
								icon={{
									icon: "solar:sun-bold",
									color: "var(--mantine-color-yellow-8)",
								}}
							>
								{[
									data?.current.uv_index_max,
									data?.current.uv_index_clear_sky_max,
								]
									.sort()
									.join("-")}{" "}
								UV
							</WeatherBadge>
							<WeatherBadge icon={"lets-icons:pressure"}>
								<span>{data?.current.pressure_msl}</span> hPa
							</WeatherBadge>
							{data?.current.precipitation ||
							data?.current.precipitation_probability ? (
								<WeatherBadge icon={"material-symbols:weather-mix-rounded"}>
									{data?.current.precipitation &&
									data?.current.precipitation_probability ? (
										<>
											<span>{data?.current.precipitation} mm/h</span> (
											{data?.current.precipitation_probability}% probability)
										</>
									) : data?.current.precipitation ? (
										<span>{data?.current.precipitation}mm/h</span>
									) : (
										<>{data?.current.precipitation_probability}% probability</>
									)}
								</WeatherBadge>
							) : null}
							{data?.current.rain ||
							data?.current.snowfall ||
							data?.current.snow_depth ? (
								<WeatherBadge>
									{data?.current.rain ? (
										<>
											<SmartIcon
												icon={{
													icon: "material-symbols:rainy-light",
													color: "var(--mantine-color-blue-5)",
												}}
											/>
											<span>{data?.current.rain} mm/h </span>
										</>
									) : null}
									{data?.current.snowfall ? (
										<>
											<SmartIcon
												icon={{
													icon: "mdi:snowflake",
													color: "var(--mantine-color-blue-5)",
												}}
											/>
											<span>{data?.current.snowfall} cm/h </span>
										</>
									) : null}
									{data?.current.snow_depth ? (
										<>
											<SmartIcon
												icon={{
													icon: "icon-park-outline:row-height",
													color: "var(--mantine-color-blue-5)",
												}}
											/>
											<span>{data?.current.snow_depth * 100} cm</span>
										</>
									) : null}
								</WeatherBadge>
							) : null}
							<WeatherBadge icon={"solar:eye-linear"}>
								{data?.current.visibility / 1000} km
							</WeatherBadge>
						</Flex>
					</Stack>
				</Text>
			)}
		</Stack>
	);
}

export { AllWeatherIcons } from "./all-icons";