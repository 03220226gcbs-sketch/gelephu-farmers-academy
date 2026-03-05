import { useState } from 'react';
import { useGetAllTestimonials, useApproveTestimonial, useDeleteTestimonial } from '../../hooks/useQueries';
import { Testimonial } from '../../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircle, Trash2, MessageSquareQuote, MapPin, Sprout, Clock } from 'lucide-react';

export default function TestimonialManagement() {
  const { data: testimonials = [], isLoading } = useGetAllTestimonials();
  const approveTestimonial = useApproveTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  const pending = testimonials.filter((t) => !t.approved);
  const approved = testimonials.filter((t) => t.approved);
  const displayed = activeTab === 'pending' ? pending : approved;

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-primary" />
            Testimonial Management
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Review and approve farmer testimonials before they go public.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {pending.length} Pending
          </Badge>
          <Badge className="text-xs bg-green-600 text-white">
            {approved.length} Approved
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'pending' | 'approved')}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="pending" className="flex-1 sm:flex-none gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Pending ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex-1 sm:flex-none gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Approved ({approved.length})
          </TabsTrigger>
        </TabsList>

        {(['pending', 'approved'] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <MessageSquareQuote className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No {tab} testimonials.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {displayed.map((testimonial: Testimonial) => (
                  <Card key={String(testimonial.id)} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                            {testimonial.farmerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <CardTitle className="text-base">{testimonial.farmerName}</CardTitle>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {testimonial.location}
                              </span>
                              <Badge variant="outline" className="text-xs gap-1">
                                <Sprout className="w-3 h-3" />
                                {testimonial.farmingArea}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(testimonial.submittedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {!testimonial.approved && (
                            <Button
                              size="sm"
                              className="min-h-[36px] gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => approveTestimonial.mutate(testimonial.id)}
                              disabled={approveTestimonial.isPending}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Approve
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="min-h-[36px] gap-1.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this testimonial from {testimonial.farmerName}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="min-h-[44px] bg-destructive hover:bg-destructive/90"
                                  onClick={() => deleteTestimonial.mutate(testimonial.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                        "{testimonial.testimonialText}"
                      </blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
