import './counter.scss'

function counter() {
    const block = document.querySelector('.js-counter');
    if (block) {
        const counter = {
            root: block,
            fps: block.querySelector('.js-fps'),
            min_fps: block.querySelector('.js-min-fps'),
            max_fps: block.querySelector('.js-max-fps'),
            average_fps: block.querySelector('.js-average-fps'),
        }
        let date = Date.now(),
            fps = 0,
            min = null,
            max = 0;
        requestAnimationFrame(
            function loop() {
                let now = Date.now()
                fps = Math.round(1000 / (now - date))
                date = now
                if (min == null || fps < min) {
                    min = fps;
                }
                if (fps > max) {
                    max = fps
                }
                requestAnimationFrame(loop)
            }
        )

        setInterval(()=>{
            // counter.min_fps.innerText = min;
            // counter.max_fps.innerText = max;
            counter.fps.innerText = fps;
        },300)

    }
}

export {counter};
