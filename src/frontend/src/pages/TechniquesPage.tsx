import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Droplets,
  FlaskConical,
  Leaf,
  Search,
  Sprout,
  Sun,
  Wind,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useGetAllTechniques } from "../hooks/useQueries";

const techniqueIcons = [Leaf, Droplets, Sun, Sprout, Wind, FlaskConical];

const fallbackTechniques = [
  {
    id: BigInt(1),
    title: "Drip Irrigation",
    description:
      "A water-efficient irrigation method that delivers water directly to plant roots, reducing waste and improving crop yields significantly.",
    benefits:
      "Saves up to 60% water, reduces weed growth, prevents soil erosion, improves fertilizer efficiency",
  },
  {
    id: BigInt(2),
    title: "Precision Farming",
    description:
      "Uses GPS, sensors, and data analytics to optimize field-level management regarding crop farming, enabling targeted interventions.",
    benefits:
      "Reduces input costs by 20-30%, increases yield by 15-25%, minimizes environmental impact",
  },
  {
    id: BigInt(3),
    title: "Organic Composting",
    description:
      "Converting organic waste into nutrient-rich compost that improves soil structure, fertility, and microbial activity.",
    benefits:
      "Improves soil health, reduces chemical fertilizer dependency, lowers costs, enhances biodiversity",
  },
  {
    id: BigInt(4),
    title: "Hydroponic Systems",
    description:
      "Growing plants without soil using mineral nutrient solutions in water, enabling year-round production in controlled environments.",
    benefits:
      "Up to 10x higher yield per area, 90% less water usage, no soil-borne diseases, year-round production",
  },
  {
    id: BigInt(5),
    title: "Integrated Pest Management",
    description:
      "A sustainable approach combining biological, cultural, physical, and chemical tools to minimize pest damage with least hazard.",
    benefits:
      "Reduces pesticide use by 50%, preserves beneficial insects, lowers costs, safer produce",
  },
  {
    id: BigInt(6),
    title: "Vertical Farming",
    description:
      "Growing crops in vertically stacked layers, often incorporating controlled-environment agriculture technology.",
    benefits:
      "Maximizes space utilization, reduces land requirements by 95%, enables urban farming, consistent yields",
  },
  {
    id: BigInt(7),
    title: "Cover Cropping",
    description:
      "Planting specific crops to cover the soil rather than for harvest, improving soil health and preventing erosion.",
    benefits:
      "Prevents soil erosion, fixes nitrogen, suppresses weeds, improves water retention",
  },
  {
    id: BigInt(8),
    title: "Bamboo Cultivation",
    description:
      "Sustainable cultivation of bamboo for construction, food, and industrial uses, leveraging Bhutan's natural bamboo resources.",
    benefits:
      "Fast-growing, carbon sequestration, multiple uses, high market value, low maintenance",
  },
];

export default function TechniquesPage() {
  const { data: backendTechniques } = useGetAllTechniques();
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLanguage();

  const techniques =
    backendTechniques && backendTechniques.length > 0
      ? backendTechniques
      : fallbackTechniques;

  const filtered = techniques.filter((tech) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      tech.title.toLowerCase().includes(q) ||
      tech.description.toLowerCase().includes(q) ||
      tech.benefits.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-64 overflow-hidden">
        <img
          src="/assets/generated/farming-techniques-banner.dim_1200x400.png"
          alt="Farming Techniques"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-2">{t("techniques.title")}</h1>
            <p className="text-lg opacity-90">
              Modern methods for sustainable, high-yield agriculture
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold">{techniques.length}+</div>
            <div className="text-sm opacity-80">Techniques</div>
          </div>
          <div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm opacity-80">Production Areas</div>
          </div>
          <div>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm opacity-80">Avg Yield Increase</div>
          </div>
          <div>
            <div className="text-2xl font-bold">60%</div>
            <div className="text-sm opacity-80">Water Savings</div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("techniques.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-12 text-base rounded-full border-2 focus:border-primary"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {searchTerm && (
          <p className="text-center text-muted-foreground mb-6 text-sm">
            {filtered.length === 0
              ? `No techniques found for "${searchTerm}"`
              : `Showing ${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${searchTerm}"`}
          </p>
        )}

        {/* Techniques Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No techniques found</h3>
            <p className="text-muted-foreground">
              Try a different search term or clear the search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((technique, index) => {
              const Icon = techniqueIcons[index % techniqueIcons.length];
              return (
                <Card
                  key={technique.id.toString()}
                  className="hover:shadow-lg transition-shadow border-border"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {technique.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {technique.description}
                    </p>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                        Key Benefits
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {technique.benefits.split(",").map((benefit, i) => (
                          <Badge
                            key={`benefit-${i}`}
                            variant="secondary"
                            className="text-xs"
                          >
                            {benefit.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-muted py-12 px-4 mt-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Learn These Techniques?
          </h2>
          <p className="text-muted-foreground mb-6">
            Enroll in our training programs and get hands-on experience with
            modern farming methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:77421966"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Call +975 77421966
            </a>
            <a
              href="https://wa.me/97577421966"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-green-700 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
