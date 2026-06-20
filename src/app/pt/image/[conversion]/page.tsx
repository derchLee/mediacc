import { notFound } from "next/navigation";
import { ConversionLandingPage } from "@/components/ConversionLandingPage";
import {
  getConversion,
  getConversionMetadata,
  getConversionStaticParams,
} from "@/lib/seo/conversions";

export function generateStaticParams() {
  return getConversionStaticParams("image");
}

export async function generateMetadata({ params }: { params: Promise<{ conversion: string }> }) {
  const { conversion } = await params;
  return getConversionMetadata("pt", "image", conversion);
}

export default async function PtImageConversionPage({ params }: { params: Promise<{ conversion: string }> }) {
  const { conversion: slug } = await params;
  const conversion = getConversion("image", slug);
  if (!conversion) notFound();

  return <ConversionLandingPage locale="pt" conversion={conversion} />;
}
