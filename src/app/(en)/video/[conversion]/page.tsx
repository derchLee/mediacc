import { notFound } from "next/navigation";
import { ConversionLandingPage } from "@/components/ConversionLandingPage";
import {
  getConversion,
  getConversionMetadata,
  getConversionStaticParams,
} from "@/lib/seo/conversions";

export function generateStaticParams() {
  return getConversionStaticParams("video");
}

export async function generateMetadata({ params }: { params: Promise<{ conversion: string }> }) {
  const { conversion } = await params;
  return getConversionMetadata("en", "video", conversion);
}

export default async function VideoConversionPage({ params }: { params: Promise<{ conversion: string }> }) {
  const { conversion: slug } = await params;
  const conversion = getConversion("video", slug);
  if (!conversion) notFound();

  return <ConversionLandingPage locale="en" conversion={conversion} />;
}
