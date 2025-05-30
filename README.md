# Water Management System API Documentation

This document describes the API endpoints available in the Water Management System.

## Demo Environment

The system comes pre-seeded with a demo hotel water management setup, including:

### Sensor Stations

1. Main Building (Ground Floor Utility Room)
2. Kitchen Area (Main Kitchen)
3. Pool Complex (Pool Technical Room)
4. Guest Floors (3rd Floor Utility Room)

### Pre-configured Sensors

- Main Building:
  - Main Water Meter (Building Main Inlet)
  - Main Pressure Sensor (Main Water Line)
- Kitchen Area:
  - Kitchen Water Meter (Kitchen Main Line)
  - Dishwasher Flow Meter (Industrial Dishwasher)
- Pool Complex:
  - Pool Water Meter (Pool System Inlet)
  - Pool Leak Detector (Pool Equipment Room)
- Guest Floors:
  - Guest Floor Water Meter (3rd Floor Main Line)

### Default User

- Email: manager@grandhotel.com

## Authentication

All API endpoints are protected and require authentication using Clerk. Make sure to include the necessary authentication headers in your requests.

## API Endpoints

### Sensor Stations

#### Create a Sensor Station

```http
POST /api/sensor-stations
Content-Type: application/json

{
  "name": "Garden Station",
  "location": "Backyard"
}
```

**Response**

```json
{
  "id": "station_id",
  "name": "Garden Station",
  "location": "Backyard",
  "createdAt": "2024-03-19T...",
  "updatedAt": "2024-03-19T...",
  "userId": "user_id"
}
```

#### Get All Sensor Stations

```http
GET /api/sensor-stations
```

**Response**

```json
[
  {
    "id": "station_id",
    "name": "Garden Station",
    "location": "Backyard",
    "sensors": [...],
    "createdAt": "2024-03-19T...",
    "updatedAt": "2024-03-19T..."
  }
]
```

### Sensors

#### Create a Sensor

```http
POST /api/sensors
Content-Type: application/json

{
  "name": "Temperature Sensor 1",
  "location": "North Side",
  "sensorStationId": "station_id"
}
```

**Response**

```json
{
  "id": "sensor_id",
  "name": "Temperature Sensor 1",
  "location": "North Side",
  "sensorStationId": "station_id",
  "createdAt": "2024-03-19T...",
  "updatedAt": "2024-03-19T..."
}
```

#### Get Sensors for a Station

```http
GET /api/sensors?stationId=station_id
```

**Response**

```json
[
  {
    "id": "sensor_id",
    "name": "Temperature Sensor 1",
    "location": "North Side",
    "sensorData": [
      {
        "type": "temperature",
        "value": 25.5,
        "unit": "°C",
        "createdAt": "2024-03-19T..."
      }
    ]
  }
]
```

### Sensor Data

#### Add Sensor Reading

```http
GET /api/sensor-data?sensorId=sensor_id&type=water_flow&value=25.5
```

**Supported Sensor Types**

- water_flow (m³/h)
- pressure (bar)
- moisture (%)

**Response**

```json
{
  "id": "reading_id",
  "sensorId": "sensor_id",
  "type": "water_flow",
  "value": 25.5,
  "unit": "m³/h",
  "createdAt": "2024-03-19T..."
}
```

## Usage Example

Here's a complete flow of using the API:

1. Create a sensor station:

```bash
curl -X POST http://localhost:3000/api/sensor-stations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Garden Station",
    "location": "Backyard"
  }'
```

2. Create a sensor in the station:

```bash
curl -X POST http://localhost:3000/api/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Temperature Sensor 1",
    "location": "North Side",
    "sensorStationId": "station_id_from_step_1"
  }'
```

3. Add sensor readings:

```bash
curl "http://localhost:3000/api/sensor-data?sensorId=sensor_id_from_step_2&type=water_flow&value=25.5"
```

4. View all stations with their sensors:

```bash
curl http://localhost:3000/api/sensor-stations
```

5. View all sensors in a station:

```bash
curl "http://localhost:3000/api/sensors?stationId=station_id"
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- 200: Success
- 400: Bad Request (missing or invalid parameters)
- 401: Unauthorized (not authenticated)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error

Error responses include a message explaining the error:

```json
{
  "error": "Error message here"
}
```

## Notes

- All timestamps are in ISO 8601 format
- All numeric values should be sent as strings in the query parameters
- The API uses GET for sensor data to make it easier to integrate with simple IoT devices
- Authentication is handled by Clerk
- Each user can only access their own resources
