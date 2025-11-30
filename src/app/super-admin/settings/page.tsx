'use client'


export default function SettingsPage() {
return (
<div className="space-y-6 max-w-2xl">
<h1 className="text-xl font-semibold">Settings</h1>


<form className="space-y-4">
<div>
<label className="block text-sm font-medium">System Name</label>
<input className="mt-1 block w-full rounded-md border px-3 py-2" defaultValue="ID Card Generator" />
</div>


<div>
<label className="block text-sm font-medium">Default Theme</label>
<select className="mt-1 block w-full rounded-md border px-3 py-2">
<option>Light</option>
<option>Dark</option>
<option>System</option>
</select>
</div>


<div>
<label className="block text-sm font-medium">Default Permissions</label>
<textarea className="mt-1 block w-full rounded-md border px-3 py-2" rows={4} defaultValue={'createEmployee: true\ncreateFields: true'} />
</div>


<div>
<label className="block text-sm font-medium">Email Configuration</label>
<input className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="smtp://..." />
</div>


<div>
<button type="button" className="px-4 py-2 rounded-md bg-green-600 text-white">Save Settings</button>
</div>
</form>
</div>
)
}