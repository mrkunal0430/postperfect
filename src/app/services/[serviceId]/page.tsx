import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ServicePage from "@/views/ServicePage";
import { SERVICES } from "@/utils/constants";

type Props = { params: Promise<{ serviceId: string }> };

const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export function generateStaticParams() {
  return SERVICES.map((s) => ({ serviceId: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = findService((await params).serviceId);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDesc,
    openGraph: { title: service.name, description: service.tagline },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceId } = await params;
  if (!findService(serviceId)) redirect("/services");
  return <ServicePage serviceId={serviceId} />;
}
