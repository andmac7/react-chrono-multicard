import { To } from 'history';
import { Theme } from './Theme';
import { Scroll } from './TimelineHorizontalModel';
import { Media } from './TimelineMediaModel';
import { TimelineMode } from './TimelineModel';

export interface ICardModel {
  detailedText?: string | string[];
  footer?: JSX.Element;
  media?: Media;
  subtitle?: string;
  title?: string;
  url?: string;
}

/**
 *
 *
 * @export
 * @interface TimelineItemModel
 */
export interface TimelineItemModel {
  active?: boolean;
  cardDetailedText?: string | string[];
  cardSubtitle?: string;
  cardTitle?: string;
  cards: ICardModel[] | undefined;
  id?: string;
  media?: Media;
  position?: string;
  title?: string;
  url?: string;
  visible?: boolean;
}

export type TimelineEntryModel = Pick<
  TimelineItemModel,
  | 'id'
  | 'visible'
  | 'title'
  | 'active'
  | 'cards'
  | 'media'
  | 'url'
> & {
  autoScroll: ({
    pointOffset,
    pointWidth,
    timelinePointHeight,
    contentHeight,
  }: Partial<Scroll>) => void;
  cardHeight?: number;
  customContent?: React.ReactNode | React.ReactNode[];
  hasFocus?: boolean;
  iconChild?: React.ReactNode;
  mode: TimelineMode;
  onClick: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
};

export type TimelineCardModel = Pick<
  TimelineItemModel,
  | 'id'
  | 'visible'
  | 'active'
  | 'cards'
> & Pick<
  ICardModel,
  | 'detailedText'
  | 'media'
  | 'subtitle'
  | 'title'
  | 'url'
> & {
  autoScroll: ({
    pointOffset,
    pointWidth,
    timelinePointHeight,
    contentHeight,
  }: Partial<Scroll>) => void;
  cardHeight?: number;
  customContent?: React.ReactNode | React.ReactNode[];
  hasFocus?: boolean;
  iconChild?: React.ReactNode;
  mode: TimelineMode;
  onClick: (id?: string) => void;
  onElapsed?: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  wrapperId: string;
};
