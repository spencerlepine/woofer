import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from 'hooks/useOutsideClick/useOutsideClick';

const Popup = ({ DefaultElem, PopupElem, manualDisplay }) => {
  const [displayPopup, setDisplayPopup] = useState(manualDisplay);
  const popupRef = useRef(null);
  useOutsideClick(popupRef, () => setDisplayPopup(false));

  return (
    <React.Fragment>{
      displayPopup ? (
        <div>
          <div ref={popupRef}>
            <button onClick={() => setDisplayPopup(false)}>X</button>
            {PopupElem}
          </div>
        </div >
      ) : (
        <div onClick={() => setDisplayPopup(true)} role={'presentation'}>
          {DefaultElem}
        </div>
      )}</React.Fragment>
  );
};

export default Popup;

Popup.propTypes = {
  DefaultElem: PropTypes.object.isRequired,
  PopupElem: PropTypes.object.isRequired,
  manualDisplay: PropTypes.bool,
};

Popup.defaultProps = {
  manualDisplay: false,
};