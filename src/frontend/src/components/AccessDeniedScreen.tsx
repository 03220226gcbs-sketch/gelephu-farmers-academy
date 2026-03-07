import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

interface AccessDeniedScreenProps {
  message?: string;
}

export default function AccessDeniedScreen({
  message = "Access Denied",
}: AccessDeniedScreenProps) {
  return (
    <div className="container py-20">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You don't have permission to view this page. Please contact an
            administrator if you believe this is an error.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
