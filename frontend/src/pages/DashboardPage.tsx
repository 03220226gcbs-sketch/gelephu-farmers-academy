import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMetricsByType } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Droplets, Sprout, TreePine } from 'lucide-react';
import AccessDeniedScreen from '../components/AccessDeniedScreen';

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: hydroponicMetrics, isLoading: hydroponicLoading } = useGetMetricsByType('hydroponic');
  const { data: nurseryMetrics, isLoading: nurseryLoading } = useGetMetricsByType('nursery');
  const { data: bambooMetrics, isLoading: bambooLoading } = useGetMetricsByType('bamboo');

  if (!identity) {
    return <AccessDeniedScreen message="Please login to access the dashboard" />;
  }

  const renderMetrics = (metrics: any[] | undefined, isLoading: boolean, icon: React.ReactNode, color: string) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }

    if (!metrics || metrics.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No metrics available yet.</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={Number(metric.id)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {icon}
                  <CardTitle className="text-base">{metric.metricName}</CardTitle>
                </div>
                <Badge variant="outline" className={color}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Updated: {new Date(Number(metric.timestamp) / 1000000).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Production Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor real-time metrics and performance indicators across all production areas.
        </p>
      </div>

      <Tabs defaultValue="hydroponic" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="hydroponic">Hydroponic</TabsTrigger>
          <TabsTrigger value="nursery">Nursery</TabsTrigger>
          <TabsTrigger value="bamboo">Bamboo</TabsTrigger>
        </TabsList>

        <TabsContent value="hydroponic" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle>Hydroponic Farming Operations</CardTitle>
                  <CardDescription>Water-based cultivation systems and nutrient management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/hydroponic-facility.dim_800x600.jpg"
                alt="Hydroponic Facility"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
              {renderMetrics(
                hydroponicMetrics,
                hydroponicLoading,
                <Droplets className="h-4 w-4 text-blue-600" />,
                'text-blue-600'
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nursery" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sprout className="h-6 w-6 text-green-600" />
                <div>
                  <CardTitle>Plant Nursery Management</CardTitle>
                  <CardDescription>Seedling production and plant propagation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/plant-nursery.dim_800x600.jpg"
                alt="Plant Nursery"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
              {renderMetrics(
                nurseryMetrics,
                nurseryLoading,
                <Sprout className="h-4 w-4 text-green-600" />,
                'text-green-600'
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bamboo" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <TreePine className="h-6 w-6 text-emerald-600" />
                <div>
                  <CardTitle>Bamboo Production</CardTitle>
                  <CardDescription>Sustainable bamboo cultivation and harvesting</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/generated/bamboo-plantation.dim_800x600.jpg"
                alt="Bamboo Plantation"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
              {renderMetrics(
                bambooMetrics,
                bambooLoading,
                <TreePine className="h-4 w-4 text-emerald-600" />,
                'text-emerald-600'
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
