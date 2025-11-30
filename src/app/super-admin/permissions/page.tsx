'use client'



export default function PermissionsPage() {
const permissions = [
{ title: 'Create Employee', description: 'Allow admin to create employee records', enabled: true },
{ title: 'Create Fields', description: 'Allow admin to add custom fields to forms', enabled: true },
{ title: 'Delete Admin', description: 'Allow admin to remove other admins', enabled: false },
{ title: 'View Analytics', description: 'Access to system analytics', enabled: true },
]


return (
<div className="space-y-6">
<h1 className="text-xl font-semibold">Permissions</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

</div>
</div>
)
}