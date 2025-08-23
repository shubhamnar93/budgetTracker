"use client";
import { useEffect } from "react";
import { HeroContent } from "./HeroContent";
import { FeatureSection } from "./featureSection";
import { CTASection } from "./ctaSection";
import { useRouter } from "next/navigation";

export const CheckIsLogin = ({ authenticated }: { authenticated: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/budget");
    }
  }, [authenticated, router]);

  return (
    <>
      <HeroContent />
      <FeatureSection />
      <CTASection />
    </>
  );
};
