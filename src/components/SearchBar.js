import React from 'react'
const SearchBar = ({search,setSearch}) => {

    return (
        <div className='searchbar'>
        <input type="text"
        placeholder='search item'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        </div>
    )
}

export default SearchBar;
