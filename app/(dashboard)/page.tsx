import { validateRequest } from "@/lib/validateSessions";
import Image from "next/image";

export default async function Home() {
  const session = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }
  return (
    <div>
        <h1>Session Expiring in: {session.session?.expiresAt.toLocaleTimeString()} </h1>
        <h1>Session Fresh: {session.session?.fresh ? "yes" : "no"} </h1>
    </div>
  );
}
