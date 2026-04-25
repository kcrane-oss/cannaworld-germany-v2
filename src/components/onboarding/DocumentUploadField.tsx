import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, FileCheck, Trash2, Loader2, File, Sparkles, CheckCircle2, Camera, ImagePlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface Props {
  onboardingId: string;
  step: number;
  documentType: string;
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  existingDocs?: UploadedDoc[];
  onUploaded?: () => void;
  /** Called after AI extraction completes for this document */
  onAIExtracted?: (documentId: string, extraction: any) => void;
  /** Enable automatic AI extraction after upload */
  enableAI?: boolean;
}

export interface UploadedDoc {
  id: string;
  file_name: string;
  file_path: string;
  document_type: string;
  status: string;
  created_at: string;
}

/** Check if we're running on a native Capacitor platform */
function isNativePlatform(): boolean {
  return typeof (window as any)?.Capacitor !== "undefined" &&
    (window as any).Capacitor?.isNativePlatform?.() === true;
}

/** Try to use Capacitor Camera, returns null if not available */
async function takePhoto(): Promise<{ blob: Blob; fileName: string } | null> {
  try {
    const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera");
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      width: 2048,
      height: 2048,
      correctOrientation: true,
    });

    if (!photo.dataUrl) return null;

    // Convert data URL to blob
    const resp = await fetch(photo.dataUrl);
    const blob = await resp.blob();
    const ext = photo.format === "png" ? "png" : "jpg";
    const fileName = `photo_${Date.now()}.${ext}`;
    return { blob, fileName };
  } catch (e) {
    console.warn("Capacitor Camera not available:", e);
    return null;
  }
}

/** Try to use Capacitor Camera for gallery pick */
async function pickFromGallery(): Promise<{ blob: Blob; fileName: string } | null> {
  try {
    const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera");
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      width: 2048,
      height: 2048,
    });

    if (!photo.dataUrl) return null;
    const resp = await fetch(photo.dataUrl);
    const blob = await resp.blob();
    const ext = photo.format === "png" ? "png" : "jpg";
    const fileName = `gallery_${Date.now()}.${ext}`;
    return { blob, fileName };
  } catch (e) {
    console.warn("Capacitor Gallery not available:", e);
    return null;
  }
}

