import {Form} from 'react-bootstrap'
type Props = {
  date: string
  setDate: (d: string) => void
}
const DateInput = ({date, setDate}: Props) => {
  return (
    <div>
      <div className='mb-3 d-flex gap-5 m-auto'>
        <Form.Label className='align-self-end'>
          <h3>Select Date</h3>
        </Form.Label>
        <Form.Control
          className='w-50'
          type='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
    </div>
  )
}
export default DateInput
