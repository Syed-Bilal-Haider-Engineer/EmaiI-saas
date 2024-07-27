
import useSettingsFilter from "@/shared/hooks/useSettingsFilters";
import { Tabs, Tab } from "@nextui-org/react";

/**
 * Component representing the settings tab navigation.
 * @returns {JSX.Element} The settings tab component.
 */
const SettingsTab: React.FC = (): JSX.Element => {
  const { activeItem, setActiveItem } = useSettingsFilter();

  return (
    <Tabs
      variant="underlined"
      aria-label="Settings Tabs"
      selectedKey={activeItem}
      onSelectionChange={(key) => setActiveItem(String(key))}
    >
      <Tab title="API Access" key="API Access" />
      <Tab title="Customize Profile" key="Customize Profile" />
    </Tabs>
  );
};

export default SettingsTab;
