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

export default function Page() {
  const [order, setOrder] = useState([]);
  const [product, setProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState("cold");

  useEffect(() => {
    if (!product.length) {
      supabase
        .from("menu")
        .select("*")
        .then(({ data }) => setProducts(data));
    }
  }, [product]);

  function handleOrder() {
    const data = {};
  }

  return (
    <>
      <h1
        className={"items-center justify-center flex text-3xl font-bold my-5"}
      >
        Menu
      </h1>
      <div
        className={"max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-2"}
      >
        {product.map((item) => (
          <Card>
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
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cold" id="cold" />
                          <Label htmlFor="cold">Cold</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hot" id="hot" />
                          <Label htmlFor="hot">Hot</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <SheetFooter className={"mt-20"}>
                    <Button>Add to cart</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
