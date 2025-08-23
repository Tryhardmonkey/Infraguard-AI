import { Card, CardContent } from "@/components/ui/card"

function Profile() {
  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <img
              src="../../public/Builder.webp"
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-2 border-green-600"
            />
            <div>
              <h2 className="text-xl font-semibold">Monil Chourasiya</h2>
              <p className="text-sm">
                Role: <span className="text-green-600 font-medium">Infrastructure Auditor</span>
              </p>
              <p className="text-sm text-gray-600">Department: Central Civic Infra Cell</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-xl font-semibold">18</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold text-green-600">12</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <p className="text-sm text-gray-500">Ongoing</p>
              <p className="text-xl font-semibold text-yellow-600">5</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-xl font-semibold">Mar 2022</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h3 className="text-md font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Experienced infrastructure monitoring officer focused on ensuring quality standards,
              cost efficiency, and safety across urban development projects. Passionate about fraud
              detection, digital reporting, and public safety compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile

