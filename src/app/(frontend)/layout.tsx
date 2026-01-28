import { PageTransition } from "@/components/effects";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageTransition>{children}</PageTransition>;
}
