import React, { useState, useEffect, useRef } from "react";
import Convert from "./Convert";
import DropDown from "./Dropdown";
//
const options = [
  {
    label: "Afrikaan",
    value: "af",
  },
  {
    label: "Arabic",
    value: "ar",
  },
  {
    label: "Hindi",
    value: "hi",
  },
];

const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [textToTranslate, setTextToTranslate] = useState("");
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
          />
        </div>
      </div>
      <DropDown
        selected={language}
        onSelectedChange={setLanguage}
        options={options}
        label="Select a language"
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <Convert text={textToTranslate} lang={language} />
    </div>
  );
};
export default Translate;
