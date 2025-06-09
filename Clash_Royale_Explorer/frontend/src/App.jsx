import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Layout and page components
import RootLayout from "./layouts/RootLayout";
import BrowseCards, { browseCardsLoader } from "./pages/BrowseCards";
import Survey from "./pages/Survey";
import FinishedSurvey, { finishedSurveyLoader } from "./pages/FinishedSurvey";

/**
 *
 * Sets up client-side routing using React Router.
 * Defines three main routes:
 * - "/" for the survey form
 * - "/browse-cards" to display Clash Royale cards (data fetched via loader)
 * - "/browse-forms" to show submitted survey responses (data fetched via loader)
 */
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Survey />} />
        <Route
          path="/browse-cards"
          element={<BrowseCards />}
          loader={browseCardsLoader}
        />
        <Route
          path="/browse-forms"
          element={<FinishedSurvey />}
          loader={finishedSurveyLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
