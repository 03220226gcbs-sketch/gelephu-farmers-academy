import { useInternetIdentity } from "./useInternetIdentity";
import {
  useGetCourses,
  useGetEnrollmentsForTrainee,
  useGetMetricsByType,
  useGetProjectsByType,
} from "./useQueries";

export interface PedagogyMetrics {
  totalCourses: number;
  totalProjects: number;
  totalEnrollments: number;
  averageProgress: number;
  productionMetrics: {
    hydroponic: number;
    nursery: number;
    bamboo: number;
  };
}

export function usePedagogyData() {
  const { identity } = useInternetIdentity();
  const { data: courses = [], isLoading: coursesLoading } = useGetCourses();
  const { data: hydroponicProjects = [], isLoading: hydroponicLoading } =
    useGetProjectsByType("hydroponic");
  const { data: nurseryProjects = [], isLoading: nurseryLoading } =
    useGetProjectsByType("nursery");
  const { data: bambooProjects = [], isLoading: bambooLoading } =
    useGetProjectsByType("bamboo");
  const { data: hydroponicMetrics = [], isLoading: hydroMetricsLoading } =
    useGetMetricsByType("hydroponic");
  const { data: nurseryMetrics = [], isLoading: nurseryMetricsLoading } =
    useGetMetricsByType("nursery");
  const { data: bambooMetrics = [], isLoading: bambooMetricsLoading } =
    useGetMetricsByType("bamboo");
  const { data: enrollments = [], isLoading: enrollmentsLoading } =
    useGetEnrollmentsForTrainee(identity?.getPrincipal());

  const isLoading =
    coursesLoading ||
    hydroponicLoading ||
    nurseryLoading ||
    bambooLoading ||
    hydroMetricsLoading ||
    nurseryMetricsLoading ||
    bambooMetricsLoading ||
    enrollmentsLoading;

  const allProjects = [
    ...hydroponicProjects,
    ...nurseryProjects,
    ...bambooProjects,
  ];

  const averageProgress =
    enrollments.length > 0
      ? enrollments.reduce((sum, e) => sum + Number(e.progress), 0) /
        enrollments.length
      : 0;

  const calculateAverage = (metrics: { value: number }[]) => {
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
  };

  const metrics: PedagogyMetrics = {
    totalCourses: courses.length,
    totalProjects: allProjects.length,
    totalEnrollments: enrollments.length,
    averageProgress: Math.round(averageProgress),
    productionMetrics: {
      hydroponic: calculateAverage(hydroponicMetrics),
      nursery: calculateAverage(nurseryMetrics),
      bamboo: calculateAverage(bambooMetrics),
    },
  };

  return {
    metrics,
    courses,
    projects: allProjects,
    isLoading,
  };
}
