/**
 * 根页面 - 重定向到图片处理页面
 */
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/image");
}
