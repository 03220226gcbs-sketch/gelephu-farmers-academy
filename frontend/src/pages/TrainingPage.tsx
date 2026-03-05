import React, { useState } from 'react';
import { BookOpen, Users, Award, Download, FileText, ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react';
import { useGetCourses, useEnrollInCourse, useGetEnrollmentsForTrainee, useGetAllSuccessStories } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../hooks/useLanguage';

interface DownloadResource {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  size: string;
}

const downloadResources: DownloadResource[] = [
  {
    id: 1,
    title: 'Hydroponic Farming Starter Guide',
    description: 'A comprehensive beginner\'s guide to setting up your first hydroponic system, covering NFT, DWC, and vertical farming methods with step-by-step instructions.',
    fileUrl: 'https://www.fao.org/3/i6583e/i6583e.pdf',
    fileType: 'PDF',
    size: '2.4 MB',
  },
  {
    id: 2,
    title: 'Drip Irrigation Installation Manual',
    description: 'Detailed manual for installing and maintaining drip irrigation systems on small to medium farms, including troubleshooting tips and maintenance schedules.',
    fileUrl: 'https://www.fao.org/3/s8684e/s8684e.pdf',
    fileType: 'PDF',
    size: '1.8 MB',
  },
  {
    id: 3,
    title: 'Organic Composting Checklist',
    description: 'A practical checklist and guide for creating high-quality compost from farm waste, with ratios, timelines, and quality indicators for optimal results.',
    fileUrl: 'https://www.fao.org/3/a0800e/a0800e.pdf',
    fileType: 'PDF',
    size: '0.9 MB',
  },
  {
    id: 4,
    title: 'Bamboo Cultivation Best Practices',
    description: 'Expert guidelines for bamboo cultivation in Bhutan\'s climate zones, covering species selection, planting, harvesting, and post-harvest processing.',
    fileUrl: 'https://www.fao.org/3/i2495e/i2495e.pdf',
    fileType: 'PDF',
    size: '3.1 MB',
  },
  {
    id: 5,
    title: 'Integrated Pest Management Field Guide',
    description: 'Identify common pests and diseases affecting Bhutanese crops, with organic and low-chemical management strategies for each.',
    fileUrl: 'https://www.fao.org/3/i1536e/i1536e.pdf',
    fileType: 'PDF',
    size: '1.5 MB',
  },
];

export default function TrainingPage() {
  const { identity } = useInternetIdentity();
  const { data: courses, isLoading: coursesLoading } = useGetCourses();
  const { data: enrollments } = useGetEnrollmentsForTrainee(identity?.getPrincipal());
  const { data: successStories } = useGetAllSuccessStories();
  const enrollMutation = useEnrollInCourse();
  const { t } = useLanguage();

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const isEnrolled = (courseId: bigint) => {
    return enrollments?.some(e => e.courseId === courseId) ?? false;
  };

  const handleEnroll = async (courseId: bigint) => {
    try {
      await enrollMutation.mutateAsync(courseId);
    } catch (err) {
      console.error('Enrollment error:', err);
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
            <h1 className="text-4xl font-bold mb-2">{t('training.title')}</h1>
            <p className="text-lg opacity-90">Hands-on learning for modern Bhutanese agriculture</p>
          </div>
        </div>
      </section>

      {/* Enrollment Info Banner */}
      <section className="bg-primary/10 border-b border-primary/20 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm font-medium">
              To enroll or inquire about courses, call or WhatsApp:{' '}
              <a href="tel:77421966" className="text-primary font-bold hover:underline">+975 77421966</a>
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
            <TabsTrigger value="courses">{t('training.courses')}</TabsTrigger>
            {identity && <TabsTrigger value="enrollments">{t('training.enrollments')}</TabsTrigger>}
            <TabsTrigger value="resources">Downloads</TabsTrigger>
            <TabsTrigger value="stories">{t('training.stories')}</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{t('training.courses')}</h2>
              <p className="text-muted-foreground">Browse our current training offerings</p>
            </div>
            {coursesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader><div className="h-5 bg-muted rounded w-3/4" /></CardHeader>
                    <CardContent><div className="h-4 bg-muted rounded w-full mb-2" /><div className="h-4 bg-muted rounded w-2/3" /></CardContent>
                  </Card>
                ))}
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(course => (
                  <Card key={course.id.toString()} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant="outline" className="capitalize flex-shrink-0">{course.productionType}</Badge>
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
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Enrolled</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleEnroll(course.id)}
                            disabled={enrollMutation.isPending}
                          >
                            {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                          </Button>
                        )
                      ) : (
                        <p className="text-xs text-muted-foreground">Login to enroll</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No courses available yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">Check back soon or contact us for upcoming batches.</p>
                  <a href="tel:77421966" className="text-primary font-medium hover:underline">Call +975 77421966</a>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Enrollments Tab */}
          {identity && (
            <TabsContent value="enrollments">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">{t('training.enrollments')}</h2>
                <p className="text-muted-foreground">Your enrolled courses and progress</p>
              </div>
              {enrollments && enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrollments.map(enrollment => {
                    const course = courses?.find(c => c.id === enrollment.courseId);
                    return (
                      <Card key={enrollment.id.toString()}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{course?.title ?? `Course #${enrollment.courseId}`}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="font-semibold">{enrollment.progress.toString()}%</span>
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
                    <p className="text-muted-foreground text-sm">Browse the Courses tab to enroll.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}

          {/* Downloads Tab */}
          <TabsContent value="resources">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">Downloadable Resources</h2>
              <p className="text-muted-foreground">Free guides, manuals, and checklists for farmers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadResources.map(resource => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base leading-snug">{resource.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{resource.fileType}</Badge>
                          <span className="text-xs text-muted-foreground">{resource.size}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download {resource.fileType}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="stories">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{t('training.stories')}</h2>
              <p className="text-muted-foreground">Real results from our trained farmers</p>
            </div>
            {successStories && successStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {successStories.map(story => (
                  <Card key={story.id.toString()} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{story.farmerName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{story.location}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="mb-2">{story.technique}</Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">{story.outcome}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Success stories coming soon</h3>
                  <p className="text-muted-foreground text-sm">Check back as our farmers achieve great results.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
