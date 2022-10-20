import { memo } from 'react';
import { Box, NotFound as IconNotFound, WebHosting, CloudHostingMutiPlaform, ChartBusiness, AreaConfig } from '~/Icons';
import { palate } from '~/theme/palate.js';
import { Text, Image, View, Dimensions } from 'react-native';

const styles = {
  width: 210,
  height: 210,
  fill: palate.light.text,
};

const temp = {
  'Devices': {
    icon: <WebHosting {...styles} />,
  },
  'Areas': {
    icon: <AreaConfig {...styles} />,
  },
  'Server': {
    icon: <CloudHostingMutiPlaform {...styles} />,
  },
  'Setting': {
    icon: <Box {...styles} />,
  },
  'Charts': {
    icon: <ChartBusiness {...styles} />,
  },
  'None': {
    icon: <IconNotFound {...styles} />,
  },
};

function NotFound({ type = 'None', title = '' }) {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }}>
      <View style={{
        alignItems: 'center',
      }}>
        <View style={{
          width: 220,
          height: 220,
          borderRadius: 220 / 2,
          backgroundColor: '#e8eaf2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          { (type in temp) ? temp[type].icon : temp.None.icon }
        </View>
        <Text style={{
          fontSize: 24,
          marginVertical: 10,
          color: palate.light.text,
        }}>
          Không tìm thấy
        </Text>
        <Text style={{
          fontSize: 16,
          color: palate.light.text,
        }}>Bạn vẫn chưa đăng ký { String(title).toLowerCase() } nào</Text>
      </View>
    </View>
  );
}

export default memo(NotFound);
