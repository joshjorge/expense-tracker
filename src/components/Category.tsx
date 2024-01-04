interface Props {
  catg: (selectedCategory: string) => void;
  defaultCategory: string;
  categories: string[];
}

function Category({ defaultCategory, catg, categories }: Props) {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    catg(selectedCategory);
  };
  return (
    <div>
      <select
        id='catg'
        className='form-select'
        aria-label='Small select example'
        defaultValue={defaultCategory}
        onChange={handleCategoryChange}
      >
        <option value=''>All categories</option>
        {categories.map(ctg => (
          <option value={ctg} key={ctg}>
            {ctg}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Category;
