import HashForm from '../components/forms/HashForm'
import PageContainer from '../components/layouts/PageContainer'

export default function HashPage () {
  return (
    <PageContainer currentPath='/hash' title='Hashing Tool'>
      <div className='p-6 '>
        <HashForm/>
      </div>
    </PageContainer>
  )
}
