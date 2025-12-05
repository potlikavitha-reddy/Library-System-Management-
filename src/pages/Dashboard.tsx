import { useState, useEffect } from "react";
import { StatsCards } from "@/components/StatsCards";
import { Book } from "@/types/book";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, ArrowLeftRight, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeTransactions, setActiveTransactions] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [booksData, membersData, transactionsData] = await Promise.all([
          supabase.from("books").select("*"),
          supabase.from("members").select("id", { count: "exact", head: true }),
          supabase.from("transactions").select("id", { count: "exact", head: true }).eq("status", "borrowed"),
        ]);

        if (booksData.data) {
          const formattedBooks: Book[] = booksData.data.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            category: book.category,
            publishedYear: book.published_year,
            status: book.status as "Available" | "Borrowed",
          }));
          setBooks(formattedBooks);
        }

        setTotalMembers(membersData.count || 0);
        setActiveTransactions(transactionsData.count || 0);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Library Management System</p>
      </div>

      <StatsCards books={books} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">Registered library members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTransactions}</div>
            <p className="text-xs text-muted-foreground">Books currently borrowed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.length}</div>
            <p className="text-xs text-muted-foreground">Total books in library</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest transactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">New book added</p>
                <p className="text-sm text-muted-foreground">"The Great Gatsby" added to collection</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">New member registered</p>
                <p className="text-sm text-muted-foreground">John Doe joined the library</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
              <ArrowLeftRight className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Book borrowed</p>
                <p className="text-sm text-muted-foreground">"1984" borrowed by Jane Smith</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
