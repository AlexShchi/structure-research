import './common/common'
import './modules/menu/menu'

import {counter} from './modules/counter/counter'
import {html} from '/modules/html/html'
import {canvas} from '/modules/canvas/canvas'
import {canvas_webgl} from '/modules/canvas/canvas_webgl'

html();
let сcanvas = canvas();
console.log(сcanvas);
сcanvas.methods.init({
    count: 200,
    items_per_row: 100,
});
canvas_webgl({
    count: 2,
    items_per_row: 2,
});
counter();