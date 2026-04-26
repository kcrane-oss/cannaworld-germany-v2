import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSignature, ArrowLeft, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OnboardingRole } from "./config/role-configs";

interface Props {
  role: OnboardingRole;
  onAccept: (signeeName: string) => Promise<boolean>;
  onBack: () => void;
  saving: boolean;
}

const NDA_TEXT = `NON-DISCLOSURE AGREEMENT (NDA)

CannaWorld Co., Ltd. — Confidentiality Agreement

This Non-Disclosure Agreement ("Agreement") is entered into between CannaWorld Co., Ltd. ("CannaWorld"), a company registered in Thailand (Tax ID: 0105567045912), and the Party ("Disclosing Party") identified through their registered account on the CannaWorld platform.

1. PURPOSE
This Agreement protects confidential information shared during the onboarding process, including but not limited to: facility layouts, standard operating procedures (SOPs), production data, quality management documentation, certificates of analysis, trade data, pricing information, and any proprietary business information.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all information disclosed by either party, whether oral, written, electronic, or visual, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.

3. OBLIGATIONS
Both parties agree to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to third parties without prior written consent
c) Use Confidential Information solely for the purpose of the business relationship through CannaWorld
d) Implement reasonable security measures to protect Confidential Information
e) Return or destroy all Confidential Information upon termination of the business relationship

4. EXCLUSIONS
This Agreement does not apply to information that:
a) Is or becomes publicly available through no fault of the receiving party
b) Was known to the receiving party prior to disclosure
c) Is independently developed without use of Confidential Information
d) Is required to be disclosed by law or regulatory authority

5. TERM
This Agreement shall remain in effect for a period of three (3) years from the date of acceptance, or until the business relationship is terminated, whichever is longer.

6. GOVERNING LAW
This Agreement shall be governed by the laws of the Kingdom of Thailand.

7. DIGITAL ACCEPTANCE
By entering your full legal name and accepting this Agreement electronically, you acknowledge that this constitutes a legally binding agreement equivalent to a handwritten signature.

CannaWorld Co., Ltd.
140 One Pacific Place, Suite 1705, 17th Floor
Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand`;

export function NDAGate({ onAccept, onBack, saving }: Props) {
  const { t } = useTranslation();
  const [hasRead, setHasRead] = useState(false);
  const [signeeName, setSigneeName] = useState("");
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      setScrolledToEnd(true);
    }
  };

  const canSign = scrolledToEnd && hasRead && signeeName.trim().length >= 3;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <FileSignature className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{t("ob.nda_title", "Non-Disclosure Agreement")}</h2>
          <p className="text-sm text-muted-foreground">{t("ob.nda_desc", "Please read and accept the NDA to continue with sensitive information")}</p>
        </div>
      </div>

      <div className="border rounded-lg bg-card h-[400px] overflow-y-auto p-6" onScroll={handleScroll}>
        <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">{NDA_TEXT}</pre>
      </div>

      {!scrolledToEnd && (
        <p className="text-xs text-muted-foreground text-center">{t("ob.nda_scroll", "Please scroll to the end to continue")}</p>
      )}

      <div className="space-y-4 p-4 rounded-lg border bg-card">
        <div className="flex items-start gap-3 cursor-pointer" onClick={() => scrolledToEnd && setHasRead(!hasRead)}>
          <Checkbox checked={hasRead} disabled={!scrolledToEnd} className="mt-0.5" />
          <span className="text-sm">{t("ob.nda_accept", "I have read and accept this Non-Disclosure Agreement")}</span>
        </div>
        <div className="space-y-2">
          <Label>{t("ob.nda_signee", "Full Legal Name")} *</Label>
          <Input value={signeeName} onChange={(e) => setSigneeName(e.target.value)} placeholder="" disabled={!hasRead} />
          <p className="text-xs text-muted-foreground">{t("ob.nda_signee_hint", "Enter your full legal name as digital signature")}</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />{t("ob.back", "Back")}
        </Button>
        <Button onClick={() => onAccept(signeeName.trim())} disabled={!canSign || saving} size="lg" className="bg-amber-600 hover:bg-amber-700">
          {saving ? t("ob.nda_processing", "Processing...") : (
            <><ShieldCheck className="mr-2 h-4 w-4" />{t("ob.nda_submit", "Sign & Continue")}</>
          )}
        </Button>
      </div>
    </div>
  );
}
