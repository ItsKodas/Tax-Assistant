import { createBoard } from '@wixc3/react-board';
import { Navbar } from '../../../components/navbar/navbar';

export default createBoard({
    name: 'Navigation Bar',
    Board: () => <Navbar />,
    isSnippet: true,
});
