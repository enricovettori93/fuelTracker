import {Refuel} from "@models/refuel";
import Card from "@components/card";
import React, {createRef, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";

interface ListItemProps {
  className?: string
  refuel: Refuel
  onDelete: (id: string) => void
}

const ListItem = ({ refuel, onDelete, className = "" }: ListItemProps) => {
  const topRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { date, actualKm, quantity, lat, lng, id } = refuel;
  const {t} = useTranslation();

  const isMapAvailable = useMemo(() => {
    return !!lat && !!lng;
  }, [refuel]);

  const cardOpenStyle = () => {
    return isMapAvailable ? 'h-[19rem]' : 'h-[11rem]';
  }

  const buildMapSrc = (lat: number, lng: number) => {
    return `https://maps.google.com/maps?q=${lat}, ${lng}&z=15&output=embed`;
  }

  return (
    <li>
      <Card className={`${className} transition-all ${isOpen ? cardOpenStyle() : 'h-32 overflow-hidden'}`}>
        <div ref={topRef} className="flex justify-between">
          <div className="flex items-center">
            <i className="ci-calendar"/>
            <span className="ml-4">{ new Date(date).toLocaleDateString() }</span>
          </div>
          <div className="flex items-center">
            <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); onDelete(id)}} className="mr-4">
              <i className="ci-trash_full"/>
            </button>
            <button onClick={() => setIsOpen(prev => !prev)} className={`transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <i className="ci-chevron_down"/>
            </button>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="flex-1 flex items-center">
          <span>
            <i className="ci-trending_up"/>
          </span>
            <span className="ml-3">{actualKm}</span>
          </div>
          <div className="flex-1 flex items-center">
          <span>
            <i className="ci-filter"/>
          </span>
            <span className="ml-3">{quantity}</span>
          </div>
        </div>
        <div ref={contentRef} className={`mt-4 transition-all ${isOpen ? 'opacity-1' : 'opacity-0'}`}>
          {
            !isMapAvailable && (
              <span>
              {t("list-refuels.card.no-geolocation-available")}
            </span>
            )
          }
          {
            isMapAvailable && (
              <iframe src={buildMapSrc(lat as number, lng as number)} width="100%" height="100%" frameBorder="0" />
            )
          }
        </div>
      </Card>
    </li>
  )
}

export default ListItem;