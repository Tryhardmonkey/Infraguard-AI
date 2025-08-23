import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Account() {
  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" type="text" placeholder="Your role" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="********" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Account