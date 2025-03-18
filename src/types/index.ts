import { z } from 'zod';

export const WALLPAPERS = [
  'morning.png',
  'sunrise.png',
  'noon.png',
  'evening.png',
  'sunset.png',
  'night.png'
] as const;

export const CoordinateSchema = z.number();

export const DateTimeSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format"
  }).optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Time must be in HH:MM format"
  }).optional()
});

export const SunTimesResponseSchema = z.object({
  results: z.object({
    sunrise: z.string(),
    sunset: z.string(),
    solar_noon: z.string(),
    day_length: z.union([z.string(), z.number()])
  }),
  status: z.enum(['OK', 'INVALID_REQUEST', 'INVALID_DATE', 'UNKNOWN_ERROR', 'INVALID_TZID'])
});

export const WallpaperSchema = z.enum(WALLPAPERS);

export type Coordinate = z.infer<typeof CoordinateSchema>;
export type DateTime = z.infer<typeof DateTimeSchema>;
export type SunTimesResponse = z.infer<typeof SunTimesResponseSchema>;
export type Wallpaper = z.infer<typeof WallpaperSchema>;

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
}
