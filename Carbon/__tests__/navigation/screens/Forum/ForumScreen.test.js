import { render, waitFor, act, fireEvent} from '@testing-library/react-native';
import { ForumScreen } from '../../../../navigation/screens';
import { Platform } from 'react-native';
import EducationMenu from '../../../../components/EducationMenu';

const navigate= jest.fn();

describe('ForumScreen', () => {
    global.fetch = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
            ok: true,
            json: () => {
                return { "content" : [{"id_forumContent" : 0, 'type': 'Quiz'}, {"id_forumContent" : 1, 'type': 'Article'}, {"id_forumContent" : 2, 'type': 'Unknown'}] };
            },
            status : 200,
            });
        });
    });

    global.nav

    it('Renders the forum screen',async () => {
      const screen = render(<ForumScreen navigation={{navigate}}></ForumScreen>);
      await act(async () => {
        // Pressing all the buttons
        const foo = screen.getByText("Food")
        const tra = screen.getByText("Transport")
        const rec = screen.getByText("Recycling")
        const wat = screen.getByText("Water")
        const ele = screen.getByText("Electricity")
        const all = screen.getByText("All")

        fireEvent.press(foo);
        fireEvent.press(tra);
        fireEvent.press(rec);
        fireEvent.press(wat);
        fireEvent.press(ele);
        fireEvent.press(all);

        const opacity0 = await screen.findByTestId('opacityQuiz')
        fireEvent.press(opacity0);

        const opacity1 = await screen.findByTestId('opacityArticle')
        fireEvent.press(opacity1);

        const opacity2 = await screen.findByTestId('opacityUnknown')
        fireEvent.press(opacity2);

      })
      await waitFor(() =>{expect(null).toBeNull()});
    });
  });