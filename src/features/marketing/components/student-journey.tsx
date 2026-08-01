import { journeySteps } from "@/features/marketing/data/landing";

export function StudentJourney() {
  return (
    <div className="relative">
      <div className="absolute inset-y-8 end-5 hidden w-px bg-border md:block" />
      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {journeySteps.map((step, index) => (
          <article
            key={step.title}
            className="relative rounded-3xl border bg-card p-5 shadow-sm shadow-foreground/5 transition-colors hover:border-primary/25 motion-reduce:transition-none md:odd:translate-y-6 sm:p-6"
          >
            <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <span className="font-semibold">{index + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
