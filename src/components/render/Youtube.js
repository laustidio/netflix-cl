import React from "react";
import YouTube from "react-youtube";

function Youtube(id) {
  return (
    <YouTube
      videoId={`${id.id}`}
      opts={{
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          modestbranding: 0,
          rel: 0,
          mute: 1,
        },
      }}
    />
  );
}

export default Youtube;
