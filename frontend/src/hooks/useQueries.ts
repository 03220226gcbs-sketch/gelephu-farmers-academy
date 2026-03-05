import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, Testimonial, Enrollment, Course } from '../backend';
import { toast } from 'sonner';
import { Principal } from '@dfinity/principal';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email, bio }: { name: string; email: string; bio: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateUserProfile(name, email, bio);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ─── Courses ─────────────────────────────────────────────────────────────────

export function useGetCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      instructorId: Principal;
      startDate: bigint;
      endDate: bigint;
      productionType: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCourse(
        params.title,
        params.description,
        params.instructorId,
        params.startDate,
        params.endDate,
        params.productionType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course created!');
    },
    onError: () => {
      toast.error('Failed to create course.');
    },
  });
}

export function useEnrollInCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.enrollInCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      toast.success('Successfully enrolled in course!');
    },
    onError: () => {
      toast.error('Failed to enroll in course.');
    },
  });
}

export function useGetEnrollmentsForTrainee(traineeId: Principal | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Enrollment[]>({
    queryKey: ['enrollments', traineeId?.toString()],
    queryFn: async () => {
      if (!actor || !traineeId) return [];
      return actor.getEnrollmentsForTrainee(traineeId);
    },
    enabled: !!actor && !isFetching && !!traineeId,
  });
}

// ─── User Progress ────────────────────────────────────────────────────────────

export function useGetUserProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<{ profile?: UserProfile; enrollments: Enrollment[] }>({
    queryKey: ['userProgress'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAchievements() {
  const { actor, isFetching } = useActor();

  return useQuery<{ completedCourses: bigint; ongoingCourses: bigint; achievements: string[] }>({
    queryKey: ['achievements'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAchievements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateEnrollmentProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ enrollmentId, progress }: { enrollmentId: bigint; progress: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateEnrollmentProgress(enrollmentId, progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['achievements'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast.success('Progress updated!');
    },
    onError: () => {
      toast.error('Failed to update progress.');
    },
  });
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export function useGetApprovedTestimonials() {
  const { actor, isFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ['approvedTestimonials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();

  return useQuery<Testimonial[]>({
    queryKey: ['allTestimonials'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      farmerName,
      location,
      farmingArea,
      testimonialText,
    }: {
      farmerName: string;
      location: string;
      farmingArea: string;
      testimonialText: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitTestimonial(farmerName, location, farmingArea, testimonialText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedTestimonials'] });
      queryClient.invalidateQueries({ queryKey: ['allTestimonials'] });
      toast.success('Testimonial submitted! It will appear after admin approval.');
    },
    onError: () => {
      toast.error('Failed to submit testimonial.');
    },
  });
}

export function useApproveTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonialId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveTestimonial(testimonialId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedTestimonials'] });
      queryClient.invalidateQueries({ queryKey: ['allTestimonials'] });
      toast.success('Testimonial approved!');
    },
    onError: () => {
      toast.error('Failed to approve testimonial.');
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonialId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteTestimonial(testimonialId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvedTestimonials'] });
      queryClient.invalidateQueries({ queryKey: ['allTestimonials'] });
      toast.success('Testimonial deleted.');
    },
    onError: () => {
      toast.error('Failed to delete testimonial.');
    },
  });
}

// ─── Farming Techniques ───────────────────────────────────────────────────────

export function useGetAllTechniques() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['techniques'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTechniques();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── GDP Stats ────────────────────────────────────────────────────────────────

export function useGetGdpStats() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['gdpStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getGdpStats();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useUpdateGdpStats() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      yieldImprovements,
      trainedFarmers,
      revenueGenerated,
      gdpProgress,
    }: {
      yieldImprovements: number;
      trainedFarmers: bigint;
      revenueGenerated: number;
      gdpProgress: number;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGdpStats(yieldImprovements, trainedFarmers, revenueGenerated, gdpProgress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gdpStats'] });
      toast.success('GDP stats updated!');
    },
  });
}

// ─── Courseware ───────────────────────────────────────────────────────────────

export function useGetAllCourseware() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['courseware'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourseware();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePurchaseCourseware() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.purchaseCourseware(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseware'] });
      toast.success('Purchase successful!');
    },
    onError: () => {
      toast.error('Purchase failed.');
    },
  });
}

// ─── Success Stories ──────────────────────────────────────────────────────────

export function useGetAllSuccessStories() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['successStories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSuccessStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSuccessStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      farmerName,
      location,
      technique,
      outcome,
    }: {
      farmerName: string;
      location: string;
      technique: string;
      outcome: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addSuccessStory(farmerName, location, technique, outcome);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['successStories'] });
      toast.success('Success story added!');
    },
  });
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      contactDetails,
      location,
      interests,
    }: {
      name: string;
      contactDetails: string;
      location: string;
      interests: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(name, contactDetails, location, interests);
    },
    onSuccess: () => {
      toast.success('Registration submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit registration.');
    },
  });
}

