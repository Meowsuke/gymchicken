import { redirect } from "next/navigation";
import { auth } from "@/auth";
import WorkoutClient from "@/components/workout/WorkoutClient";

const WorkoutPage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  return <WorkoutClient userId={session.user.id!} />;
};

export default WorkoutPage;
