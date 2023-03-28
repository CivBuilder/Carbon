import { render, waitFor, act} from '@testing-library/react-native';
import { ForumScreen } from '../../navigation/screens/index.js';


describe('ForumScreen', () => {
    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
            ok: true,
            json: () => {
                return { ranking: 5, sustainability_score: 80 };
            },
            status : 200,
            });
        });
    });
    it('Renders the forum screen',async () => {
      render(<ForumScreen></ForumScreen>);
      await waitFor(() =>{expect(null).toBeNull()});
    });
  });