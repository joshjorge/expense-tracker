// import Button from './Button';
import { z } from 'zod';
import Button from './Button';
import Input from './input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../assets/styles/modal.module.css';
import { FieldValues } from 'react-hook-form';
import { fSchema } from '../assets/utils/box';

const { modalContainer, modal } = styles;

interface Props {
  closeModal: () => void;
  dsply: boolean;
}
const formSchema = fSchema('description', 'amount', 'category');

export type formData = z.infer<typeof formSchema>;

function ModalForm({ closeModal, dsply }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(formSchema) });

  const onSubmit = (elm: FieldValues) => {
    console.log(elm);
    reset();
  };

  if (!dsply) return null;

  return (
    <div className={modalContainer}>
      <div className={modal}>
        <h3>Update item</h3>
        <form className='inputContainer' onSubmit={handleSubmit(onSubmit)}>
          <Input
            reg={{ ...register('description') }}
            label='Description'
            type='text'
            placeholder={'item name'}
            errors={errors.description}
          />
          <Input
            reg={{ ...register('amount', { valueAsNumber: true }) }}
            label='Amount'
            type='number'
            min='0'
            placeholder='item amount'
            errors={errors.amount}
          />
          <Input
            reg={{ ...register('category') }}
            label='Category'
            type=''
            placeholder='item category'
            errors={errors.category}
          />
          <div className='footer'>
            <Button
              label='Update'
              clss='btn btn-success btn-sm mt-2 mb-2'
              tp='submit'
              disabled={!isValid}
            />
            <Button
              label='Cancel'
              clss='btn btn-danger btn-sm mt-2 mb-2'
              tp='button'
              onAction={closeModal}
            />
          </div>
        </form>
      </div>
      {/* <div className={blurEff}></div> */}
    </div>
  );
}

export default ModalForm;
