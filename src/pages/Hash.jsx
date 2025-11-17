import HashForm from '../components/forms/HashForm'
import PageContainer from '../components/layouts/PageContainer'

export default function HashPage () {
  return (
    <PageContainer currentPath='/hash' title='Hashing Tool'>
      <div className='p-6 bg-white rounded-lg shadow'>
        <h2 className='text-lg font-semibold mb-4'>Hash Generator</h2>
        <HashForm/>
      </div>
    </PageContainer>
  )
}
