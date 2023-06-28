import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

const PullToRefresh = ({ onRefresh, children }: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {children}
    </ScrollView>
  );
};

export default PullToRefresh;
