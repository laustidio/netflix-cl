import React from "react";
import "../styles/DetailsScreen.css";
import Youtube from "../render/Youtube";
import Banner from "../render/BannerDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";

function DetailsScreen({ trailerId, trailerDetails, closeDetails }) {
  const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover top">
      <p>Add to my list</p>
    </Popover>
  );

  return (
    <div className="detailsScreen__video">
      <div className="detailsScreen__video__button">
        <button
          className="detailsScreen__video--button"
          onClick={() => {
            closeDetails(true);
          }}
        >
          X
        </button>
      </div>
      <div style={{ position: "relative", marginBottom: "-6px" }}>
        {trailerId.key != null ? (
          <Youtube id={trailerId.key} />
        ) : trailerId.banner != null && trailerId.banner !== "" ? (
          <Banner trailerData={trailerDetails} />
        ) : (
          <Youtube id={"sY2djp46FeY"} />
        )}
      </div>
      <div className="detailsScreen__video__title">
        <h2>{trailerDetails?.original_title}</h2>
        <div className="detailsScreen__video__title--div">
          <button className="detailsScreen__video__title--play">
            <FontAwesomeIcon icon={faPlay} />
            <div></div>
            <span>Play</span>
          </button>
          <ButtonToolbar>
            <OverlayTrigger
              trigger={"hover"}
              container={this}
              placement="top"
              overlay={popoverHoverFocus}
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="fa-thin plus-icon"
              />
            </OverlayTrigger>
          </ButtonToolbar>
        </div>
      </div>
      <div className="detailsScreen__video--fadebottom" />
    </div>
  );
}

export default DetailsScreen;
