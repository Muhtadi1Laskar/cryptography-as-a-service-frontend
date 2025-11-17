import { useState } from 'react'

const routes = [
  { label: 'Hashing', path: '/hash' },
  { label: 'Hmac', path: '/hmac' },
  { label: 'AES', path: '/aes' },
  { label: 'RSA', path: '/rsa' },
  { label: 'Encoding', path: '/other' },
  { label: 'Identicon', path: '/identicon' }
]

export default function Sidebar ({ currentPath }) {
  const [open, setOpen] = useState(true)

  return (
    <aside
      className={`bg-gray-900 text-gray-200 h-screen p-4 flex flex-col transition-all duration-300 ${
        open ? 'w-64' : 'w-16'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className='mb-6 text-gray-300 hover:text-white'
      >
        {open ? '⟨' : '⟩'}
      </button>

      <nav className='flex flex-col gap-2'>
        {routes.map(route => (
          <a
            key={route.path}
            href={route.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPath === route.path
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            {open ? route.label : route.label[0]}
          </a>
        ))}
      </nav>
    </aside>
  )
}
