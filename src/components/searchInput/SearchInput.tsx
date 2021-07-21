import React from 'react'
import { Input } from 'semantic-ui-react'
import "./SearchInput.css"

const SearchInput = ({ onInputChange, loading }:
    { onInputChange: (input: string) => void, loading: boolean }) => (
    <div className="searchInput">
        <Input loading={loading} icon='search' placeholder='Search...' onChange={element => onInputChange(element.currentTarget.value)} />
    </div>
)

export default SearchInput