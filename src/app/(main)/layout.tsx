import Background from "@/components/background";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="relative h-full w-full">
      <Background />
      <main className="flex h-full w-full flex-col justify-between bg-gray-900 bg-opacity-60">
        <section className="h-[10vh] border-b border-[#222c38]">
          <Navbar />
        </section>
        <section className="flex-1 lg:px-[10vh]">
          <div className="h-full w-full bg-gray-800 bg-opacity-20 backdrop-blur-sm md:border-x md:border-[#222c38]">
            {children}
          </div>
        </section>
        <section className="h-[10vh] border-t border-[#222c38]">
          <Footer />
        </section>
      </main>
    </div>
  );
}
