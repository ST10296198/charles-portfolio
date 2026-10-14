import { Children, isValidElement, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Static text and explicit <br /> breaks: splitting happens during render,
// never through a later DOM replacement or font-dependent line measurement.
export default function SplitText({ children, as: Tag = "h2", className = "" }) {
  const headingRef = useRef(null);
  const parts = Children.toArray(children);
  const text = parts.map((part) => isValidElement(part) && part.type === "br"
    ? " " : String(part)).join("").replace(/\s+/g, " ").trim();

  useLayoutEffect(() => {
    let completed = false;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add({
        desktop: "(min-width: 1200px)",
        tablet: "(min-width: 651px) and (max-width: 1199px)",
        mobile: "(max-width: 650px)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      }, ({ conditions }) => {
        if (conditions.reducedMotion || completed) return;
        const words = gsap.utils.toArray(".split-text__word");
        if (!words.length) return;
        const { mobile, tablet } = conditions;
        gsap.fromTo(words, {
          opacity: 0,
          yPercent: mobile ? 35 : tablet ? 50 : 65,
        }, {
          opacity: 1,
          yPercent: 0,
          duration: mobile ? 0.5 : 0.8,
          stagger: { amount: Math.min((words.length - 1) * (mobile ? 0.025 : 0.055), mobile ? 0.14 : 0.28) },
          ease: "power3.out",
          clearProps: "opacity,transform",
          onComplete: () => { completed = true; },
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }, headingRef.current);
    }, headingRef.current);
    return () => ctx.revert();
  }, [children]);

  return (
    <Tag ref={headingRef} className={`split-text ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {parts.map((part, partIndex) => {
          if (isValidElement(part)) return part;
          return String(part).split(/(\s+)/).map((token, tokenIndex) => (
            /\S/.test(token) ? (
              <span className="split-text__mask" key={`${partIndex}-${tokenIndex}`}>
                <span className="split-text__word">{token}</span>
              </span>
            ) : token
          ));
        })}
      </span>
    </Tag>
  );
}
