import { useActions, useMarkers } from "@/store";
import Quest from "../Quest/Quest";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { SquareMenu, SquareX } from "lucide-react";
import { cn } from "@/lib";

export default function Sidebar() {
  const markers = useMarkers();
  const { deleteMarkers } = useActions();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => deleteMarkers();
  const handleOpen = () => setIsOpen((open) => !open);
  const deleteAllVisible = markers.length > 1;
  return (
    <React.Fragment>
      <div
        className={cn([
          "fixed bottom-0 left-0 top-0 z-20 w-full -translate-x-full transition-transform duration-300 sm:static sm:translate-x-0 sm:transition-none sm:duration-0",
          isOpen && "translate-x-0",
        ])}
      >
        <ScrollArea className='h-[100dvh]'>
          <aside className='flex flex-col gap-y-4 overflow-auto bg-white p-5'>
            <div className="flex justify-between items-center">
              <h1 className='mb-4 text-2xl'>Quests</h1>
              <Button
                variant='ghost'
                size='icon'
                className="sm:hidden"
                onClick={handleOpen}
              >
                <SquareX className='h-8 w-8' />
              </Button>
            </div>
            {deleteAllVisible && <Button onClick={handleDelete}>Delete All</Button>}
            <ul className='flex flex-col gap-y-4'>
              {markers.map((marker, index) => (
                <Quest key={marker.id} id={marker.id} label={String(index + 1)} />
              ))}
            </ul>
          </aside>
        </ScrollArea>
      </div>
      <Button
        variant='outline'
        size='icon'
        className='fixed left-4 top-4 z-10 sm:hidden'
        onClick={handleOpen}
      >
        <SquareMenu className='h-8 w-8' />
      </Button>
    </React.Fragment>
  );
}
