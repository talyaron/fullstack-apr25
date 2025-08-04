class Field {
    width: number;
    height: number;
    element: HTMLElement;
    players: FootballPlayer[] = [];


    constructor(element: HTMLElement, width: number = 600, height: number = 600, ){
        this.element = element;
        this.width = width;
        this.height = height;
    }
}


class FootballPlayer {
    name: string;
    yearOfBirth: number;
    position: string;
    team: string;
    imageUrl?: string;
    playerElement: HTMLElement;
    location: { x: number; y: number; };

    constructor(name: string, year: number, position: string, team: string, imageUrl: string, fieldContainer: HTMLElement, location: { x: number, y: number }) {
        this.name = name;
        this.yearOfBirth = year;
        this.position = position;
        this.team = team;
        this.imageUrl = imageUrl;
        this.location = location;

        if (fieldContainer) {
            this.render(fieldContainer);
        }
    }



    render(container: HTMLElement) {

        this.playerElement = document.createElement("div");
        this.playerElement.classList.add("player");

        container.appendChild(this.playerElement);
    }

    move(moveX: number, moveY: number) {
        this.location.x += moveX;
        this.location.y += moveY;

        this.updatePosition();
    }

    updatePosition() {
        this.playerElement.style.left = this.location.x + "px";
        this.playerElement.style.top = this.location.y + "px";
    }


}


