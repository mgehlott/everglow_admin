const Loader = () => {
  return (
    <div className='d-flex justify-content-center  text-primary'>
      <div className='spinner-border' role='status' style={{height: '4em', width: '4em'}}>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
export default Loader
