import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GdpImpactStat {
    trainedFarmers: bigint;
    gdpProgress: number;
    yieldImprovements: number;
    revenueGenerated: number;
}
export interface FarmingTechnique {
    id: bigint;
    title: string;
    description: string;
    benefits: string;
}
export type Time = bigint;
export interface CoursewareProduct {
    id: bigint;
    title: string;
    inventory: bigint;
    description: string;
    price: number;
}
export interface Enrollment {
    id: bigint;
    traineeId: Principal;
    progress: bigint;
    courseId: bigint;
}
export interface NewsItem {
    title: string;
    content: string;
    date: Time;
}
export interface PublicContent {
    mission: string;
    news: Array<NewsItem>;
    team: Array<TeamMember>;
    goals: string;
    vision: string;
}
export interface ProductionMetric {
    id: bigint;
    value: number;
    productionType: string;
    timestamp: Time;
    metricName: string;
}
export interface Course {
    id: bigint;
    title: string;
    endDate: Time;
    description: string;
    instructorId: Principal;
    productionType: string;
    startDate: Time;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface ContactFormSubmission {
    id: bigint;
    interests: string;
    name: string;
    timestamp: bigint;
    location: string;
    contactDetails: string;
}
export interface TeamMember {
    name: string;
    role: string;
    expertise: string;
}
export interface SOP {
    id: bigint;
    title: string;
    procedures: Array<string>;
    qualityStandards: Array<string>;
    description: string;
    productionType: string;
    roles: Array<string>;
    documentationRequirements: Array<string>;
}
export interface Project {
    id: bigint;
    status: string;
    title: string;
    endDate?: Time;
    description: string;
    productionType: string;
    outcomes: string;
    startDate: Time;
}
export interface FarmerSuccessStory {
    id: bigint;
    technique: string;
    outcome: string;
    location: string;
    farmerName: string;
}
export interface UserProfile {
    id: Principal;
    bio: string;
    name: string;
    role: UserRole;
    email: string;
}
export interface Testimonial {
    id: bigint;
    farmingArea: string;
    submittedAt: Time;
    testimonialText: string;
    approved: boolean;
    location: string;
    farmerName: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCoursewareProduct(title: string, description: string, price: number, inventory: bigint): Promise<void>;
    addFarmingTechnique(title: string, description: string, benefits: string): Promise<void>;
    addProductionMetric(productionType: string, metricName: string, value: number): Promise<bigint>;
    addSectorTemplate(_sector: string): Promise<bigint>;
    addSuccessStory(farmerName: string, location: string, technique: string, outcome: string): Promise<void>;
    approveTestimonial(testimonialId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCourse(title: string, description: string, instructorId: Principal, startDate: Time, endDate: Time, productionType: string): Promise<bigint>;
    createProject(title: string, description: string, productionType: string, status: string, startDate: Time, endDate: Time | null, outcomes: string): Promise<bigint>;
    createSop(title: string, description: string, productionType: string, procedures: Array<string>, roles: Array<string>, qualityStandards: Array<string>, documentationRequirements: Array<string>): Promise<bigint>;
    deleteSop(sopId: bigint): Promise<void>;
    deleteTestimonial(testimonialId: bigint): Promise<void>;
    enrollInCourse(courseId: bigint): Promise<bigint>;
    getAchievements(): Promise<{
        ongoingCourses: bigint;
        completedCourses: bigint;
        achievements: Array<string>;
    }>;
    getAllCourseware(): Promise<Array<CoursewareProduct>>;
    getAllSops(): Promise<Array<SOP>>;
    getAllSubmissions(): Promise<Array<ContactFormSubmission>>;
    getAllSuccessStories(): Promise<Array<FarmerSuccessStory>>;
    getAllTechniques(): Promise<Array<FarmingTechnique>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getApprovedTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourse(courseId: bigint): Promise<Course>;
    getCourses(): Promise<Array<Course>>;
    getCoursesByProductionType(productionType: string): Promise<Array<Course>>;
    getEnrollmentsForTrainee(traineeId: Principal): Promise<Array<Enrollment>>;
    getGdpStats(): Promise<GdpImpactStat>;
    getMetricsByType(productionType: string): Promise<Array<ProductionMetric>>;
    getProjectsByStatus(status: string): Promise<Array<Project>>;
    getProjectsByType(productionType: string): Promise<Array<Project>>;
    getPublicContent(): Promise<PublicContent>;
    getSop(sopId: bigint): Promise<SOP>;
    getSopsByProductionType(productionType: string): Promise<Array<SOP>>;
    getUserProfile(userId: Principal): Promise<UserProfile | null>;
    getUserProgress(): Promise<{
        profile?: UserProfile;
        enrollments: Array<Enrollment>;
    }>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    purchaseCourseware(productId: bigint, quantity: bigint): Promise<void>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    submitContactForm(name: string, contactDetails: string, location: string, interests: string): Promise<void>;
    submitTestimonial(farmerName: string, location: string, farmingArea: string, testimonialText: string): Promise<void>;
    updateEnrollmentProgress(enrollmentId: bigint, progress: bigint): Promise<void>;
    updateGdpStats(yieldImprovements: number, trainedFarmers: bigint, revenueGenerated: number, gdpProgress: number): Promise<void>;
    updatePublicContent(mission: string, vision: string, goals: string, team: Array<TeamMember>, news: Array<NewsItem>): Promise<void>;
    updateSop(sopId: bigint, title: string, description: string, productionType: string, procedures: Array<string>, roles: Array<string>, qualityStandards: Array<string>, documentationRequirements: Array<string>): Promise<void>;
    updateUserProfile(name: string, email: string, bio: string): Promise<UserProfile>;
}
