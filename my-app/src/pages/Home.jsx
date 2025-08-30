import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/Progress";
import UploadSection from "@/components/UploadForm";
import { Wallet, Calendar, CheckCircle, AlertTriangle, FileUp, Bell } from "lucide-react";
import CircularProgress from "@/components/ui/circularprogress";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Infrastructure Dashboard</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white">+ New Project</Button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Total Budget</p>
            <h2 className="text-2xl font-bold">$12.8M</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Spent Amount</p>
            <h2 className="text-2xl font-bold">$8.2M</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Timeline</p>
            <h2 className="text-lg font-semibold">Jun 2023 - Dec 2024</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Number of projects in Progress</p>
            <h2 className="text-2xl font-bold">8</h2>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Work & Side Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Section */}
        <Card className="col-span-2">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Budget vs Work Completion</h2>
            <div className="flex justify-center mt-6">
              <CircularProgress percentage={64} />
            </div>
          </CardContent>
        </Card>

        {/* Side Info */}
        <div className="space-y-4">
          <UploadSection />

          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Next Inspection</p>
              <h2 className="text-lg font-bold">May 15, 2023</h2>
              <p className="text-sm text-blue-600">2 days left</p>
              <Button className="mt-2 w-full">Reschedule</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ongoing Projects */}
      <h2 className="text-xl font-semibold mt-8">Ongoing Projects (8)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Card */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">Main Street Bridge</h3>
            <p className="text-sm text-gray-500">Bridge Construction</p>
            <p className="mt-2 text-gray-600">Central District</p>
            <p className="text-gray-500">$2.4M / $3M</p>
            <Progress value={72} className="mt-3" />
            <p className="text-sm mt-1">Progress: 72%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">Riverside Park</h3>
            <p className="text-sm text-gray-500">Public Space</p>
            <p className="mt-2 text-gray-600">North District</p>
            <p className="text-gray-500">$1.2M / $1.8M</p>
            <Progress value={45} className="mt-3" />
            <p className="text-sm mt-1">Progress: 45%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">Downtown Sewer Upgrade</h3>
            <p className="text-sm text-gray-500">Utility</p>
            <p className="mt-2 text-gray-600">Central District</p>
            <p className="text-gray-500">$3.1M / $4.5M</p>
            <Progress value={38} className="mt-3" />
            <p className="text-sm mt-1">Progress: 38%</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Heatmap */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Risk Heatmap</h2>
            <div className="space-x-2">
              <Button variant="outline">Layers</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
          <div className="h-56 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">[Heatmap Placeholder]</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}