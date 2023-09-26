import React from "react";

function Banner(trailerData) {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${trailerData.trailerData.backdrop_path}`}
        alt="banner"
        width={640}
        height={400}
      />
    </div>
  );
}

export default Banner;
