import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectAnimations(container) {
  if (!container) return () => {};

  const ctx = gsap.context(() => {
    const revealed = new WeakSet();
    gsap.matchMedia().add({
      desktop: "(min-width: 1200px)",
      tablet: "(min-width: 651px) and (max-width: 1199px)",
      mobile: "(max-width: 650px)",
      stickyViewport: "(min-width: 1024px) and (min-height: 700px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, ({ conditions }) => {
      if (conditions.reducedMotion) return;
      const { mobile, tablet } = conditions;
      const distance = mobile ? 12 : tablet ? 22 : 32;

      // Architecture headings share editorial reveals; nodes use their own timeline.
      gsap.utils.toArray(
        ".case-hero .reveal, .showcase-section .reveal, " +
        ".project-details .reveal, .tech-story .reveal, " +
        ".architecture-section > .case-container > .reveal",
      ).forEach((element) => {
        if (revealed.has(element)) return;
        const siblings = Array.from(element.parentElement.children)
          .filter((sibling) => sibling.matches(".reveal"));
        const headingOrder = element.className.match(/reveal-delay-(\d)/);
        const order = headingOrder ? Number(headingOrder[1]) : siblings.indexOf(element);
        gsap.fromTo(element, { opacity: 0, y: distance }, {
          opacity: 1,
          y: 0,
          duration: mobile ? 0.55 : 0.9,
          delay: Math.min(Math.max(order, 0), 3) * (mobile ? 0.025 : 0.06),
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

      gsap.utils.toArray(".case-hero__visual.image-reveal, .showcase-image.image-reveal")
        .forEach((wrapper) => {
          const image = wrapper.querySelector("img");
          if (!image) return;

          // Wrapper owns opacity only; its image owns the single scrubbed transform.
          if (!revealed.has(wrapper)) gsap.fromTo(wrapper, { opacity: 0 }, {
            opacity: 1,
            duration: mobile ? 0.6 : 1,
            ease: "power2.out",
            clearProps: "opacity",
            onComplete: () => revealed.add(wrapper),
            scrollTrigger: {
              trigger: wrapper,
              start: "top 92%",
              once: true,
            },
          });

          // Mobile keeps the entire image stationary and uncropped by transforms.
          if (mobile) return;
          const stickyBody = wrapper.closest(".showcase-section--sticky")
            ?.querySelector(".showcase-body");
          // Measure the normal-flow narrative, not a visual held by CSS sticky.
          const motionTrigger = conditions.stickyViewport && stickyBody &&
            getComputedStyle(stickyBody).display === "grid" ? stickyBody : wrapper;
          const parallax = () => -Math.min(
            Number(wrapper.dataset.parallax) || 0,
            image.offsetHeight * (tablet ? 0.006 : 0.01),
          );
          gsap.fromTo(image, { scale: tablet ? 1.02 : 1.035, y: parallax }, {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: motionTrigger,
              start: "top bottom",
              end: "bottom top",
              scrub: tablet ? 0.45 : 0.65,
              invalidateOnRefresh: true,
            },
          });
        });
      const architectureCleanups = [];
      gsap.utils.toArray(".architecture-diagram").forEach((diagram) => {
        if (revealed.has(diagram)) return;
        const nodes = Array.from(diagram.querySelectorAll("[data-architecture-node]"));
        const step = mobile ? 0.12 : 0.18;
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: diagram, start: "top 82%", once: true },
          onComplete: () => revealed.add(diagram),
        });
        nodes.forEach((node, index) => {
          timeline.fromTo(node, { opacity: 0, y: mobile ? 8 : 16 }, {
            opacity: 1, y: 0, duration: mobile ? 0.4 : 0.55,
            ease: "power3.out", clearProps: "opacity,transform",
          }, index * step);
          timeline.fromTo(node.querySelector(".architecture-node__description"), { opacity: 0 }, {
            opacity: 1, duration: 0.35, clearProps: "opacity",
          }, index * step + 0.15);
        });
        diagram.querySelectorAll("[data-architecture-connection]").forEach((line) => {
          const fromIndex = nodes.findIndex((node) => node.dataset.architectureNode === line.dataset.from);
          const toIndex = nodes.findIndex((node) => node.dataset.architectureNode === line.dataset.to);
          timeline.fromTo(line, { strokeDashoffset: 1 }, {
            strokeDashoffset: 0, duration: mobile ? 0.3 : 0.45, ease: "power2.inOut",
            clearProps: "strokeDashoffset",
          }, Math.max(fromIndex, toIndex) * step + 0.1);
        });
        const finishOnFocus = () => timeline.progress(1);
        diagram.addEventListener("focusin", finishOnFocus);
        architectureCleanups.push(() => diagram.removeEventListener("focusin", finishOnFocus));
      });
      return () => architectureCleanups.forEach((cleanup) => cleanup());
    }, container);
  }, container);

  return () => ctx.revert();
}
