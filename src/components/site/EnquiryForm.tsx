import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GROUPS } from "@/data/catalog";
import { TEL_HREF, waLink } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+?91[\s-]?)?0?[6-9]\d{9}$|^0\d{2,4}[\s-]?\d{6,8}$/,
      "Enter a valid Indian phone number",
    ),
  category: z.string().min(1, "Choose a category"),
  quantity: z.string().trim().max(60).optional(),
  project: z.string().min(1, "Choose a project type"),
  message: z.string().trim().max(800, "Keep the message under 800 characters").optional(),
  contact: z.enum(["WhatsApp", "Phone call"]),
});
type Values = z.infer<typeof schema>;

const field = "h-11 w-full rounded-sm border bg-card px-3 text-sm";
const PROJECTS = [
  "New home",
  "Renovation",
  "Modular kitchen",
  "Wardrobe",
  "Office / commercial",
  "Carpentry contract",
  "Other",
];

export function EnquiryForm({ defaultCategory = "" }: { defaultCategory?: string }) {
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [done, setDone] = useState<null | Values>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const res = schema.safeParse(raw);
    if (!res.success) {
      const errs: typeof errors = {};
      for (const i of res.error.issues) errs[i.path[0] as keyof Values] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = res.data;
    const msg = [
      "Hello Sri Jain Plywood, I would like to enquire about your products.",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      `Category: ${v.category}`,
      v.quantity ? `Quantity: ${v.quantity}` : "",
      `Project: ${v.project}`,
      v.message ? `Message: ${v.message}` : "",
      `Preferred contact: ${v.contact}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setDone(v);
  }

  if (done) {
    return (
      <div role="status" className="rounded-md border bg-card p-8 shadow-soft">
        <CheckCircle2 className="h-8 w-8 text-whatsapp" />
        <h3 className="mt-4 text-2xl text-walnut">Your enquiry is ready in WhatsApp</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We opened WhatsApp with your details filled in — press <strong>Send</strong> there to
          reach us. This website does not store your details. If WhatsApp didn't open, use the
          button below or call us.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="whatsapp" size="xl">
            <a
              href={waLink(
                `Hello Sri Jain Plywood, this is ${done.name}. I'd like to enquire about ${done.category}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp again
            </a>
          </Button>
          <Button asChild variant="line" size="xl">
            <a href={TEL_HREF}>
              <Phone className="h-4 w-4" /> Call us
            </a>
          </Button>
          <Button variant="ghost" onClick={() => setDone(null)}>
            New enquiry
          </Button>
        </div>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof Values }) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid gap-4 rounded-md border bg-card p-6 shadow-soft md:grid-cols-2 md:p-8"
    >
      <label className="text-sm font-medium">
        Your name *
        <input name="name" className={`${field} mt-1.5`} maxLength={80} autoComplete="name" />
        <Err k="name" />
      </label>
      <label className="text-sm font-medium">
        Phone number *
        <input
          name="phone"
          type="tel"
          className={`${field} mt-1.5`}
          maxLength={16}
          autoComplete="tel"
        />
        <Err k="phone" />
      </label>
      <label className="text-sm font-medium">
        Product category *
        <select name="category" defaultValue={defaultCategory} className={`${field} mt-1.5`}>
          <option value="">Select…</option>
          {GROUPS.map((g) => (
            <option key={g.id} value={g.label}>
              {g.label}
            </option>
          ))}
          <option value="Not sure — need guidance">Not sure — need guidance</option>
        </select>
        <Err k="category" />
      </label>
      <label className="text-sm font-medium">
        Required quantity (if known)
        <input
          name="quantity"
          className={`${field} mt-1.5`}
          maxLength={60}
          placeholder="e.g. 10 sheets"
        />
      </label>
      <label className="text-sm font-medium">
        Project type *
        <select name="project" defaultValue="" className={`${field} mt-1.5`}>
          <option value="">Select…</option>
          {PROJECTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <Err k="project" />
      </label>
      <fieldset className="text-sm font-medium">
        <legend>Preferred contact *</legend>
        <div className="mt-3 flex gap-5 font-normal">
          {["WhatsApp", "Phone call"].map((c, i) => (
            <label key={c} className="flex items-center gap-2">
              <input
                type="radio"
                name="contact"
                value={c}
                defaultChecked={i === 0}
                className="accent-walnut"
              />{" "}
              {c}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="text-sm font-medium md:col-span-2">
        Message
        <textarea
          name="message"
          rows={4}
          maxLength={800}
          className="mt-1.5 w-full rounded-sm border bg-card p-3 text-sm"
          placeholder="Tell us about your project, sizes or finishes you like."
        />
        <Err k="message" />
      </label>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-muted-foreground">
          Submitting opens WhatsApp with your enquiry pre-filled. Nothing is stored on this website.
        </p>
        <Button type="submit" variant="walnut" size="xl">
          Send enquiry via WhatsApp
        </Button>
      </div>
    </form>
  );
}
