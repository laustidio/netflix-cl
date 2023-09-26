import Nav from "../Nav";
import Row from "../Row";
import React from "react";
import Banner from "../Banner";
import "../styles/HomeScreen.css";
import requests from "../../api/Requests";

function HomeScreen() {
  return (
    <div className="homescreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        isLargeRow={false}
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        isLargeRow={false}
        title="Top Rated"
        fetchUrl={requests.fetchToRapted}
      />
      <Row
        isLargeRow={false}
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        isLargeRow={false}
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        isLargeRow={false}
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        isLargeRow={false}
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        isLargeRow={false}
        title="Documentaries"
        fetchUrl={requests.fetchDocumentariesMovies}
      />
    </div>
  );
}

export default HomeScreen;
