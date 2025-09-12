import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { startTransition, useActionState, useEffect } from "react";
import { deleteMenu } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constant/general-constant";
import { toast } from "sonner";

export default function DialogDeleteMenu({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: {
  open: boolean;
  refetch: () => void;
  currentData?: Profile;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteMenuState, deleteMenuAction, isPendingDeleteMenu] =
    useActionState(deleteMenu, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData?.id as string);
    formData.append("image_url", currentData?.avatar_url as string);
    startTransition(() => {
      deleteMenuAction(formData);
    });
  };

  useEffect(() => {
    if (deleteMenuState?.status === "error") {
      toast.error("Update Menu Failed", {
        description: deleteMenuState.errors?._form?.[0],
      });
    }

    if (deleteMenuState?.status === "success") {
      toast.success("Update Menu Success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteMenuState]);

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteMenu}
      onSubmit={onSubmit}
      title="Menu"
    />
  );
}
