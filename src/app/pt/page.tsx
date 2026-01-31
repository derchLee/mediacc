/**
 * PT root – redirect to /pt/image
 */
import { redirect } from "next/navigation";

export default function PtHome() {
  redirect("/pt/image");
}
