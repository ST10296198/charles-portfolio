import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHomeAnimations(container) {
  if (!container) return () => {};

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    // Section reveals
    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // Homepage image scaling
    gsap.utils
      .toArray(".image-reveal")
      .forEach((wrapper) => {
        const image = wrapper.querySelector("img");

        if (!image) return;

        gsap.fromTo(
          image,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

    // Optional parallax
    gsap.utils
      .toArray("[data-parallax]")
      .forEach((element) => {
        gsap.fromTo(
          element,
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
  }, container);

  return () => ctx.revert();
}