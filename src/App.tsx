import { Toaster } from "@/components/ui/sonner";
import { Layout, Map, Sidebar } from "@/components";
import GoogleMapsApiProvider from "./providers/GoogleMapsApiProvider";

export default function App() {
  return (
    <GoogleMapsApiProvider>
      <Layout>
        <Sidebar />
        <Map />
      </Layout>
      <Toaster />
    </GoogleMapsApiProvider>
  );
}
