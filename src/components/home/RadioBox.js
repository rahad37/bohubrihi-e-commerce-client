const RadioBox = ({prices, handleFilters}) => {
    const handleChange = e => {
        handleFilters(e.target.value);
    }
    return prices.map(price => (
        <div className="col-6" key={price.id}>
            <input type="radio" onChange={handleChange} value={price.id} name='price_filter' className='mr-2' />
            <label className='form-check-label mr-4'>{price.name}</label>
        </div>
    ))
}

export default RadioBox;