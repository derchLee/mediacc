import DocumentLayout, { metadata as sharedMetadata } from "@/app/document-layout";

export const metadata = { ...sharedMetadata, other: { language: "es" } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="es">{children}</DocumentLayout>;
}
