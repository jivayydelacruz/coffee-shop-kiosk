"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [product, setProducts] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState("cold");

  const router = useRouter();

  useEffect(() => {
    if (!product.length) {
      supabase
        .from("menu")
        .select("*")
        .then(({ data }) => setProducts(data));
    }
  }, [product]);

  function handleOrder(id) {
    const findIndex = orders.findIndex(
      (order) => order.productId === id && order.temperature === temperature
    );

    if (findIndex !== -1) {
      const updatedData = [...orders];
      updatedData[findIndex].quantity += quantity;
      setOrders(updatedData);
    } else {
      setOrders([
        ...orders,
        {
          productId: id,
          quantity,
          temperature,
        },
      ]);
    }

    const orderProduct = product.find((item) => item.productId === id);
    if (orderProduct)
      setTotalPrice((prevState) => prevState + orderProduct.price * quantity);

    setQuantity(1);
    setTemperature("cold");
    toast.success("Order successfully added");
  }

  async function handleAcceptOrder() {
    const uuid = v4();
    const { error } = await supabase
      .from("receipt")
      .insert([{ receiptId: uuid }]);

    if (!error) {
      const { error } = await supabase.from("receipt_item").insert(
        orders.map((order) => {
          return { receiptId: uuid, ...order };
        })
      );
    }

    if (!error) router.push(`/order/?orderId=${uuid}`);
  }

  return (
    <div>
      <nav className={"my-2 mx-5"}>
        <Link className={"text-lg hover:underline"} href={"/"}>
          Home
        </Link>
      </nav>
      <Toaster richColors />
      <h1
        className={"items-center justify-center flex text-3xl font-bold my-5"}
      >
        Menu
      </h1>
      <div
        className={"max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-2"}
      >
        {product.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.productName}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                className={"justify-center"}
                src={item.image}
                alt={item.productId}
                width={100}
                height={250}
              />
            </CardContent>
            <CardFooter>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Add to Order</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{item.productName}</SheetTitle>
                    <SheetDescription>{item.description}</SheetDescription>
                  </SheetHeader>
                  <div className={"flex flex-col gap-10 mt-5"}>
                    <div>
                      <h1 className={"text-md font-medium"}>Quantity</h1>
                      <Separator className={"mb-2"} />
                      <div className={"flex justify-center items-center gap-2"}>
                        <Button
                          disabled={quantity === 1}
                          onClick={() => setQuantity(quantity - 1)}
                        >
                          -
                        </Button>
                        <h1>{quantity}</h1>
                        <Button onClick={() => setQuantity(quantity + 1)}>
                          +
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h1 className={"text-md font-medium"}>Temperature</h1>
                      <Separator className={"mb-2"} />
                      <RadioGroup
                        className={"flex gap-5"}
                        defaultValue={"cold"}
                      >
                        <div
                          className="flex items-center space-x-2"
                          onClick={() => setTemperature("cold")}
                        >
                          <RadioGroupItem value="cold" id="cold" />
                          <Label htmlFor="cold">Cold</Label>
                        </div>
                        <div
                          className={"flex items-center space-x-2"}
                          onClick={() => setTemperature("hot")}
                        >
                          <RadioGroupItem value="hot" id="hot" />
                          <Label htmlFor="hot">Hot</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <SheetFooter className={"mt-20"}>
                    <SheetClose asChild>
                      <Button onClick={() => handleOrder(item.productId)}>
                        Add to order
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardFooter>
          </Card>
        ))}
      </div>
      {!orders.length ? null : (
        <div className={"flex items-center justify-center mt-5"}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Checkout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              {orders.map((order) => {
                const orderProduct = product.find(
                  (item) => item.productId === order.productId
                );
                if (!orderProduct) return null;

                return (
                  <div className={"flex justify-between items-center"}>
                    <h1>
                      {orderProduct.productName} {order.quantity}x
                    </h1>
                    <p>{orderProduct.price * order.quantity} pesos</p>
                  </div>
                );
              })}
              <Separator />
              <div
                className={
                  "flex justify-between items-center font-semibold text-xl"
                }
              >
                <h1>Total:</h1>
                <h1 className={"right-0"}>{totalPrice} pesos</h1>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAcceptOrder}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
