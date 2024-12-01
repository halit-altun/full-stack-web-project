import React, { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);

  const addAddress = (newAddress) => {
    setAddresses(prevAddresses => [...prevAddresses, newAddress]);
  };

  const deleteAddress = (addressId) => {
    setAddresses(prevAddresses => 
      prevAddresses.filter(address => address._id !== addressId)
    );
  };

  return (
    <AddressContext.Provider value={{
      addresses,
      setAddresses, 
      addAddress,
      deleteAddress
    }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddresses must be used within an AddressProvider');
  }
  return context;
}; 