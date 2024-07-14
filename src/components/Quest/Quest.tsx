import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Marker } from "@/types";
import { Button } from "../ui/button";
import { useActions } from "@/store";

interface Props extends Marker {}

export default function Quest({ id, label, location }: Props) {
  const { deleteMarker } = useActions();
  const handleClick = () => deleteMarker(id);
  return (
    <li>
      <Card className='border border-solid border-gray-200 shadow-none'>
        <CardHeader className='flex-row items-center justify-between px-6 py-4'>
          <CardTitle className='text-md'>Quest {label}</CardTitle>
          <Button onClick={handleClick}>Delete</Button>
        </CardHeader>
        {/* <CardContent className="pb-3">
          <div className='mb-1 text-sm'>Lat</div>
          <div className='mb-2 rounded-lg border border-solid border-zinc-300 py-2 px-4 text-sm text-gray-800'>
            {location.lat}
          </div>
          <div className='mb-1 text-sm'>Lng</div>
          <div className='rounded-lg border border-solid border-zinc-300 py-2 px-4 text-sm text-gray-800'>
            {location.lng}
          </div>
        </CardContent> */}
        {/* <CardFooter className='flex justify-end pb-3'>
          <Button>Deploy</Button>
        </CardFooter> */}
      </Card>
    </li>
  );
}
