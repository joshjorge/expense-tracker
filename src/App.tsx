import 'bootstrap/dist/css/bootstrap.css';
import { FieldValues, useForm } from 'react-hook-form';
import Table from './components/Table';
import Input from './components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Category from './components/Category';
import { useState } from 'react';

const formSchema = z.object({
  description: z.string().min(3).max(25),
  amount: z.number().min(1),
  category: z.string().min(1, { message: 'A category must be selected' }),
});

export type formData = z.infer<typeof formSchema>;

function App() {
  const [datas, setData] = useState<formData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All categories');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(formSchema) });

  const categories = [
    'All categories',
    'Groceries',
    'Utilities',
    'Entertainment',
  ];
  const headData = ['#', 'Description', 'Amount', 'Category', ''];
  const onSubmit = (fData: FieldValues) => {
    const { description, amount, category } = fData;
    let newData = {
      description: description,
      amount: amount,
      category: category,
    };
    setData([newData, ...datas]);
  };

  let data =
    selectedCategory == 'All categories'
      ? datas
      : datas.filter(dt => dt.category == selectedCategory);
  let getTotal = data.reduce((int, elm) => int + elm.amount, 0);

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  const onDelete = (itm: any) => {
    const dlt = datas.filter(elm => elm !== itm);
    setData([...dlt]);
  };

  return (
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

        <button
          type='submit'
          className='btn btn-primary btn-sm mt-2 mb-2'
          disabled={!isValid}
        >
          Submit
        </button>
      </form>

      <Category
        defaultVal='All categories'
        catg={handleCategoryChange}
        categories={categories}
      />
      <Table
        headData={headData}
        data={data}
        onDelete={onDelete}
        total={getTotal}
      />
    </div>
  );
}

export default App;
