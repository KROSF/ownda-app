import { SafeSurface, Text } from '@app/components/atoms';
import { SettingButton, SettingSwitch } from '@app/components/molecules';
import React, { useCallback, useState } from 'react';

const Settings = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  return (
    <SafeSurface>
      <Text variant="title">Settings</Text>
      <SettingButton
        icon="analytics"
        title="Setttings"
        info="IEE06"
        onPress={() => console.log('press')}
      />
      <SettingSwitch
        icon="analytics"
        title="Setttings"
        value={toggle}
        onValueChange={handleToggle}
      />
      <SettingSwitch
        icon="analytics"
        title="Setttings"
        value={toggle}
        onValueChange={handleToggle}
      />
    </SafeSurface>
  );
};

export default Settings;
