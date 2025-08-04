class Field {

}


class FootballPlayer {
    name: string;
    yearOfBirth: number;
    position: string;
    team: string;
    imageUrl?: string;
    playerElement: HTMLElement;
    location: { x: number; y: number; };

    constructor(name: string, year: number, position: string, team: string, imageUrl: string, domElement: HTMLElement, location: { x: number, y: number}) {
        this.name = name;
        this.yearOfBirth = year;
        this.position = position;
        this.team = team;
        this.imageUrl = imageUrl;
        this.location = location;

        if(domElement){
            this.render(domElement);
        }
    }



    render(container: HTMLElement) {
        this.playerElement = document.createElement("div");
        if(!this.playerElement) throw new Error("Can't find this player element");
        this.playerElement.classList.add("player");

        container.appendChild(this.playerElement);
    }

    move(x: number, y: number) {
        this.location.x += x;
        this.location.y += y;
    }

}


