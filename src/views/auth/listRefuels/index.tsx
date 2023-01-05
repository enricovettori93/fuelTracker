import {useTranslation} from "react-i18next";
import ListItem from "@views/auth/listRefuels/components/listItem";
import DeleteItemModal from "@views/auth/listRefuels/components/deleteItemModal";
import useListConsumption from "@views/auth/listRefuels/hooks/useListRefuels";

const ListRefuelsPage = () => {
  const {t} = useTranslation();
  const {
    refuels,
    hasMore,
    loading,
    deletingItemId,
    fetch,
    handleDeleteClose,
    handleDeleteSubmit,
    handleDelete
  } = useListConsumption();

  return (
    <section>
      {
        loading && (
          <p>{t("common.loading")}</p>
        )
      }
      {
        refuels.length === 0 && !loading && (
          <span>{t("list-refuels.no-data-available")}</span>
        )
      }
      {
        refuels.length > 0 && (
          <>
            <ul>
              {
                refuels.map(item => <ListItem key={item.id} className={"my-3"} refuel={item} onDelete={handleDelete} />)
              }
            </ul>
            {
              hasMore && (
                <div className="flex justify-center">
                  <button onClick={fetch} disabled={loading}>{t("list-refuels.load-more")}</button>
                </div>
              )
            }
          </>
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

export default ListRefuelsPage;