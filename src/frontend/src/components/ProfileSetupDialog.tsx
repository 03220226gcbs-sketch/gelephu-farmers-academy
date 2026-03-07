import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend";
import type { UserProfile } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

export default function ProfileSetupDialog() {
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!identity) {
      toast.error("Not authenticated");
      return;
    }

    const profile: UserProfile = {
      id: identity.getPrincipal(),
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      role: UserRole.user,
    };

    try {
      await saveProfile.mutateAsync(profile);
      toast.success("Profile created successfully!");
    } catch (error) {
      console.error("Profile setup error:", error);
      toast.error("Failed to create profile");
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Welcome to Gelephu Farmers Academy</DialogTitle>
          <DialogDescription>
            Please complete your profile to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="min-h-[44px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="min-h-[44px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>
          <Button
            type="submit"
            className="w-full min-h-[44px]"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? "Creating Profile..." : "Complete Setup"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
