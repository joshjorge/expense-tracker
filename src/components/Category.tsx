interface Props {
  catg: (selectedCategory: string) => void;
  defaultVal: string;
  categories: string[];
}

function Category({ defaultVal, catg, categories }: Props) {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    catg(selectedCategory);
  };
  return (
    <div>
      <select
        className='form-select form-select-sm'
        aria-label='Small select example'
        defaultValue={defaultVal}
        onChange={handleCategoryChange}
      >
        {categories.map(ctg => (
          <option value={ctg} key={ctg}>
            {ctg}
          </option>
        ))}
        {/* <option defaultValue={'All categories'} value='All categories'>
          All categorie
        </option>
        <option value='Utilities'>Utilities</option>
        <option value='Entertainment'>Entertainment</option> */}
      </select>
    </div>
  );
}

export default Category;
