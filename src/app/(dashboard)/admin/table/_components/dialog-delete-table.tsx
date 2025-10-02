import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { startTransition, useActionState, useEffect } from "react";
import { deleteTable } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constant/general-constant";
import { toast } from "sonner";

export default function DialogDeleteTable({
  open,
  // refetch,
  currentData,
  handleChangeAction,
}: {
  open: boolean;
  // refetch: () => void;
  currentData?: Profile;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteTableState, deleteTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData?.id as string);

    startTransition(() => {
      deleteTableAction(formData);
    });
  };

  useEffect(() => {
    if (deleteTableState?.status === "error") {
      toast.error("Update Table Failed", {
        description: deleteTableState.errors?._form?.[0],
      });
    }

    if (deleteTableState?.status === "success") {
      toast.success("Update Table Success");
      handleChangeAction?.(false);
      // refetch();
    }
  }, [deleteTableState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteTable}
      onSubmit={onSubmit}
      title="Table"
    />
  );
}
