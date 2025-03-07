import Link from "next/link"
import { Button } from "../ui/button"
import { ThemeSwitcher } from "../(shadcn)/theme-switcher"

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-400 bg-clip-text text-transparent">
                ITRAN EDU
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-sm font-medium dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Explore
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Log in
            </Link>
            <Button size="sm" className="rounded-full" variant="outline">
              <Link href="/auth/register" className="dark:text-gray-300">
                Sign up
              </Link>
            </Button>
            {/* <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-400 w-8 h-8 text-white">
              <span className="text-xs">JD</span>
            </div> */}
            <div className="flex justify-end">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header;