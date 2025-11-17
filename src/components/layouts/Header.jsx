export default function Header ({ title = 'Cryptography Toolkit' }) {
  return (
    <header className='w-full h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm'>
      <h1 className='text-xl font-semibold text-gray-800'>{title}</h1>

      <div className='flex gap-3 items-center'>
        {/* Placeholder for future features */}
        <button className='px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition'>
          Theme
        </button>
        <button className='w-8 h-8 bg-gray-200 rounded-full'></button>
      </div>
    </header>
  )
}
