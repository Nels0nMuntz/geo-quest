import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Marker, UniqueId } from "@/types";
import { Button } from "../ui/button";
import { useActions } from "@/store";

interface Props {
  id: UniqueId;
  label: string;
}

export default function Quest({ id, label }: Props) {
  const { deleteMarker } = useActions();
  const handleClick = () => deleteMarker(id);
  return (
    <li>
      <Card className='border border-solid border-gray-200 shadow-none'>
        <CardHeader className='flex-row items-center justify-between px-6 py-4'>
          <CardTitle className='text-md'>Quest {label}</CardTitle>
          <Button onClick={handleClick}>Delete</Button>
        </CardHeader>
      </Card>
    </li>
  );
}
