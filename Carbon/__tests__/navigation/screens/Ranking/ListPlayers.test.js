import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListPlayers from "../../../../navigation/screens/Ranking/ListPlayers"


describe('ListPlayers component', () => {
  const table = [
    { rank: 1, username: 'user1', global_score: 100 },
    { rank: 2, username: 'user2', global_score: 90 },
    { rank: 4, username: 'sellen7', global_score: 100 },
  ];

  it('renders list entries correctly', () => {
    const { getByText } = render(<ListPlayers table={table} />);
    expect(getByText('1 - user1 - 100')).toBeDefined();
    expect(getByText('2 - user2 - 90')).toBeDefined();
  });

  it('calls onRefresh when the list is pulled down', () => {
    const onRefreshMock = jest.fn();
    const { getByTestId } = render(
      <ListPlayers table={table} onRefresh={onRefreshMock} />,
    );
    fireEvent(getByTestId('flatlist'), 'refresh');
    expect(onRefreshMock).toHaveBeenCalled();
  });

  it('calls onEndReached when the end of the list is reached', () => {
    const onEndReachedMock = jest.fn();
    const { getByTestId } = render(
      <ListPlayers table={table} onEndReached={onEndReachedMock} />,
    );
    fireEvent(getByTestId('flatlist'), 'endReached');
    expect(onEndReachedMock).toHaveBeenCalled();
  });
});