import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  bookTitle: string;
  memberName: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: "borrowed" | "returned" | "overdue";
}

const Transactions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedTransactions: Transaction[] = (data || []).map((transaction) => ({
          id: transaction.id,
          bookTitle: "Book Title",
          memberName: "Member Name",
          borrowDate: transaction.borrow_date,
          dueDate: transaction.due_date,
          returnDate: transaction.return_date || undefined,
          status: transaction.status as "borrowed" | "returned" | "overdue",
        }));

        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast({
          title: "Error",
          description: "Failed to load transactions",
          variant: "destructive",
        });
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Transaction["status"]) => {
    const variants = {
      borrowed: "default",
      returned: "secondary",
      overdue: "destructive",
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Transactions</h1>
          <p className="text-muted-foreground">Track book borrowing and returns</p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/payment")}>
          <Plus className="h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by book title or member name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.bookTitle}</TableCell>
                <TableCell>{transaction.memberName}</TableCell>
                <TableCell>{new Date(transaction.borrowDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(transaction.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {transaction.returnDate
                    ? new Date(transaction.returnDate).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell>
                  {transaction.status === "borrowed" && (
                    <Button variant="outline" size="sm">
                      Mark Returned
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Transactions;
