import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Pakistan Fragrance Community</h1>
        <p className="text-xl">Discover exquisite fragrances from around the world and right here in Pakistan.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">PFC European Niche</h2>
          <p className="mb-4">Explore our collection of high-class European, French, and niche imported perfumes.</p>
          <Link href="/european-niche" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
            Shop European Niche
          </Link>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">PFC Made by Pakistan (MBP)</h2>
          <p className="mb-4">Discover fragrances crafted by talented Pakistani perfumers and local houses.</p>
          <Link href="/mbp" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block">
            Shop Made by Pakistan
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <p>Featured products will be displayed here.</p>
      </section>
    </div>
  )
}