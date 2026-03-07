import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  ClipboardCheck,
  FileCheck,
  FileText,
  Users,
} from "lucide-react";
import AccessDeniedScreen from "../components/AccessDeniedScreen";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSOPsByProductionType } from "../hooks/useQueries";

export default function SOPsPage() {
  const { identity } = useInternetIdentity();
  const { data: hydroponicSOPs, isLoading: hydroponicLoading } =
    useSOPsByProductionType("hydroponic");
  const { data: nurserySOPs, isLoading: nurseryLoading } =
    useSOPsByProductionType("nursery");
  const { data: bambooSOPs, isLoading: bambooLoading } =
    useSOPsByProductionType("bamboo");

  if (!identity) {
    return (
      <AccessDeniedScreen message="Please login to access Standard Operating Procedures" />
    );
  }

  const getProductionTypeColor = (type: string) => {
    switch (type) {
      case "hydroponic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "nursery":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "bamboo":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const renderSOPs = (
    sops: any[] | undefined,
    isLoading: boolean,
    productionType: string,
  ) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      );
    }

    if (!sops || sops.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No SOPs available for {productionType} production yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {sops.map((sop) => (
          <Card key={Number(sop.id)}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getProductionTypeColor(sop.productionType)}>
                  {sop.productionType}
                </Badge>
              </div>
              <CardTitle className="text-xl">{sop.title}</CardTitle>
              <CardDescription>{sop.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {sop.procedures.length > 0 && (
                  <AccordionItem value="procedures">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Procedures ({sop.procedures.length})</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        {sop.procedures.map(
                          (procedure: string, index: number) => (
                            <li
                              key={`proc-${index}`}
                              className="text-muted-foreground"
                            >
                              {procedure}
                            </li>
                          ),
                        )}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {sop.roles.length > 0 && (
                  <AccordionItem value="roles">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          Roles and Responsibilities ({sop.roles.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {sop.roles.map((role: string, index: number) => (
                          <li
                            key={`role-${index}`}
                            className="text-muted-foreground"
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {sop.qualityStandards.length > 0 && (
                  <AccordionItem value="quality">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4" />
                        <span>
                          Quality Standards ({sop.qualityStandards.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {sop.qualityStandards.map(
                          (standard: string, index: number) => (
                            <li
                              key={`std-${index}`}
                              className="text-muted-foreground"
                            >
                              {standard}
                            </li>
                          ),
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {sop.documentationRequirements.length > 0 && (
                  <AccordionItem value="documentation">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4" />
                        <span>
                          Documentation Requirements (
                          {sop.documentationRequirements.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        {sop.documentationRequirements.map(
                          (requirement: string, index: number) => (
                            <li
                              key={`req-${index}`}
                              className="text-muted-foreground"
                            >
                              {requirement}
                            </li>
                          ),
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Standard Operating Procedures
        </h1>
        <p className="text-muted-foreground">
          Access detailed procedures, quality standards, and documentation
          requirements for all production areas.
        </p>
      </div>

      <Tabs defaultValue="hydroponic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hydroponic">Hydroponic</TabsTrigger>
          <TabsTrigger value="nursery">Nursery</TabsTrigger>
          <TabsTrigger value="bamboo">Bamboo</TabsTrigger>
        </TabsList>

        <TabsContent value="hydroponic">
          {renderSOPs(hydroponicSOPs, hydroponicLoading, "hydroponic")}
        </TabsContent>

        <TabsContent value="nursery">
          {renderSOPs(nurserySOPs, nurseryLoading, "nursery")}
        </TabsContent>

        <TabsContent value="bamboo">
          {renderSOPs(bambooSOPs, bambooLoading, "bamboo")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
