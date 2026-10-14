import React from "react";
import { Link } from "react-router-dom";
import PortfolioImage from "../PortfolioImage";

const NextProject = ({
  label = "Next Project",
  title,
  path,
  image,
}) => {
  return (
    <section className="next-project">
      <Link to={path} className="next-project__link">

        <PortfolioImage
          className="next-project__background"
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          fetchPriority="low"
        />

        <div className="next-project__overlay" />

        <div className="next-project__content">
          <span>{label}</span>

          <h2>{title}</h2>

          <div className="next-project__arrow">
            ↗
          </div>
        </div>

      </Link>
    </section>
  );
};

export default NextProject;