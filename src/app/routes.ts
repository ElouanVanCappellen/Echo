import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CreatePage } from "./pages/CreatePage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { CollectionPage } from "./pages/CollectionPage";
import { ContactsPage } from "./pages/ContactsPage";
import { AccountPage } from "./pages/AccountPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: CreatePage },
      { path: "discover", Component: DiscoverPage },
      { path: "collection", Component: CollectionPage },
      { path: "contacts", Component: ContactsPage },
      { path: "account", Component: AccountPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
