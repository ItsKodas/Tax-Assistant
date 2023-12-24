import { createBoard } from '@wixc3/react-board';
import { Settings } from '../../../components/settings/settings';

export default createBoard({
    name: 'Settings',
    Board: () => <Settings />,
    isSnippet: true,
});
