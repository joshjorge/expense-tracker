import { formData } from '../App';
import Button from './Button';

interface Props {
  headData: string[];
  data: formData[];
  onDelete: (itm: formData) => void;
  onEdit: (itm: formData) => void;
  total: number;
}

function Table({ data, headData, onDelete, onEdit, total }: Props) {
  let txt =
    data.length > 0 ? (
      <p className='text-success'>You got {data.length} items</p>
    ) : (
      <p className='text-danger'>There is none</p>
    );
  return (
    <div>
      {txt}
      <table className='table'>
        <thead>
          <tr>
            {headData.map((hd, idx) => (
              <th scope='col' key={idx}>
                {hd}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(dt => (
            <tr key={data.indexOf(dt)}>
              <td>{data.indexOf(dt) + 1}</td>
              <td>{dt.description}</td>
              <td>${dt.amount}</td>
              <td>{dt.category}</td>
              <td>
                <Button
                  onAction={() => onEdit(dt)}
                  clss='btn btn-info me-2 sm'
                  label='Edit'
                  tp='button'
                />
                <Button
                  onAction={() => onDelete(dt)}
                  clss='btn btn-danger sm'
                  label='Delete'
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <b>Total</b>
            </td>
            <td></td>
            <td>
              <b>{total}$</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
