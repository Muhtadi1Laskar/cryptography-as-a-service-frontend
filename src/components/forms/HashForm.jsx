export default function HashForm () {
  return (
    <form>
      <div>
        <label for='Data' class='block mb-2.5 text-sm font-medium text-heading'>
          Write your data...
        </label>
        <textarea
          id='Data'
          rows='4'
          class='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body'
          placeholder='Write your data here...'
        ></textarea>
      </div>
      <div>
        <label htmlFor='hash_select' className='sr-only'>
          Select Hash Algorithm
        </label>
        <select
          id='hash_select'
          className='block py-2.5 ps-0 w-full text-sm text-body bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
        >
          <option selected>Choose a Hash Algorithm</option>
          <option value="Sha256">Sha256</option>
          <option value="Sha256">Sha256</option>
          <option value="sha512">Sha512</option>
          <option value="Sha256">Sha256</option>
        </select>
      </div>
      <button
        type='submit'
        class='text-black bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'
      >
        Submit
      </button>
    </form>
  )
}
