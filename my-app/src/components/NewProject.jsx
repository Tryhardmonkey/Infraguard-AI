import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function NewProject({ onSuccess }) {
  const [form, setForm] = useState({
    projectname: "",
    contractor: "",
    location: "",
    budget: "",
    spent: "",
    status: "Pending", // default
  });

  // Simulated logged-in user (replace with localStorage/context later)
  const userId = localStorage.getItem("user_id") || 1;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/api/projects", {
        ...form,
        user_id: userId, // ✅ inject automatically
        });

        alert("✅ Project created!");
        if (onSuccess) onSuccess(res.data); // let parent update
    } catch (err) {
        console.error("❌ Error adding project:", err);
        alert("Error creating project");
    }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="projectname"
        placeholder="Project Name"
        className="w-full border p-2 rounded"
        value={form.projectname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contractor"
        placeholder="Contractor"
        className="w-full border p-2 rounded"
        value={form.contractor}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={form.location}
        onChange={handleChange}
      />
      <input
        type="number"
        name="budget"
        placeholder="Budget"
        className="w-full border p-2 rounded"
        value={form.budget}
        onChange={handleChange}
      />
      <input
        type="number"
        name="spent"
        placeholder="Spent"
        className="w-full border p-2 rounded"
        value={form.spent}
        onChange={handleChange}
      />

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
        Create Project
      </Button>
    </form>
  );
}
