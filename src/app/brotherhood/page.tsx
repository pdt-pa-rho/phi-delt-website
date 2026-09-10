import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BrotherhoodHubContent from "./BrotherhoodHubContent";

export default async function BrotherhoodHubPage() {
  const session = await getServerSession(authOptions);

  return (
    <BrotherhoodHubContent
      userName={session?.user?.name}
      isAlumn={Boolean(session?.user?.alumn)}
    />
  );
}
