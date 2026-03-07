import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Package,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { usePedagogyData } from "../../hooks/usePedagogyData";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { metrics, isLoading } = usePedagogyData();

  const slides = [
    {
      title: "Training + Production Hybrid Model",
      subtitle: "Transforming Agricultural Education in Bhutan",
      icon: Rocket,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <img
              src="/assets/generated/pedagogy-hero.dim_1200x600.png"
              alt="Agricultural Training"
              className="w-full rounded-lg border shadow-lg"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold mb-2">The Challenge</h3>
              <p className="text-sm text-muted-foreground">
                Youth unemployment and rural-urban migration threaten Bhutan's
                agricultural sector and food security goals.
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold mb-2">Our Solution</h3>
              <p className="text-sm text-muted-foreground">
                A pedagogy that combines structured training with real
                production, enabling students to earn while they learn.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Proof of Success",
      subtitle: "Real Metrics from Gelephu Farmers Academy",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary">
                {metrics.totalCourses}
              </div>
              <div className="text-sm font-medium mt-2">Active Courses</div>
              <div className="text-xs text-muted-foreground mt-1">
                Across 3 production areas
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary">
                {metrics.totalProjects}
              </div>
              <div className="text-sm font-medium mt-2">Ongoing Projects</div>
              <div className="text-xs text-muted-foreground mt-1">
                Hands-on learning
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary">
                {metrics.totalEnrollments}
              </div>
              <div className="text-sm font-medium mt-2">
                Student Enrollments
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Active participants
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-4xl font-bold text-primary">
                {metrics.averageProgress}%
              </div>
              <div className="text-sm font-medium mt-2">Completion Rate</div>
              <div className="text-xs text-muted-foreground mt-1">
                Student progress
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {metrics.productionMetrics.hydroponic.toFixed(1)} kg
              </div>
              <div className="text-sm font-medium mt-1">
                Hydroponic Production
              </div>
              <div className="text-xs text-muted-foreground">
                Monthly average output
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {metrics.productionMetrics.nursery.toFixed(0)} units
              </div>
              <div className="text-sm font-medium mt-1">Nursery Seedlings</div>
              <div className="text-xs text-muted-foreground">
                Monthly production
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {metrics.productionMetrics.bamboo.toFixed(1)} units
              </div>
              <div className="text-sm font-medium mt-1">Bamboo Cultivation</div>
              <div className="text-xs text-muted-foreground">
                Monthly output
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Economic Viability",
      subtitle: "Sustainable Revenue Model",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-lg mb-4">Revenue Streams</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-medium">Production Sales</div>
                    <div className="text-sm text-muted-foreground">
                      Fresh produce, seedlings, and bamboo products sold to
                      local markets
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-medium">Training Fees</div>
                    <div className="text-sm text-muted-foreground">
                      Subsidized fees from students with government support
                      programs
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-medium">Consulting Services</div>
                    <div className="text-sm text-muted-foreground">
                      Technical support and setup assistance for new farms
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Student Benefits</h3>
              <div className="space-y-3">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="font-medium mb-1">Earn While Learning</div>
                  <div className="text-sm text-muted-foreground">
                    Students receive stipends from production revenue share
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="font-medium mb-1">Job-Ready Skills</div>
                  <div className="text-sm text-muted-foreground">
                    Practical experience leads to immediate employment or
                    entrepreneurship
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="font-medium mb-1">Business Support</div>
                  <div className="text-sm text-muted-foreground">
                    Graduates receive ongoing mentorship and market access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Alignment with National Vision",
      subtitle: "Supporting GMC & 10x GDP Goals",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 border-2 border-primary/20 rounded-lg">
              <Badge className="mb-3">GMC Vision</Badge>
              <h3 className="font-semibold text-lg mb-3">
                Gelephu Mindfulness City
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    Sustainable agriculture practices aligned with mindful
                    development
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    Youth employment creation in green economy sectors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Innovation hub for agricultural technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Community-centered economic development</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-2 border-primary/20 rounded-lg">
              <Badge className="mb-3">Economic Growth</Badge>
              <h3 className="font-semibold text-lg mb-3">10x GDP Strategy</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    Agricultural productivity increase through modern techniques
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    Value-added production and processing capabilities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Export potential development for specialty crops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    Entrepreneurship ecosystem for agricultural startups
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Impact on Rural Development
            </h3>
            <p className="text-sm text-muted-foreground">
              By keeping youth engaged in agriculture through modern, profitable
              methods, we address rural-urban migration while building food
              security and economic resilience in rural communities.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Target Markets",
      subtitle: "Scalability Opportunities",
      icon: MapPin,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <img
              src="/assets/generated/scalability-map.dim_1000x700.png"
              alt="Scalability Map"
              className="w-full rounded-lg border shadow-lg"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Primary Markets</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Other Districts in Bhutan</div>
                  <div className="text-sm text-muted-foreground">
                    20 districts with similar agricultural potential
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Agricultural Cooperatives</div>
                  <div className="text-sm text-muted-foreground">
                    Existing farmer groups seeking training programs
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Government Programs</div>
                  <div className="text-sm text-muted-foreground">
                    Ministry of Agriculture initiatives and youth schemes
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Secondary Markets</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Regional Expansion</div>
                  <div className="text-sm text-muted-foreground">
                    Nepal and Northeast India with similar contexts
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Private Sector</div>
                  <div className="text-sm text-muted-foreground">
                    Agribusiness companies seeking trained workforce
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Educational Institutions</div>
                  <div className="text-sm text-muted-foreground">
                    Schools and colleges adding vocational programs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Implementation Toolkit",
      subtitle: "Everything Needed to Replicate",
      icon: Package,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-lg mb-4">Included Resources</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Curriculum modules and lesson plans</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Assessment templates and rubrics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Production standard operating procedures</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Business planning templates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Student progress tracking tools</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Instructor training materials</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Equipment procurement guides</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Financial planning worksheets</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Implementation Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                    Month 1-2
                  </div>
                  <div className="text-sm">
                    Facility setup and equipment procurement
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                    Month 3
                  </div>
                  <div className="text-sm">
                    Instructor training and curriculum adaptation
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                    Month 4
                  </div>
                  <div className="text-sm">
                    Student recruitment and orientation
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                    Month 5+
                  </div>
                  <div className="text-sm">
                    Full program operation and continuous improvement
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <div className="font-medium mb-1">Support Package</div>
                <div className="text-sm text-muted-foreground">
                  Ongoing technical support, quarterly reviews, and access to
                  our learning community
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="space-y-6">
      {/* Slide Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              type="button"
              key={`slide-dot-${index}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Slide Content */}
      <Card className="min-h-[600px]">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Slide Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CurrentIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">
                {slides[currentSlide].title}
              </h2>
              <p className="text-muted-foreground">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Slide Body */}
            <div className="mt-8">{slides[currentSlide].content}</div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="lg"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Previous
        </Button>
        <Button
          onClick={nextSlide}
          size="lg"
          disabled={currentSlide === slides.length - 1}
        >
          Next
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
