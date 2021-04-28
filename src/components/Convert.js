import React, { useState, useEffect } from "react";
import axios from "axios";
const Convert = ({ lang, text }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [debounceText, setDebounceText] = useState(text);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceText(text);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debounceText,
            target: lang.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setTranslatedText(data.data.translations[0].translatedText);
    };
    doTranslation();
  }, [lang, debounceText]);

  return (
    <div>
      <h1 className="ui header">{translatedText}</h1>
    </div>
  );
};
export default Convert;
