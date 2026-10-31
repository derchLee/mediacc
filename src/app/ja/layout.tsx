import DocumentLayout, { metadata as sharedMetadata } from "@/app/document-layout";

export const metadata = { ...sharedMetadata, other: { language: "ja" } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="ja">{children}</DocumentLayout>;
}
