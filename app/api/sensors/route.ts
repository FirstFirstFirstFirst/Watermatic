import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a new sensor
export async function POST(request: Request) {
  try {
    // const { userId } = await auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const { name, location, sensorStationId } = body;

    if (!name || !sensorStationId) {
      return new NextResponse("Name and Sensor Station ID are required", {
        status: 400,
      });
    }

    // Verify station belongs to user
    const station = await prisma.sensorStation.findUnique({
      where: {
        id: sensorStationId,
        // userId,
        userId: "1",
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
        userId: "1",
        sensorStationId,
      },
    });

    return NextResponse.json(sensor);
  } catch (error) {
    console.error("Error creating sensor:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Get all sensors for a station
export async function GET(request: Request) {
  try {
    // const { userId } = await auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get("stationId");

    if (!stationId) {
      return new NextResponse("Station ID is required", { status: 400 });
    }

    const sensors = await prisma.sensor.findMany({
      where: {
        // userId,
        userId: "1",
        sensorStationId: stationId,
      },
      include: {
        sensorData: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1, // Get only the latest reading
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sensors);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
