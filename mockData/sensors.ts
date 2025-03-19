// Define sensor type for TypeScript
export type SensorType =
  | "Flow Meter"
  | "Leak Detector"
  | "pH Sensor"
  | "Pressure Sensor";
export type SignalStrength = "Strong" | "Medium" | "Weak";
export type SensorStatus = "Normal" | "Warning" | "Alert";
export type BuildingName =
  | "Building A"
  | "Building B"
  | "Building C"
  | "Swimming Pool";

// Define the Sensor interface
export interface Sensor {
  id: string;
  location: string;
  type: SensorType;
  building: BuildingName;
  battery: number;
  signal: SignalStrength;
  status: SensorStatus;
  lastReading: string;
  lastUpdated: Date;
  iconType: string;
}

// Helper function to generate random sensor data
export const generateSensors = (count = 20): Sensor[] => {
  const buildings: BuildingName[] = [
    "Building A",
    "Building B",
    "Building C",
    "Swimming Pool",
  ];
  const floors = ["Basement", "Floor 1", "Floor 2", "Floor 3", "Roof"];
  const rooms = [
    "Main Line",
    "Kitchen",
    "Bathroom",
    "Conference Room",
    "Room 101",
    "Room 206A",
    "Plumbing Shaft",
    "Main Entrance",
    "Filter System",
  ];
  const sensorTypes: SensorType[] = [
    "Flow Meter",
    "Leak Detector",
    "pH Sensor",
    "Pressure Sensor",
  ];
  const signalStrengths: SignalStrength[] = ["Strong", "Medium", "Weak"];

  const readingTimes = [
    "Just now",
    "1 min ago",
    "2 min ago",
    "5 min ago",
    "7 min ago",
    "10 min ago",
    "12 min ago",
    "15 min ago",
    "20 min ago",
  ];

  const sensors: Sensor[] = [];

  for (let i = 1; i <= count; i++) {
    // Generate building and location
    const building = buildings[Math.floor(Math.random() * buildings.length)];
    let location = building as string;

    // For buildings, add floor or room detail
    if (building !== "Swimming Pool") {
      const detail =
        Math.random() > 0.5
          ? floors[Math.floor(Math.random() * floors.length)]
          : rooms[Math.floor(Math.random() * rooms.length)];
      location = `${building} - ${detail}`;
    } else {
      // For pool, sometimes add more specific location
      if (Math.random() > 0.5) {
        location = `${building} - ${rooms[Math.floor(Math.random() * 3) + 6]}`; // Use the last few room options for pool
      }
    }

    // Generate other random properties
    const type = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
    const battery = Math.floor(Math.random() * 100) + 1; // 1-100
    const signal =
      signalStrengths[Math.floor(Math.random() * signalStrengths.length)];

    // Weight status to have more normal than warnings/alerts
    const statusRoll = Math.random();
    const status =
      statusRoll < 0.7 ? "Normal" : statusRoll < 0.85 ? "Warning" : "Alert";

    const lastReading =
      readingTimes[Math.floor(Math.random() * readingTimes.length)];

    // Create a random last updated timestamp within the last 24 hours
    const lastUpdated = new Date();
    lastUpdated.setHours(
      lastUpdated.getHours() - Math.floor(Math.random() * 24)
    );

    // Format the sensor ID with leading zeros
    const id = `S${String(i).padStart(3, "0")}`;

    // Map sensor type to icon type for the map component
    let iconType = "Gauge";
    if (type === "Leak Detector") iconType = "Droplet";
    else if (type === "pH Sensor") iconType = "Activity";
    else if (type === "Pressure Sensor") iconType = "Gauge";
    else iconType = "Gauge"; // Flow Meter

    sensors.push({
      id,
      location,
      type,
      building,
      battery,
      signal,
      status,
      lastReading,
      lastUpdated,
      iconType,
    });
  }

  return sensors;
};

// Generate and export 20 random sensors
export const sensors = generateSensors(9);
