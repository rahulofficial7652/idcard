'use client'




export default function AdminsPage() {
const data = [
{ id: '1', name: 'Rahul', email: 'rahul@test.com', status: 'PENDING' },
{ id: '2', name: 'Nisha', email: 'nisha@test.com', status: 'APPROVED' },
{ id: '3', name: 'Aman', email: 'aman@test.com', status: 'REJECTED' },
]


return (
<div className="space-y-6">
<div className="flex items-center justify-between">
<h1 className="text-xl font-semibold">Admins</h1>
<div className="flex gap-2">
<button className="px-3 py-2 rounded-md bg-blue-600 text-white">Invite Admin</button>
</div>
</div>


</div>
)
}