export function DocumentUploadField({
  onboardingId,
  step,
  documentType,
  label,
  required = false,
  accept = "application/pdf,image/jpeg,image/png,image/webp",
  multiple = false,
  existingDocs = [],
  onUploaded,
  onAIExtracted,
  enableAI = true,
}: Props) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024;
  const native = isNativePlatform();

  // Core upload logic — shared between file input, camera, and gallery
  const uploadBlob = useCallback(async (blob: Blob, fileName: string, mimeType: string) => {
    if (!user) return;

    const ext = fileName.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/${onboardingId}/${documentType}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("onboarding-documents")
      .upload(path, blob, { contentType: mimeType });

    if (uploadError) {
      toast.error(`${t("ob.upload_error", "Upload failed")}: ${fileName}`);
      console.error(uploadError);
      return;
    }

    const { data: dbRow, error: dbError } = await (supabase as any)
      .from("onboarding_documents")
      .insert({
        onboarding_id: onboardingId,
        user_id: user.id,
        step,
        document_type: documentType,
        file_path: path,
        file_name: fileName,
        file_size: blob.size,
        mime_type: mimeType,
      })
      .select("id")
      .single();

    if (dbError) {
      toast.error(`${t("ob.upload_error", "Upload failed")}: ${fileName}`);
      console.error(dbError);
      return;
    }

    // Auto-trigger AI extraction
    if (enableAI && dbRow?.id) {
      setAnalyzing(true);
      try {
        const resp = await supabase.functions.invoke("onboarding-ai-extract", {
          body: {
            action: "extract",
            document_id: dbRow.id,
            onboarding_id: onboardingId,
          },
        });
        if (resp.data?.success) {
          onAIExtracted?.(dbRow.id, resp.data.extraction);
          toast.success(t("ob.ai_extract_success", "✨ AI: Document analyzed"));
        }
      } catch (e) {
        console.error("AI extraction failed:", e);
      } finally {
        setAnalyzing(false);
      }
    }
  }, [user, onboardingId, step, documentType, enableAI, onAIExtracted, t]);

  // File input handler (browser)
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user) return;
    setUploading(true);

    const files = Array.from(e.target.files);
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} ${t("ob.upload_too_large", "exceeds 50MB limit")}`);
        continue;
      }
      await uploadBlob(file, file.name, file.type || "application/octet-stream");
    }

    toast.success(t("ob.upload_success", "Documents uploaded"));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
    onUploaded?.();
  };

  // Camera capture handler (Capacitor native)
  const handleNativeCamera = async () => {
    setUploading(true);
    const result = await takePhoto();
    if (result) {
      await uploadBlob(result.blob, result.fileName, result.blob.type || "image/jpeg");
      toast.success(t("ob.upload_success", "Photo uploaded"));
      onUploaded?.();
    }
    setUploading(false);
  };

  // Gallery pick handler (Capacitor native)
  const handleNativeGallery = async () => {
    setUploading(true);
    const result = await pickFromGallery();
    if (result) {
      await uploadBlob(result.blob, result.fileName, result.blob.type || "image/jpeg");
      toast.success(t("ob.upload_success", "Photo uploaded"));
      onUploaded?.();
    }
    setUploading(false);
  };

  const handleDelete = async (doc: UploadedDoc) => {
    await supabase.storage.from("onboarding-documents").remove([doc.file_path]);
    await (supabase as any).from("onboarding_documents").delete().eq("id", doc.id);
    toast.success(t("ob.upload_deleted", "Document removed"));
    onUploaded?.();
  };

  const docs = existingDocs.filter((d) => d.document_type === documentType);
  const hasDoc = docs.length > 0;
  const busy = uploading || analyzing;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {hasDoc && <FileCheck className="h-4 w-4 text-emerald-500" />}
      </div>

      {/* Existing files */}
      {docs.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-secondary/50 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <File className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">{doc.file_name}</span>
            {doc.status === "ai_validated" && (
              <Sparkles className="h-3 w-3 text-primary shrink-0" />
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => handleDelete(doc)}>
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
          </Button>
        </div>
      ))}

      {/* AI analysis indicator */}
      {analyzing && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-sm animate-pulse">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-primary">{t("ob.ai_analyzing", "AI is analyzing your document...")}</span>
        </div>
      )}

      {/* AI verified badge */}
      {docs.some(d => d.status === "ai_validated") && !analyzing && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {t("ob.ai_validated", "AI verified")}
        </div>
      )}

      {/* Upload zone — 3 options: Camera, Gallery/Photo, File */}
      {(!hasDoc || multiple) && (
        <div className={cn("space-y-2", busy && "pointer-events-none opacity-50")}>
          {/* Camera + Gallery buttons (always shown — camera works on mobile web too) */}
          <div className="grid grid-cols-2 gap-2">
            {native ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-12 text-xs"
                  onClick={handleNativeCamera}
                  disabled={busy}
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  {t("ob.take_photo", "Take Photo")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-12 text-xs"
                  onClick={handleNativeGallery}
                  disabled={busy}
                >
                  <ImagePlus className="h-4 w-4" />
                  {t("ob.from_gallery", "From Gallery")}
                </Button>
              </>
            ) : (
              <>
                {/* Web: camera capture via input accept + capture */}
                <label className={cn(
                  "flex items-center justify-center gap-2 h-12 text-xs rounded-md border border-input bg-background px-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
                  busy && "opacity-50 cursor-default"
                )}>
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  {t("ob.take_photo", "Take Photo")}
                  <input
                    ref={cameraRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileInput}
                    disabled={busy}
                  />
                </label>
                {/* Web: gallery / file picker */}
                <label className={cn(
                  "flex items-center justify-center gap-2 h-12 text-xs rounded-md border border-input bg-background px-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
                  busy && "opacity-50 cursor-default"
                )}>
                  <ImagePlus className="h-4 w-4" />
                  {t("ob.from_gallery", "Photo / File")}
                  <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                    onChange={handleFileInput}
                    disabled={busy}
                  />
                </label>
              </>
            )}
          </div>

          {/* Full file upload drop zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:border-primary/50 transition-colors"
            )}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-4 w-4 mx-auto text-muted-foreground" />
            <p className="text-[11px] text-muted-foreground mt-1">
              {t("ob.upload_file", "PDF or document file")}
            </p>
            {enableAI && (
              <p className="text-[10px] text-primary/60 mt-0.5 flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" /> {t("ob.ai_auto_extract", "AI auto-extracts data")}
              </p>
            )}
            <input
              ref={fileRef}
              type="file"
              accept={accept}
              multiple={multiple}
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </div>
      )}
    </div>
  );
}
