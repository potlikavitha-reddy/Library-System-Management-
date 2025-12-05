import { useState } from "react";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { EditBookDialog } from "./EditBookDialog";
import { DeleteBookDialog } from "./DeleteBookDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookTableProps {
  books: Book[];
  onUpdate: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookTable = ({ books, onUpdate, onDelete }: BookTableProps) => {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No books found. Add your first book to get started.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>
                    <Badge
                      variant={book.status === "Available" ? "default" : "secondary"}
                      className={
                        book.status === "Available"
                          ? "bg-accent hover:bg-accent/90"
                          : "bg-orange-500 hover:bg-orange-600"
                      }
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingBook(book)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingBookId(book.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditBookDialog
        book={editingBook}
        open={!!editingBook}
        onOpenChange={(open) => !open && setEditingBook(null)}
        onUpdate={onUpdate}
      />

      <DeleteBookDialog
        open={!!deletingBookId}
        onOpenChange={(open) => !open && setDeletingBookId(null)}
        onConfirm={() => {
          if (deletingBookId) {
            onDelete(deletingBookId);
            setDeletingBookId(null);
          }
        }}
      />
    </>
  );
};
