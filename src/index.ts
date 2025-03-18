import { z } from "zod";
import { fetchSunTimes } from "./services/sunTimeService";
import { parseDateTime } from "./utils/dateUtils";
import { selectWallpaper } from "./utils/wallpaperSelector";
import { CoordinateSchema } from "./types";
import 'dotenv/config';

async function main(): Promise<void> {
  if (process.argv.length < 4) {
    console.error(
      "Usage: ts-node src/index.ts <latitude> <longitude> [YYYY-MM-DD] [HH:MM]"
    );
    process.exit(1);
  }

  try {
    const latitude = CoordinateSchema.parse(Number(process.argv[2]));
    const longitude = CoordinateSchema.parse(Number(process.argv[3]));

    const specificDate = parseDateTime(
      process.argv[4] || "",
      process.argv[5] || ""
    );

    const { sunrise, sunset } = await fetchSunTimes(
      latitude,
      longitude,
      specificDate
    );

    console.log(`Times:\nCurrent: ${specificDate.toLocaleTimeString()}\nSunrise: ${sunrise.toLocaleTimeString()}\nSunset: ${sunset.toLocaleTimeString()}`);

    const wallpaper = selectWallpaper(specificDate, sunrise, sunset);
    console.log(wallpaper);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof z.ZodError
        ? error.errors.map((e) => `${e.path}: ${e.message}`).join(", ")
        : error instanceof Error
        ? error.message
        : "Unknown error occurred"
    );
    process.exit(1);
  }
}

main();
