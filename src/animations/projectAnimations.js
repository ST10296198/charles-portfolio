import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectAnimations(container) {
  if (!container) return () => {};

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    // Project content reveals
    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 55,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // Project images scale with scrolling
    gsap.utils
      .toArray(".image-reveal")
      .forEach((wrapper) => {
        const image = wrapper.querySelector("img");

        if (!image) return;

        gsap.fromTo(
          image,
          { scale: 1.14 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

    // Optional parallax
    gsap.utils
      .toArray("[data-parallax]")
      .forEach((element) => {
        const distance =
          Number(element.dataset.parallax) || 45;

        gsap.fromTo(
          element,
          { y: -distance },
          {
            y: distance,
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