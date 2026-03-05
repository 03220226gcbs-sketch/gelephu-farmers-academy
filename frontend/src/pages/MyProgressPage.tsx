import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetUserProgress, useGetAchievements, useGetCourses, useUpdateEnrollmentProgress } from '../hooks/useQueries';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, BookOpen, TrendingUp, Star, CheckCircle, Clock, User } from 'lucide-react';
import { Course, Enrollment } from '../backend';

export default function MyProgressPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: progressData, isLoading: progressLoading } = useGetUserProgress();
  const { data: achievements, isLoading: achievementsLoading } = useGetAchievements();
  const { data: courses = [] } = useGetCourses();
  const updateProgress = useUpdateEnrollmentProgress();

  if (!isAuthenticated) {
    return <AccessDeniedScreen />;
  }

  const enrollments = progressData?.enrollments ?? [];
  const profile = progressData?.profile;

  const getCourseForEnrollment = (enrollment: Enrollment): Course | undefined => {
    return courses.find((c) => c.id === enrollment.courseId);
  };

  const handleProgressUpdate = (enrollmentId: bigint, currentProgress: bigint) => {
    const newProgress = Math.min(Number(currentProgress) + 25, 100);
    updateProgress.mutate({ enrollmentId, progress: BigInt(newProgress) });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {profile ? `Welcome back, ${profile.name}!` : 'My Learning Progress'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Track your courses, achievements, and farming skills development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Stats Overview */}
        {achievementsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {enrollments.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {achievements ? Number(achievements.completedCourses) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {achievements ? Number(achievements.ongoingCourses) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enrolled Courses */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            My Courses
          </h2>

          {progressLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : enrollments.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No courses enrolled yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Visit the Training page to browse and enroll in courses.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => {
                const course = getCourseForEnrollment(enrollment);
                const progress = Number(enrollment.progress);
                const isComplete = progress >= 100;

                return (
                  <Card key={String(enrollment.id)} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg leading-snug">
                            {course?.title ?? `Course #${String(enrollment.courseId)}`}
                          </CardTitle>
                          {course && (
                            <CardDescription className="mt-1 text-sm line-clamp-2">
                              {course.description}
                            </CardDescription>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {course && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {course.productionType}
                            </Badge>
                          )}
                          {isComplete ? (
                            <Badge className="bg-green-600 text-white text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              In Progress
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span className="font-medium text-foreground">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      {!isComplete && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-3 min-h-[44px] w-full sm:w-auto"
                          onClick={() => handleProgressUpdate(enrollment.id, enrollment.progress)}
                          disabled={updateProgress.isPending}
                        >
                          {updateProgress.isPending ? 'Updating...' : 'Mark Progress (+25%)'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Achievements
          </h2>

          {achievementsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : achievements && achievements.achievements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.achievements.map((achievement, idx) => (
                <Card key={idx} className="border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20">
                  <CardContent className="pt-4 pb-4 flex items-center gap-3">
                    <Star className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <span className="font-medium text-foreground text-sm sm:text-base">{achievement}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-10 text-center">
                <Trophy className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Complete courses to earn achievements!</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
