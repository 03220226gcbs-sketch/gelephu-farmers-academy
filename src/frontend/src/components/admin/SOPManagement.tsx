import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Edit, FileText, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SOP } from "../../backend";
import {
  useCreateSOP,
  useDeleteSOP,
  useSOPs,
  useUpdateSOP,
} from "../../hooks/useQueries";

export default function SOPManagement() {
  const { data: sops, isLoading } = useSOPs();
  const createSOP = useCreateSOP();
  const updateSOP = useUpdateSOP();
  const deleteSOP = useDeleteSOP();
  const [open, setOpen] = useState(false);
  const [editingSOP, setEditingSOP] = useState<SOP | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sopToDelete, setSopToDelete] = useState<bigint | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productionType: "hydroponic",
    procedures: [""],
    roles: [""],
    qualityStandards: [""],
    documentationRequirements: [""],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      productionType: "hydroponic",
      procedures: [""],
      roles: [""],
      qualityStandards: [""],
      documentationRequirements: [""],
    });
    setEditingSOP(null);
  };

  const handleEdit = (sop: SOP) => {
    setEditingSOP(sop);
    setFormData({
      title: sop.title,
      description: sop.description,
      productionType: sop.productionType,
      procedures: sop.procedures.length > 0 ? sop.procedures : [""],
      roles: sop.roles.length > 0 ? sop.roles : [""],
      qualityStandards:
        sop.qualityStandards.length > 0 ? sop.qualityStandards : [""],
      documentationRequirements:
        sop.documentationRequirements.length > 0
          ? sop.documentationRequirements
          : [""],
    });
    setOpen(true);
  };

  const handleDeleteClick = (sopId: bigint) => {
    setSopToDelete(sopId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!sopToDelete) return;

    try {
      await deleteSOP.mutateAsync(sopToDelete);
      toast.success("SOP deleted successfully");
      setDeleteDialogOpen(false);
      setSopToDelete(null);
    } catch (error: any) {
      console.error("SOP deletion error:", error);
      toast.error(error.message || "Failed to delete SOP");
    }
  };

  const addArrayItem = (
    field:
      | "procedures"
      | "roles"
      | "qualityStandards"
      | "documentationRequirements",
  ) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (
    field:
      | "procedures"
      | "roles"
      | "qualityStandards"
      | "documentationRequirements",
    index: number,
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : [""],
    });
  };

  const updateArrayItem = (
    field:
      | "procedures"
      | "roles"
      | "qualityStandards"
      | "documentationRequirements",
    index: number,
    value: string,
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const filterEmpty = (arr: string[]) =>
      arr.filter((item) => item.trim() !== "");

    try {
      if (editingSOP) {
        await updateSOP.mutateAsync({
          sopId: editingSOP.id,
          title: formData.title,
          description: formData.description,
          productionType: formData.productionType,
          procedures: filterEmpty(formData.procedures),
          roles: filterEmpty(formData.roles),
          qualityStandards: filterEmpty(formData.qualityStandards),
          documentationRequirements: filterEmpty(
            formData.documentationRequirements,
          ),
        });
        toast.success("SOP updated successfully");
      } else {
        await createSOP.mutateAsync({
          title: formData.title,
          description: formData.description,
          productionType: formData.productionType,
          procedures: filterEmpty(formData.procedures),
          roles: filterEmpty(formData.roles),
          qualityStandards: filterEmpty(formData.qualityStandards),
          documentationRequirements: filterEmpty(
            formData.documentationRequirements,
          ),
        });
        toast.success("SOP created successfully");
      }

      setOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("SOP operation error:", error);
      toast.error(
        error.message || `Failed to ${editingSOP ? "update" : "create"} SOP`,
      );
    }
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <CardTitle>Standard Operating Procedures</CardTitle>
            </div>
            <Dialog
              open={open}
              onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add SOP
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingSOP ? "Edit SOP" : "Create New SOP"}
                  </DialogTitle>
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
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      required
                    />
                  </div>
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
                    <Label>Procedures</Label>
                    {formData.procedures.map((procedure, index) => (
                      <div key={`proc-${index}`} className="flex gap-2">
                        <Input
                          value={procedure}
                          onChange={(e) =>
                            updateArrayItem("procedures", index, e.target.value)
                          }
                          placeholder={`Step ${index + 1}`}
                        />
                        {formData.procedures.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeArrayItem("procedures", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("procedures")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Procedure
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Roles and Responsibilities</Label>
                    {formData.roles.map((role, index) => (
                      <div key={`role-${index}`} className="flex gap-2">
                        <Input
                          value={role}
                          onChange={(e) =>
                            updateArrayItem("roles", index, e.target.value)
                          }
                          placeholder={`Role ${index + 1}`}
                        />
                        {formData.roles.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeArrayItem("roles", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("roles")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Role
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Quality Standards</Label>
                    {formData.qualityStandards.map((standard, index) => (
                      <div key={`std-${index}`} className="flex gap-2">
                        <Input
                          value={standard}
                          onChange={(e) =>
                            updateArrayItem(
                              "qualityStandards",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder={`Standard ${index + 1}`}
                        />
                        {formData.qualityStandards.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              removeArrayItem("qualityStandards", index)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("qualityStandards")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Standard
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Documentation Requirements</Label>
                    {formData.documentationRequirements.map(
                      (requirement, index) => (
                        <div key={`req-${index}`} className="flex gap-2">
                          <Input
                            value={requirement}
                            onChange={(e) =>
                              updateArrayItem(
                                "documentationRequirements",
                                index,
                                e.target.value,
                              )
                            }
                            placeholder={`Requirement ${index + 1}`}
                          />
                          {formData.documentationRequirements.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                removeArrayItem(
                                  "documentationRequirements",
                                  index,
                                )
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ),
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("documentationRequirements")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={createSOP.isPending || updateSOP.isPending}
                  >
                    {createSOP.isPending || updateSOP.isPending
                      ? "Saving..."
                      : editingSOP
                        ? "Update SOP"
                        : "Create SOP"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {!sops || sops.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No SOPs created yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sops.map((sop) => (
                  <TableRow key={Number(sop.id)}>
                    <TableCell className="font-medium">{sop.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{sop.productionType}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {sop.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(sop)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(sop.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              SOP.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteSOP.isPending}
            >
              {deleteSOP.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
