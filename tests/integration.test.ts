import { spawn } from "child_process";

interface TestCase {
  name: string;
  lat: string;
  lon: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  expected: string[];
}

const testCases: TestCase[] = [
  {
    name: "Example 1 (Morning)",
    lat: "31.9544",
    lon: "35.9106",
    year: "2024",
    month: "06",
    day: "01",
    hour: "07:00",
    expected: ["morning.png"],
  },
  {
    name: "Example 2 (Sunrise)",
    lat: "-37.8136",
    lon: "144.9631",
    year: "2024",
    month: "06",
    day: "01",
    hour: "07:00",
    expected: ["sunrise.png"],
  },
  {
    name: "Example 3 (Night)",
    lat: "-51.6302",
    lon: "-69.2247",
    year: "2024",
    month: "06",
    day: "01",
    hour: "07:00",
    expected: ["night.png"],
  },
];

function extractWallpaperName(output: string): string {
  const lines = output.trim().split("\n");
  return lines[lines.length - 1].trim();
}

describe("Integration Tests", () => {
  testCases.forEach((test) => {
    it(test.name, async () => {
      const date = `${test.year}-${test.month}-${test.day}`;
      const args = [test.lat, test.lon, date, test.hour];

      const result = await new Promise<{ output: string; error: string }>(
        (resolve) => {
          const child = spawn("ts-node", ["src/index.ts", ...args]);
          let output = "";
          let errorOutput = "";

          child.stdout.on("data", (data: Buffer) => {
            output += data.toString();
          });

          child.stderr.on("data", (data: Buffer) => {
            errorOutput += data.toString();
          });

          child.on("close", () => {
            resolve({ output: output.trim(), error: errorOutput });
          });
        }
      );

      const wallpaperName = extractWallpaperName(result.output);
      expect(test.expected).toContain(wallpaperName);
    });
  });
});
