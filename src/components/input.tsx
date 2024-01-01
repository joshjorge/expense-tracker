interface Props {
  label: string;
  type: string;
  placeholder: string;
  min?: string;
  reg: any;
  sel?: string;
  errors?: any;
}

const Input = ({
  label,
  type,
  placeholder,
  reg,
  sel = '',
  errors,
  min,
}: Props) => {
  return (
    <>
      {type === 'number' || type === 'text' ? (
        <div className='mb-3'>
          <label htmlFor={label} className='form-label'>
            {label}
          </label>
          {errors && <p className='text-danger'>{errors.message}</p>}
          <input
            {...reg}
            type={type}
            className='form-control'
            id={label}
            placeholder={placeholder}
            min={min}
          />
        </div>
      ) : (
        <div>
          <label htmlFor={label} className='form-label'>
            {label}
          </label>
          {errors && <p className='text-danger'>{errors.message}</p>}
          <select
            {...reg}
            id={label}
            className='form-select form-select-sm'
            aria-label='Small select example'
          >
            <option>{sel}</option>
            <option value='Groceries'>Groceries</option>
            <option value='Utilities'>Utilities</option>
            <option value='Entertainment'>Entertainment</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Input;
