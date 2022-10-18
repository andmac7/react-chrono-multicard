import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { TimelineCardModel } from '../../../models/TimelineItemModel';
import { GlobalContext } from '../../GlobalContext';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import {
  Circle,
  CircleWrapper,
  TimelineContentContainer,
  TimelineTitleContainer,
  Wrapper
} from './timeline-horizontal-card.styles';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const TimelineWithCards: React.FunctionComponent<TimelineCardModel> = ({
  active,
  autoScroll,
  id,
  onClick,
  onElapsed,
  slideShowRunning,
  theme,
  title,
  wrapperId,
  customContent,
  hasFocus,
  iconChild,
  cards
}: TimelineCardModel) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const {
    mode,
    cardPositionHorizontal: position,
    timelineCircleDimension,
    disableClickOnCircle,
    cardLess,
    showAllCardsHorizontal,
  } = useContext(GlobalContext);

  const handleClick = () => {
    if (!disableClickOnCircle && onClick && !slideShowRunning) {
      onClick(id);
    }
  };

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;

      if (circle && wrapper) {
        const circleOffsetLeft = circle.offsetLeft;
        const wrapperOffsetLeft = wrapper.offsetLeft;

        autoScroll({
          pointOffset: circleOffsetLeft + wrapperOffsetLeft,
          pointWidth: circle.clientWidth,
        });
      }
    }
  }, [active, autoScroll, mode]);

  const handleOnShowMore = useCallback(() => {}, []);

  const modeLower = useMemo(() => mode?.toLowerCase(), [mode]);

  const containerClass = useMemo(
    () =>
      cls(
        'timeline-horz-card-wrapper',
        modeLower,
        position === 'TOP' ? 'bottom' : 'top',
        showAllCardsHorizontal ? 'show-all' : '',
      ),
    [mode, position],
  );

  const titleClass = useMemo(() => cls(modeLower, position), []);

  const circleClass = useMemo(
    () =>
      cls(
        'timeline-circle',
        { 'using-icon': !!iconChild },
        modeLower,
        active ? 'active' : 'in-active',
      ),
    [active],
  );

  const makeHeader = (imgPath: string) => <img alt="Card" src={imgPath} />;

  const timelineContent = useMemo(() => {
    return (
    <TimelineContentContainer
      className={containerClass}
      ref={contentRef}
      id='timeline-card'
      theme={theme}
      active={active}
      highlight={showAllCardsHorizontal}
      tabIndex={0}
    >
      {cards?.map((card, index) =>
        <>
          <Card
            key={index}
            title={card.title}
            subTitle={card.subtitle}
            header={card.media?.source?.url ? makeHeader(card.media?.source.url) : undefined}
            footer={card.footer}
          >
            {card.detailedText}
          </Card>
          <br />
        </>
      )}

    </TimelineContentContainer>
    );
  }, [active, slideShowRunning]);

  const showTimelineContent = () => {
    const ele = document.getElementById(wrapperId);

    if (ele) {
      return ReactDOM.createPortal(timelineContent, ele);
    }
  };

  const canShowTimelineContent = useMemo(
    () => (active && !cardLess) || showAllCardsHorizontal,
    [active, cardLess, showAllCardsHorizontal],
  );

  return (
    <Wrapper ref={wrapperRef} className={modeLower} data-testid="timeline-item">
      {canShowTimelineContent && showTimelineContent()}

      <CircleWrapper>
        <Circle
          className={circleClass}
          onClick={handleClick}
          ref={circleRef}
          data-testid="timeline-circle"
          theme={theme}
          aria-label={title}
          dimension={timelineCircleDimension}
        >
          {iconChild ? iconChild : null}
        </Circle>
      </CircleWrapper>

      <TimelineTitleContainer
        className={titleClass}
        data-testid="timeline-title"
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTitleContainer>
    </Wrapper>
  );
};

export default TimelineWithCards;
