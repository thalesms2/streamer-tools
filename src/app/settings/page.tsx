import { verifySession } from "@/lib/dal";

export default async function SettingsPage() {
  // const session = await verifySession();
  // const userRole = session?.user?.role; // Assuming 'role' is part of the session object

  // if (userRole === "admin") {
  //   return <AdminDashboard />;
  // } else if (userRole === "user") {
  //   return <UserDashboard />;
  // } else {
  //   redirect("/login");
  // }
  return <div>Hello Settings</div>
}
