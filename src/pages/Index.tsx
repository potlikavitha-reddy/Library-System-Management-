import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Search } from "lucide-react";
import { BookTable } from "@/components/BookTable";
import { AddBookDialog } from "@/components/AddBookDialog";
import { StatsCards } from "@/components/StatsCards";
import { Book } from "@/types/book";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      category: "Fiction",
      status: "Available",
      publishedYear: "1925",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
      category: "Fiction",
      status: "Borrowed",
      publishedYear: "1960",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      isbn: "978-0-452-28423-4",
      category: "Science Fiction",
      status: "Available",
      publishedYear: "1949",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
  );

  const handleAddBook = (book: Omit<Book, "id">) => {
    const newBook = {
      ...book,
      id: (books.length + 1).toString(),
    };
    setBooks([...books, newBook]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Library Management System</h1>
                <p className="text-sm text-muted-foreground">Manage your library efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <StatsCards books={books} />

        <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Book Collection</h2>
              <p className="text-sm text-muted-foreground">
                Browse and manage your library's book inventory
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Book
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <BookTable
            books={filteredBooks}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
          />
        </div>
      </main>

      <AddBookDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddBook}
      />
    </div>
  );
};

export default Index;
