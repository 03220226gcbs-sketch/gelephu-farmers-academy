import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Presentation } from 'lucide-react';
import PedagogyFramework from '../components/pedagogy/PedagogyFramework';
import PitchDeck from '../components/pedagogy/PitchDeck';

export default function PedagogyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Sellable Pedagogy Framework
            </h1>
            <p className="text-xl text-muted-foreground">
              A proven training + production hybrid model for sustainable agricultural education
            </p>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border">
              <img
                src="/assets/generated/pedagogy-hero.dim_1200x600.png"
                alt="Agricultural Training with Hydroponic Systems"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold">Transforming Agricultural Education</h2>
            <p className="text-muted-foreground">
              Our training-production hybrid model addresses youth unemployment and rural migration
              by combining structured agricultural education with real production experience. Students
              earn while they learn, developing job-ready skills and entrepreneurial capabilities.
            </p>
            <p className="text-muted-foreground">
              This pedagogy aligns with Bhutan's GMC (Gelephu Mindfulness City) vision and 10x GDP
              growth strategy, creating sustainable pathways for agricultural development and youth
              employment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="framework" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="framework" className="gap-2">
                <FileText className="h-4 w-4" />
                Framework Document
              </TabsTrigger>
              <TabsTrigger value="pitch" className="gap-2">
                <Presentation className="h-4 w-4" />
                Pitch Deck
              </TabsTrigger>
            </TabsList>

            <TabsContent value="framework" className="space-y-6">
              <PedagogyFramework />
            </TabsContent>

            <TabsContent value="pitch" className="space-y-6">
              <PitchDeck />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 border-t bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to Implement?</h2>
            <p className="text-muted-foreground">
              Contact us for implementation support, training, or partnership opportunities.
              We provide comprehensive resources and ongoing technical assistance.
            </p>
            <div className="pt-4">
              <p className="text-sm font-medium">Gelephu Farmers Academy</p>
              <p className="text-sm text-muted-foreground">Gelephu, Bhutan</p>
              <p className="text-sm text-muted-foreground">Email: info@gelephufarmers.bt</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
