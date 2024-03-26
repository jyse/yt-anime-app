"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import UpcomingCard from "../components/UpcomingCard";
import genresList from "../data/genresList";
import AiringCard from "../components/AiringCard";

const makeRequest = async (url, method, body) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return response.json();
};

function App() {
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [airingAnime, setAiringAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);

  const formatAnimeTitles = (animeList) => {
    const updatedAnimeList = animeList.map((anime) => {
      const isLongTitle = anime.title.split(" ").length > 5;
      const newTitle = isLongTitle ? anime.title.slice(0, 25) : anime.title;
      return { ...anime, newTitle };
    });
    return updatedAnimeList;
  };

  const isCacheValid = (cachedData) => {
    if (!cachedData) return false;

    const { timestamp } = JSON.parse(cachedData);
    return Date.now() - timestamp < 3600000;
  };

  const getAnime = async (category) => {
    console.log(category, "what is in category here 🌸");
    const cachedAnime = sessionStorage.getItem(category);

    if (cachedAnime && isCacheValid(cachedAnime)) {
      const parsedAnime = JSON.parse(cachedAnime);
      updateAnimeState(category, parsedAnime.data || []);
      return;
    }

    try {
      const response = await fetch(`/api/anime/${category}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch anime category: ${category}, Status: ${response.status}`
        );
      }

      const { data } = await response.json();

      // Cache the new data with a timestamp
      const dataToCache = { data, timestamp: Date.now() };
      sessionStorage.setItem(category, JSON.stringify(dataToCache));

      updateAnimeState(category, data);
    } catch (err) {
      console.error("❗error message: ", err.message);
    }
  };

  const updateAnimeState = (category, animeList) => {
    const formattedAnime = formatAnimeTitles(animeList);

    switch (category) {
      case "upcoming":
        setUpcomingAnime(formattedAnime.slice(0, 8));
        break;
      case "airing":
        setAiringAnime(formattedAnime.slice(0, 20));
        break;
      case "bypopularity":
        setPopularAnime(formattedAnime.slice(0, 15));
        break;
      default:
        console.warn(`Unknown category: ${category}`);
    }
  };

  useEffect(() => {
    const staggeredRequest = (category, delay) =>
      setTimeout(() => getAnime(category), delay);
    staggeredRequest("upcoming", 0);
    staggeredRequest("bypopularity", 500);
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
              {upcomingAnime?.map((anime) => {
                return <UpcomingCard episode={anime} key={anime.mal_id} />;
              })}
            </div>

            <div className="media-header">
              <div className="media-title">
                <img src="/images/sasuke.png" alt="sasuke" />
                <h2> CURRENTLY AIRING</h2>
              </div>
            </div>
            {airingAnime.length > 0 ? (
              <div className="episodes-grid airing">
                {airingAnime?.map((anime) => (
                  <AiringCard episode={anime} key={anime.mal_id} />
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
              {popularAnime?.map((anime) => {
                return <p>{anime.newTitle}</p>;
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
