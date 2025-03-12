import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SensorMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Overview</CardTitle>
        <CardDescription>Sensor locations and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[350px] w-full rounded-md border bg-muted/20 p-4">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex flex-col items-center gap-4">
              {/* Building A - Top */}
              <div className="h-20 w-64 rounded-md bg-yellow-200 p-2 text-center font-medium">
                Building A
                <div className="mt-1 flex justify-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
              </div>

              <div className="flex gap-4">
                {/* Building B - Left */}
                <div className="h-32 w-32 rounded-md bg-pink-200 p-2 text-center font-medium">
                  Building B
                  <div className="mt-1 flex flex-col items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Swimming Pool - Center */}
                <div className="h-32 w-32 rounded-md bg-blue-200 p-2 text-center font-medium">
                  Swimming Pool
                  <div className="mt-1 flex justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  </div>
                </div>

                {/* Building C - Right */}
                <div className="h-32 w-32 rounded-md bg-green-200 p-2 text-center font-medium">
                  Building C
                  <div className="mt-1 flex flex-col items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>Alert</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

