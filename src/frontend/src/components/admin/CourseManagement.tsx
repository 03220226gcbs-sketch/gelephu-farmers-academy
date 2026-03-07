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
import { Principal } from "@dfinity/principal";
import { BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateCourse,
  useGetAllUsers,
  useGetCourses,
} from "../../hooks/useQueries";

export default function CourseManagement() {
  const { data: courses, isLoading } = useGetCourses();
  const { data: users } = useGetAllUsers();
  const createCourse = useCreateCourse();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorId: "",
    startDate: "",
    endDate: "",
    productionType: "hydroponic",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.instructorId ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const startDate = BigInt(
        new Date(formData.startDate).getTime() * 1000000,
      );
      const endDate = BigInt(new Date(formData.endDate).getTime() * 1000000);

      await createCourse.mutateAsync({
        title: formData.title,
        description: formData.description,
        instructorId: Principal.fromText(formData.instructorId),
        startDate,
        endDate,
        productionType: formData.productionType,
      });

      toast.success("Course created successfully");
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        instructorId: "",
        startDate: "",
        endDate: "",
        productionType: "hydroponic",
      });
    } catch (error: any) {
      console.error("Course creation error:", error);
      toast.error(error.message || "Failed to create course");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5" />
            <CardTitle>Course Management</CardTitle>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title *</Label>
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
                    <Label htmlFor="productionType">Production Type *</Label>
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
                    <Label htmlFor="instructor">Instructor *</Label>
                    <Select
                      value={formData.instructorId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, instructorId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem
                            key={user.id.toText()}
                            value={user.id.toText()}
                          >
                            {user.name}
                          </SelectItem>
                        ))}
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
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createCourse.isPending}
                >
                  {createCourse.isPending ? "Creating..." : "Create Course"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!courses || courses.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No courses created yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={Number(course.id)}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.productionType}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(
                      Number(course.startDate) / 1000000,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      Number(course.endDate) / 1000000,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {course.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
