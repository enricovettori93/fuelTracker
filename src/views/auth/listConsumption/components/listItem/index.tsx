import {Refuel} from "@models/refuel";
import Card from "@components/card";
import {createRef, useMemo, useState} from "react";
import CalendarIcon from "@components/icons/calendar";
import TrashIcon from "@components/icons/trash";
import ArrowIcon from "@components/icons/arrow";
import {useTranslation} from "react-i18next";
import GraphUpIcon from "@components/icons/graphUp";
import SortIcon from "@components/icons/sort";

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

  return (
    <li>
      <Card className={className}>
        <div ref={topRef} className="flex justify-between">
          <div className="flex items-center">
            <CalendarIcon/>
            <span className="ml-4">{ new Date(date).toLocaleDateString() }</span>
          </div>
          <div className="flex items-center">
            <button onClick={(e) => {e.preventDefault(); e.stopPropagation(); onDelete(id)}} className="mr-4">
              <TrashIcon/>
            </button>
            <button onClick={() => setIsOpen(prev => !prev)} className={`transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <ArrowIcon/>
            </button>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="flex-1 flex items-center">
          <span>
            <GraphUpIcon/>
          </span>
            <span className="ml-3">{actualKm}</span>
          </div>
          <div className="flex-1 flex items-center">
          <span>
            <SortIcon/>
          </span>
            <span className="ml-3">{quantity}</span>
          </div>
        </div>
        {
          isOpen && (
            <div ref={contentRef} className={`mt-4`}>
              {
                !isMapAvailable && (
                  <span>
                  {t("list-consumption.card.no-geolocation-available")}
                </span>
                )
              }
              {
                isMapAvailable && (
                  <iframe src={`https://maps.google.com/maps?q=${lat}, ${lng}&z=15&output=embed`} width="100%" height="100%" frameBorder="0" />
                )
              }
            </div>
          )
        }
      </Card>
    </li>
  )
}

export default ListItem;