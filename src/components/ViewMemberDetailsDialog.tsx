import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Calendar, Book } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  booksBorrowed: number;
  borrowDate?: string;
  returnDate?: string;
}

interface ViewMemberDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
}

export function ViewMemberDetailsDialog({ open, onOpenChange, member }: ViewMemberDetailsDialogProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
          <DialogDescription>Complete information about the library member</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Name</Label>
            <div className="text-lg font-semibold">{member.name}</div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <div className="font-medium">{member.email}</div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number
              </Label>
              <div className="font-medium">{member.phone}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Join Date
              </Label>
              <div className="font-medium">{new Date(member.joinDate).toLocaleDateString()}</div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Book className="h-4 w-4" />
                Books Borrowed
              </Label>
              <div className="font-medium">{member.booksBorrowed}</div>
            </div>
          </div>

          {member.borrowDate && (
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Book Borrowed Date
              </Label>
              <div className="font-medium">{new Date(member.borrowDate).toLocaleDateString()}</div>
            </div>
          )}

          {member.returnDate && (
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Return Date
              </Label>
              <div className="font-medium">{new Date(member.returnDate).toLocaleDateString()}</div>
            </div>
          )}

          {!member.borrowDate && !member.returnDate && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">No active borrowing records for this member</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}