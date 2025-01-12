"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteCity } from "@/actions/cities";

interface CityProps {
  data: {
    name: string;
    id: number;
  };
}

const CityCell: React.FC<CityProps> = ({ data }) => {
  const router = useRouter();

  return (
    <TableRow className="relative">
      <TableCell className="font-medium">{data.id}</TableCell>
      <TableCell className="font-semibold">{data.name}</TableCell>
      <TableCell className="text-right">
        <Dialog>
          {/* Use DialogTrigger with asChild to prevent button nesting */}
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your city.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {/* Ensure this button is not nested inside another button */}
              <DialogClose className="bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded-sm" onClick={async () => {
                await deleteCity(data.id);
                router.refresh();
              }}>
                 Confirm Delete
              </DialogClose>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default CityCell;
