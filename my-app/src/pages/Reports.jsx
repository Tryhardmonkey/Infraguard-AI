import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"


export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Project Reports</h1>
          <Button className="bg-green-800 hover:bg-green-700">
            <Upload className="mr-2 h-4 w-4" /> Upload New Report
          </Button>
        </div>

        <Card className="p-0">
          <CardContent className="p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 font-medium">PROJECT</th>
                  <th className="px-6 py-3 font-medium">DATE</th>
                  <th className="px-6 py-3 font-medium">STATUS</th>
                  <th className="px-6 py-3 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-6 py-3">{report.projectname}</td>
                    <td className="px-6 py-3">{new Date(report.date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${report.statusColor}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Button variant="ghost" size="sm" className="text-green-700">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}