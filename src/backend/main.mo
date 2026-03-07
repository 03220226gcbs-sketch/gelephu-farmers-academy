import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";



actor {
  public type FarmingTechnique = {
    id : Nat;
    title : Text;
    description : Text;
    benefits : Text;
  };

  public type GdpImpactStat = {
    yieldImprovements : Float;
    trainedFarmers : Nat;
    revenueGenerated : Float;
    gdpProgress : Float;
  };

  public type CoursewareProduct = {
    id : Nat;
    title : Text;
    description : Text;
    price : Float;
    inventory : Nat;
  };

  public type FarmerSuccessStory = {
    id : Nat;
    farmerName : Text;
    location : Text;
    technique : Text;
    outcome : Text;
  };

  public type ContactFormSubmission = {
    id : Nat;
    name : Text;
    contactDetails : Text;
    location : Text;
    interests : Text;
    timestamp : Int;
  };

  public type Course = {
    id : Nat;
    title : Text;
    description : Text;
    instructorId : Principal;
    startDate : Time.Time;
    endDate : Time.Time;
    productionType : Text;
  };

  public type UserProfile = {
    id : Principal;
    name : Text;
    email : Text;
    role : AccessControl.UserRole;
    bio : Text;
  };

  public type Enrollment = {
    id : Nat;
    courseId : Nat;
    traineeId : Principal;
    progress : Nat;
  };

  public type Project = {
    id : Nat;
    title : Text;
    description : Text;
    productionType : Text;
    status : Text;
    startDate : Time.Time;
    endDate : ?Time.Time;
    outcomes : Text;
  };

  public type ProductionMetric = {
    id : Nat;
    productionType : Text;
    metricName : Text;
    value : Float;
    timestamp : Time.Time;
  };

  public type PublicContent = {
    mission : Text;
    vision : Text;
    goals : Text;
    team : [TeamMember];
    news : [NewsItem];
  };

  public type TeamMember = {
    name : Text;
    role : Text;
    expertise : Text;
  };

  public type NewsItem = {
    title : Text;
    content : Text;
    date : Time.Time;
  };

  public type SOP = {
    id : Nat;
    title : Text;
    description : Text;
    productionType : Text;
    procedures : [Text];
    roles : [Text];
    qualityStandards : [Text];
    documentationRequirements : [Text];
  };

  public type Testimonial = {
    id : Nat;
    farmerName : Text;
    location : Text;
    farmingArea : Text;
    testimonialText : Text;
    approved : Bool;
    submittedAt : Time.Time;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let courses = Map.empty<Nat, Course>();
  let users = Map.empty<Principal, UserProfile>();
  let enrollments = Map.empty<Nat, Enrollment>();
  let projects = Map.empty<Nat, Project>();
  let productionMetrics = Map.empty<Nat, ProductionMetric>();
  let sops = Map.empty<Nat, SOP>();
  let testimonials = Map.empty<Nat, Testimonial>();

  let techniques = Map.empty<Nat, FarmingTechnique>();
  let courseware = Map.empty<Nat, CoursewareProduct>();
  let successStories = Map.empty<Nat, FarmerSuccessStory>();
  let submissions = Map.empty<Nat, ContactFormSubmission>();

  var gdpStats : ?GdpImpactStat = null;
  var nextCourseId = 1;
  var nextEnrollmentId = 1;
  var nextProjectId = 1;
  var nextMetricId = 1;
  var nextSopId = 1;
  var nextTechniqueId = 1;
  var nextProductId = 1;
  var nextStoryId = 1;
  var nextSubmissionId = 1;
  var nextTestimonialId = 1;
  var publicContent : ?PublicContent = null;

  let hydroponicPedagogyModules : [Project] = [
    {
      id = 12;
      title = "Module 1: Introduction to Hydroponics";
      description = "Learn the basics of hydroponic systems, including history, benefits, and fundamental concepts.";
      productionType = "hydroponic";
      status = "ongoing";
      startDate = Time.now();
      endDate = null;
      outcomes = "Understanding of hydroponic principles and system types.";
    },
    {
      id = 13;
      title = "Module 2: System Design and Setup";
      description = "Explore different hydroponic system designs, setup processes, and necessary equipment.";
      productionType = "hydroponic";
      status = "ongoing";
      startDate = Time.now();
      endDate = null;
      outcomes = "Ability to design and set up basic hydroponic systems.";
    },
    {
      id = 14;
      title = "Module 3: Plant Selection and Care";
      description = "Learn about suitable plants for hydroponics, nutrient management, and plant care techniques.";
      productionType = "hydroponic";
      status = "ongoing";
      startDate = Time.now();
      endDate = null;
      outcomes = "Knowledge of plant selection, nutrient solutions, and maintenance.";
    },
    {
      id = 15;
      title = "Module 4: Troubleshooting and Optimization";
      description = "Identify common issues in hydroponics and learn strategies for optimizing growth and yield.";
      productionType = "hydroponic";
      status = "ongoing";
      startDate = Time.now();
      endDate = null;
      outcomes = "Skills in troubleshooting, problem-solving, and system optimization.";
    },
  ];

  // User approval logic from component
  let approvalState = UserApproval.initState(accessControlState);

  // User approval system from component
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // Modern Farming Techniques Library Functions
  public shared ({ caller }) func addFarmingTechnique(title : Text, description : Text, benefits : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add techniques");
    };
    let technique : FarmingTechnique = {
      id = nextTechniqueId;
      title;
      description;
      benefits;
    };
    techniques.add(nextTechniqueId, technique);
    nextTechniqueId += 1;
  };

  public query func getAllTechniques() : async [FarmingTechnique] {
    techniques.values().toArray();
  };

  // GDP Impact Dashboard Functions
  public shared ({ caller }) func updateGdpStats(
    yieldImprovements : Float,
    trainedFarmers : Nat,
    revenueGenerated : Float,
    gdpProgress : Float,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update GDP stats");
    };

    gdpStats := ?{
      yieldImprovements;
      trainedFarmers;
      revenueGenerated;
      gdpProgress;
    };
  };

  public query func getGdpStats() : async GdpImpactStat {
    switch (gdpStats) {
      case (null) { Runtime.trap("No GDP stats found") };
      case (?stats) { stats };
    };
  };

  // Courseware Store Functions
  public shared ({ caller }) func addCoursewareProduct(
    title : Text,
    description : Text,
    price : Float,
    inventory : Nat,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : CoursewareProduct = {
      id = nextProductId;
      title;
      description;
      price;
      inventory;
    };

    courseware.add(nextProductId, product);
    nextProductId += 1;
  };

  public query func getAllCourseware() : async [CoursewareProduct] {
    courseware.values().toArray();
  };

  public shared ({ caller }) func purchaseCourseware(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can purchase products");
    };

    switch (courseware.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (quantity > product.inventory) {
          Runtime.trap("Not enough inventory available");
        };

        let updatedProduct : CoursewareProduct = {
          id = product.id;
          title = product.title;
          description = product.description;
          price = product.price;
          inventory = product.inventory - quantity;
        };

        courseware.add(productId, updatedProduct);
      };
    };
  };

  // Farmer Success Stories Functions
  public shared ({ caller }) func addSuccessStory(
    farmerName : Text,
    location : Text,
    technique : Text,
    outcome : Text,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add success stories");
    };

    let story : FarmerSuccessStory = {
      id = nextStoryId;
      farmerName;
      location;
      technique;
      outcome;
    };

    successStories.add(nextStoryId, story);
    nextStoryId += 1;
  };

  public query func getAllSuccessStories() : async [FarmerSuccessStory] {
    successStories.values().toArray();
  };

  // Contact and Registration Form Functions
  public shared ({ caller }) func submitContactForm(
    name : Text,
    contactDetails : Text,
    location : Text,
    interests : Text,
  ) : async () {
    let submission : ContactFormSubmission = {
      id = nextSubmissionId;
      name;
      contactDetails;
      location;
      interests;
      timestamp = Time.now();
    };

    submissions.add(nextSubmissionId, submission);
    nextSubmissionId += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view form submissions");
    };
    submissions.values().toArray();
  };

  // Course Management
  public shared ({ caller }) func createCourse(
    title : Text,
    description : Text,
    instructorId : Principal,
    startDate : Time.Time,
    endDate : Time.Time,
    productionType : Text,
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create courses");
    };

    let course : Course = {
      id = nextCourseId;
      title;
      description;
      instructorId;
      startDate;
      endDate;
      productionType;
    };

    courses.add(nextCourseId, course);
    nextCourseId += 1;
    course.id;
  };

  public query ({ caller }) func getCourses() : async [Course] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view courses");
    };
    courses.values().toArray();
  };

  public query ({ caller }) func getProjectsByType(productionType : Text) : async [Project] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view projects");
    };

    if (productionType == "hydroponic") {
      return hydroponicPedagogyModules;
    };

    projects.values().toArray().filter(func(p) { p.productionType == productionType });
  };

  public shared ({ caller }) func addSectorTemplate(_sector : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add sector templates");
    };
    1;
  };

  public query ({ caller }) func getCoursesByProductionType(productionType : Text) : async [Course] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view courses");
    };
    courses.values().toArray().filter(func(course) { course.productionType == productionType });
  };

  public query ({ caller }) func getCourse(courseId : Nat) : async Course {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view courses");
    };
    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course not found") };
      case (?course) { course };
    };
  };

  public shared ({ caller }) func updateUserProfile(name : Text, email : Text, bio : Text) : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update profiles");
    };

    let role = AccessControl.getUserRole(accessControlState, caller);
    let existingProfile : UserProfile = {
      id = caller;
      name;
      email;
      role;
      bio;
    };

    users.add(caller, existingProfile);
    existingProfile;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    users.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };

    let role = AccessControl.getUserRole(accessControlState, caller);
    let updatedProfile : UserProfile = {
      id = caller;
      name = profile.name;
      email = profile.email;
      role;
      bio = profile.bio;
    };

    users.add(caller, updatedProfile);
  };

  public query ({ caller }) func getUserProfile(userId : Principal) : async ?UserProfile {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(userId);
  };

  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    users.values().toArray();
  };

  public shared ({ caller }) func enrollInCourse(courseId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can enroll in courses");
    };

    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course not found") };
      case (?_) {};
    };

    let enrollment : Enrollment = {
      id = nextEnrollmentId;
      courseId;
      traineeId = caller;
      progress = 0;
    };

    enrollments.add(nextEnrollmentId, enrollment);
    nextEnrollmentId += 1;
    enrollment.id;
  };

  public shared ({ caller }) func updateEnrollmentProgress(enrollmentId : Nat, progress : Nat) : async () {
    // Must be at least an authenticated user to update progress
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update enrollment progress");
    };

    switch (enrollments.get(enrollmentId)) {
      case (null) { Runtime.trap("Enrollment not found") };
      case (?enrollment) {
        let isTrainee = enrollment.traineeId == caller;
        var isInstructor = false;

        switch (courses.get(enrollment.courseId)) {
          case (?course) {
            isInstructor := course.instructorId == caller;
          };
          case (null) {};
        };

        let isAdmin = AccessControl.isAdmin(accessControlState, caller);

        if (not (isTrainee or isInstructor or isAdmin)) {
          Runtime.trap("Unauthorized: Only the trainee, their instructor, or admin can update progress");
        };

        let updatedEnrollment : Enrollment = {
          id = enrollment.id;
          courseId = enrollment.courseId;
          traineeId = enrollment.traineeId;
          progress;
        };
        enrollments.add(enrollmentId, updatedEnrollment);
      };
    };
  };

  public query ({ caller }) func getEnrollmentsForTrainee(traineeId : Principal) : async [Enrollment] {
    let isOwnEnrollments = traineeId == caller;
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    if (not (isOwnEnrollments or isAdmin)) {
      let traineeEnrollments = enrollments.values().toArray().filter(func(e) { e.traineeId == traineeId });
      var isInstructor = false;

      for (enrollment in traineeEnrollments.vals()) {
        switch (courses.get(enrollment.courseId)) {
          case (?course) {
            if (course.instructorId == caller) {
              isInstructor := true;
            };
          };
          case (null) {};
        };
      };

      if (not isInstructor) {
        Runtime.trap("Unauthorized: Can only view your own enrollments or those of your students");
      };
    };

    enrollments.values().toArray().filter(func(e) { e.traineeId == traineeId });
  };

  public shared ({ caller }) func createProject(
    title : Text,
    description : Text,
    productionType : Text,
    status : Text,
    startDate : Time.Time,
    endDate : ?Time.Time,
    outcomes : Text,
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };

    let project : Project = {
      id = nextProjectId;
      title;
      description;
      productionType;
      status;
      startDate;
      endDate;
      outcomes;
    };

    projects.add(nextProjectId, project);
    nextProjectId += 1;
    project.id;
  };

  public query ({ caller }) func getProjectsByStatus(status : Text) : async [Project] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view projects");
    };
    projects.values().toArray().filter(func(p) { p.status == status });
  };

  public shared ({ caller }) func addProductionMetric(productionType : Text, metricName : Text, value : Float) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add metrics");
    };

    let metric : ProductionMetric = {
      id = nextMetricId;
      productionType;
      metricName;
      value;
      timestamp = Time.now();
    };

    productionMetrics.add(nextMetricId, metric);
    nextMetricId += 1;
    metric.id;
  };

  public query ({ caller }) func getMetricsByType(productionType : Text) : async [ProductionMetric] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view metrics");
    };
    productionMetrics.values().toArray().filter(func(m) { m.productionType == productionType });
  };

  public shared ({ caller }) func updatePublicContent(mission : Text, vision : Text, goals : Text, team : [TeamMember], news : [NewsItem]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update public content");
    };

    publicContent := ?{
      mission;
      vision;
      goals;
      team;
      news;
    };
  };

  public query func getPublicContent() : async PublicContent {
    switch (publicContent) {
      case (null) { Runtime.trap("No public content found") };
      case (?content) { content };
    };
  };

  // SOP Management Functions
  public shared ({ caller }) func createSop(
    title : Text,
    description : Text,
    productionType : Text,
    procedures : [Text],
    roles : [Text],
    qualityStandards : [Text],
    documentationRequirements : [Text],
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create SOPs");
    };

    let sop : SOP = {
      id = nextSopId;
      title;
      description;
      productionType;
      procedures;
      roles;
      qualityStandards;
      documentationRequirements;
    };

    sops.add(nextSopId, sop);
    nextSopId += 1;
    sop.id;
  };

  public query ({ caller }) func getSop(sopId : Nat) : async SOP {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view SOPs");
    };
    switch (sops.get(sopId)) {
      case (null) { Runtime.trap("SOP not found") };
      case (?sop) { sop };
    };
  };

  public query ({ caller }) func getSopsByProductionType(productionType : Text) : async [SOP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view SOPs");
    };
    sops.values().toArray().filter(func(sop) { sop.productionType == productionType });
  };

  public shared ({ caller }) func updateSop(
    sopId : Nat,
    title : Text,
    description : Text,
    productionType : Text,
    procedures : [Text],
    roles : [Text],
    qualityStandards : [Text],
    documentationRequirements : [Text],
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update SOPs");
    };

    switch (sops.get(sopId)) {
      case (null) { Runtime.trap("SOP not found") };
      case (?_) {
        let updatedSop : SOP = {
          id = sopId;
          title;
          description;
          productionType;
          procedures;
          roles;
          qualityStandards;
          documentationRequirements;
        };
        sops.add(sopId, updatedSop);
      };
    };
  };

  public shared ({ caller }) func deleteSop(sopId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete SOPs");
    };

    switch (sops.get(sopId)) {
      case (null) { Runtime.trap("SOP not found") };
      case (?_) {
        sops.remove(sopId);
      };
    };
  };

  public query ({ caller }) func getAllSops() : async [SOP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view SOPs");
    };
    sops.values().toArray();
  };

  // User account and progress
  public query ({ caller }) func getUserProgress() : async {
    profile : ?UserProfile;
    enrollments : [Enrollment];
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view progress");
    };
    let userEnrollments = enrollments.values().toArray().filter(func(e) { e.traineeId == caller });
    {
      profile = users.get(caller);
      enrollments = userEnrollments;
    };
  };

  public query ({ caller }) func getAchievements() : async {
    completedCourses : Nat;
    ongoingCourses : Nat;
    achievements : [Text];
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view achievements");
    };
    let userEnrollments = enrollments.values().toArray().filter(func(e) { e.traineeId == caller });
    let completedCourses = userEnrollments.filter(func(e) { e.progress == 100 }).size();
    let ongoingCourses = userEnrollments.size() - completedCourses;

    let achievements : [Text] = [
      "First Course Completed",
      "3 Courses Completed",
    ];

    {
      completedCourses;
      ongoingCourses;
      achievements;
    };
  };

  // Testimonial functionality
  // Only authenticated users (farmers) can submit testimonials to prevent anonymous spam
  public shared ({ caller }) func submitTestimonial(farmerName : Text, location : Text, farmingArea : Text, testimonialText : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit testimonials");
    };

    let testimonial : Testimonial = {
      id = nextTestimonialId;
      farmerName;
      location;
      farmingArea;
      testimonialText;
      approved = false;
      submittedAt = Time.now();
    };

    testimonials.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
  };

  public shared ({ caller }) func approveTestimonial(testimonialId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can approve testimonials");
    };

    switch (testimonials.get(testimonialId)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) {
        let approvedTestimonial : Testimonial = {
          testimonial with
          approved = true
        };
        testimonials.add(testimonialId, approvedTestimonial);
      };
    };
  };

  public query func getApprovedTestimonials() : async [Testimonial] {
    testimonials.values().toArray().filter(func(t) { t.approved });
  };

  public shared ({ caller }) func deleteTestimonial(testimonialId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };

    switch (testimonials.get(testimonialId)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) {
        testimonials.remove(testimonialId);
      };
    };
  };

  // Admin-only: view all testimonials including unapproved ones
  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all testimonials");
    };
    testimonials.values().toArray();
  };
};
