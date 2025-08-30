import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios"; // make sure axios is imported

export default function Reschedule({ projects }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

    const handleReschedule = async () => {
  if (!selectedProject || !selectedDate) {
    alert("⚠️ Please select a project and date!");
    return;
  }

  try {
    const res = await axios.put(
      `http://localhost:5000/api/projects/${selectedProject}/reschedule`,
      { next_inspection: selectedDate }
    );

    console.log("✅ Updated project:", res.data);

    // Call onSuccess to update parent state
    if (typeof onSuccess === "function") {
      onSuccess(res.data);
    }

    setShowCalendar(false); // close the popup
  } catch (err) {
    console.error("❌ Error rescheduling project:", err);
    alert("Failed to reschedule project. Check console.");
  }
};

  return (
    <div className="relative">
      {/* Reschedule Button */}
      <Button
        className="mt-2 w-full"
        onClick={() => setShowCalendar(true)}
      >
        Reschedule
      </Button>

      {/* Transparent overlay + popup */}
      {showCalendar && (
  <>
    {/* Transparent overlay just for click detection */}
    <div
      className="fixed inset-0 bg-transparent"
      onClick={() => setShowCalendar(false)}
    ></div>

    {/* Popup box */}
    <div
      className="absolute left-0 top-full mt-2 bg-white p-4 rounded-lg shadow-lg w-[280px] z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-semibold mb-3">Reschedule Inspection</h2>

      {/* Project Select */}
      <select
        className="w-full border p-2 rounded mb-3"
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">-- Select Project --</option>
        {projects?.map((p) => (
          <option key={p.id} value={p.id}>
            {p.projectname}
          </option>
        ))}
      </select>

      {/* Date Select */}
      <input
        type="date"
        className="w-full border p-2 rounded mb-3"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Save Button */}
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={handleReschedule}
      >
        Save
      </Button>
    </div>
    </>
    )}
    </div>
  );
}