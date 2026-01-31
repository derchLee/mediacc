/**
 * ES root – redirect to /es/image
 */
import { redirect } from "next/navigation";

export default function EsHome() {
  redirect("/es/image");
}
