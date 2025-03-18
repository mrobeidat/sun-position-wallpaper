import { Wallpaper, WallpaperSchema } from "../types";

export function selectWallpaper(
  currentTime: Date,
  sunrise: Date,
  sunset: Date
): Wallpaper {
  if (currentTime < sunrise || currentTime > sunset) {
    return WallpaperSchema.enum["night.png"];
  }

  const totalDaylight = sunset.getTime() - sunrise.getTime();

  const morningEnd = new Date(sunrise.getTime() + totalDaylight * 0.1);
  const noonStart = new Date(sunrise.getTime() + totalDaylight * 0.5);
  const afternoonStart = new Date(sunrise.getTime() + totalDaylight * 0.8);
  const afternoonEnd = new Date(sunrise.getTime() + totalDaylight * 0.9);

  if (currentTime >= sunrise && currentTime < morningEnd) {
    return WallpaperSchema.enum["sunrise.png"];
  } else if (currentTime >= morningEnd && currentTime < noonStart) {
    return WallpaperSchema.enum["morning.png"];
  } else if (currentTime >= noonStart && currentTime < afternoonStart) {
    return WallpaperSchema.enum["noon.png"];
  } else if (currentTime >= afternoonStart && currentTime < afternoonEnd) {
    return WallpaperSchema.enum["evening.png"];
  } else if (currentTime >= afternoonEnd && currentTime < sunset) {
    return WallpaperSchema.enum["sunset.png"];
  }

  return WallpaperSchema.enum["night.png"];
}
