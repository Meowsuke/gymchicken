import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import OrderDetailsTable from "./order-details-table";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        itemsPrice: order.itemsPrice?.toString(),
        totalPrice: order.totalPrice?.toString(),
        shippingPrice: order.shippingPrice?.toString(),
        taxPrice: order.taxPrice?.toString(),
      }}
    />
  );
};

export default OrderDetailsPage;
