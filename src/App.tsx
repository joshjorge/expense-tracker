import 'bootstrap/dist/css/bootstrap.css';
import { FieldValues, useForm } from 'react-hook-form';
import Table from './components/Table';
import Input from './components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Category from './components/Category';
import { useState } from 'react';
import ModalForm from './components/modalForm';
import Button from './components/Button';
import { fSchema } from './assets/utils/box';
import produce from 'immer';

const formSchema = fSchema('description', 'amount', 'category');

export type formData = z.infer<typeof formSchema>;

function App() {
  const [datas, setData] = useState<formData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayState, setDisplayState] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(formSchema) });

  const categories = ['Groceries', 'Utilities', 'Entertainment'];
  const headData = ['#', 'Description', 'Amount', 'Category', ''];
  const onSubmit = (fData: FieldValues) => {
    const { description, amount, category } = fData;
    let newData = {
      id: datas.length + 1,
      description: description,
      amount: amount,
      category: category,
    };
    setData([newData, ...datas]);
    reset();
  };

  let data = selectedCategory
    ? datas.filter(dt => dt.category == selectedCategory)
    : datas;
  let getTotal = data.reduce((int, elm) => int + elm.amount, 0);

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };
  const dtToMof = (elm: FieldValues) => {
    console.log(elm);
  };
  const openModal = (elm: FieldValues) => {
    setDisplayState(true);
    console.log(elm);
    console.log(displayState);
  };
  const onMdf = (id: number) => {
    //   const itm = datas.find(elm=> elm.id===id)
  };
  const closeModal = () => {
    setDisplayState(false);
    console.log(displayState);
  };
  const onDelete = (itm: formData) => {
    const dlt = datas.filter(elm => elm !== itm);
    setData([...dlt]);
  };

  return (
    <>
      <ModalForm closeModal={closeModal} dsply={displayState} />
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            reg={{ ...register('description') }}
            label='Description'
            type='text'
            placeholder='item name'
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
          <Button
            label='Add'
            clss='btn btn-success btn-sm mt-2 mb-2'
            tp='submit'
            disabled={!isValid}
          />
        </form>

        <Category
          defaultCategory='All categories'
          catg={handleCategoryChange}
          categories={categories}
        />
        <Table
          headData={headData}
          data={data}
          onDelete={onDelete}
          onEdit={openModal}
          total={getTotal}
        />
      </div>
    </>
  );
}

export default App;
