import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, BookOpen, Users } from "lucide-react";

const Reports = () => {
  const stats = [
    { label: "Total Checkouts This Month", value: "156", icon: BookOpen, trend: "+12%" },
    { label: "Active Members", value: "89", icon: Users, trend: "+8%" },
    { label: "Books Returned on Time", value: "94%", icon: TrendingUp, trend: "+3%" },
    { label: "Popular Category", value: "Fiction", icon: BarChart3, trend: "45%" },
  ];

  const popularBooks = [
    { title: "1984", checkouts: 45 },
    { title: "The Great Gatsby", checkouts: 38 },
    { title: "To Kill a Mockingbird", checkouts: 32 },
    { title: "Pride and Prejudice", checkouts: 28 },
    { title: "The Catcher in the Rye", checkouts: 25 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">View library statistics and insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Books</CardTitle>
            <CardDescription>Books checked out most frequently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{book.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{book.checkouts} checkouts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Books by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Fiction", percentage: 45 },
                { category: "Non-Fiction", percentage: 25 },
                { category: "Science", percentage: 15 },
                { category: "History", percentage: 10 },
                { category: "Biography", percentage: 5 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
