import './canvas.scss'

function canvas(obj) {
    const canvas = document.querySelector('.canvas-2d');
    if (canvas) {
        const ctx = canvas.getContext('2d'),
            item_width = 385,
            item_height = 280,
            gap = 20;

        setSizeCanvas({
            el: canvas,
            count: obj.count,
            items_per_row: obj.items_per_row,
            item_width: item_width,
            item_height: item_height,
            gap: gap,
        })

        const options = {
            ctx: ctx,
            item_width: item_width,
            item_height: item_height,
            gap: {x:0, y:0},
            count: obj.count,
            items_per_row: obj.items_per_row,
        }
        drawCanvas(options);
        move(options);

    }
}
export {canvas};

function move(obj) {
    let start = {};
    document.body.addEventListener('mousemove', function (e) {
        if (e.target.classList.contains('canvas-2d') && e.buttons == 1) {
            console.log(e.clientX, e.clientY);
            // console.log(e.buttons)
            obj.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
            obj.gap = { x:0 - e.clientX, y: 0 - e.clientY };
            drawCanvas(obj)
        }
    })
}

function drawCanvas(obj) {
    let items_in_row = obj.items_per_row,
        cur_item = 0,
        x = obj.gap.x,
        y = obj.gap.y;

    while (cur_item < obj.count) {

        drawItem({
            ctx: obj.ctx,
            coords: {
                x: x,
                y: y,
            },
            width: obj.item_width,
            height: obj.item_height,
            title: 'Title of item',
            user: {
                avatar: {
                    image: 'https://www.fillmurray.com/36/36', // img
                    size: 36,

                },
                name: 'Иванов Алексей Андреевич',   // string
                position: 'Директор департамента' // string
            },
            members: [
                {
                    avatar: {
                        image: 'https://placedog.net/24/24', // img
                        size: 24,

                    },
                    name: 'Иванов Алексей Андреевич',   // string
                    position: 'Директор департамента' // string
                },
            ]
        })

        if (items_in_row > 1) {
            x = x + obj.item_width + obj.gap;
            items_in_row--;
        } else {
            items_in_row = obj.items_per_row;
            x = obj.gap;
            y = y + obj.item_height + obj.gap;
        }
        cur_item++;
    }
}

function drawItem(obj) {
    const ctx = obj.ctx;

    ctx.strokeStyle = '#000';
    ctx.strokeRect(obj.coords.x, obj.coords.y, obj.width, obj.height);

    drawHead(obj);
    drawUser({
        ctx: obj.ctx,
        user: obj.user,
        no_text: false,
        coords: {
            x: obj.coords.x + 10,
            y: obj.coords.y + 10,
        }
    });
    drawMembers(obj);
    drawToggle({
        ctx: obj.ctx,
        coords: {
            x: obj.coords.x + 300,
            y: obj.coords.y + 220,
        },
        width: 50,
        height: 25
    })
}

function drawHead(obj) {
    const ctx = obj.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(obj.coords.x + 10, obj.coords.y + 10, obj.width - 20, 60);

    drawText({
        ctx: obj.ctx,
        color: '#000',
        font: 'italic 24px Arial',
        text: 'Fill text 2 text',
        coords: {
            x: obj.coords.x + 25,
            y: obj.coords.y + 47
        }
    })
}

function drawUser(obj) {
    /*
        obj = {
            ctx: ctx,
            coords: {x:10, y: 10},
            user: {},
            no_text: false,
        }
     */
    // console.log(obj)
    drawAvatar({
        ctx: obj.ctx,
        coords: {
            x: obj.coords.x,
            y: obj.coords.y + 85,
        },
        size: 36,
        stroke: obj.no_text
    })
    if (!obj.no_text) {
        drawText({
            ctx: obj.ctx,
            color: '#000',
            font: 'italic 16px Arial',
            text: obj.user.name,
            coords: {
                x: obj.coords.x + 65,
                y: obj.coords.y + 100,
            }
        })
        drawText({
            ctx: obj.ctx,
            font: 'italic 16px Arial',
            color: '#000',
            text: obj.user.position,
            coords: {
                x: obj.coords.x + 65,
                y: obj.coords.y + 120,
            }
        })

    }

}

function drawToggle(obj) {
    /*
        obj = {
            ctx: ctx,
            coords: {x:10, y:10,}
        }
     */
    const ctx = obj.ctx;
    ctx.strokeRect(obj.coords.x, obj.coords.y, obj.width, obj.height);
    drawText({
        ctx: obj.ctx,
        color: '#000',
        font: 'italic 16px Arial',
        text: '3',
        coords: {
            x: obj.coords.x + 8,
            y: obj.coords.y + 18,
        }
    })
    drawArrow({
        ctx: obj.ctx,
        coords: {
            x: obj.coords.x + 30,
            y: obj.coords.y + 14,
        },
        size: 10,
    });
}

function drawMembers(obj) {
    obj.members.forEach((item) => {
        let t = 0;
        while (t < 6) {
            drawUser({
                ctx: obj.ctx,
                coords: {x: obj.coords.x + t * item.avatar.size + 15, y: obj.coords.y + 130},
                user: item,
                no_text: true,
                stroke: true
            })
            t++;
        }
    })
}


function drawText(obj) {
    /*
        obj = {
            ctx: ctx
            color: '#000',
            font:  'italic 16px Arial',
            text: 'Text for drawing',
            coords: {x: 10, y: 50}
        }
    */
    // console.log(obj);
    const ctx = obj.ctx;
    ctx.fillStyle = obj.color || "#000";
    ctx.font = obj.font || "italic 16px Arial";
    ctx.fillText(obj.text, obj.coords.x, obj.coords.y);
}

function drawAvatar(obj) {
    const ctx = obj.ctx,
        center = {x: obj.coords.x + obj.size / 2, y: obj.coords.y + obj.size / 2};
    ctx.beginPath();
    ctx.arc(center.x, center.y, obj.size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    if (obj.stroke) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

function drawArrow(obj) {
    const ctx = obj.ctx;
    // console.log(obj);

    const start = {x: obj.coords.x, y: obj.coords.y};

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x + obj.size, start.y);
    ctx.lineTo(start.x + obj.size / 2, start.y - obj.size / 2);
    ctx.fill();
}

function setSizeCanvas(obj) {
    /*
        obj = {
            el: canvas_html_el,
            count: 2,
            items_per_row: 4,
            item_width: 45,
            item_height: 15,
            gap: 20,
        }
     */
    // const width = (obj.gap * 2) + (obj.item_width * obj.items_per_row) + (obj.gap * (obj.items_per_row-1) ),
    //     height = obj.gap + (obj.item_height * Math.ceil( (obj.count / obj.items_per_row) ) ) + (obj.gap * Math.ceil(((obj.count/obj.items_per_row))) );

    const width = window.innerWidth - 10,
        height = window.innerHeight - 10;

    obj.el.setAttribute('width', width);
    obj.el.setAttribute('height', height);
}
