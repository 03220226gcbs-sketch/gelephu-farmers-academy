import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import UserManagement from '../components/admin/UserManagement';
import CourseManagement from '../components/admin/CourseManagement';
import ProjectManagement from '../components/admin/ProjectManagement';
import MetricsManagement from '../components/admin/MetricsManagement';
import ContentManagement from '../components/admin/ContentManagement';
import SOPManagement from '../components/admin/SOPManagement';
import SubmissionsManagement from '../components/admin/SubmissionsManagement';
import TestimonialManagement from '../components/admin/TestimonialManagement';
import { useActor } from '../hooks/useActor';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield } from 'lucide-react';

const tabs = [
  { value: 'users', label: 'Users' },
  { value: 'courses', label: 'Courses' },
  { value: 'projects', label: 'Projects' },
  { value: 'metrics', label: 'Metrics' },
  { value: 'content', label: 'Content' },
  { value: 'sops', label: 'SOPs' },
  { value: 'submissions', label: 'Submissions' },
  { value: 'testimonials', label: 'Testimonials' },
];

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [activeTab, setActiveTab] = useState('users');

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  if (!identity) return <AccessDeniedScreen />;
  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Checking permissions...</div>
      </div>
    );
  }
  if (!isAdmin) return <AccessDeniedScreen />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Manage all academy content and users</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Mobile: Select dropdown */}
        <div className="sm:hidden mb-6">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full min-h-[48px]">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="hidden sm:flex flex-wrap gap-1 h-auto p-1 mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="min-h-[36px]">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content rendered for both mobile and desktop */}
          <div>
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'courses' && <CourseManagement />}
            {activeTab === 'projects' && <ProjectManagement />}
            {activeTab === 'metrics' && <MetricsManagement />}
            {activeTab === 'content' && <ContentManagement />}
            {activeTab === 'sops' && <SOPManagement />}
            {activeTab === 'submissions' && <SubmissionsManagement />}
            {activeTab === 'testimonials' && <TestimonialManagement />}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
