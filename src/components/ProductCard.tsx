"use client";

import { useEffect, useState } from "react";
import { useGetProductsQuery, useLazyGetProductsQuery } from "@/store/apiSlice";
import { ProductQuantityControl } from "./ProductQuantityControl";
import { Product } from "@/types";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useGetProductsQuery({ page });
  const [trigger] = useLazyGetProductsQuery();

  const loadMore = async () => {
    const nextPage = page + 1;
    await trigger({ page: nextPage });
    setPage(nextPage);
  };

  useEffect(() => {
    if (data) {
      setProducts((prev) => [...prev, ...data.items]);
    }
  }, [data]);

  // Обработчик прокрутки для автоматической загрузки новой страницы
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, data]);

  // Обработчик скролла
  const handleScroll = () => {
    if (
      data &&
      data.total !== undefined &&
      data.page !== undefined &&
      data.amount !== undefined
    ) {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching &&
        data.total > data.page * data.amount
      ) {
        loadMore();
      }
    }
  };

  if (isLoading)
    return <div className="flex justify-center py-8">Загрузка...</div>;
  if (error)
    return <div className="text-red-500 p-4 text-center">Ошибка загрузки</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-5 bg-[#D9D9D9] rounded-lg overflow-hidden shadow-sm"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}
            <div
              className="p-4 justify-items-center
"
            >
              <h3 className="font-medium text-lg mb-2">{product.title}</h3>

              <p className="text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              <p className="font-bold text-2xl text-black mb-4">
                {product.price} ₽
              </p>
              <ProductQuantityControl product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
