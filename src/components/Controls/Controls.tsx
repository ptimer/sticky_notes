import { AddButton, Color } from '../';

import colors from '../../assets/colors.json';
import { Color as ColorType } from '../../common/types';
import styles from './Controls.module.scss';

export const Controls = () => {
    return (
        <div className={styles.controls}>
            <AddButton />
            {(colors as ColorType[]).map(color => <Color key={color.id} color={color} />)}
        </div>
    );
};
