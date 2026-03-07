import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inbox, Search } from "lucide-react";
import { useState } from "react";
import { useGetAllSubmissions } from "../../hooks/useQueries";

export default function SubmissionsManagement() {
  const { data: submissions, isLoading } = useGetAllSubmissions();
  const [search, setSearch] = useState("");

  const filtered = submissions?.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.interests.toLowerCase().includes(search.toLowerCase()) ||
      s.contactDetails.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Submissions</CardTitle>
        <CardDescription>
          All training registration and inquiry submissions from farmers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, location, or interest..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !filtered || filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>
              {search
                ? "No submissions match your search."
                : "No submissions yet."}
            </p>
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((submission) => (
                  <TableRow key={Number(submission.id)}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{Number(submission.id)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {submission.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {submission.contactDetails}
                    </TableCell>
                    <TableCell className="text-sm">
                      {submission.location}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="text-xs max-w-[160px] truncate"
                      >
                        {submission.interests}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(
                        Number(submission.timestamp) / 1000000,
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {filtered && filtered.length > 0 && (
          <p className="text-xs text-muted-foreground text-right">
            Showing {filtered.length} of {submissions?.length || 0} submissions
          </p>
        )}
      </CardContent>
    </Card>
  );
}
