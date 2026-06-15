import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Offerings",
  description:
    "Book the Volta Heritage Dance Ensemble for cultural performances, workshops, school outreach, heritage documentation, tourism experiences, and event consultancy.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
