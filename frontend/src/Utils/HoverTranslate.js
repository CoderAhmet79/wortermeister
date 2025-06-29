import React, { useState, useRef } from 'react';

const HoverTranslate = ({ word }) => {
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const timeoutRef = useRef(null);

  const handleMouseEnter = (e) => {
    const { pageX, pageY } = e;

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${word}&langpair=de|en`
        );
        const data = await res.json();
        const translated = data.responseData.translatedText;

        setTooltip({
          visible: true,
          text: translated,
          x: pageX + 10,
          y: pageY + 10,
        });
      } catch (error) {
        console.error('Translation failed:', error);
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };

  return (
    <>
      <span
        style={{ cursor: 'help', borderBottom: '1px dashed gray' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {word}
      </span>
      {tooltip.visible && (
        <div
          style={{
            position: 'absolute',
            top: tooltip.y,
            left: tooltip.x,
            background: '#333',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 999,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};

export default HoverTranslate;
