import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/Progress";
import UploadSection from "@/components/UploadForm";
import { Wallet, Calendar, CheckCircle, AlertTriangle, FileUp, Bell } from "lucide-react";
import CircularProgress from "@/components/ui/circularprogress";
import { useEffect, useState } from "react";
import axios from "axios";
import NewProject from "@/components/NewProject";
import RescheduleModal from "@/components/RescheduleModal";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects/ongoing")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("❌ Error fetching ongoing projects:", err));
  }, []);

  // Function to get the nearest upcoming inspection
  const getNearestInspection = (projects) => {
  const today = new Date();
  const upcoming = projects
    .filter(p => p.next_inspection) // ignore null/undefined dates
    .map(p => ({ ...p, nextDate: new Date(p.next_inspection) }))
    .filter(p => p.nextDate >= today) // only future dates
    .sort((a, b) => a.nextDate - b.nextDate); // sort ascending

  return upcoming.length ? upcoming[0] : null; // return nearest project or null
  };

  const nearestProject = getNearestInspection(projects);

  return (
    <div className="p-6 space-y-6">
      <div>
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Infrastructure Dashboard</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setShowForm(true)}  // ✅ Open form
        >
          + New Project
        </Button>
      </div>

      {/* Modal (only appears when showForm = true) */}
      {showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-50">
          <NewProject
            onSuccess={(newProject) => {
              setProjects((prev) => [...prev, newProject]); // instantly update list
              setShowForm(false); // close modal
            }}
          />

          <Button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setShowForm(false)}
          >
            Close
          </Button>
        </div>
      </div>
)}

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
            <h2 className="text-2xl font-bold">{projects.length}</h2>
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
          {nearestProject ? (
            <>
              <h2 className="text-lg font-bold">
                {new Date(nearestProject.next_inspection).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </h2>
              <p className="text-sm text-blue-600">
                {Math.ceil(
                  (new Date(nearestProject.next_inspection) - new Date()) / (1000 * 60 * 60 * 24)
                )}{" "}
                days left
              </p>
              <p className="mt-2 text-gray-600">{nearestProject.projectname}</p> 
            </>
          ) : (
            <p className="text-gray-500">No upcoming inspections</p>
          )}

          <Button className="mt-2 w-full" onClick={() => setShowReschedule(true)}>
            Reschedule
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>

      {/* Ongoing Projects */}
      <h2 className="text-xl font-semibold mt-8">
        Ongoing Projects ({projects.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => {
          const progress = Math.round((project.spent / project.budget) * 100);
          return (
            <Card key={project.id}>
              <CardContent className="p-4">
                <h3 className="font-bold">{project.projectname}</h3>
                <p className="text-sm text-gray-500">{project.type}</p>
                <p className="mt-2 text-gray-600">{project.location}</p>
                <p className="text-gray-500">${project.spent} / ${project.budget}</p>
                <Progress value={progress} className="mt-3" />
                <p className="text-sm mt-1">Progress: {progress}%</p>
              </CardContent>
            </Card>
          );
        })}
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