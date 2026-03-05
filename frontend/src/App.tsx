import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContactButton from './components/FloatingContactButton';
import ProfileSetupDialog from './components/ProfileSetupDialog';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TrainingPage from './pages/TrainingPage';
import ProjectsPage from './pages/ProjectsPage';
import AdminPage from './pages/AdminPage';
import PedagogyPage from './pages/PedagogyPage';
import SOPsPage from './pages/SOPsPage';
import TechniquesPage from './pages/TechniquesPage';
import GDPDashboardPage from './pages/GDPDashboardPage';
import StorePage from './pages/StorePage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import FAQPage from './pages/FAQPage';
import MyProgressPage from './pages/MyProgressPage';
import TestimonialsPage from './pages/TestimonialsPage';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';

export type PageView =
  | 'home'
  | 'dashboard'
  | 'training'
  | 'projects'
  | 'admin'
  | 'pedagogy'
  | 'sops'
  | 'techniques'
  | 'gdp'
  | 'store'
  | 'contact'
  | 'news'
  | 'faq'
  | 'myProgress'
  | 'testimonials';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'training':
        return <TrainingPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'admin':
        return <AdminPage />;
      case 'pedagogy':
        return <PedagogyPage />;
      case 'sops':
        return <SOPsPage />;
      case 'techniques':
        return <TechniquesPage />;
      case 'gdp':
        return <GDPDashboardPage />;
      case 'store':
        return <StorePage />;
      case 'contact':
        return <ContactPage />;
      case 'news':
        return <NewsPage />;
      case 'faq':
        return <FAQPage />;
      case 'myProgress':
        return <MyProgressPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer setPage={handleNavigate} />
      <FloatingContactButton />
      {showProfileSetup && <ProfileSetupDialog />}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
