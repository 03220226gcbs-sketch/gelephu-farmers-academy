import { useGetAllSuccessStories, useGetApprovedTestimonials } from '../hooks/useQueries';
import { PageView } from '../App';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import {
  Leaf,
  BookOpen,
  BarChart3,
  ShoppingBag,
  FileText,
  Sprout,
  Users,
  TrendingUp,
  Star,
  MapPin,
  MessageSquareQuote,
  ArrowRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

const featureCards = [
  {
    icon: BookOpen,
    title: 'Training Programs',
    description: 'Hands-on courses in hydroponics, bamboo cultivation, and nursery management.',
    page: 'training' as PageView,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: BarChart3,
    title: 'GDP Dashboard',
    description: 'Track our contribution to Bhutan\'s 10x GDP growth goal.',
    page: 'gdp' as PageView,
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: FileText,
    title: 'Farming Techniques',
    description: 'Modern agricultural methods and best practices library.',
    page: 'techniques' as PageView,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
  {
    icon: ShoppingBag,
    title: 'Courseware Store',
    description: 'Purchase training materials and educational resources.',
    page: 'store' as PageView,
    color: 'text-amber-600',
    bg: 'bg-amber-100 dark:bg-amber-900/20',
  },
  {
    icon: FileText,
    title: 'SOPs Library',
    description: 'Standard operating procedures for all production types.',
    page: 'sops' as PageView,
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    icon: MessageSquareQuote,
    title: 'Farmer Stories',
    description: 'Real testimonials from farmers who transformed their livelihoods.',
    page: 'testimonials' as PageView,
    color: 'text-rose-600',
    bg: 'bg-rose-100 dark:bg-rose-900/20',
  },
];

const stats = [
  { icon: Users, value: '200+', label: 'Farmers Trained' },
  { icon: Sprout, value: '3', label: 'Production Types' },
  { icon: TrendingUp, value: '40%', label: 'Yield Improvement' },
  { icon: Star, value: '95%', label: 'Satisfaction Rate' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const { data: successStories = [] } = useGetAllSuccessStories();
  const { data: testimonials = [] } = useGetApprovedTestimonials();
  const recentTestimonials = testimonials.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-farming.dim_1920x800.png"
            alt="Farming"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              🌱 Gelephu Mindfulness City Initiative
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Empowering Bhutan's{' '}
              <span className="text-primary">Farmers</span> for a{' '}
              <span className="text-primary">Prosperous Future</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
              Join the Gelephu Farmers Academy to master modern agricultural techniques, contribute to national GDP growth, and build sustainable livelihoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="min-h-[48px] w-full sm:w-auto text-base"
                onClick={() => onNavigate('training')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Training
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-h-[48px] w-full sm:w-auto text-base"
                onClick={() => onNavigate('contact')}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-80" />
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm opacity-80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Comprehensive resources and programs designed to transform Bhutanese agriculture.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featureCards.map((card) => (
            <Card
              key={card.page}
              className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
              onClick={() => onNavigate(card.page)}
            >
              <CardContent className="pt-6 pb-6">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      {successStories.length > 0 && (
        <section className="bg-muted/30 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Farmer Success Stories
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Real outcomes from our training programs
              </p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {successStories.map((story) => (
                  <CarouselItem key={String(story.id)} className="sm:basis-1/2 lg:basis-1/3">
                    <Card className="h-full">
                      <CardContent className="pt-6 pb-6 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                            {story.farmerName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate">{story.farmerName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {story.location}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs w-fit mb-3">{story.technique}</Badge>
                        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{story.outcome}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4 min-w-[44px] min-h-[44px]" />
              <CarouselNext className="hidden sm:flex -right-4 min-w-[44px] min-h-[44px]" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Testimonials Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Voices from Our Farmers
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Hear directly from farmers who've transformed their lives
            </p>
          </div>
          <Button
            variant="outline"
            className="min-h-[44px] w-full sm:w-auto gap-2 flex-shrink-0"
            onClick={() => onNavigate('testimonials')}
          >
            View All Stories
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {recentTestimonials.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <MessageSquareQuote className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No testimonials yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Be the first to share your farming success story!
              </p>
              <Button
                className="mt-4 min-h-[44px]"
                onClick={() => onNavigate('testimonials')}
              >
                Share Your Story
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {recentTestimonials.map((testimonial) => (
              <Card
                key={String(testimonial.id)}
                className="border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                      {testimonial.farmerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{testimonial.farmerName}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{testimonial.location}</span>
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-sm text-muted-foreground italic leading-relaxed line-clamp-3">
                    "{testimonial.testimonialText}"
                  </blockquote>
                  <div className="mt-3 pt-3 border-t border-border">
                    <Badge variant="secondary" className="text-xs gap-1">
                      <Leaf className="w-3 h-3" />
                      {testimonial.farmingArea}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Vision / Mission */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-primary/20">
              <CardContent className="pt-6 pb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be the leading agricultural training institution in Bhutan, producing skilled farmers who drive sustainable economic growth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6 pb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Empowering farmers through practical education, modern techniques, and market linkages to achieve food security and prosperity.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6 pb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Our Goals</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Train 1,000+ farmers annually, achieve 40% yield improvements, and contribute significantly to Bhutan's 10x GDP growth target.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">
            Join hundreds of farmers already benefiting from our programs. Register today and start your journey toward a more prosperous future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="min-h-[48px] w-full sm:w-auto"
              onClick={() => onNavigate('contact')}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] w-full sm:w-auto"
              onClick={() => onNavigate('training')}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
