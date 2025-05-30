import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Define supported sensor types and their units
const SENSOR_TYPES = {
  temperature: "°C",
  humidity: "%",
  pressure: "hPa",
  waterLevel: "cm",
  flow: "L/min",
  ph: "pH",
  tds: "ppm",
} as const;

type SensorType = keyof typeof SENSOR_TYPES;

export async function GET(request: Request) {
  try {
    // const { userId } = await auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const sensorId = searchParams.get("sensorId");
    const type = searchParams.get("type") as SensorType;
    const value = searchParams.get("value");

    // Required parameters
    if (!sensorId || !type || !value) {
      return new NextResponse("Sensor ID, type, and value are required", {
        status: 400,
      });
    }

    // Validate sensor type
    if (!(type in SENSOR_TYPES)) {
      return new NextResponse(
        `Invalid sensor type. Supported types: ${Object.keys(SENSOR_TYPES).join(
          ", "
        )}`,
        { status: 400 }
      );
    }

    // Validate value is a number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return new NextResponse("Value must be a number", { status: 400 });
    }

    // Verify sensor belongs to user
    const sensor = await prisma.sensor.findUnique({
      where: {
        id: sensorId,
        // userId: userId,
        userId: 1,
      },
    });

    if (!sensor) {
      return new NextResponse("Sensor not found", { status: 404 });
    }

    // Create sensor reading
    const reading = await prisma.sensorData.create({
      data: {
        sensorId: sensorId,
        type: type,
        value: numValue,
        unit: SENSOR_TYPES[type],
      },
    });

    return NextResponse.json(reading);
  } catch (error) {
    console.error("Error updating sensor data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Create a new sensor
export async function POST(request: Request) {
  try {
    // const { userId } = await auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const { name, location, sensorStationId } = body;

    if (!sensorStationId) {
      return new NextResponse("Sensor Station ID is required", { status: 400 });
    }

    // Verify station belongs to user
    const station = await prisma.sensorStation.findUnique({
      where: {
        id: sensorStationId,
        // userId: userId,
        userId: 1,
      },
    });

    if (!station) {
      return new NextResponse("Sensor Station not found", { status: 404 });
    }

    const sensor = await prisma.sensor.create({
      data: {
        name,
        location,
        // userId,
        userId: 1,
        sensorStationId,
      },
    });

    return NextResponse.json(sensor);
  } catch (error) {
    console.error("Error creating sensor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
