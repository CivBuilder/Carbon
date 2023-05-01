import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListPlayers from "../../../../navigation/screens/Ranking/ListPlayers"
import { EmissionCategory as EC } from '../../../../navigation/screens/Ranking/Categories';

describe('ListPlayers component', () => {
  const table = [
    { rank: 1, username: 'user1',   global_score: 100, avatar_index : 1},
    { rank: 2, username: 'user2',   global_score: 90 , avatar_index : 2},
    { rank: 4, username: 'sellen7', global_score: 100, avatar_index : 3},
  ];

  const onRefreshMock = jest.fn(); 
  const onEndReachedMock = jest.fn();
  
  it('renders list entries correctly', () => {
    const {getByTestId} = render(<ListPlayers table={table} onRefresh={onRefreshMock} onEndReached={onEndReachedMock}
                                  category={EC.GLOBAL} username={"sellen7"}/>);
     expect(getByTestId('list')).toBeDefined();
  });

  it('calls onRefresh when the list is pulled down', () => {
      const { getByTestId } = render(
        <ListPlayers 
          table={table} 
          onRefresh={onRefreshMock} 
          onEndReached={onEndReachedMock}
          category={EC.GLOBAL} 
          username={"sellen7"}
        />
      );
    fireEvent(getByTestId('list'), 'refresh');
    expect(onRefreshMock).toHaveBeenCalled();
  });

  it('calls onEndReached when the end of the list is reached', () => {
    const { getByTestId } = render(
        <ListPlayers 
          table={table} 
          onRefresh={onRefreshMock} 
          onEndReached={onEndReachedMock}
          category={EC.GLOBAL} 
          username={"sellen7"}
        />
      );
    fireEvent(getByTestId('list'), 'endReached');
    expect(onEndReachedMock).toHaveBeenCalled();
  });
});