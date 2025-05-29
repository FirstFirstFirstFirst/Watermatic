import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Mock Clerk auth
//TODO: implement sign in and sign up page then update this mock
//TODO: look at https://clerk.com/blog/testing-clerk-nextjs and then update this mock
//TODO: separate files for each test
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
  currentUser: jest.fn(),
  clerkClient: jest.fn(),
}));

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    sensorStation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    sensor: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    sensorData: {
      create: jest.fn(),
    },
  },
}));

describe("API Routes", () => {
  const mockUserId = "user_123";
  const mockStationId = "station_123";
  const mockSensorId = "sensor_123";

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as unknown as jest.Mock).mockReturnValue({ userId: mockUserId });
  });

  describe("Sensor Stations API", () => {
    it("should create a new sensor station", async () => {
      const mockStation = {
        id: mockStationId,
        name: "Test Station",
        location: "Test Location",
        userId: mockUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.sensorStation.create.mockResolvedValue(mockStation);

      const response = await fetch("/api/sensor-stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Station",
          location: "Test Location",
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(mockStation);
    });

    it("should get all sensor stations for user", async () => {
      const mockStations = [
        {
          id: "station_1",
          name: "Station 1",
          location: "Location 1",
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "station_2",
          name: "Station 2",
          location: "Location 2",
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prisma.sensorStation.findMany.mockResolvedValue(mockStations);

      const response = await fetch("/api/sensor-stations");
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(mockStations);
    });
  });

  describe("Sensors API", () => {
    it("should create a new sensor", async () => {
      const mockSensor = {
        id: mockSensorId,
        name: "Test Sensor",
        location: "Test Location",
        sensorStationId: mockStationId,
        userId: mockUserId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.sensorStation.findUnique.mockResolvedValue({
        id: mockStationId,
      });
      prisma.sensor.create.mockResolvedValue(mockSensor);

      const response = await fetch("/api/sensors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Sensor",
          location: "Test Location",
          sensorStationId: mockStationId,
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(mockSensor);
    });

    it("should get sensors for a station", async () => {
      const mockSensors = [
        {
          id: "sensor_1",
          name: "Sensor 1",
          location: "Location 1",
          sensorStationId: mockStationId,
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "sensor_2",
          name: "Sensor 2",
          location: "Location 2",
          sensorStationId: mockStationId,
          userId: mockUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prisma.sensor.findMany.mockResolvedValue(mockSensors);

      const response = await fetch(`/api/sensors?stationId=${mockStationId}`);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(mockSensors);
    });
  });

  describe("Sensor Data API", () => {
    it("should create new sensor data", async () => {
      const mockReading = {
        id: "reading_123",
        sensorId: mockSensorId,
        type: "temperature",
        value: 25.5,
        unit: "°C",
      };

      prisma.sensor.findUnique.mockResolvedValue({
        id: mockSensorId,
      });
      prisma.sensorData.create.mockResolvedValue(mockReading);

      const response = await fetch(
        `/api/sensor-data?sensorId=${mockSensorId}&type=temperature&value=25.5`
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(mockReading);
    });

    it("should validate sensor type", async () => {
      const response = await fetch(
        `/api/sensor-data?sensorId=${mockSensorId}&type=invalid&value=25.5`
      );

      expect(response.status).toBe(400);
    });
  });
});
