import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Phone, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I enroll in a training program?',
    answer:
      'You can enroll by visiting our Training page, browsing available courses, and clicking the Enroll button. You will need to create an account first. Alternatively, call us at +975 77421966 or send a WhatsApp message to register directly.',
  },
  {
    question: 'Are the training programs free?',
    answer:
      'Many of our foundational programs are subsidized or free for eligible farmers. Some specialized courses and courseware materials may have a fee. Contact us for details on current fee structures and available scholarships.',
  },
  {
    question: 'Is accommodation provided during training?',
    answer:
      'Yes, residential accommodation is available for outstation farmers attending full-time programs. Please indicate your accommodation needs when registering. Limited spaces are available, so early registration is recommended.',
  },
  {
    question: 'What production types does the academy cover?',
    answer:
      'We currently offer training in three main production areas: Hydroponics (soil-less vegetable cultivation), Bamboo Cultivation (sustainable bamboo farming for construction and export), and Plant Nursery Management (seedling production and care).',
  },
  {
    question: 'Will I get hands-on practical experience?',
    answer:
      'Absolutely! Our pedagogy model integrates classroom learning with hands-on production work. Trainees spend significant time working in our actual production facilities, gaining real-world experience while contributing to the academy\'s output.',
  },
  {
    question: 'What job opportunities are available after training?',
    answer:
      'Graduates can pursue opportunities as independent farmers, farm managers, agricultural consultants, or employees at commercial farms. The academy also maintains a network of partner organizations and businesses that prefer hiring our graduates.',
  },
  {
    question: 'How does the academy contribute to Bhutan\'s GDP goals?',
    answer:
      'The Gelephu Farmers Academy is aligned with the Gelephu Mindfulness City initiative and Bhutan\'s 10x GDP growth target. By training skilled farmers in high-yield modern techniques, we directly increase agricultural productivity and farmer incomes, contributing to national economic growth.',
  },
  {
    question: 'Can I access training materials online?',
    answer:
      'Yes! We offer downloadable PDF guides, SOPs, and courseware through our Training and Store pages. These resources cover farming techniques, standard operating procedures, and best practices that you can reference anytime.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Find answers to common questions about our programs, enrollment, and facilities.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-4 sm:px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-medium py-4 sm:py-5 min-h-[56px] hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6 pb-6 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Still have questions?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Our team is happy to help. Reach out via phone or WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+97577421966" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full min-h-[48px] gap-2">
                  <Phone className="w-4 h-4" />
                  Call +975 77421966
                </Button>
              </a>
              <a
                href="https://wa.me/97577421966"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full min-h-[48px] gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
