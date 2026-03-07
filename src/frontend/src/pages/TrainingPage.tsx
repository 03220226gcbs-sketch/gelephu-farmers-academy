import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  Lock,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLanguage } from "../hooks/useLanguage";
import {
  useEnrollInCourse,
  useGetAllSuccessStories,
  useGetCourses,
  useGetEnrollmentsForTrainee,
} from "../hooks/useQueries";

interface PedagogyModule {
  id: number;
  title: string;
  pedagogy: string;
  practicalSkills: string;
  strategyLesson: string;
  studentTask: string;
  context: string;
  deliverable?: string;
}

const hydroponicModules: PedagogyModule[] = [
  {
    id: 1,
    title: "Module 1: System Engineering & Adaptive Installation",
    pedagogy:
      'Learning by Assembly & Stress-Testing. Instead of just showing a finished system, students must build one and then simulate "environmental failures."',
    practicalSkills: "Construction of NFT, DWC, and Vertical Towers.",
    strategyLesson:
      'The Failure Drill. Once the system is built, the instructor "cuts the power" or "unplugs a pipe."',
    studentTask:
      "Identify how long the specific crop will survive in that specific system (e.g., DWC lasts longer than NFT during power cuts) and implement an emergency manual aeration strategy.",
    context:
      'Using locally available materials for "Low-Cost DIY" vs. "Commercial Grade" setups.',
  },
  {
    id: 2,
    title: "Module 2: The Chemistry of Life (Nutrients & Substrates)",
    pedagogy:
      'The "Chef\'s Table" Approach. Students treat nutrient mixing like a precise recipe, learning the "taste" (data) of the water.',
    practicalSkills: "Mixing Stock A & B, pH balancing, and EC calibration.",
    strategyLesson:
      'Deficiency Diagnosis. Students are shown plants with "mystery illnesses" (yellowing leaves, stunted growth).',
    studentTask:
      'Use sensors to "interrogate" the water. Is the pH too high for iron uptake? Is the EC too low for the fruiting stage? They must "prescribe" a corrective dose.',
    context:
      "Substrate Lab: Hands-on comparison of Rice Husk Biochar (local) vs. Coco Peat (imported) to see which holds moisture better in Bhutan's climate.",
  },
  {
    id: 3,
    title: "Module 3: Climate Mastery & Crop Progression",
    pedagogy:
      'Micro-Climate Simulation. Bhutan has diverse micro-climates; this module teaches how to "build the weather" inside a polyhouse.',
    practicalSkills:
      'Nursery management, seedling "hardening," and transplanting.',
    strategyLesson:
      "Seasonal Pivoting. How to manage a polyhouse during a 5°C Thimphu winter vs. a humid Punakha summer.",
    studentTask:
      "Design a ventilation and shading schedule for a specific Bhutanese district.",
    context:
      "Tools: Using digital hygrometers and automated misting systems to control humidity.",
  },
  {
    id: 4,
    title: 'Module 4: The Agribusiness "Accelerator"',
    pedagogy:
      'The Shark Tank / Business Simulation. Moving from a "farmer" mindset to an "entrepreneur" mindset.',
    practicalSkills: "Market linkage, packaging, and unit cost calculation.",
    strategyLesson: "The Value-Chain Gap.",
    studentTask:
      'Calculate the "Cost of Production" for 1kg of strawberries. Then, identify a "Value-Add" (e.g., selling "Ready-to-Eat" pre-washed salad bowls to Thimphu hotels) to double the profit margin.',
    context:
      "Bhutan-specific market analysis aligned with GMC's 10x GDP goals.",
    deliverable:
      "Every student leaves with a 1-page Hydroponic Business Roadmap for their own village or town.",
  },
];

