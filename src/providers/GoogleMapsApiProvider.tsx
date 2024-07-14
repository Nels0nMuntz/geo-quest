import { APIProvider } from "@vis.gl/react-google-maps";

interface Props extends React.PropsWithChildren {}

export default function GoogleMapsApiProvider({ children }: Props) {
  return (
    <APIProvider
      apiKey={process.env.GOOGLE_MAPS_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {children}
    </APIProvider>
  );
}
