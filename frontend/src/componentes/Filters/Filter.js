import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TextField,
  Box
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Filter = (props) => {
  const { label, itens, onChange } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectionChange = (event) => {
    const selectedValues = event.target.value;

    if ((Array.isArray(selectedValues) && selectedValues[0] !== undefined) || selectedValues.length === 0) {
      setSelectedItems(selectedValues);

      if (onChange) {
        onChange(selectedValues);
      }
    }
  };

  const filteredOptions = Array.isArray(itens)
    ? itens.filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (item.label) {
        return item.label.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return item.toLowerCase().includes(searchTerm.toLowerCase());
      }
    })
    : [];

  return (
    <FormControl sx={{ minWidth: '130px', flex: 1 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={`demo-multiple-checkbox-label-${label}`}
        id={`demo-multiple-checkbox-${label}`}
        multiple
        value={selectedItems}
        onChange={handleSelectionChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.map(value => {
          const selectedItem = itens.find(item => item.value === value);
          return selectedItem ? selectedItem.label : value;
        }).join(', ')}
        MenuProps={MenuProps}
        sx={{ width: '100%' }} // Define a largura do Select para 100%
      >
        <Box sx={{ textAlign: 'center' }}>
          <TextField
            label="Pesquisar"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            sx={{ width: '90%' }} // Define a largura do TextField para 100%
          />
        </Box>
        {filteredOptions.map((item, index) => (
          <MenuItem key={index} value={item.value || item.label || item}>
            <Checkbox checked={selectedItems.indexOf(item.value || item.label || item) > -1} />
            <ListItemText primary={item.label || item.value || item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Filter;