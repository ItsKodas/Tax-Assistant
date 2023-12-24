import { createBoard } from '@wixc3/react-board';
import { TaxList } from '../../../components/tax-list/tax-list';

export default createBoard({
    name: 'TaxList',
    Board: () => <TaxList />,
    isSnippet: true,
});
