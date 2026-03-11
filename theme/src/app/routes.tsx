import React from 'react';
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AllItemsPage } from "./pages/AllItemsPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ContactPage } from "./pages/ContactPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { FAQPage } from "./pages/FAQPage";
import { OrderTrackingPage } from "./pages/OrderTrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "all-items", Component: AllItemsPage },
      { path: "category/:categoryId", Component: CategoryPage },
      { path: "shop/:shopId", Component: ShopPage },
      { path: "product/:productId", Component: ProductDetailPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "profile", Component: ProfilePage },
      { path: "contact", Component: ContactPage },
      { path: "delivery", Component: DeliveryPage },
      { path: "returns", Component: ReturnsPage },
      { path: "faq", Component: FAQPage },
      { path: "order-tracking", Component: OrderTrackingPage },
      { path: "order-tracking/:orderNumber", Component: OrderTrackingPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);