// ─── Admin: Submissions ───────────────────────────────────────────────────────

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin: Users ─────────────────────────────────────────────────────────────

export function useGetAllUsers() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAssignUserRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: import('../backend').UserRole }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.assignCallerUserRole(Principal.fromText(userId), role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
      toast.success('Role assigned!');
    },
  });
}

// ─── Public Content ───────────────────────────────────────────────────────────

export function useGetPublicContent() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['publicContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPublicContent();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useUpdatePublicContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      mission: string;
      vision: string;
      goals: string;
      team: import('../backend').TeamMember[];
      news: import('../backend').NewsItem[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePublicContent(
        params.mission,
        params.vision,
        params.goals,
        params.team,
        params.news
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicContent'] });
      toast.success('Content updated!');
    },
  });
}

// ─── SOPs ─────────────────────────────────────────────────────────────────────

export function useSOPs() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['sops'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllSops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSOPsByProductionType(productionType: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['sops', productionType],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSopsByProductionType(productionType);
    },
    enabled: !!actor && !isFetching && !!productionType,
  });
}

export function useCreateSOP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      productionType: string;
      procedures: string[];
      roles: string[];
      qualityStandards: string[];
      documentationRequirements: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createSop(
        params.title,
        params.description,
        params.productionType,
        params.procedures,
        params.roles,
        params.qualityStandards,
        params.documentationRequirements
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sops'] });
      toast.success('SOP created!');
    },
  });
}

export function useUpdateSOP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      sopId: bigint;
      title: string;
      description: string;
      productionType: string;
      procedures: string[];
      roles: string[];
      qualityStandards: string[];
      documentationRequirements: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateSop(
        params.sopId,
        params.title,
        params.description,
        params.productionType,
        params.procedures,
        params.roles,
        params.qualityStandards,
        params.documentationRequirements
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sops'] });
      toast.success('SOP updated!');
    },
  });
}

export function useDeleteSOP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sopId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteSop(sopId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sops'] });
      toast.success('SOP deleted!');
    },
  });
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export function useGetProjectsByStatus(status: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['projects', 'status', status],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProjectsByStatus(status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProjectsByType(productionType: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['projects', 'type', productionType],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getProjectsByType(productionType);
    },
    enabled: !!actor && !isFetching && !!productionType,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      productionType: string;
      status: string;
      startDate: bigint;
      endDate: bigint | undefined;
      outcomes: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProject(
        params.title,
        params.description,
        params.productionType,
        params.status,
        params.startDate,
        params.endDate ?? null,
        params.outcomes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created!');
    },
  });
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

export function useGetMetricsByType(productionType: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['metrics', productionType],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMetricsByType(productionType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProductionMetric() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productionType,
      metricName,
      value,
    }: {
      productionType: string;
      metricName: string;
      value: number;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addProductionMetric(productionType, metricName, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      toast.success('Metric added!');
    },
  });
}

// ─── Approvals ────────────────────────────────────────────────────────────────

export function useListApprovals() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['approvals'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.listApprovals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetApproval() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: string;
      status: import('../backend').ApprovalStatus;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setApproval(Principal.fromText(userId), status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
      toast.success('Approval status updated!');
    },
  });
}
