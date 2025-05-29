import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Create a new sensor station
export async function POST(request: Request) {
  try {
    // const { userId } = await auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const body = await request.json();
    const { name, location } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const station = await prisma.sensorStation.create({
      data: {
        name,
        location,
        // userId,
        userId: 1,
      },
    });

    return NextResponse.json(station);
  } catch (error) {
    console.error("Error creating sensor station:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Get all sensor stations for the user
export async function GET() {
  try {
    // const { userId } = await auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const stations = await prisma.sensorStation.findMany({
      where: {
        // userId,
        userId: 1,
      },
      include: {
        sensors: true, // Include associated sensors
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(stations);
  } catch (error) {
    console.error("Error fetching sensor stations:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
