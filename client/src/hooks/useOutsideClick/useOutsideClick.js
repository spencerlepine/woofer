import { useEffect } from 'react';
// import React, { useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';

/**
 * https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js:0-1006
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(ref, handleClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

// /**
//  * Component that alerts if you click outside of it
//  */
// function OutsideAlerter(props) {
//   const wrapperRef = useRef(null);
//   useOutsideAlerter(wrapperRef);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }

// OutsideAlerter.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default useOutsideClick;
