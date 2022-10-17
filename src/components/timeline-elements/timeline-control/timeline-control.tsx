import React, { useContext, useMemo } from 'react';
import { TimelineControlModel } from '../../../models/TimelineControlModel';
import { GlobalContext } from '../../GlobalContext';
import {
  TimelineControlContainer,
  TimelineNavItem,
  TimelineNavWrapper,
} from './timeline-control.styles';
import { Button } from 'primereact/button';

const TimelineControl: React.FunctionComponent<TimelineControlModel> = ({
  onNext,
  onPrevious,
  onFirst,
  onLast,
  disableLeft,
  disableRight,
  slideShowRunning,
  onReplay,
  slideShowEnabled,
}: TimelineControlModel) => {
  const { mode, flipLayout, theme } = useContext(GlobalContext);

  const rotate = useMemo(() => mode !== 'HORIZONTAL', [mode]);

  const flippedHorizontally = useMemo(
    () => flipLayout && mode === 'HORIZONTAL',
    [],
  );
  return (
    <TimelineControlContainer
      slideShowActive={slideShowRunning}
      flip={flippedHorizontally}
    >
      <TimelineNavWrapper className="timeline-controls">
        {/* jump to first */}
        <TimelineNavItem disable={disableLeft}>
          <Button
            className="p-button p-component p-button-rounded p-button-info p-button-icon-only"
            onClick={flippedHorizontally ? onLast : onFirst}
            title="Go to First"
            aria-label="first"
            aria-disabled={disableLeft}
            aria-controls="timeline-main-wrapper"
            tabIndex={!disableLeft ? 0 : -1}
          >
            <i className="pi pi-angle-double-left"></i>
          </Button>
        </TimelineNavItem>

        {/* previous */}
        <TimelineNavItem disable={disableLeft}>
          <Button
            className="p-button p-component p-button-rounded p-button-info p-button-icon-only"
            onClick={flippedHorizontally ? onNext : onPrevious}
            title="Previous"
            aria-label="previous"
            aria-disabled={disableLeft}
            aria-controls="timeline-main-wrapper"
            tabIndex={!disableLeft ? 0 : -1}
          >
            <i className="pi pi-chevron-left"></i>
          </Button>
        </TimelineNavItem>

        {/* next */}
        <TimelineNavItem disable={disableRight}>
          <Button
            className="p-button p-component p-button-rounded p-button-info p-button-icon-only"
            onClick={flippedHorizontally ? onPrevious : onNext}
            title="Next"
            aria-label="next"
            aria-disabled={disableRight}
            aria-controls="timeline-main-wrapper"
            tabIndex={!disableRight ? 0 : -1}
          >
            <i className="pi pi-chevron-right"></i>
          </Button>
        </TimelineNavItem>

        {/* jump to last */}
        <TimelineNavItem disable={disableRight}>
          <Button
            className="p-button p-component p-button-rounded p-button-info p-button-icon-only"
            onClick={flippedHorizontally ? onFirst : onLast}
            title="Go to Last"
            aria-label="last"
            aria-disabled={disableRight}
            aria-controls="timeline-main-wrapper"
            tabIndex={!disableRight ? 0 : -1}
          >
            <i className="pi pi-angle-double-right"></i>
          </Button>
        </TimelineNavItem>

        {/* slideshow button */}
        <TimelineNavItem>
          {slideShowEnabled && (
            <Button
              className="p-button p-component p-button-rounded p-button-info p-button-icon-only"
              onClick={onReplay}
              title="Play Slideshow"
              tabIndex={0}
              aria-controls="timeline-main-wrapper"
              aria-label="Play Slideshow"
            >
              <i className="pi pi-play"></i>
            </Button>
          )}
        </TimelineNavItem>
      </TimelineNavWrapper>
    </TimelineControlContainer>
  );
};

TimelineControl.displayName = 'Timeline Control';

export default TimelineControl;
