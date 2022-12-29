import {Refuel} from "@models/refuel";
import ListItem from "@views/auth/listConsumption/components/listItem";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import DeleteItemModal from "@views/auth/listConsumption/components/deleteItemModal";

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
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const handleDelete = (id: string) => {
    setDeletingItemId(id);
  }

  const data = mockData;

  const handleDeleteClose = () => {
    console.log('handle delete close')
    setDeletingItemId(null);
  }

  const handleDeleteSubmit = () => {
    // todo: logic implementation
    console.log('delete', deletingItemId);
  }

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
      {
        deletingItemId && (
          <DeleteItemModal onClose={handleDeleteClose} onSubmit={handleDeleteSubmit}/>
        )
      }
    </section>
  )
}

export default ListConsumption;