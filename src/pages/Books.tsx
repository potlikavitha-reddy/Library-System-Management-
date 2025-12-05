import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { BookTable } from "@/components/BookTable";
import { AddBookDialog } from "@/components/AddBookDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Books = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedBooks: Book[] = (data || []).map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        publishedYear: book.published_year,
        status: book.status as "Available" | "Borrowed",
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        title: "Error",
        description: "Failed to load books",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBook = async (newBook: Omit<Book, "id">) => {
    try {
      const { error } = await supabase.from("books").insert({
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn,
        category: newBook.category,
        published_year: newBook.publishedYear,
        status: newBook.status,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book added successfully",
      });

      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      const { error } = await supabase
        .from("books")
        .update({
          title: updatedBook.title,
          author: updatedBook.author,
          isbn: updatedBook.isbn,
          category: updatedBook.category,
          published_year: updatedBook.publishedYear,
          status: updatedBook.status,
        })
        .eq("id", updatedBook.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book updated successfully",
      });

      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
      toast({
        title: "Error",
        description: "Failed to update book",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const { error } = await supabase.from("books").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book deleted successfully",
      });

      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Book Collection</h1>
          <p className="text-muted-foreground">Manage your library's book inventory</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, author, ISBN, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <BookTable books={filteredBooks} onUpdate={handleUpdateBook} onDelete={handleDeleteBook} />

      <AddBookDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddBook} />
    </div>
  );
};

export default Books;
