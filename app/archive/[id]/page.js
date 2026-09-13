"use client";

import { use } from "react";
import IFLDetailPage from "../ifl/page.js";
import IISPPDetailPage from "../iispp/page.js";
import FrenchDetailPage from "../french/page.js";

export default function EntryByIdPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id;

  if (id === "2" || id === "iispp") {
    return <IISPPDetailPage />;
  }

  if (id === "3" || id === "french") {
    return <FrenchDetailPage />;
  }

  return <IFLDetailPage />;
}


