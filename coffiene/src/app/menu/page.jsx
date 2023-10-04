"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

export default function Page() {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    supabase
      .from("menu")
      .select("*")
      .then(({ data }) => setProducts(data));
  }, []);

  return (
    <>
      <h1
        className={"items-center justify-center flex text-3xl font-bold my-5"}
      >
        Menu
      </h1>
      <div className={"max-w-2xl mx-auto grid grid-cols-1 gap-2"}>
        {product.map((item) => (
          <a
            href={`/order?productId=${item.productId}`}
            className={
              "grid-span-1 flex gap-2 p-2 bg-red-500 w-full rounded-md"
            }
            key={item.productId}
          >
            <Image
              className={"justify-center"}
              src={item.image}
              alt={item.productId}
              width={100}
              height={250}
            />
            <div className={"flex flex-col w-full"}>
              <h1 className={"text-2xl font-bold"}>{item.productName}</h1>
              <p className={"text-md font-semibold mt-2"}>{item.price} pesos</p>
              <p className={"text-sm opacity-70"}>{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
