import "./styles/Row.css";
import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DetailsScreen from "./modal/DetailsScreen";
import AlertMessage from "./alerts/AlertMessage";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerDetails, setTrailerDetails] = useState(null);
  const base_url = "https://image.tmdb.org/t/p/original";
  const urlDetails = "https://api.themoviedb.org/3/movie/";
  const api__key = process.env.REACT_APP_API_KEY;
  const [trailerId, setTrailerId] = useState({
    key: null,
    banner: null,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  const [messageAlert, setMessageAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [messageTitle, setMessageTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(fetchUrl)
        .then((results) => {
          setMovies(results.data.results);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    fetchData();
  }, [fetchUrl]);

  async function fetchDataDetails(idMovie) {
    await axios
      .get(`${urlDetails}${idMovie}`, {
        params: {
          api_key: api__key,
          append_to_response: "videos,images",
        },
      })
      .then((results) => {
        renderDetails(results.data);
      })
      .catch(() => {
        setMessageTitle("Oops! It seems there was an error with this video!");
        setMessageAlert(
          "Sorry, this video is not available for viewing. Please, be free to choose another video."
        );
        setAlertColor("danger");
        handleShowAlert();
        setTimeout(() => {
          handleClose();
        }, 5000);
      });
  }

  const renderDetails = (data) => {
    setTrailerDetails(data);
    if (data.videos !== undefined && data.videos.results.length > 0) {
      const trailer = data.videos.results.find((vid) => {
        return vid.name === "Official Trailer" || "Main Trailer";
      });
      const key = trailer ? trailer.key : data.videos.results[0].key;
      setTrailerId({ key: key });
      handleShow(true);
    } else {
      const img =
        data.images.posters.length > 0
          ? data.images.posters[0].file_path
          : data.backdrop_path !== null
          ? data.backdrop_path
          : "";
      setTrailerId({ banner: img });
      handleShow(true);
    }
  };

  return (
    <div className={`_row`}>
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                onClick={() => {
                  fetchDataDetails(movie.id);
                }}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                id={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={`${movie.name}`}
              />
            )
        )}
      </div>
      <div>
        {show && (
          <>
            <Modal
              show={show}
              onHide={handleClose}
              size="md"
              className="detailsScreen"
            >
              <DetailsScreen
                closeDetails={handleClose}
                trailerId={trailerId}
                trailerDetails={trailerDetails}
              />
            </Modal>
          </>
        )}
      </div>
      <div>
        {showAlert && (
          <>
            <Modal show={showAlert} onHide={handleCloseAlert}>
              <AlertMessage
                closeAlert={handleCloseAlert}
                title={messageTitle}
                message={messageAlert}
                color={alertColor}
              />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default Row;
