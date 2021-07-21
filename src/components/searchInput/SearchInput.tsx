import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchInput = ({ onInputChange, loading } : 
    { onInputChange: (input: string) => void, loading: boolean }) => (
  <Input loading={loading} icon='search' placeholder='Search...' onChange={element => onInputChange(element.currentTarget.value)}/>
)

export default SearchInput