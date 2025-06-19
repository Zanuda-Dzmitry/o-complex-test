import { Header } from "@/components/Header";
import { Products } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { Cart } from "@/components/Cart";
import { OrderForm } from "@/components/OrderForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center ">
        <Reviews />
        <div className="space-y-8 p-5 rounded-lg bg-[#D9D9D9]">
          <Cart />
          <OrderForm />
        </div>
        <Products />
      </main>
    </div>
  );
}
