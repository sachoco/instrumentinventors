import React from "react";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import Slider from "react-slick";
import styles from "./ProfileSlideshow.module.scss";

export default function ProfileSlideshow(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderArrow to="left" />,
    nextArrow: <SliderArrow to="right" />,
  };

  return (
    <Slider {...settings}>
      {props.slideshow
        ? props.slideshow.map((slide, i) => (
            <div className={styles.slideItem} key={i}>
              <div
                className="background"
                style={{
                  backgroundImage: "url(" + slide.image.url + ")",
                }}
              />
              {props.edit && (
                <div className="overlay">
                  <Button
                    onClick={() => props.imageUploader.open("slideshow", i, props.slideshow)}
                    variant="contained"
                  >
                    Edit Image
                  </Button>
                  <Button
                    onClick={() => props.onRemove("slideshow", i)}
                    variant="contained"
                    color="secondary"
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>
          ))
        : null}
      {props.edit && (
        <div className={clsx(styles.slideItem, styles.addItem)}>
          <div className="overlay">
            <Button
              onClick={() => props.imageUploader.open("slideshow", -1, props.slideshow)}
              variant="contained"
            >
              Add Image
            </Button>
          </div>
        </div>
      )}
    </Slider>
  );
}

const SliderArrow = ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`button button--text button--icon ${className}`}
    aria-label={to}
  >
    {to == "right" ? ">" : "<"}
  </button>
);
