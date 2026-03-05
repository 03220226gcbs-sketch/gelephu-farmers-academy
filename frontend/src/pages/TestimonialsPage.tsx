import { useState } from 'react';
import { useGetApprovedTestimonials } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import TestimonialSubmissionDialog from '../components/TestimonialSubmissionDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquareQuote, MapPin, Sprout, PlusCircle } from 'lucide-react';

export default function TestimonialsPage() {
  const { data: testimonials = [], isLoading } = useGetApprovedTestimonials();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/assets/generated/success-bg.dim_1400x400.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageSquareQuote className="w-4 h-4" />
            Farmer Stories
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Voices from the Field
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Real stories from farmers who have transformed their livelihoods through modern agricultural practices at Gelephu Farmers Academy.
          </p>
          <Button
            size="lg"
            className="min-h-[48px] w-full sm:w-auto gap-2"
            onClick={() => {
              if (isAuthenticated) {
                setDialogOpen(true);
              } else {
                setDialogOpen(true);
              }
            }}
          >
            <PlusCircle className="w-5 h-5" />
            Share Your Story
          </Button>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Sprout className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Be the First to Share Your Story!
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm sm:text-base">
              No testimonials yet. If you've benefited from our programs, we'd love to hear about your farming journey and success.
            </p>
            <Button
              size="lg"
              className="min-h-[48px] w-full sm:w-auto gap-2"
              onClick={() => setDialogOpen(true)}
            >
              <PlusCircle className="w-5 h-5" />
              Share Your Story
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {testimonials.length} Farmer {testimonials.length === 1 ? 'Story' : 'Stories'}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Inspiring journeys from our farming community
                </p>
              </div>
              <Button
                variant="outline"
                className="min-h-[44px] w-full sm:w-auto gap-2"
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircle className="w-4 h-4" />
                Share Your Story
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card
                  key={String(testimonial.id)}
                  className="flex flex-col border-primary/10 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="pt-6 flex flex-col flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                        {testimonial.farmerName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                          {testimonial.farmerName}
                        </p>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{testimonial.location}</span>
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-muted-foreground text-sm leading-relaxed flex-1 italic">
                      "{testimonial.testimonialText}"
                    </blockquote>

                    <div className="mt-4 pt-4 border-t border-border">
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Sprout className="w-3 h-3" />
                        {testimonial.farmingArea}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </section>

      <TestimonialSubmissionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}
