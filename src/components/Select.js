const Select = ({items, onChange, selected}) => {
    return <select
        defaultValue={selected}
        onChange={e => onChange(e.target.value)}
    >
        {items.map(i => <option
            key={i.value}
            value={i.value}
        >{i.label}</option>)}
    </select>
}

export default Select;