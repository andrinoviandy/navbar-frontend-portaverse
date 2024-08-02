import color from '@constants/color';
import useHorizontalScroll from '@hooks/useHorizontalScroll';
import { Icon } from '@iconify/react';

export type ChipCarouselData = {
  label: string;
  value: string | number | null;
}[];
interface ChipCarouselProps {
  data: ChipCarouselData;
  value: string | number | null;
  onClick: (newValue: string | number | null) => void;
}

export default function ChipCarousel({
  data = [],
  value,
  onClick,
}: ChipCarouselProps) {
  const sliderRef = useHorizontalScroll<HTMLDivElement>();
  const handleSlideLeft = () => {
    sliderRef.current!.scrollLeft -= 200;
  };

  const handleSlideRight = () => {
    sliderRef.current!.scrollLeft += 200;
  };

  return (
    <div className="flex w-full items-center py-2">
      <button
        type="button"
        className="static m-0 mr-5 text-primary-main"
        onClick={handleSlideLeft}
      >
        <Icon
          icon="ooui:previous-ltr"
          width={24}
          color={color.base.darkGray}
        />{' '}
      </button>

      <div
        ref={sliderRef}
        className="hide-scrollbar flex size-full gap-3 overflow-x-scroll scroll-smooth whitespace-nowrap text-sm"
      >
        {[{ label: 'Semua', value: null }, ...data].map((item) => (
          <button
            key={item?.value}
            type="button"
            className={
              value === item?.value
                ? 'rounded-md border-2 border-[#016DB2] bg-[#C9F3FB] p-2 px-4 text-[#016DB2]'
                : 'rounded-md border-2 p-2 px-4 text-base-darkGray hover:bg-base-highlight'
            }
            onClick={() => onClick?.(item?.value)}
          >
            {item?.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="static m-0 ml-5 text-sm text-primary-main"
        onClick={handleSlideRight}
      >
        <Icon
          icon="ooui:previous-rtl"
          width={24}
          color={color.base.darkGray}
        />{' '}
      </button>
    </div>
  );
}
