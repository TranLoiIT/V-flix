import { PREV } from 'assets/variables/dir';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  transition: ${(props) => (props.sliding ? 'none' : props.transition)};
  transform: ${(props) => {
    if (props.length === 1) return 'translateX(0)';
    if (!props.sliding) return `translateX(calc(-100% + ${props.value}))`;
    if (props.dir === PREV)
      return `translateX(calc(2 * (-100% + ${props.value})))`;
    return `translateX(calc(0% + ${props.value}))`;
  }};
`;

export default CarouselContainer;
