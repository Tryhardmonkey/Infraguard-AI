import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UploadForm({ userId = 1 }) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/projects/${userId}`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!project || !fileType || !file) {
    alert("Please fill all fields before submitting.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("projectId", project);
    formData.append("fileType", fileType);
    formData.append("file", file); // ✅ attach file

    await axios.post("http://localhost:5000/api/reports", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("File uploaded and data saved successfully!");
    setProject("");
    setFileType("");
    setFile(null);
  } catch (err) {
    console.error(err);
    alert("Upload failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="mt-4 shadow-md">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-bold">Upload File</h2>

        {/* Select Project */}
        <div>
          <label className="text-sm font-medium">Select Project</label>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Choose a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.projectname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select File Type */}
        <div>
          <label className="text-sm font-medium">File Type</label>
          <Select value={fileType} onValueChange={setFileType}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Choose file type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cad">CAD</SelectItem>
              <SelectItem value="receipt">Receipt</SelectItem>
              <SelectItem value="report">Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div>
          <label className="text-sm font-medium">Upload File</label>
          <Input
            type="file"
            className="mt-1"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <Button
          className="w-full bg-green-600 text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </CardContent>
    </Card>
  );
}
