"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg border-0">
        <CardContent className="p-0">
          <div className="bg-blue-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <h1 className="text-2xl font-bold">Under Development</h1>
            <p className="text-blue-100 mt-2">
              This page is currently being built
            </p>
          </div>

          <div className="p-6">
            <div className="flex space-x-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-2 bg-blue-200 rounded-full animate-pulse"
                  style={{
                    width: `${20 + i * 15}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              We&apos;re working on something great!
            </h2>
            <p className="text-gray-600 mb-6">
              This section of our application is still under construction.
              We&apos;re building something awesome and can&apos;t wait to show
              you soon.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default">
                <Link href="/">Go to Homepage</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="javascript:history.back()">Go Back</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
