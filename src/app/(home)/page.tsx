import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { HeroContent } from "./HeroContent";
import { FeatureSection } from "./featureSection";
import { CTASection } from "./ctaSection";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <HeroContent />
      <FeatureSection />
      <CTASection />
    </HydrateClient>
  );
}
