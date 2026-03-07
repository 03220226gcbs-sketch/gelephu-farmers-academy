import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, CheckCircle2, Clock, Folder } from "lucide-react";
import {
  useGetProjectsByStatus,
  useGetProjectsByType,
} from "../hooks/useQueries";

export default function ProjectsPage() {
  const { data: ongoingProjects, isLoading: ongoingLoading } =
    useGetProjectsByStatus("ongoing");
  const { data: completedProjects, isLoading: completedLoading } =
    useGetProjectsByStatus("completed");
  const { data: hydroponicModules, isLoading: hydroponicLoading } =
    useGetProjectsByType("hydroponic");

  const getProductionTypeColor = (type: string) => {
    switch (type) {
      case "hydroponic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "nursery":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "bamboo":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const renderProjects = (
    projects: any[] | undefined,
    isLoading: boolean,
    status: "ongoing" | "completed",
  ) => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      );
    }

    if (!projects || projects.length === 0) {
      return null;
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={`project-${Number(project.id)}`} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge
                  className={getProductionTypeColor(project.productionType)}
                >
                  {project.productionType}
                </Badge>
                {status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Started:{" "}
                    {new Date(
                      Number(project.startDate) / 1000000,
                    ).toLocaleDateString()}
                  </span>
                </div>
                {project.endDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Ended:{" "}
                      {new Date(
                        Number(project.endDate) / 1000000,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              {project.outcomes && (
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-1">Outcomes:</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.outcomes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderHydroponicModules = () => {
    if (hydroponicLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      );
    }

    if (!hydroponicModules || hydroponicModules.length === 0) {
      return null;
    }

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Hydroponic Pedagogy Modules</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hydroponicModules.map((module) => (
            <Card
              key={`hydroponic-module-${Number(module.id)}`}
              className="flex flex-col hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <Badge
                  className={getProductionTypeColor(module.productionType)}
                  variant="outline"
                >
                  Hydroponic
                </Badge>
                <CardTitle className="text-base mt-2">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {module.description}
                </p>
                {module.outcomes && (
                  <div className="pt-3 border-t">
                    <p className="text-xs font-medium mb-1">
                      Learning Outcomes:
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {module.outcomes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const hasOngoingContent =
    (ongoingProjects && ongoingProjects.length > 0) ||
    (hydroponicModules && hydroponicModules.length > 0);
  const isOngoingLoading = ongoingLoading || hydroponicLoading;

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Showcase</h1>
        <p className="text-muted-foreground">
          Explore our ongoing initiatives and completed success stories across
          all production areas.
        </p>
      </div>

      <Tabs defaultValue="ongoing" className="space-y-6">
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing">
          {isOngoingLoading ? (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          ) : !hasOngoingContent ? (
            <div className="text-center py-12 text-muted-foreground">
              <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No ongoing projects at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {renderHydroponicModules()}
              {renderProjects(ongoingProjects, false, "ongoing")}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : !completedProjects || completedProjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No completed projects at the moment.</p>
            </div>
          ) : (
            renderProjects(completedProjects, false, "completed")
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
