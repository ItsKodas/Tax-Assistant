import { createBoard } from '@wixc3/react-board';
import { FolderCard } from '../../../components/folder-card/folder-card';

export default createBoard({
    name: 'FolderCard',
    Board: () => <FolderCard folder='N/A'/>,
    isSnippet: true,
});
