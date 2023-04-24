import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";


const Home = () => {

    const yt = [
        '9l_fOhTQ5jM',
        'dQw4w9WgXcQ'
    ];

    return (
        <div className="home">
            <YoutubeEmbed embedId={yt[Math.floor(Math.random()*yt.length)]} />
        </div>
    );
}
 
export default Home;