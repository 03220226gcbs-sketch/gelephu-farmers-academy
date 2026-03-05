import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, BookOpen, Target, TrendingUp, Users, Award, Lightbulb } from 'lucide-react';
import { usePedagogyData } from '../../hooks/usePedagogyData';
import { downloadFrameworkDocument } from '../../utils/documentExport';
import { Skeleton } from '@/components/ui/skeleton';

export default function PedagogyFramework() {
  const { metrics, courses, projects, isLoading } = usePedagogyData();

  const handleDownload = () => {
    downloadFrameworkDocument({ metrics, courses, projects });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pedagogy Framework</h2>
          <p className="text-muted-foreground mt-2">
            Training + Production Hybrid Model for Sustainable Agriculture
          </p>
        </div>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          Download Framework
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Across 3 production areas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Hands-on learning initiatives</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalEnrollments}</div>
            <p className="text-xs text-muted-foreground">Active participants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Hybrid Model Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Training-Production Hybrid Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src="/assets/generated/hybrid-model-diagram.dim_800x600.png"
            alt="Training-Production Hybrid Model"
            className="w-full rounded-lg border"
          />
          <p className="text-sm text-muted-foreground mt-4">
            Our unique approach integrates theoretical learning with practical production experience,
            enabling students to earn while they learn and develop real-world agricultural skills.
          </p>
        </CardContent>
      </Card>

      {/* Curriculum Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Curriculum Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Production Areas</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Badge variant="default">Hydroponic Systems</Badge>
                <p className="text-sm text-muted-foreground">
                  Modern soilless farming techniques with focus on system design, nutrient management,
                  and optimization strategies.
                </p>
                <p className="text-xs font-medium">Duration: 12-16 weeks</p>
              </div>
              <div className="space-y-2">
                <Badge variant="default">Plant Nursery</Badge>
                <p className="text-sm text-muted-foreground">
                  Seedling production and propagation covering germination, transplanting, and quality control.
                </p>
                <p className="text-xs font-medium">Duration: 10-14 weeks</p>
              </div>
              <div className="space-y-2">
                <Badge variant="default">Bamboo Cultivation</Badge>
                <p className="text-sm text-muted-foreground">
                  Sustainable bamboo farming including species selection, maintenance, and value-added processing.
                </p>
                <p className="text-xs font-medium">Duration: 14-18 weeks</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-3">Learning Phases</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Foundation (Weeks 1-4)</h4>
                  <p className="text-sm text-muted-foreground">
                    Theoretical knowledge, safety protocols, basic techniques, and system familiarization
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Supervised Practice (Weeks 5-8)</h4>
                  <p className="text-sm text-muted-foreground">
                    Hands-on training, guided production tasks, quality assessment, and problem-solving
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Independent Production (Weeks 9-12)</h4>
                  <p className="text-sm text-muted-foreground">
                    Autonomous operations, production responsibility, mentoring, and innovation projects
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-medium">Entrepreneurship (Weeks 13+)</h4>
                  <p className="text-sm text-muted-foreground">
                    Business planning, market analysis, financial management, and scaling strategies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Learning Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-3">Technical Skills</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Design and operate production systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Manage crop cycles from seed to harvest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Troubleshoot common production issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Maintain quality standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Optimize resource utilization</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Business Skills</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Calculate production costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Identify market opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Develop business plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Manage cash flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Scale operations sustainably</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Soft Skills</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Problem-solving and critical thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Time management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Communication and presentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Continuous learning mindset</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Criteria */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Knowledge Assessment</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '30%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Written exams, presentations, case studies
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Practical Skills</span>
                  <span className="text-sm text-muted-foreground">40%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '40%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Task completion, output quality, efficiency
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Project Work</span>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '20%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Innovation projects, problem-solving
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Professional Development</span>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '10%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Attendance, teamwork, initiative
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Production Evidence */}
      <Card>
        <CardHeader>
          <CardTitle>Production Metrics Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {metrics.productionMetrics.hydroponic.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">kg/month</div>
              <div className="text-xs font-medium mt-2">Hydroponic Production</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {metrics.productionMetrics.nursery.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">seedlings/month</div>
              <div className="text-xs font-medium mt-2">Nursery Output</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {metrics.productionMetrics.bamboo.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">units/month</div>
              <div className="text-xs font-medium mt-2">Bamboo Cultivation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
