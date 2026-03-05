import { useGetGdpStats } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Users, DollarSign, BarChart3, Target, CheckCircle } from 'lucide-react';

const milestones = [
  { label: '100 Farmers Trained', target: 100, icon: '🌱' },
  { label: '500 Farmers Trained', target: 500, icon: '🌿' },
  { label: '1,000 Farmers Trained', target: 1000, icon: '🌳' },
  { label: '25% GDP Progress', target: 25, icon: '📈' },
  { label: '50% GDP Progress', target: 50, icon: '🚀' },
  { label: '100% GDP Goal', target: 100, icon: '🏆' },
];

const impactAreas = [
  {
    title: 'Hydroponics',
    description: 'Year-round vegetable production with 60% less water usage.',
    icon: '💧',
    color: 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20',
  },
  {
    title: 'Bamboo Cultivation',
    description: 'Sustainable bamboo farming for construction and export markets.',
    icon: '🎋',
    color: 'border-green-500/30 bg-green-50/50 dark:bg-green-950/20',
  },
  {
    title: 'Plant Nursery',
    description: 'High-quality seedling production for reforestation and agriculture.',
    icon: '🌱',
    color: 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20',
  },
];

export default function GDPDashboardPage() {
  const { data: stats, isLoading, isError } = useGetGdpStats();

  const defaultStats = {
    yieldImprovements: 40,
    trainedFarmers: BigInt(200),
    revenueGenerated: 1500000,
    gdpProgress: 15,
  };

  const displayStats = stats ?? defaultStats;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/assets/generated/gdp-impact-banner.dim_1200x400.png"
          alt="GDP Impact"
          className="w-full h-40 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <Badge className="mb-3 bg-white/20 text-white border-white/30">
              National Development
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              GDP Impact Dashboard
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              Tracking our contribution to Bhutan's 10x GDP growth goal through sustainable agriculture.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Key Metrics */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-primary/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Yield Improvement</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {isError ? '40' : displayStats.yieldImprovements.toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">Above traditional farming</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Farmers Trained</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {isError ? '200' : Number(displayStats.trainedFarmers).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">And growing</p>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Revenue Generated</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  Nu {isError ? '1.5M' : (displayStats.revenueGenerated / 1_000_000).toFixed(1) + 'M'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Total farmer income</p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">GDP Progress</span>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {isError ? '15' : displayStats.gdpProgress.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">Toward 10x goal</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="w-5 h-5 text-primary" />
              Progress Toward 10x GDP Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Current Progress</span>
                <span className="font-semibold text-foreground">
                  {isError ? '15' : displayStats.gdpProgress.toFixed(1)}% of 100%
                </span>
              </div>
              <Progress
                value={isError ? 15 : displayStats.gdpProgress}
                className="h-4 sm:h-5"
              />
              <p className="text-xs text-muted-foreground">
                Target: Achieve 10x GDP growth through sustainable agricultural development by 2034
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Milestones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone) => {
              const trainedFarmers = isError ? 200 : Number(displayStats.trainedFarmers);
              const gdpProg = isError ? 15 : displayStats.gdpProgress;
              const isAchieved =
                milestone.label.includes('Farmers')
                  ? trainedFarmers >= milestone.target
                  : gdpProg >= milestone.target;

              return (
                <Card
                  key={milestone.label}
                  className={`transition-all ${isAchieved ? 'border-green-500/40 bg-green-50/50 dark:bg-green-950/20' : 'border-border'}`}
                >
                  <CardContent className="pt-4 pb-4 flex items-center gap-3">
                    <span className="text-2xl flex-shrink-0">{milestone.icon}</span>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${isAchieved ? 'text-green-700 dark:text-green-400' : 'text-foreground'}`}>
                        {milestone.label}
                      </p>
                      {isAchieved && (
                        <p className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3" />
                          Achieved!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Impact Areas */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">
            Key Impact Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {impactAreas.map((area) => (
              <Card key={area.title} className={`border ${area.color}`}>
                <CardContent className="pt-6 pb-6">
                  <span className="text-3xl mb-3 block">{area.icon}</span>
                  <h3 className="font-bold text-foreground mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
