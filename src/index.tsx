import { createRoot } from "react-dom/client";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root not found");
}
const container = createRoot(root);

container.render(<div>
  <h1>Hello world</h1>
</div>);
