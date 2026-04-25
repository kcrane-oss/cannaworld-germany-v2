import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  GraduationCap, 
  ShieldCheck,
  Calendar,
  Building
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OnboardingData } from "@/hooks/useRoleOnboarding";

interface TrainingRecord {
  training_name: string;
  date: string;
  provider: string;
  certificate_url?: string;
}

interface Personnel {
  id: string; // Internal ID for UI keying
  name: string;
  role: string;
  qualifications: string;
  training_records: TrainingRecord[];
  hygiene_certified: boolean;
  phone: string;
}

interface Props {
  data: OnboardingData;
  onSave: (patch: Partial<OnboardingData>) => Promise<void>;
  saving: boolean;
}

const ROLES = [
  { value: "farm_manager", label: "Farm Manager" },
  { value: "head_grower", label: "Head Grower" },
  { value: "qa_officer", label: "QA Officer" },
  { value: "harvester", label: "Harvester" },
  { value: "trimmer", label: "Trimmer" },
  { value: "packer", label: "Packer" },
  { value: "driver", label: "Driver" },
  { value: "other", label: "Other" },
];

export function PersonnelSection({ data, onSave, saving }: Props) {
  const { t } = useTranslation();
  
  // Personnel is stored in data.role_data.personnel
  const personnel: Personnel[] = data.role_data.personnel || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updatePersonnel = (newPersonnel: Personnel[]) => {
    onSave({
      role_data: {
        ...data.role_data,
        personnel: newPersonnel,
      },
    });
  };

  const addMember = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newMember: Personnel = {
      id: newId,
      name: "",
      role: "farm_manager",
      qualifications: "",
      training_records: [],
      hygiene_certified: false,
      phone: "",
    };
    updatePersonnel([...personnel, newMember]);
    setExpandedId(newId);
  };

  const removeMember = (id: string) => {
    updatePersonnel(personnel.filter((p) => p.id !== id));
  };

  const updateMember = (id: string, patch: Partial<Personnel>) => {
    updatePersonnel(
      personnel.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const addTraining = (memberId: string) => {
    const member = personnel.find(p => p.id === memberId);
    if (!member) return;
    
    const newTraining: TrainingRecord = {
      training_name: "",
      date: new Date().toISOString().split('T')[0],
      provider: ""
    };
    
    updateMember(memberId, {
      training_records: [...member.training_records, newTraining]
    });
  };

  const updateTraining = (memberId: string, index: number, patch: Partial<TrainingRecord>) => {
    const member = personnel.find(p => p.id === memberId);
    if (!member) return;
    
    const newRecords = [...member.training_records];
    newRecords[index] = { ...newRecords[index], ...patch };
    
    updateMember(memberId, { training_records: newRecords });
  };

  const removeTraining = (memberId: string, index: number) => {
    const member = personnel.find(p => p.id === memberId);
    if (!member) return;
    
    const newRecords = [...member.training_records];
    newRecords.splice(index, 1);
    
    updateMember(memberId, { training_records: newRecords });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">{t("personnel.title", "Personnel Registry")}</h3>
        </div>
        <Button onClick={addMember} variant="outline" size="sm" disabled={saving}>
          <Plus className="mr-2 h-4 w-4" />
          {t("personnel.add", "Add Team Member")}
        </Button>
      </div>

      <div className="grid gap-4">
        {personnel.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed rounded-lg bg-muted/50">
            <p className="text-muted-foreground">{t("personnel.empty", "No personnel registered yet.")}</p>
          </div>
        )}

        {personnel.map((person) => (
          <Card key={person.id} className="overflow-hidden">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="font-medium">
                  {person.name || <span className="text-muted-foreground italic">{t("personnel.new_member", "New Member")}</span>}
                </div>
                <Badge variant="secondary" className="capitalize">
                  {ROLES.find(r => r.value === person.role)?.label || person.role}
                </Badge>
                {person.hygiene_certified && (
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    {t("personnel.hygiene_short", "Hygiene")}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setExpandedId(expandedId === person.id ? null : person.id)}
                >
                  {expandedId === person.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeMember(person.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            {expandedId === person.id && (
              <CardContent className="p-4 pt-0 border-t bg-muted/30">
                <div className="grid gap-4 mt-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t("personnel.name", "Full Name")}</Label>
                    <Input 
                      value={person.name} 
                      onChange={(e) => updateMember(person.id, { name: e.target.value })} 
                      placeholder={t("personnel.name_placeholder", "e.g. Somchai Green")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("personnel.role", "Role")}</Label>
                    <Select value={person.role} onValueChange={(v) => updateMember(person.id, { role: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("personnel.phone", "Phone Number")}</Label>
                    <Input 
                      value={person.phone} 
                      onChange={(e) => updateMember(person.id, { phone: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("personnel.qualifications", "Qualifications / Certifications")}</Label>
                    <Input 
                      value={person.qualifications} 
                      onChange={(e) => updateMember(person.id, { qualifications: e.target.value })}
                      placeholder={t("personnel.qual_placeholder", "e.g. Agronomy Degree, GACP Trained")}
                    />
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                    <Checkbox 
                      id={`hygiene-${person.id}`}
                      checked={person.hygiene_certified}
                      onCheckedChange={(checked) => updateMember(person.id, { hygiene_certified: !!checked })}
                    />
                    <label 
                      htmlFor={`hygiene-${person.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("personnel.hygiene_cert", "Personnel has received GACP hygiene training")}
                    </label>
                  </div>
                </div>

                {/* Training Records Sub-section */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {t("personnel.training_records", "Training Records")}
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => addTraining(person.id)} className="h-8">
                      <Plus className="mr-1 h-3 w-3" />
                      {t("personnel.add_training", "Add Record")}
                    </Button>
                  </div>
                  
                  {person.training_records.length === 0 && (
                    <p className="text-xs text-muted-foreground italic text-center py-2">
                      {t("personnel.no_training", "No training records added yet.")}
                    </p>
                  )}

                  <div className="space-y-3">
                    {person.training_records.map((record, idx) => (
                      <div key={idx} className="grid gap-3 md:grid-cols-7 items-end bg-background p-3 rounded-md border shadow-sm">
                        <div className="md:col-span-2 space-y-1">
                          <Label className="text-[10px] uppercase">{t("personnel.training_name", "Training Name")}</Label>
                          <Input 
                            value={record.training_name} 
                            onChange={(e) => updateTraining(person.id, idx, { training_name: e.target.value })}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <Label className="text-[10px] uppercase flex items-center gap-1">
                            <Building className="h-3 w-3" /> {t("personnel.provider", "Provider")}
                          </Label>
                          <Input 
                            value={record.provider} 
                            onChange={(e) => updateTraining(person.id, idx, { provider: e.target.value })}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <Label className="text-[10px] uppercase flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {t("personnel.date", "Date")}
                          </Label>
                          <Input 
                            type="date"
                            value={record.date} 
                            onChange={(e) => updateTraining(person.id, idx, { date: e.target.value })}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeTraining(person.id, idx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
