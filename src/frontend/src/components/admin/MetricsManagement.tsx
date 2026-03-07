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
import { BarChart3, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddProductionMetric } from "../../hooks/useQueries";

export default function MetricsManagement() {
  const addMetric = useAddProductionMetric();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    productionType: "hydroponic",
    metricName: "",
    value: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.metricName || !formData.value) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await addMetric.mutateAsync({
        productionType: formData.productionType,
        metricName: formData.metricName,
        value: Number.parseFloat(formData.value),
      });

      toast.success("Metric added successfully");
      setOpen(false);
      setFormData({
        productionType: "hydroponic",
        metricName: "",
        value: "",
      });
    } catch (error: any) {
      console.error("Metric creation error:", error);
      toast.error(error.message || "Failed to add metric");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5" />
            <CardTitle>Production Metrics Management</CardTitle>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Metric
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Production Metric</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="metricName">Metric Name *</Label>
                  <Input
                    id="metricName"
                    value={formData.metricName}
                    onChange={(e) =>
                      setFormData({ ...formData, metricName: e.target.value })
                    }
                    placeholder="e.g., Daily Yield (kg)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value *</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                    placeholder="e.g., 125.5"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={addMetric.isPending}
                >
                  {addMetric.isPending ? "Adding..." : "Add Metric"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p className="mb-4">
            Add production metrics to track performance across different
            production areas. Metrics will be displayed on the dashboard.
          </p>
          <div className="space-y-2">
            <p className="font-medium">Example Metrics:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Hydroponic: Daily Yield (kg), Water Usage (L), pH Level</li>
              <li>
                Nursery: Seedlings Produced, Germination Rate (%), Active Plants
              </li>
              <li>
                Bamboo: Harvest Volume (tons), Growth Rate (cm/month), Active
                Plots
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
