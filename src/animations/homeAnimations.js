import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHomeAnimations(container) {
  if (!container) return () => {};

  const ctx = gsap.context(() => {
    const revealed = new WeakSet();
    // MatchMedia is collected by this context, including its responsive cleanup.
    gsap.matchMedia().add({
      desktop: "(min-width: 1200px)",
      tablet: "(min-width: 651px) and (max-width: 1199px)",
      mobile: "(max-width: 650px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, ({ conditions }) => {
      if (conditions.reducedMotion) return;
      const distance = conditions.mobile ? 12 : conditions.tablet ? 20 : 28;

      // Explicit opt-in only: no hero, RevealText, orbit or magnetic targets.
      gsap.utils.toArray("[data-home-reveal]").forEach((element) => {
        if (revealed.has(element)) return;
        const order = Number(element.dataset.homeReveal) || 0;
        gsap.fromTo(element, { opacity: 0, y: distance }, {
          opacity: 1,
          y: 0,
          duration: conditions.mobile ? 0.55 : 0.85,
          delay: Math.min(order, 3) * (conditions.mobile ? 0.025 : 0.06),
          ease: "power3.out",
          clearProps: "opacity,transform",
          onComplete: () => revealed.add(element),
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, container);
  }, container);

  return () => ctx.revert();
}
