import { useGetAllUsers, useAssignUserRole } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '../../backend';

export default function UserManagement() {
  const { data: users, isLoading } = useGetAllUsers();
  const assignRole = useAssignUserRole();

  const handleRoleChange = async (userId: string, role: UserRole) => {
    try {
      await assignRole.mutateAsync({
        userId: { toText: () => userId } as any,
        role,
      });
      toast.success('User role updated successfully');
    } catch (error: any) {
      console.error('Role update error:', error);
      toast.error(error.message || 'Failed to update user role');
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    if (role === UserRole.admin) return 'default';
    if (role === UserRole.user) return 'secondary';
    return 'outline';
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5" />
          <CardTitle>User Management</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {!users || users.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No users found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id.toText()}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{user.bio || '-'}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id.toText(), value as UserRole)}
                      disabled={assignRole.isPending}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.admin}>Admin</SelectItem>
                        <SelectItem value={UserRole.user}>User</SelectItem>
                        <SelectItem value={UserRole.guest}>Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
