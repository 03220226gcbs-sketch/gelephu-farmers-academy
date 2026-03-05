import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, CheckCircle, Send } from 'lucide-react';
import { useSubmitContactForm } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../hooks/useLanguage';

export default function ContactPage() {
  const { t } = useLanguage();
  const submitMutation = useSubmitContactForm();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contactDetails: '',
    location: '',
    interests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(form);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your registration has been received. Our team will contact you within 2 business days.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            For immediate assistance, call or WhatsApp:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:77421966"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +975 77421966
            </a>
            <a
              href="https://wa.me/97577421966"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
          <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setForm({ name: '', contactDetails: '', location: '', interests: '' }); }}>
            Submit Another
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">{t('contact.title')}</h1>
          <p className="text-lg opacity-90">
            Join the Gelephu Farmers Academy and transform your farming practice
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          {/* Prominent Phone Card */}
          <Card className="border-2 border-primary bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Call or WhatsApp Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-1">+975 77421966</p>
              <p className="text-sm text-muted-foreground mb-4">
                Prefer to talk? Reach us directly — we're available Mon–Sat, 8am–6pm.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:77421966"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/97577421966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Chat
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Location</p>
                  <p className="text-sm text-muted-foreground">Gelephu, Sarpang Dzongkhag<br />Bhutan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">info@gelephufarmers.bt</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card>
            <CardContent className="pt-4">
              <p className="font-semibold text-sm mb-2">Office Hours</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                <p>Saturday: 9:00 AM – 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill in your details and we'll get back to you within 2 business days.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">{t('contact.name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactDetails">{t('contact.contact')} *</Label>
                  <Input
                    id="contactDetails"
                    name="contactDetails"
                    value={form.contactDetails}
                    onChange={handleChange}
                    placeholder="Phone number or email"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">{t('contact.location')} *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Your dzongkhag / village"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="interests">{t('contact.interests')}</Label>
                  <Textarea
                    id="interests"
                    name="interests"
                    value={form.interests}
                    onChange={handleChange}
                    placeholder="e.g. Hydroponic farming, drip irrigation, bamboo cultivation..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Submitting...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> {t('contact.submit')}</span>
                  )}
                </Button>
                {submitMutation.isError && (
                  <p className="text-destructive text-sm text-center">
                    Submission failed. Please try again or call +975 77421966.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
