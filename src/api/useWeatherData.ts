import { useQuery } from "@tanstack/react-query";
import { clamp } from "lodash-es";
import { DEFAULT_WEATHER_TIMEZONE } from "../model/data";

const DEFAULT_HOURS_AHEAD = 6;
const MAX_HOURS_AHEAD = 16 * 24;
const FORECAST_MODEL = "best_match" as const;

const dailyFields = ["uv_index_max", "uv_index_clear_sky_max"] as const;

const hourlyFields = [
	"temperature_2m",
	"apparent_temperature",
	"weather_code",
	"wind_speed_10m",
	"wind_gusts_10m",
	"relative_humidity_2m",
	"precipitation_probability",
	"rain",
	"snowfall",
	"is_day",
] as const;

const currentFields = [
	"temperature_2m",
	"apparent_temperature",
	"weather_code",
	"wind_speed_10m",
	"wind_gusts_10m",
	"wind_direction_10m",
	"relative_humidity_2m",
	"dew_point_2m",
	"precipitation",
	"precipitation_probability",
	"pressure_msl",
	"visibility",
	"snow_depth",
	"rain",
	"snowfall",
	"is_day",
] as const;

export type OpenMeteoForecastResponseDailyData = Record<
	(typeof dailyFields)[number] | "time",
	number[]
>;

export type OpenMeteoForecastResponseHourlyData = Record<
	(typeof hourlyFields)[number] | "time",
	number[]
>;

export type OpenMeteoForecastResponseCurrentData = Record<
	(typeof currentFields)[number] | "time",
	number
>;

export type OpenMeteoForecastResponse = {
	timezone: string;
	utc_offset_seconds: number;
	current: OpenMeteoForecastResponseCurrentData;
	hourly: OpenMeteoForecastResponseHourlyData;
	daily: OpenMeteoForecastResponseDailyData;
	error?: boolean;
	reason?: string;
};

export type UseWeatherReturn = {
	current: Record<
		(typeof currentFields)[number] | (typeof dailyFields)[number],
		number
	>;
	hourly: Record<(typeof hourlyFields)[number], number>[];
};

const buildUrl = (p: {
	latitude: number;
	longitude: number;
	timezone: string;
	hoursAhead: number;
}) => {
	const hoursAhead = clamp(p.hoursAhead, 0, MAX_HOURS_AHEAD);
	const qs = new URLSearchParams({
		latitude: String(p.latitude),
		longitude: String(p.longitude),
		timezone: p.timezone,
		models: FORECAST_MODEL,
		temperature_unit: "celsius",
		wind_speed_unit: "ms",
		precipitation_unit: "mm",
		timeformat: "unixtime",
		past_hours: "0",
		forecast_days: "1",
		forecast_hours: String(hoursAhead + 1),
		current: currentFields.join(","),
		hourly: hourlyFields.join(","),
		daily: dailyFields.join(","),
	});
	return `https://api.open-meteo.com/v1/forecast?${qs.toString()}`;
};

export const transformWeatherData = (
	apiResponse: OpenMeteoForecastResponse,
): UseWeatherReturn => {
	return {
		current: {
			...apiResponse.current,
			uv_index_max: apiResponse.daily.uv_index_max[0]!,
			uv_index_clear_sky_max: apiResponse.daily.uv_index_clear_sky_max[0]!,
		},
		hourly: apiResponse.hourly.time.map((_, index) => ({
			// biome-ignore-start lint/style/noNonNullAssertion: <>
			time: apiResponse.hourly.time[index]!,
			temperature_2m: apiResponse.hourly.temperature_2m[index]!,
			apparent_temperature: apiResponse.hourly.apparent_temperature[index]!,
			weather_code: apiResponse.hourly.weather_code[index]!,
			wind_speed_10m: apiResponse.hourly.wind_speed_10m[index]!,
			wind_gusts_10m: apiResponse.hourly.wind_gusts_10m[index]!,
			relative_humidity_2m: apiResponse.hourly.relative_humidity_2m[index]!,
			precipitation_probability:
				apiResponse.hourly.precipitation_probability[index]!,
			rain: apiResponse.hourly.rain[index]!,
			snowfall: apiResponse.hourly.snowfall[index]!,
			is_day: apiResponse.hourly.is_day[index]!,
			// biome-ignore-end lint/style/noNonNullAssertion: <>
		})),
	};
};

export function useWeatherData(params: {
	latitude: number;
	longitude: number;
	timezone?: string;
	hoursAhead?: number;
}) {
	const {
		latitude,
		longitude,
		timezone = DEFAULT_WEATHER_TIMEZONE,
		hoursAhead = DEFAULT_HOURS_AHEAD,
	} = params;
	const normalizedHoursAhead = clamp(hoursAhead, 0, MAX_HOURS_AHEAD);

	return useQuery({
		queryKey: [
			"weather",
			latitude,
			longitude,
			timezone,
			normalizedHoursAhead,
			FORECAST_MODEL,
		],
		staleTime: 10 * 60_000,
		queryFn: async ({ signal }): Promise<UseWeatherReturn> => {
			const res = await fetch(
				buildUrl({
					latitude,
					longitude,
					timezone,
					hoursAhead: normalizedHoursAhead,
				}),
				{ signal },
			);
			const json: unknown = await res.json();

			if (!res.ok) throw new Error(`Open-Meteo error (HTTP ${res.status})`);

			return transformWeatherData(json as OpenMeteoForecastResponse);
		},
	});
}