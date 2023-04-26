import PropTypes from 'prop-types';
import React, { useState } from 'react';
import trimText from './trimText';

const ReadMore = (props) => {
  const { text, min, ideal, max, readMoreText } = props;
  const args = [text, min, ideal, max];

  const [primaryText, secondaryText] = trimText(...args);
  const [state, setState] = useState({
    displaySecondary: false,
    primaryText,
    secondaryText,
    readMoreText,
  });

  const setStatus = () => {
    const display = !state.displaySecondary;
    setState({ ...state, displaySecondary: display });
  };

  let displayText;
  if (!state.secondaryText) {
    displayText = (
      <div className='display-text-group'>
        <span className='displayed-text'>
          {`${state.primaryText} ${state.secondaryText}`}
        </span>
      </div>
    );
  } else if (state.displaySecondary) {
    displayText = (
      <div className='display-text-group'>
        <div
          className='displayed-text'
          onClick={(e) => {
            setStatus();
            e.preventDefault();
          }}
        >
          {`${state.primaryText} ${state.secondaryText}`}
        </div>
      </div>
    );
  } else {
    displayText = (
      <div className='display-text-group'>
        <span className='displayed-text'>
          {state.primaryText}
          <span style={{ display: 'none' }}>{state.secondaryText}</span>
          <div
            className='read-more-button text-red-primary cursor-pointer font-bold hover:text-red-primary-d'
            onClick={(e) => {
              setStatus();
              e.preventDefault();
            }}
          >
            {state.readMoreText}
          </div>
        </span>
      </div>
    );
  }

  return displayText;
};

ReadMore.propTypes = {
  text: PropTypes.string.isRequired,
  min: PropTypes.number,
  ideal: PropTypes.number,
  max: PropTypes.number,
  readMoreText: PropTypes.string,
};

ReadMore.defaultProps = {
  readMoreText: 'đọc thêm',
};

export default ReadMore;
