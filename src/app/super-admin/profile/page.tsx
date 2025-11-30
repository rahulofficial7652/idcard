'use client'


import Image from 'next/image'


export default function ProfilePage() {
return (
<div className="max-w-2xl">
<h1 className="text-xl font-semibold mb-4">Profile</h1>
<div className="flex items-center gap-6">
<Image src="/avatar-placeholder.png" alt="avatar" width={96} height={96} className="rounded-full" />
<div>
<div className="text-lg font-medium">Super Admin</div>
<div className="text-sm text-muted-foreground">super@idapp.test</div>
<div className="mt-4">
<button className="px-3 py-2 rounded-md bg-blue-600 text-white">Edit Profile</button>
</div>
</div>
</div>
</div>
)
}