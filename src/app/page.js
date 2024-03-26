"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import UpcomingCard from "../components/UpcomingCard";
import genresList from "../data/genresList";
import AiringCard from "../components/AiringCard";

function App() {
  const [upcoming, setUpcoming] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [popular, setPopular] = useState([]);

  const getNewTitles = (episodes) => {
    const updatedEpisodes = episodes.map((ep) => {
      const words = ep.title.split(" ");

      let newTitle = "";
      if (words.length > 5) {
        newTitle = ep.title.slice(0, 25);
      } else {
        newTitle = ep.title;
      }
      return { ...ep, newTitle: newTitle };
    });
    return updatedEpisodes;
  };

  const getEpisodes = (subtype) => {
    const cachedData = sessionStorage.getItem(subtype);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      updateStateForSubtype(subtype, data.data || []);
      return;
    }

    fetch(`https://api.jikan.moe/v4/top/anime?filter=${subtype}`)
      .then((res) => res.json())
      .then((anime) => {
        sessionStorage.setItem(subtype, JSON.stringify(anime));
        updateStateForSubtype(subtype, anime.data || []);
      })
      .catch((err) => {
        console.log("❗ERROR MESSAGE: ", err.message);
      });
  };

  const updateStateForSubtype = (subtype, episodes) => {
    console.log(episodes, "what is in episodes? ");
    const updatedEpisodes = getNewTitles(episodes);

    if (subtype === "upcoming") {
      setUpcoming(updatedEpisodes.slice(0, 8));
    } else if (subtype === "bypopularity") {
      setUpcoming(updatedEpisodes.slice(0, 20));
    } else if (subtype === "airing") {
      setUpcoming(updatedEpisodes.slice(0, 15));
    }
  };

  useEffect(() => {
    const staggeredRequest = (endpoint, delay) =>
      setTimeout(() => getEpisodes(endpoint), delay);
    staggeredRequest("upcoming", 0);
    staggeredRequest("bypopularity", 400);
    staggeredRequest("airing", 600);
  }, []);

  return (
    <div className="anime-app">
      <div className="container">
        <Header />
        <div className="content">
          <div className="media-section">
            <div className="media-header">
              <div className="media-title">
                <img src="/images/naruto.png" alt="naruto" />
                <h2>UPCOMING</h2>
              </div>
              <div className="pagination">
                {[1, 2, 3, 4, 5].map((num) => {
                  return <h2 key={num}>{num}</h2>;
                })}
              </div>
            </div>
            <div className="episodes-grid upcoming">
              {upcoming?.map((upcomingEp) => {
                return (
                  <UpcomingCard episode={upcomingEp} key={upcomingEp.mal_id} />
                );
              })}
            </div>

            <div className="media-header">
              <div className="media-title">
                <img src="/images/sasuke.png" alt="sasuke" />
                <h2> CURRENTLY AIRING</h2>
              </div>
            </div>
            {popularAnime.length > 0 ? (
              <div className="episodes-grid airing">
                {popularAnime?.map((popularAnime) => (
                  <AiringCard
                    episode={popularAnime}
                    key={popularAnime.mal_id}
                  />
                ))}
              </div>
            ) : (
              <p>Loading airing anime</p>
            )}
          </div>
          <div className="lists-section">
            <div className="media-header">
              <div className="media-title">
                <img src="/images/kiba.png" alt="kiba" />
                <h2> ADVERTISEMENTS</h2>
              </div>
            </div>
            <div className="advertisement">
              <img src="/images/advertisement.png" alt="kimetsu" />
            </div>

            <div className="media-header">
              <div className="media-title">
                <img src="/images/sakura.png" alt="kiba" />
                <h2> POPULAR </h2>
              </div>
            </div>
            <div className="popular-shows">
              {popular?.map((popEp) => {
                return <p>{popEp.newTitle}</p>;
              })}
            </div>

            <div className="media-header">
              <div className="media-title">
                <img src="/images/neji.png" alt="neji" />
                <h2> GENRES</h2>
              </div>
            </div>
            <div className="genres-anime">
              {genresList?.map((genre) => {
                return <p>{genre}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
