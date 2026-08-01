import { Progress } from "@/components/ui/progress";
import type { FeatureHighlight as FeatureHighlightType } from "@/features/marketing/types/marketing";

type FeatureHighlightProps = {
  feature: FeatureHighlightType;
  index: number;
};

export function FeatureHighlight({ feature, index }: FeatureHighlightProps) {
  const Icon = feature.icon;
  const previewValue = 54 + index * 6;

  return (
    <article className="rounded-3xl border bg-card p-5 shadow-sm shadow-foreground/5 transition-colors hover:border-primary/30 hover:bg-card/95 motion-reduce:transition-none sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Icon aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {feature.title}
      </h3>
      <p className="mt-2 text-base leading-7 text-muted-foreground">
        {feature.description}
      </p>
      <div className="mt-5 rounded-2xl bg-muted/60 p-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>{feature.previewLabel}</span>
          <span className="text-primary">{previewValue}%</span>
        </div>
        <Progress value={previewValue} />
      </div>
    </article>
  );
}
