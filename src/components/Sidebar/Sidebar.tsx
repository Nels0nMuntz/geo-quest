import { useActions, useMarkers } from "@/store";
import Quest from "../Quest/Quest";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

export default function Sidebar() {
  const markers = useMarkers();
  const { deleteMarkers } = useActions();
  const handleClick = () => deleteMarkers();
  const deleteAllVisible = markers.length > 1;
  return (
    <ScrollArea className='h-[100dvh] rounded-md border'>
      <aside className='flex flex-col gap-y-4 overflow-auto bg-white p-5'>
        <h1 className='mb-4 text-2xl'>Quests</h1>
        {deleteAllVisible && <Button onClick={handleClick}>Delete All</Button>}
        <ul className='flex flex-col gap-y-4'>
          {markers.map((marker, index) => (
            <Quest key={marker.id} id={marker.id} label={String(index + 1)} />
          ))}
        </ul>
      </aside>
    </ScrollArea>
  );
}
