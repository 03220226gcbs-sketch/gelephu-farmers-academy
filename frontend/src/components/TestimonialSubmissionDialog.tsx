import { useState } from 'react';
import { useSubmitTestimonial } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, LogIn } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean;
}

export default function TestimonialSubmissionDialog({ open, onOpenChange, isAuthenticated }: Props) {
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [farmingArea, setFarmingArea] = useState('');
  const [testimonialText, setTestimonialText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitTestimonial = useSubmitTestimonial();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !location.trim() || !farmingArea.trim() || !testimonialText.trim()) return;

    await submitTestimonial.mutateAsync({
      farmerName: farmerName.trim(),
      location: location.trim(),
      farmingArea: farmingArea.trim(),
      testimonialText: testimonialText.trim(),
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setFarmerName('');
      setLocation('');
      setFarmingArea('');
      setTestimonialText('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Share Your Farming Story</DialogTitle>
          <DialogDescription className="text-sm">
            Inspire other farmers by sharing your experience with Gelephu Farmers Academy.
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Login Required</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please log in to share your testimonial. This helps us verify authentic farmer stories.
              </p>
            </div>
            <Button className="min-h-[44px] w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">Thank You!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your testimonial has been submitted and is pending admin approval. It will appear on the page once reviewed.
              </p>
            </div>
            <Button className="min-h-[44px] w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farmerName" className="text-sm font-medium">
                Your Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="farmerName"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Tshering Dorji"
                required
                className="min-h-[44px]"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Gelephu, Bhutan"
                required
                className="min-h-[44px]"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmingArea" className="text-sm font-medium">
                Farming Area / Specialty <span className="text-destructive">*</span>
              </Label>
              <Input
                id="farmingArea"
                value={farmingArea}
                onChange={(e) => setFarmingArea(e.target.value)}
                placeholder="e.g. Hydroponics, Bamboo, Nursery"
                required
                className="min-h-[44px]"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonialText" className="text-sm font-medium">
                Your Story <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="testimonialText"
                value={testimonialText}
                onChange={(e) => setTestimonialText(e.target.value)}
                placeholder="Share how the academy has helped you and your farming journey..."
                required
                rows={4}
                className="resize-none min-h-[100px]"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {testimonialText.length}/500
              </p>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="min-h-[44px] w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  submitTestimonial.isPending ||
                  !farmerName.trim() ||
                  !location.trim() ||
                  !farmingArea.trim() ||
                  !testimonialText.trim()
                }
                className="min-h-[44px] w-full sm:w-auto order-1 sm:order-2"
              >
                {submitTestimonial.isPending ? 'Submitting...' : 'Submit Story'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
