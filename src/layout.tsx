import Navbar from "@/components/navbar"

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full p-12">
        <div className="w-96">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
