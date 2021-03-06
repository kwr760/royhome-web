import { findRouteTab } from '../../../src/components/functions/find-route-tab';

describe('component/page/app-bar/find-route-tab', () => {
  it('returns correct routes for tabs', () => {
    // Arrange // Act // Assert
    expect(findRouteTab('/')).toBe(0);
    expect(findRouteTab('/about')).toBe(1);
    expect(findRouteTab('/author')).toBe(2);
    expect(findRouteTab('/tictactoe')).toBe(3);
  });
});
