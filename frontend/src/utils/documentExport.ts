import type { PedagogyMetrics } from '../hooks/usePedagogyData';
import type { Course, Project } from '../backend';

export interface FrameworkContent {
  metrics: PedagogyMetrics;
  courses: Course[];
  projects: Project[];
}

export function generateFrameworkDocument(content: FrameworkContent): string {
  const { metrics, courses, projects } = content;

  return `
GELEPHU FARMERS ACADEMY
Training + Production Hybrid Pedagogy Framework
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════════════════

1. EXECUTIVE SUMMARY

The Gelephu Farmers Academy implements a unique training-production hybrid model that combines structured agricultural education with hands-on production experience. This framework enables students to learn while earning, creating sustainable pathways to agricultural entrepreneurship.

Current Impact:
• ${metrics.totalCourses} active training courses
• ${metrics.totalProjects} ongoing projects
• ${metrics.totalEnrollments} student enrollments
• ${metrics.averageProgress}% average completion rate

═══════════════════════════════════════════════════════════════

2. CURRICULUM STRUCTURE

The academy offers comprehensive training across three production areas:

2.1 Hydroponic Systems Training
Focus: Modern soilless farming techniques
Duration: 12-16 weeks
Key Modules:
  - System design and setup
  - Nutrient management
  - Plant selection and care
  - Troubleshooting and optimization

2.2 Plant Nursery Management
Focus: Seedling production and propagation
Duration: 10-14 weeks
Key Modules:
  - Seed germination techniques
  - Transplanting and hardening
  - Pest and disease management
  - Quality control

2.3 Bamboo Cultivation
Focus: Sustainable bamboo farming
Duration: 14-18 weeks
Key Modules:
  - Species selection
  - Planting and maintenance
  - Harvesting techniques
  - Value-added processing

═══════════════════════════════════════════════════════════════

3. TRAINING-PRODUCTION INTEGRATION

The hybrid model ensures students gain practical experience while contributing to production:

Phase 1: Foundation (Weeks 1-4)
• Theoretical knowledge
• Safety protocols
• Basic techniques
• System familiarization

Phase 2: Supervised Practice (Weeks 5-8)
• Hands-on training
• Guided production tasks
• Quality assessment
• Problem-solving exercises

Phase 3: Independent Production (Weeks 9-12)
• Autonomous operations
• Production responsibility
• Mentoring junior students
• Innovation projects

Phase 4: Entrepreneurship (Weeks 13+)
• Business planning
• Market analysis
• Financial management
• Scaling strategies

═══════════════════════════════════════════════════════════════

4. LEARNING OUTCOMES

Upon completion, students will be able to:

Technical Skills:
✓ Design and operate production systems
✓ Manage crop cycles from seed to harvest
✓ Troubleshoot common production issues
✓ Maintain quality standards
✓ Optimize resource utilization

Business Skills:
✓ Calculate production costs
✓ Identify market opportunities
✓ Develop business plans
✓ Manage cash flow
✓ Scale operations sustainably

Soft Skills:
✓ Problem-solving and critical thinking
✓ Team collaboration
✓ Time management
✓ Communication and presentation
✓ Continuous learning mindset

═══════════════════════════════════════════════════════════════

5. ASSESSMENT CRITERIA

Student progress is evaluated through:

Knowledge Assessment (30%)
• Written examinations
• Oral presentations
• Case study analysis

Practical Skills (40%)
• Production task completion
• Quality of output
• Efficiency metrics
• Safety compliance

Project Work (20%)
• Innovation projects
• Problem-solving initiatives
• Peer teaching activities

Professional Development (10%)
• Attendance and punctuality
• Teamwork and collaboration
• Initiative and leadership

═══════════════════════════════════════════════════════════════

6. PRODUCTION METRICS

Current production performance demonstrates the model's viability:

Hydroponic Production: ${metrics.productionMetrics.hydroponic.toFixed(1)} kg/month average
Nursery Output: ${metrics.productionMetrics.nursery.toFixed(0)} seedlings/month average
Bamboo Cultivation: ${metrics.productionMetrics.bamboo.toFixed(1)} units/month average

═══════════════════════════════════════════════════════════════

7. SCALABILITY FRAMEWORK

This pedagogy can be replicated through:

Infrastructure Requirements:
• Production facilities (hydroponic, nursery, or bamboo)
• Training classroom space
• Basic equipment and tools
• Water and power supply

Human Resources:
• Lead instructor (agricultural background)
• Production supervisor
• Business mentor
• Administrative support

Implementation Timeline:
• Month 1-2: Facility setup and equipment procurement
• Month 3: Instructor training and curriculum adaptation
• Month 4: Student recruitment and orientation
• Month 5+: Full program operation

═══════════════════════════════════════════════════════════════

8. ALIGNMENT WITH NATIONAL GOALS

This model directly supports:

✓ GMC (Gelephu Mindfulness City) Vision
  - Sustainable agriculture practices
  - Youth employment creation
  - Innovation and entrepreneurship

✓ 10x GDP Growth Strategy
  - Agricultural productivity increase
  - Value-added production
  - Export potential development

✓ Rural Development
  - Youth retention in agriculture
  - Income generation opportunities
  - Community capacity building

═══════════════════════════════════════════════════════════════

9. IMPLEMENTATION TOOLKIT

Available resources for replication:

□ Curriculum modules and lesson plans
□ Assessment templates and rubrics
□ Production standard operating procedures
□ Business planning templates
□ Student progress tracking tools
□ Instructor training materials
□ Equipment procurement guides
□ Financial planning worksheets

═══════════════════════════════════════════════════════════════

10. CONTACT & SUPPORT

For implementation support, training, or partnership inquiries:

Gelephu Farmers Academy
Gelephu, Bhutan
Email: info@gelephufarmers.bt

═══════════════════════════════════════════════════════════════

© ${new Date().getFullYear()} Gelephu Farmers Academy
All Rights Reserved
  `.trim();
}

export function downloadFrameworkDocument(content: FrameworkContent) {
  const documentText = generateFrameworkDocument(content);
  const blob = new Blob([documentText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Pedagogy-Framework-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
