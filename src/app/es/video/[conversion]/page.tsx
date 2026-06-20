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
  return getConversionMetadata("es", "video", conversion);
}

export default async function EsVideoConversionPage({ params }: { params: Promise<{ conversion: string }> }) {
  const { conversion: slug } = await params;
  const conversion = getConversion("video", slug);
  if (!conversion) notFound();

  return <ConversionLandingPage locale="es" conversion={conversion} />;
}
