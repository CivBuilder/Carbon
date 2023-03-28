import {render} from '@testing-library/react-native';
import { ForumScreen } from '../../navigation/screens/index.js';

describe('ForumScreen', () => {
    it('Renders the forum screen', () => {
      render(<ForumScreen></ForumScreen>);
      expect(null).toBeNull();
    });
  });