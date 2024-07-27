import { useState } from 'react';

// Mock implementation of useSettingsFilter for demonstration
const useSettingsFilter = () => {
  const [activeItem, setActiveItem] = useState<string>("API Access");
  
  const setActiveItemWrapper = (key: string) => {
    setActiveItem(key);
  };

  return { activeItem, setActiveItem: setActiveItemWrapper };
};

export default useSettingsFilter;
