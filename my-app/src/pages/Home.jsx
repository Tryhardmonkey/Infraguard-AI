import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/Progress";
import CircularProgress from "@/components/ui/circularprogress";
import UploadSection from "@/components/UploadForm";
import NewProject from "@/components/NewProject";
import RescheduleModal from "@/components/RescheduleModal";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const userId = 1;

  // Fetch projects for current user
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/projects/${userId}`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("❌ Error fetching projects:", err));
  }, [userId]);

  const totalBudget = projects.reduce((sum, p) => sum + Number(p.budget || 0), 0);
  const totalSpent = projects.reduce((sum, p) => sum + Number(p.spent || 0), 0);

  // Filter ongoing projects
  const ongoingProjects = projects.filter((p) => p.status === "Pending");

  // Nearest upcoming inspection
  const nearestProject = (() => {
    const today = new Date();
    const upcoming = ongoingProjects
      .filter((p) => p.next_inspection)
      .map((p) => ({ ...p, nextDate: new Date(p.next_inspection) }))
      .filter((p) => p.nextDate >= today)
      .sort((a, b) => a.nextDate - b.nextDate);
    return upcoming.length ? upcoming[0] : null;
  })();

  return (
    <div className="p-6 space-y-6">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Infrastructure Dashboard</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setShowForm(true)}
        >
          + New Project
        </Button>
      </div>

      {/* New Project Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-50">
            <NewProject
              onSuccess={(newProject) => {
                setProjects((prev) => [...prev, newProject]);
                setShowForm(false);
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

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Total Budget" value={`$${totalBudget.toLocaleString()}`} />
      <StatCard title="Spent Amount" value={`$${totalSpent.toLocaleString()}`} />
      <StatCard title="Timeline" value="Jun 2023 - Dec 2024" />
        <StatCard title="Projects in Progress" value={ongoingProjects.length} />
      </div>

      {/* Budget vs Work & Side Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Budget vs Work Completion</h2>
            <div className="flex justify-center mt-6">
              <CircularProgress percentage={64} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <UploadSection />

          <InspectionCard
            project={nearestProject}
            onReschedule={() => setShowReschedule(true)}
          />
        </div>
      </div>

      {/* Ongoing Projects */}
      <ProjectList projects={ongoingProjects} />

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

      {/* Reschedule Modal */}
      {showReschedule && (
        <RescheduleModal
          projects={ongoingProjects}
          onClose={() => setShowReschedule(false)}
          onSuccess={(updatedProject) =>
            setProjects((prev) =>
              prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
            )
          }
        />
      )}
    </div>
  );
}

// ===================== Sub Components =====================
function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}

function InspectionCard({ project, onReschedule }) {
  if (!project)
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-500">Next Inspection</p>
          <p className="text-gray-500">No upcoming inspections</p>
        </CardContent>
      </Card>
    );

  const daysLeft = Math.ceil(
    (new Date(project.next_inspection) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-gray-500">Next Inspection</p>
        <h2 className="text-lg font-bold">
          {new Date(project.next_inspection).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </h2>
        <p className="text-sm text-blue-600">{daysLeft} days left</p>
        <p className="mt-2 text-gray-600">{project.projectname}</p>
        <Button className="mt-2 w-full" onClick={onReschedule}>
          Reschedule
        </Button>
      </CardContent>
    </Card>
  );
}

function ProjectList({ projects }) {
  if (!projects.length) return <p>No ongoing projects</p>;

  return (
    <>
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
                <p className="text-gray-500">
                  ${project.spent} / ${project.budget}
                </p>
                <Progress value={progress} className="mt-3" />
                <p className="text-sm mt-1">Progress: {progress}%</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}