export default function TrainingPage() {
  const { identity } = useInternetIdentity();
  const { data: courses, isLoading: coursesLoading } = useGetCourses();
  const { data: enrollments } = useGetEnrollmentsForTrainee(
    identity?.getPrincipal(),
  );
  const { data: successStories } = useGetAllSuccessStories();
  const enrollMutation = useEnrollInCourse();
  const { t } = useLanguage();

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isEnrolled = (courseId: bigint) => {
    return enrollments?.some((e) => e.courseId === courseId) ?? false;
  };

  const handleEnroll = async (courseId: bigint) => {
    try {
      await enrollMutation.mutateAsync(courseId);
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-56 overflow-hidden">
        <img
          src="/assets/generated/training-session.dim_600x400.jpg"
          alt="Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-2">{t("training.title")}</h1>
            <p className="text-lg opacity-90">
              Hands-on learning for modern Bhutanese agriculture
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Info Banner */}
      <section className="bg-primary/10 border-b border-primary/20 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm font-medium">
              To enroll or inquire about courses, call or WhatsApp:{" "}
              <a
                href="tel:77421966"
                className="text-primary font-bold hover:underline"
              >
                +975 77421966
              </a>
            </p>
          </div>
          <a
            href="https://wa.me/97577421966"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="courses">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">{t("training.courses")}</TabsTrigger>
            {identity && (
              <TabsTrigger value="enrollments">
                {t("training.enrollments")}
              </TabsTrigger>
            )}
            <TabsTrigger value="resources" data-ocid="training.resources.tab">
              Pedagogy Modules
            </TabsTrigger>
            <TabsTrigger value="stories">{t("training.stories")}</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">
                {t("training.courses")}
              </h2>
              <p className="text-muted-foreground">
                Browse our current training offerings
              </p>
            </div>
            {coursesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-5 bg-muted rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-full mb-2" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <Card
                    key={course.id.toString()}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">
                          {course.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="capitalize flex-shrink-0"
                        >
                          {course.productionType}
                        </Badge>
                      </div>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-3 space-y-1">
                        <p>Start: {formatDate(course.startDate)}</p>
                        <p>End: {formatDate(course.endDate)}</p>
                      </div>
                      {identity ? (
                        isEnrolled(course.id) ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Enrolled
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleEnroll(course.id)}
                            disabled={enrollMutation.isPending}
                          >
                            {enrollMutation.isPending
                              ? "Enrolling..."
                              : "Enroll Now"}
                          </Button>
                        )
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Login to enroll
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">
                    No courses available yet
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Check back soon or contact us for upcoming batches.
                  </p>
                  <a
                    href="tel:77421966"
                    className="text-primary font-medium hover:underline"
                  >
                    Call +975 77421966
                  </a>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Enrollments Tab */}
          {identity && (
            <TabsContent value="enrollments">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">
                  {t("training.enrollments")}
                </h2>
                <p className="text-muted-foreground">
                  Your enrolled courses and progress
                </p>
              </div>
              {enrollments && enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrollments.map((enrollment) => {
                    const course = courses?.find(
                      (c) => c.id === enrollment.courseId,
                    );
                    return (
                      <Card key={enrollment.id.toString()}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {course?.title ?? `Course #${enrollment.courseId}`}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-semibold">
                              {enrollment.progress.toString()}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No enrollments yet</h3>
                    <p className="text-muted-foreground text-sm">
                      Browse the Courses tab to enroll.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}

          {/* Pedagogy Modules Tab */}
          <TabsContent value="resources">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">
                  Hydroponic Pedagogy Modules
                </h2>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  View Only
                </Badge>
              </div>
              <p className="text-muted-foreground">
                GGSA proprietary training framework — content is for viewing
                only and cannot be downloaded
              </p>
            </div>
            <div className="space-y-6">
              {hydroponicModules.map((module) => (
                <Card
                  key={module.id}
                  className="hover:shadow-md transition-shadow"
                  data-ocid={`resources.item.${module.id}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base leading-snug">
                          {module.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View Only
                          </Badge>
                          <Badge className="text-xs">GGSA Proprietary</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        Pedagogy
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.pedagogy}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        Practical Skills
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.practicalSkills}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        The Strategy Lesson
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.strategyLesson}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        Student Task
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.studentTask}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                        Bhutan Context
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.context}
                      </p>
                    </div>
                    {module.deliverable && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                          Deliverable
                        </p>
                        <p className="text-sm text-foreground leading-relaxed font-medium">
                          {module.deliverable}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="stories">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">
                {t("training.stories")}
              </h2>
              <p className="text-muted-foreground">
                Real results from our trained farmers
              </p>
            </div>
            {successStories && successStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {successStories.map((story) => (
                  <Card
                    key={story.id.toString()}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {story.farmerName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {story.location}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="mb-2">
                        {story.technique}
                      </Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {story.outcome}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">
                    Success stories coming soon
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Check back as our farmers achieve great results.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
