import { permanentRedirect } from "next/navigation";

export default function LegacyProjectDetailPage() {
  permanentRedirect("/servicos");
}
