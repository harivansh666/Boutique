import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Upload, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/config";

const measurementSchema = z.object({
  bust: z.coerce.number().min(10, "Required").max(60),
  waist: z.coerce.number().min(10, "Required").max(50),
  hip: z.coerce.number().min(10, "Required").max(60),
  shoulder: z.coerce.number().min(10, "Required").max(30),
  armLength: z.coerce.number().min(10, "Required").max(40),
  height: z.coerce.number().min(10, "Required").max(80),
});

const designStyles = [
  "Traditional",
  "Modern Fusion",
  "Minimalist",
  "Heavy Embroidery",
  "Mirror Work",
  "Block Print",
  "Floral",
];

const steps = ["Measurements", "Design Style", "Reference", "Review"];

export default function CustomStitchPage() {
  const [step, setStep] = useState(0);
  const [designStyle, setDesignStyle] = useState("");
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(measurementSchema),
    defaultValues: {
      bust: 0,
      waist: 0,
      hip: 0,
      shoulder: 0,
      armLength: 0,
      height: 0,
    },
  });

  const measurements = form.watch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setReferenceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/custom-stitch", {
        measurements,
        designStyle,
        referenceImage,
      });
      toast({
        title: "Custom stitch request submitted!",
        description: "We will contact you within 24 hours.",
      });
      form.reset();
      setStep(0);
      setDesignStyle("");
      setReferenceImage(null);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const canNext = () => {
    if (step === 0) return form.formState.isValid;
    if (step === 1) return !!designStyle;
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold mb-2">Custom Stitch</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Get your outfit tailored to perfection
        </p>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-h-[300px]"
        >
          {step === 0 && (
            <Form {...form}>
              <form className="grid grid-cols-2 gap-4">
                {(
                  [
                    "bust",
                    "waist",
                    "hip",
                    "shoulder",
                    "armLength",
                    "height",
                  ] as const
                ).map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel className="capitalize text-sm">
                          {field === "armLength" ? "Arm Length" : field}{" "}
                          (inches)
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...f} className="rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">
                Select Design Style
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {designStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setDesignStyle(style)}
                    className={`p-4 rounded-xl border text-sm text-left transition-colors ${
                      designStyle === style
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">
                Upload Reference Image (Optional)
              </h3>
              <label className="block border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors">
                {referenceImage ? (
                  <img
                    src={referenceImage}
                    alt="Reference"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <Upload className="h-8 w-8 mx-auto" />
                    <p className="text-sm">Click to upload a reference image</p>
                    <p className="text-xs">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-lg font-semibold">
                Review Your Order
              </h3>
              <div className="space-y-3 p-4 rounded-xl bg-secondary/50">
                <h4 className="text-sm font-semibold">Measurements</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {Object.entries(measurements).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-muted-foreground capitalize">
                        {k === "armLength" ? "Arm Length" : k}:
                      </span>{" "}
                      <span className="font-medium">{v}"</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <span className="text-sm text-muted-foreground">
                  Design Style:
                </span>{" "}
                <span className="text-sm font-medium">{designStyle}</span>
              </div>
              {referenceImage && (
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">
                    Reference Image:
                  </p>
                  <img
                    src={referenceImage}
                    alt="Reference"
                    className="max-h-32 rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            className="rounded-xl gap-2"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < 3 ? (
            <Button
              className="rounded-xl gap-2"
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="rounded-xl gap-2" onClick={handleSubmit}>
              Submit Request <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
