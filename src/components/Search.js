import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  //thaksto the useState we can have something like this in fucntion components
  const [term, setTerm] = useState("programming");
  const [debounceTerm, setDebounceTerm] = useState(term);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debounceTerm,
        },
      });
      setResults(data.query.search);
    };
    if (debounceTerm) search();
  }, [debounceTerm]);

  const renderResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noreferrer"
          >
            read more
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label> Enter Search Term</label>
          <input
            className="input"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderResults}</div>
    </div>
  );
};

export default Search;
