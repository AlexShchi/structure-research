import './common/common'
import {counter} from './modules/counter/counter'
import {html} from '/modules/html/html'
import {canvas} from '/modules/canvas/canvas'

html();
canvas({
    count: 2200,
    items_per_row: 100,
});
counter();