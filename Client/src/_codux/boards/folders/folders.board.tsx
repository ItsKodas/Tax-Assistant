import { createBoard } from '@wixc3/react-board';
import { Folders } from '../../../components/folders/folders';

export default createBoard({
    name: 'Folders',
    Board: () => <Folders />,
    isSnippet: true,
});
