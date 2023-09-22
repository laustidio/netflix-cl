import React, { useEffect } from "react";
import "../styles/DetailsScreen.css";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import axios from "axios";

function DetailsScreen({ trailerId, trailerDetails, closeDetails }) {
  console.log(trailerDetails);
  useEffect(() => {
    renderTrailer();
    // eslint-disable-next-line
  }, [trailerId, trailerDetails]);

  const renderTrailer = () => {
    return (
      <YouTube
        videoId={trailerId.key}
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
          },
        }}
      />
    );
  };

  const renderbanner = async () => {
    if (trailerDetails.backdrop_path) {
      const imgage = await axios.get(
        `https://image.tmdb.org/t/p/w500${trailerDetails.backdrop_path}`
      );
      return <div></div>;
    } else {
      alert("Unspected error!");
    }
  };

  return (
    <>
      <div className="detailsScreen__video">
        <div className="detailsScreen__video__button">
          <button
            onClick={() => closeDetails}
            className="detailsScreen__video--button"
          >
            X
          </button>
        </div>
        <div style={{ position: "relative" }}>
          {trailerId.key !== "" && trailerId.banner === undefined
            ? renderTrailer()
            : renderbanner}
        </div>
        <div className="detailsScreen__video--fadebottom" />
      </div>
      <Modal.Body className="detailsScreen__body">
        <div className="detailsScreen__details">
          <h3>Details</h3>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}

export default DetailsScreen;
