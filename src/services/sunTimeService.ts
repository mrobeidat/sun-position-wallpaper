import https from "https";
import { SunTimesResponseSchema, SunTimes } from "../types";
import "dotenv/config";

export function fetchSunTimes(
  latitude: number,
  longitude: number,
  date: Date,
  timezone = "Asia/Amman"
): Promise<SunTimes> {
  return new Promise((resolve, reject) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const url = new URL(
      process.env.SUN_API_URL || "https://api.sunrise-sunset.org/json"
    );
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
      date: formattedDate,
      formatted: "0",
      tzid: timezone,
    });
    url.search = params.toString();

    https
      .get(url.toString(), (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            const validatedData = SunTimesResponseSchema.parse(parsedData);

            if (validatedData.status !== "OK") {
              reject(new Error("Failed to fetch sun times"));
            }

            const sunrise = new Date(validatedData.results.sunrise);
            const sunset = new Date(validatedData.results.sunset);

            resolve({ sunrise, sunset });
          } catch (error) {
            reject(new Error(String(error)));
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
