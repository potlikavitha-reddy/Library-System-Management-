import { Book as BookIcon, BookCheck, BookX, Library } from "lucide-react";
import { Book } from "@/types/book";

interface StatsCardsProps {
  books: Book[];
}

export const StatsCards = ({ books }: StatsCardsProps) => {
  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === "Available").length;
  const borrowedBooks = books.filter((b) => b.status === "Borrowed").length;
  const categories = new Set(books.map((b) => b.category)).size;

  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      icon: Library,
      gradient: "from-primary to-primary/80",
    },
    {
      title: "Available",
      value: availableBooks,
      icon: BookCheck,
      gradient: "from-accent to-accent/80",
    },
    {
      title: "Borrowed",
      value: borrowedBooks,
      icon: BookX,
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Categories",
      value: categories,
      icon: BookIcon,
      gradient: "from-violet-500 to-violet-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-card-foreground">{stat.value}</p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
