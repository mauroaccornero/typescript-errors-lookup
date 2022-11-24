import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";

import AppWithProvider from "./AppWithProvider";

const c = createElement(AppWithProvider, { state: window.__STATE__ });
const el = document.getElementById("app") as HTMLElement;
hydrateRoot(el, c);
