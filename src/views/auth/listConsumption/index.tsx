import {Refuel} from "@models/refuel";
import ListItem from "@views/auth/listConsumption/listItem";
import {useTranslation} from "react-i18next";

const mockData: Refuel[] = [
  {
    id: "1",
    date: new Date(),
    actualKm: 10,
    quantity: 50,
    lng: 12.250000,
    lat: 45.6666
  },
  {
    id: "2",
    date: new Date(),
    actualKm: 50,
    quantity: 50
  },
  {
    id: "3",
    date: new Date(),
    actualKm: 100,
    quantity: 50
  },
  {
    id: "4",
    date: new Date(),
    actualKm: 150,
    quantity: 50
  },
  {
    id: "5",
    date: new Date(),
    actualKm: 50,
    quantity: 50
  },
  {
    id: "6",
    date: new Date(),
    actualKm: 100,
    quantity: 50
  },
  {
    id: "7",
    date: new Date(),
    actualKm: 150,
    quantity: 50
  }
]

const ListConsumption = () => {
  const {t} = useTranslation();
  const handleDelete = (id: string) => {
    // todo: logic implementation
    console.log('delete', id);
  }

  const data = mockData;

  return (
    <section>
      {
        data.length === 0 && (
          <span>{t("list-consumption.no-data-available")}</span>
        )
      }
      {
        data.length > 0 && (
          <ul>
            {
              data.map(item => <ListItem key={item.id} className={"my-3"} refuel={item} onDelete={handleDelete} />)
            }
          </ul>
        )
      }
    </section>
  )
}

export default ListConsumption;