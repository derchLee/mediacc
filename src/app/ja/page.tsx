/**
 * JA root – redirect to /ja/image
 */
import { redirect } from "next/navigation";

export default function JaHome() {
  redirect("/ja/image");
}
