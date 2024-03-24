"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import UpcomingCard from "../components/UpcomingCard";
import genresList from "../data/genresList";
import AiringCard from "../components/AiringCard";

function App() {
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);

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
      updateStateForSubtype(subtype, data);
      return;
    }

    fetch(`https://api.jikan.moe/v4/top/anime?filter=${subtype}`)
      .then((res) => res.json())
      .then((anime) => {
        sessionStorage.setItem(subtype, JSON.stringify(anime));
        updateStateForSubtype(subtype, anime);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 429) {
          console.log(
            "👹 Rate limit exceeded, Please wait a moment and try again"
          );
        } else {
          console.log("❗ERROR MESSAGE: ", err.message);
        }
      });
  };

  const updateStateForSubtype = (subtype, anime) => {
    let episodes = anime.data;

    if (subtype === "upcoming") {
      episodes = episodes.slice(0, 8);
    } else if (subtype === "bypopularity") {
      episodes = episodes.slice(0, 20);
    } else if (subtype === "airing") {
      episodes = episodes.slice(0, 15);
    }

    const updatedEpisodes = getNewTitles(episodes);

    if (subtype === "upcoming") {
      setUpcoming(updatedEpisodes);
    } else if (subtype === "bypopularity") {
      setPopular(updatedEpisodes);
    } else if (subtype === "airing") {
      setPopularAnime(updatedEpisodes);
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
          <div className="media">
            <div className="media-header">
              <div className="left">
                <img src="/images/naruto.png" alt="naruto" />
                <h2>UPCOMING</h2>
              </div>
              <div className="right">
                <h2>1</h2>
                <h2>2</h2>
                <h2>3</h2>
                <h2>4</h2>
                <h2>5</h2>
              </div>
            </div>
            <div className="episodes-upcoming">
              <div className="episodes-upcoming-grid">
                {upcoming?.map((upcomingEp) => {
                  return (
                    <UpcomingCard
                      episode={upcomingEp}
                      key={upcomingEp.mal_id}
                    />
                  );
                })}
              </div>
            </div>
            <div className="most-popular-tiles">
              <div className="media-header">
                <img src="/images/sasuke.png" alt="sasuke" />
                <h2> CURRENTLY AIRING</h2>
              </div>
              {popularAnime.length > 0 ? (
                <div className="episodes-popular-grid">
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
          </div>
          <div className="lists-section">
            <div className="lists-advertisements">
              <div className="media-header">
                <img src="/images/kiba.png" alt="kiba" />
                <h2> ADVERTISEMENTS</h2>
              </div>
              <div className="advertisement">
                <img src="/images/advertisement.png" alt="kimetsu" />
              </div>
            </div>
            <div className="lists-top">
              <div className="media-header">
                <img src="/images/sakura.png" alt="kiba" />
                <h2> POPULAR </h2>
              </div>
              <div className="top-shows">
                <div className="top-shows-list">
                  {popular?.map((popEp) => {
                    return <p>{popEp.newTitle}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className="lists-genre">
              <div className="media-header">
                <img src="/images/neji.png" alt="neji" />
                <h2> GENRES</h2>
              </div>
              <div className="genresList">
                {genresList?.map((genre) => {
                  return <p>{genre}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
