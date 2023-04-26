const { NEXT, PREV } = require('assets/variables/dir');
const { useSwipeable } = require('react-swipeable');

const handlers = (action) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSwipeable({
    onSwipedLeft: () => action(NEXT),
    onSwipedRight: () => action(PREV),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });
};

export default handlers;
