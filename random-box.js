class PACLearner {
    constructor() {
        this.points = []
        this.currentRectangle = null
    }

    pointIn(point) {
        if (this.currentRectangle == null){
            return false
        }
        const rect1 = point.getBoundingClientRect()
        const rect2 = this.currentRectangle.getBoundingClientRect();
        const isIntersecting = !(rect1.right < rect2.left || 
                                 rect1.left > rect2.right || 
                                 rect1.bottom < rect2.top || 
                                 rect1.top > rect2.bottom);

        return isIntersecting
    }

    addPoint() {
        const canvas = document.getElementById("grid")
        const randomX = Math.random() * Math.min(canvas.clientWidth, window.innerWidth)
        const randomY = Math.random() * Math.min(canvas.clientHeight, window.innerHeight)
        console.log(`randomX: ${randomX}, randomY: ${randomY}`)
        const point = document.createElement("div")
        point.classList.add("point")
        point.style.left = `${randomX}px`
        point.style.top = `${randomY}px`
        canvas.appendChild(point)
        return point
    }

    performInference(num_samples) {
        if (num_samples == 0){
            return
        }    
        let point = this.addPoint()
        this.points.push(point)
        const intersects = this.pointIn(point)
        if (intersects) {
            console.log("Intersection found!")
        }
        requestAnimationFrame( () => this.performInference(num_samples-1))
    }

    drawBoundingBox() {

    }

    buttonLogic(event) {
        if (this.currentRectangle != null){
            return
        }
        console.log("running buttonLogic...")
        const container = document.getElementById('grid')
        const rectangle = document.createElement("div")
        rectangle.classList.add('rectangle')
        // Randomize width, height, and position
        const randomWidth = Math.random() * 250 + 50;  // Random width between 50px and 300px
        const randomHeight = Math.random() * 250 + 50; // Random height between 50px and 300px
        const randomTop = Math.random() * (container.clientHeight - randomHeight);  // Random top position
        const randomLeft = Math.random() * (container.clientWidth - randomWidth);   // Random left position
        // Apply random width, height, and position to the rectangle
        rectangle.style.width = `${randomWidth}px`;
        rectangle.style.height = `${randomHeight}px`;
        rectangle.style.top = `${randomTop}px`;
        rectangle.style.left = `${randomLeft}px`;
        rectangle.style.border = "2px solid black";

        // Append the new rectangle to the container
        container.appendChild(rectangle);
        if (this.currentRectangle == null){
            this.currentRectangle = rectangle
        }
        this.performInference(100)
    
    }

}


function setButtonHandler() {
    const learnerJS = new PACLearner()
    const button = document.getElementById("button")
    const button2 = document.getElementById("button-2")
    const button3 = document.getElementById("button-3")
    console.log(typeof button, button)
    button.addEventListener('click', () => { learnerJS.buttonLogic.bind(learnerJS)() } )
    button2.addEventListener('click', () => { learnerJS.addPoint.bind(learnerJS)() })
    button3.addEventListener('click', () => {   console.log("Removing...")   
                                                learnerJS.points = []; 
                                                learnerJS.currentRectangle = null;
                                                let elements = document.getElementsByClassName('rectangle');  
                                                for (let i = elements.length - 1; i >= 0; i--) {
                                                    elements[i].remove();
                                                }
                                                let pts = document.getElementsByClassName('point');
                                                console.log(pts, pts.length)
                                                for (let i = pts.length - 1; i >= 0; i--) {
                                                    pts[i].remove();
                                                }
                                            })
    console.log("Bound PACLearner class to button event listener!")
}

window.onload = () => setButtonHandler();