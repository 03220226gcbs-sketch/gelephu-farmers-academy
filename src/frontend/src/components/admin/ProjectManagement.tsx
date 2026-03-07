import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Folder, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateProject,
  useGetProjectsByStatus,
} from "../../hooks/useQueries";

export default function ProjectManagement() {
  const { data: ongoingProjects, isLoading: ongoingLoading } =
    useGetProjectsByStatus("ongoing");
  const { data: completedProjects, isLoading: completedLoading } =
    useGetProjectsByStatus("completed");
  const createProject = useCreateProject();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productionType: "hydroponic",
    status: "ongoing",
    startDate: "",
    endDate: "",
    outcomes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const startDate = BigInt(
        new Date(formData.startDate).getTime() * 1000000,
      );
      const endDate: bigint | undefined = formData.endDate
        ? BigInt(new Date(formData.endDate).getTime() * 1000000)
        : undefined;

      await createProject.mutateAsync({
        title: formData.title,
        description: formData.description,
        productionType: formData.productionType,
        status: formData.status,
        startDate,
        endDate,
        outcomes: formData.outcomes,
      });

      toast.success("Project created successfully");
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        productionType: "hydroponic",
        status: "ongoing",
        startDate: "",
        endDate: "",
        outcomes: "",
      });
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Failed to create project";
      toast.error(msg);
    }
  };

  const allProjects = [
    ...(ongoingProjects || []),
    ...(completedProjects || []),
  ];

  if (ongoingLoading || completedLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Folder className="h-5 w-5" />
            <CardTitle>Project Management</CardTitle>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Production Type</Label>
                    <Select
                      value={formData.productionType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, productionType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hydroponic">Hydroponic</SelectItem>
                        <SelectItem value="nursery">Nursery</SelectItem>
                        <SelectItem value="bamboo">Bamboo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outcomes">Outcomes</Label>
                  <Textarea
                    id="outcomes"
                    value={formData.outcomes}
                    onChange={(e) =>
                      setFormData({ ...formData, outcomes: e.target.value })
                    }
                    rows={2}
                    placeholder="Expected or achieved outcomes"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createProject.isPending}
                >
                  {createProject.isPending ? "Creating..." : "Create Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {allProjects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No projects created yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProjects.map((project) => (
                  <TableRow key={Number(project.id)}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.productionType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(
                        Number(project.startDate) / 1000000,
                      ).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
