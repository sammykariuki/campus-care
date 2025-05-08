'use client';

import { useEffect, useState } from "react";
import classes from './page.module.css';
import DisplayCard from "@/components/cards/news/display";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [timeFilter, setTimeFilter] = useState("latest");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/news/get-news');
      const data = await res.json();
      setNews(data);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setNews(prev => prev.filter(g => g.id !== id));
  };

  const sortedNews = [...news].sort((a, b) => {
    if (timeFilter === "latest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  })

  return (
    <>
      <div className={classes.controls}>
        <div className={classes.filterSection}>
          <label htmlFor="timeFilter">Sort by: </label>
          <select id="timeFilter" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {sortedNews.map((n) => (
        <DisplayCard key={n.id} {...n} path="/anonymous/news" onDelete={handleDelete} />
      ))}
    </>
  );
}