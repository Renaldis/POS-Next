import AddOrderItem from "./_components/add-order-item";

export const metadata = {
  title: "WPU Cafe | Order Management",
};

export default async function AddOrderItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AddOrderItem id={id} />;
}
