import { UserNav } from "./user-nav"

export function Header() {
  return (
    <header className="border-b h-16 flex items-center px-6 justify-between bg-card">
      <div className="md:hidden font-bold">ID Card App</div>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </header>
  )
}
